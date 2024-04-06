import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import ingredientsReducer from "./ingredientsSlice";
import frequencyWorkoutReducer from "./frequencyWorkoutSlice";
import dailyWorkoutReducer from "./dailyWorkoutSlice";
import activityReducer from "./activitySlice";
import dishReducer from "./dishSlice";
import { persistReducer } from "redux-persist";
import sessionStorage from "redux-persist/lib/storage/session";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import localStorage from "redux-persist/es/storage";

const userPersistConfig = {
  key: "user",
  storage: sessionStorage,
  whitelist: ["user", "userRoles"],
};

const workoutDailyPersistConfig = {
  key: "workout-daily",
  storage: localStorage,
  whitelist: ["dailyWorkoutIds", "dailyWorkouts"],
};

const activityPersistConfig = {
  key: "activity",
  storage: localStorage,
  whitelist: ["activities"],
};
const dishPersistConfig = {
  key: "dish",
  storage: localStorage,
  whitelist: ["dishes"],
};

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  ingredients: ingredientsReducer,
  workoutFrequency: frequencyWorkoutReducer,
  dailyWorkout: persistReducer(workoutDailyPersistConfig, dailyWorkoutReducer),
  activity: persistReducer(activityPersistConfig, activityReducer),
  dish: persistReducer(dishPersistConfig, dishReducer),
});

export const store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(store);
