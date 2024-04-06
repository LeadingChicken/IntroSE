import { Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import DishService from "../../api/services/DishService";
import CalendarService from "../../api/services/CalendarService";
import Button from "../button/Button";
import { useQuery } from "react-query";
import { byteArrayToDataURL } from "../../utilities/processImageArray";

const AddFoodModal = ({ show, handleClose }) => {
  // const { dishes } = useSelector((state) => state.dish);
  const { selectedDailyWorkout } = useSelector((state) => state.dailyWorkout);

  const { data: dishesResponse } = useQuery({
    queryKey: ["dishes"],
    queryFn: DishService.getAllDishes,
    staleTime: Infinity,
  });
  const dishes = dishesResponse?.data;
  const selectedDishes = new Set();
  const alreadyHaveDishesId = new Set();
  for (const dish of selectedDailyWorkout.dishes) {
    alreadyHaveDishesId.add(dish.id);
  }

  const handleChangeDishes = (e, dish) => {
    if (e.target.checked) {
      selectedDishes.add(dish);
    } else {
      selectedDishes.delete(dish);
    }
  };

  const updateDishes = async () => {
    let dishesArr = Array.from(selectedDishes);
    try {
      const payload = {
        ...selectedDailyWorkout,
        dishes: [...selectedDailyWorkout.dishes, ...dishesArr],
      };
      // console.log(payload);
      const res = await CalendarService.updateADailyWorkout(payload);
      console.log("updateDishes", res);
      if (res?.status == 200) {
        alert("Updated your dishes successfully!!!");
      }
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title id="addMealModalLabel">Add more meal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", // Fix gridTemplateColumns syntax
            gridGap: "20px", // Adjust gap between items
          }}
        >
          {dishes?.map(
            (dish, idx) =>
              !alreadyHaveDishesId.has(dish.id) && (
                <Form.Check key={idx}>
                  <Form.Check.Input
                    type="checkbox"
                    id="checkbox-meal-1"
                    onClick={(e) => handleChangeDishes(e, dish)}
                  />
                  <Form.Check.Label htmlFor="checkbox-meal-1">
                    <img
                      src={
                        dish?.picture
                          ? byteArrayToDataURL(dish.picture)
                          : "https://t4.ftcdn.net/jpg/00/77/46/11/360_F_77461112_WFAEbGQnlfZDUnJ984ncl44ItgtYw0gJ.jpg"
                      }
                      alt="Food"
                    />
                    {dish?.name}
                  </Form.Check.Label>
                </Form.Check>
              )
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          styles={{
            margin: "15px 0 5px 0",
          }}
          onClick={updateDishes}
        >
          Add dishes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddFoodModal;
