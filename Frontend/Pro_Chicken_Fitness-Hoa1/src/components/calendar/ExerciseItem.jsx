import { Form } from "react-bootstrap";
import { byteArrayToDataURL } from "../../utilities/processImageArray";

function ExerciseItem({ activity, handleChangeActivity }) {
  return (
    <div className="form-check">
      <Form.Check
        inline
        type="checkbox"
        id={`checkbox-exercise-${activity?.id}`}
        onChange={(e) => handleChangeActivity(e, activity)}
      />
      <Form.Check.Label htmlFor={`checkbox-exercise-${activity?.id}`}>
        <img
          src={
            activity?.picture
              ? byteArrayToDataURL(activity?.picture)
              : "https://th.bing.com/th/id/OIG.mP3gu42dcxSQAV3kYt.D?w=270&h=270&c=6&r=0&o=5&dpr=1.3&pid=ImgGn"
          }
          alt="Exercise"
        />
        {activity?.name}
      </Form.Check.Label>
    </div>
  );
}

export default ExerciseItem;
