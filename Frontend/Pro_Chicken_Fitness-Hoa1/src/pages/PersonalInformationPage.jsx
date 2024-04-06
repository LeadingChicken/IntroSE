import { useEffect, useState } from "react";
import "../styles/PersonalInformation.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setFavoriteIngredients,
  setUnfavoriteIngredients,
} from "../redux/ingredientsSlice";
import WorkoutFrequencyForm from "../components/WorkoutFrequencyForm";
import ReviewInformationForm from "../components/personal-forms/ReviewInformationForm";
import IngredientService from "../api/services/IngredientService";
import IngredientItem from "../components/personal-forms/IngredientItem";
import Button from "../components/button/Button";

const PersonalInformationForm = () => {
  const { user } = useSelector((state) => state.user);
  console.log("userinfo from personal", user);
  const [form, setForm] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    const getFavoriteIngredients = async () => {
      try {
        const res = await IngredientService.getFavoriteIngredient();
        if (res?.status == 200) {
          dispatch(setFavoriteIngredients(res.data));
        }
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    const getUnfavoriteIngredients = async () => {
      try {
        const res = await IngredientService.getUnfavoriteIngredient();
        if (res?.status == 200) {
          dispatch(setUnfavoriteIngredients(res.data));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getFavoriteIngredients();
    getUnfavoriteIngredients();
  }, []);

  const nextForm = () => {
    setForm(form + 1);
  };

  const previousForm = () => {
    setForm(form - 1);
  };

  const renderForm = () => {
    switch (form) {
      case 1:
        return <FavoriteForm nextForm={nextForm} />;
      case 2:
        return (
          <UnfavoriteForm nextForm={nextForm} previousForm={previousForm} />
        );
      case 3:
        return (
          <WorkoutFrequencyForm
            nextForm={nextForm}
            previousForm={previousForm}
          />
        );
      default:
        return <ReviewInformationForm previousForm={previousForm} />;
    }
  };

  return (
    <div className="container mt-5">
      <div className="w-100">
        <div className="">
          <h2 className="mb-4 text-center">Provide your's favorite food</h2>
          <div className="progress-bar-container">
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${form * 25}%` }}
              ></div>
            </div>
          </div>
          {renderForm()}
        </div>
      </div>
    </div>
  );
};

const FavoriteForm = ({ nextForm }) => {
  const { favoriteIngredients } = useSelector((state) => state.ingredients);
  console.log(favoriteIngredients);

  return (
    favoriteIngredients && (
      <form className="form1">
        <div className="container">
          <div className="row">
            {/* Left Side with Checklist and Search Bar */}
            <div className="" id="left-side">
              <h4 className="mb-4 text-center mr-2 ml-2 py-3 text-white">
                Favorite Ingredient
              </h4>
              <div className="input-group mb-3" id="search-bar-left">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search item..."
                />
                <div className="input-group-append">
                  <button className="btn text-white" type="button">
                    Search
                  </button>
                </div>
              </div>

              <div className="checkbox-column" id="left-checklist">
                {favoriteIngredients?.map((item) => (
                  <IngredientItem key={item?.id} item={item} />
                ))}
              </div>
            </div>

            {/* Right Side with Textbox for Checked Items */}
          </div>
        </div>
        <div className="btn-container mt-3">
          <Button onClick={nextForm}>Next</Button>
        </div>
      </form>
    )
  );
};

const UnfavoriteForm = ({ nextForm, previousForm }) => {
  const { unfavoriteIngredients } = useSelector((state) => state.ingredients);
  return (
    <div className="form2" style={{ width: "100%" }}>
      <form>
        <div className="container">
          <div className="row">
            <h4 className="mb-4 text-center mr-2 ml-2 py-3">
              Unfavorite Ingredient
            </h4>
            <div className="input-group mb-3" id="search-bar-left">
              <input
                type="text"
                className="form-control"
                placeholder="Search item..."
              />
              <div className="input-group-append">
                <button className="btn text-white" type="button">
                  Search
                </button>
              </div>
            </div>
            <div className="checkbox-column" id="left-checklist">
              <div>
                {unfavoriteIngredients?.map((item) => {
                  return <IngredientItem key={item?.id} item={item} />;
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="btn-container d-flex gap-3 mt-3">
          <Button
            styles={{
              backgroundColor: "#333",
              border: "none",
            }}
            onClick={previousForm}
          >
            Previous
          </Button>
          <Button onClick={nextForm}>Next</Button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInformationForm;
