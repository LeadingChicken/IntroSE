import { useState } from "react";
import { Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import Button from "../button/Button";

function PaymentDetails() {
  const [paymentMethod, setPaymentMethod] = useState("");
  const {
    state: { coachName },
  } = useLocation();
  const { user, userRoles } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestCollection = collection(
      db,
      "notification",
      "request-coach",
      "requests"
    );
    await addDoc(requestCollection, {
      sender: user.username,
      receiver: coachName,
      message: `${user.username} want to become your trainee`,
      status: 0,
    });
    alert("Wait for coach to accept you ?");
    navigate("/");
  };
  return (
    <div className="col-md-6">
      <div className="d-flex justify-content-center">
        <div style={{ width: "80%" }}>
          <h2>Enter your payment details</h2>
          <div>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control type="text" value="$100" readOnly />
              </Form.Group>
              <Form.Group controlId="paymentMethod">
                <Form.Label>Payment Method</Form.Label>
                <Form.Control
                  as="select"
                  value={paymentMethod}
                  onChange={handlePaymentMethodChange}
                >
                  <option value="" disabled>
                    Select payment method
                  </option>
                  <option value="creditCard">Credit Card</option>
                  <option value="paypal">PayPal</option>
                  <option value="bankTransfer">Bank Transfer</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="cardNumber">
                <Form.Label>Card Number</Form.Label>
                <Form.Control type="text" placeholder="Enter card number" />
              </Form.Group>

              <Form.Group controlId="expiryDate">
                <Form.Label>Expiry Date</Form.Label>
                <Form.Control type="text" placeholder="MM/YY" />
              </Form.Group>
              <Form.Group controlId="cvv">
                <Form.Label>CVV</Form.Label>
                <Form.Control type="text" placeholder="CVV" />
              </Form.Group>

              <Form.Group controlId="cardHolder">
                <Form.Label>Cardholder Name</Form.Label>
                <Form.Control type="text" placeholder="Enter cardholder name" />
              </Form.Group>

              <Button
                styles={{
                  marginTop: "10px",
                }}
                type="submit"
              >
                Subscribe to the coach
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentDetails;
