import { Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ActivityService from "../../api/services/ActivityService";
import CalendarService from "../../api/services/CalendarService";
import Button from "../button/Button";
import { setDailyWorkouts } from "../../redux/dailyWorkoutSlice";
import { useQuery } from "react-query";
import ExerciseItem from "./ExerciseItem";

const AddExercisesModal = ({ show, handleClose }) => {
  // const { activities } = useSelector((state) => state.activity);
  const { selectedDailyWorkout } = useSelector((state) => state.dailyWorkout);
  const dispatch = useDispatch();

  const { data: activitiesResponse } = useQuery({
    queryKey: ["activities"],
    queryFn: ActivityService.getAllActivities,
    staleTime: Infinity,
  });
  const activities = activitiesResponse?.data;

  const selectedActivities = new Set();
  const alreadyHaveActivities = new Set();
  if (selectedDailyWorkout?.activities.length > 0) {
    for (const activity of selectedDailyWorkout.activities) {
      alreadyHaveActivities.add(activity.id);
    }
  }

  const handleChangeActivity = (e, activity) => {
    if (e.target.checked) {
      selectedActivities.add(activity);
    } else {
      selectedActivities.delete(activity);
    }
  };

  const updateActivities = async () => {
    let activitiesArray = Array.from(selectedActivities);
    try {
      const payload = {
        ...selectedDailyWorkout,
        activities: [...selectedDailyWorkout.activities, ...activitiesArray],
      };

      const res = await CalendarService.updateADailyWorkout(payload);
      console.log("updateDishes", res);
      if (res?.status == 200) {
        alert("Updated your exercises successfully!!!");
      }
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal size="lg" show={show} onHide={handleClose} id="addExcerciseModal">
      <Modal.Header closeButton>
        <Modal.Title id="addExcerciseModalLabel">Add more exercise</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gridGap: "20px",
            }}
          >
            {activities?.length > 0 &&
              activities?.map(
                (activity, index) =>
                  !alreadyHaveActivities.has(activity.id) && (
                    <ExerciseItem
                      key={index}
                      handleChangeActivity={handleChangeActivity}
                      activity={activity}
                    />
                  )
              )}
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={updateActivities}>Add exercises</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddExercisesModal;
