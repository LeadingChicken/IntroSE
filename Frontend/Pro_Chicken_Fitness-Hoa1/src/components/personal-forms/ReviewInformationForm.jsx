import { useSelector } from "react-redux";
import UserService from "../../api/services/UserService";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../button/Button";

function ReviewInformationForm({ previousForm }) {
  const { userIngredients, favoriteIngredients, unfavoriteIngredients } =
    useSelector((state) => state.ingredients);
  const { state } = useLocation();
  const { user } = useSelector((state) => state.user);
  console.log("user", user);
  const userIngredientsSet = new Set(userIngredients);
  const navigate = useNavigate();
  const handleSubmit = async () => {
    console.log(state);
    if (!state?.username) {
      alert("dont have username");
      return;
    }
    try {
      const res = await UserService.updateUserIngredient({
        username: state?.username,
        ingredients: userIngredients,
      });
      const updateUserRes = await UserService.updateUserInfo(user);
      if (res?.status == 200 && updateUserRes?.status == 200) {
        navigate("/");
      } else {
        alert("something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const renderUserFavoriteIngredients = () => {
    let favoriteFoodIds = [];
    for (const ingredient of favoriteIngredients) {
      if (userIngredientsSet.has(ingredient.id)) {
        favoriteFoodIds.push(ingredient);
      }
    }
    return favoriteFoodIds;
  };

  const renderUserUnFavoriteIngredients = () => {
    let unfavoriteFoodIds = [];
    for (const ingredient of unfavoriteIngredients) {
      if (userIngredientsSet.has(ingredient.id))
        unfavoriteFoodIds.push(ingredient);
    }

    return unfavoriteFoodIds;
  };
  const { daysPerWeek } = useSelector((state) => state.workoutFrequency);
  return (
    <div className="container">
      <h2 className="text-center">Review your personal information</h2>
      <div className="row">
        <div className="col-md-6">
          <h2>Favorite Ingredients</h2>
          <ol className="list-group list-group-numbered">
            {renderUserFavoriteIngredients()?.map((ingredient) => (
              <button className="list-group-item" key={ingredient?.id}>
                {ingredient?.name}
              </button>
            ))}
          </ol>
        </div>
        <div className="col-md-6">
          <h2>Unfavorite Ingredients</h2>

          <ol className="list-group list-group-numbered">
            {renderUserUnFavoriteIngredients()?.map((ingredient) => (
              <button className="list-group-item" key={ingredient?.id}>
                {ingredient?.name}
              </button>
            ))}
          </ol>
        </div>
      </div>
      <div className="row">
        <h2>Your frequency workout</h2>
        <p className="">Number of days you can workout: {daysPerWeek}</p>
      </div>
      <div className="w-50 d-flex gap-3 mt-4">
        <Button
          styles={{
            backgroundColor: "#333",
            border: "none",
          }}
          onClick={previousForm}
        >
          Previous
        </Button>
        <Button onClick={handleSubmit}>Submit data</Button>
      </div>
    </div>
  );
}

export default ReviewInformationForm;
