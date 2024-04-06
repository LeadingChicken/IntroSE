import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { isCoach } from "../utilities/checkRole";
import {
  acceptRequestFromClient,
  getAcceptedRequestForUser,
  getRequestForCoach,
  seenARequest,
} from "../firebase/notification/request-coach";
import { Card, Container } from "react-bootstrap"; // Import React Bootstrap components
import UserService from "../api/services/UserService";
import Button from "../components/button/Button";

function NotificationPage() {
  const { user, userRoles } = useSelector((state) => state.user);
  const [requestsCoach, setRequestsCoach] = useState([]);
  const [acceptedRequests, setAcceptedRequests] = useState([]);

  useEffect(() => {
    if (isCoach(userRoles)) {
      getRequestForCoach(user).then((data) => setRequestsCoach(data));
    } else {
      getAcceptedRequestForUser(user).then((data) => setAcceptedRequests(data));
    }
  }, [user]);

  const handleAcceptRequest = async (request) => {
    try {
      const res = await UserService.subcribeCoach(
        request.data.sender,
        user.username
      );
      if (res?.status == 200) {
        await acceptRequestFromClient(request.id);
        alert(`${request.data.sender} have become your client`);
        setRequestsCoach((prev) =>
          prev.filter((item) => item.id !== request.id)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSeenRequest = async (request) => {
    console.log("seen this request ");
    await seenARequest(request?.id);
    setAcceptedRequests((prev) =>
      prev.filter((item) => item.id !== request.id)
    );
  };

  return (
    <div>
      <Header />
      <Container style={{ marginTop: "100px", width: "50%" }}>
        <h1>Notification Page</h1>
        {requestsCoach?.map((request) => (
          <Card key={request.id}>
            <Card.Body>
              <Card.Text>{`Sender: ${request.data?.sender}`}</Card.Text>
              <Card.Text>{`Message: ${request.data?.message}`}</Card.Text>
              <Button onClick={() => handleAcceptRequest(request)}>
                Accept
              </Button>
            </Card.Body>
          </Card>
        ))}
        {acceptedRequests?.map((request) => (
          <Card key={request.id}>
            <Card.Body>
              <Card.Text>{`${request.data?.message}`}</Card.Text>
              <Card.Text>{`${request.data?.receiver} has accepted your request`}</Card.Text>
              <Button onClick={() => handleSeenRequest(request)}>Seen</Button>
            </Card.Body>
          </Card>
        ))}
      </Container>
    </div>
  );
}

export default NotificationPage;
