import { useDispatch, useSelector } from "react-redux";
import {
  addUserIngredient,
  removeUserIngredient,
} from "../../redux/ingredientsSlice";

const IngredientItem = ({ item }) => {
  const { userIngredients } = useSelector((state) => state.ingredients);
  const dispatch = useDispatch();
  const handleIngredients = (e) => {
    const payload = {
      foodId: item.id,
    };
    if (e.target.checked) {
      dispatch(addUserIngredient(payload));
    } else {
      dispatch(removeUserIngredient(payload));
    }
  };
  return (
    <div className="">
      <input
        type="checkbox"
        onClick={(e) => handleIngredients(e)}
        checked={userIngredients.includes(item?.id)}
      />
      <label className="h6">{item?.name}</label>
    </div>
  );
};

export default IngredientItem;
