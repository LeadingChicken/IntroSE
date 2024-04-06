import { useState } from "react";
import { renderThumbnail } from "../../../utilities/processImageArray";
import { useMutation, useQueryClient } from "react-query";
import ActivityService from "../../../api/services/ActivityService";

function AddWorkoutActivityModal({ handleClose }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [workoutActivity, setWorkoutActivity] = useState({
    name: "",
    picture: null,
  });
  const queryClient = useQueryClient();
  const createActivityWorkoutMutation = useMutation({
    mutationFn: (formData) => ActivityService.createActivity(formData),
    onSuccess: () => {
      queryClient.invalidateQueries(["workout-activities"]);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkoutActivity((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", workoutActivity.name);
    formData.append("picture", selectedFile);

    const res = await createActivityWorkoutMutation.mutateAsync(formData);
    console.log(res);
    if (res?.status == 200) {
      alert("Added a new workout activity");
    }
    handleClose();
  };
  return (
    <div
      className="modal"
      id="AddIngredientModalAdmin"
      style={{
        display: "block",
        overflow: "auto",
      }}
    >
      <div className="modal-dialog modal-md">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="AddIngredientModalAdminLabel">
              Add Activity Workout
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            <div className="d-flex flex-column gap-2">
              <div>
                <label htmlFor="add-dish-name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  id="add-dish-name"
                  value={workoutActivity?.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <p>Image</p>
                <label
                  htmlFor="add-dish-image"
                  className="form-label btn btn-outline-primary"
                >
                  <i className="bi bi-image"></i>
                </label>
                <input
                  type="file"
                  className="form-control visually-hidden"
                  id="add-dish-image"
                  placeholder="dish image"
                  onChange={handleFileChange}
                  accept="image/*"
                />
                <div>
                  {selectedFile && (
                    <img
                      src={renderThumbnail(selectedFile)}
                      alt="Selected Adding Dish Image"
                      id="selectedAddingDishImage"
                      className="img-fluid"
                      style={{
                        width: "200px",
                        height: "200px",
                        objectFit: "contain",
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-primary" onClick={handleSubmit}>
              Submit
            </button>
            <button className="btn btn-secondary" onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddWorkoutActivityModal;
