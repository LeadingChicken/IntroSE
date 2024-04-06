import { useState } from "react";
import NavbarAdmin from "../../components/admin/NavbarAdmin";
import useWorkoutActivitiesHook from "../../hooks/useWorkoutActivitiesHook";
import EditWorkoutActivityModal from "../../components/admin/workout-activities/EditWorkoutActivityModal";
import { byteArrayToDataURL } from "../../utilities/processImageArray";
import AddWorkoutActivityModal from "../../components/admin/workout-activities/AddWorkoutActivityModal";

function AdminWorkoutActivitiesPage() {
  const [selectedWorkoutActivity, setSelectedWorkoutActivity] = useState(null);
  const [isAddWorkoutActivity, setIsAddWorkoutActivity] = useState(false);
  const { workoutActivities, deleteWorkoutActivitiesMutation } =
    useWorkoutActivitiesHook();

  const handleCloseEditModal = () => {
    setSelectedWorkoutActivity(null);
  };
  const handleCloseAddModal = () => {
    setIsAddWorkoutActivity(false);
  };
  const handleDeleteWorkoutActivity = async (workoutActivity) => {
    if (confirm("Are you sure ?") == false) {
      return;
    }
    const res = await deleteWorkoutActivitiesMutation.mutateAsync(
      workoutActivity?.id
    );
    if (res?.status == 200) {
      alert("Deleted sucessfully!!!");
    } else {
      alert("This workout activity has been used by another user!!!");
    }
  };
  return (
    <div id="content-wrapper" className="d-flex flex-column">
      <div id="content">
        <NavbarAdmin />

        <div className="container-fluid">
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">WORKOUT ACTIVITY LIST</h1>
            <button
              className="d-none d-sm-inline-block btn btn-sm btn-success shadow-sm"
              onClick={() => setIsAddWorkoutActivity(true)}
            >
              <i className="bi bi-plus-circle-fill"></i>
              Add
            </button>
          </div>

          <div className="card border-left-primary shadow h-100 py-2">
            <div className="row no-gutters align-items-center">
              <table
                className="table table-hover"
                style={{
                  width: "100%",
                }}
              >
                <tr>
                  <th>WAID</th>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Setting</th>
                </tr>
                {workoutActivities?.map((activity) => (
                  <tr key={activity?.id}>
                    <td>{activity?.id}</td>
                    <td>{activity?.name}</td>
                    <td>
                      <img
                        src={
                          activity?.picture
                            ? byteArrayToDataURL(activity?.picture)
                            : "https://blogscdn.thehut.net/wp-content/uploads/sites/495/2018/10/25171220/Blog-Deadlifting-Male_1800x672_1200x672_acf_cropped.jpg"
                        }
                        style={{
                          maxWidth: "75px",
                          maxHeight: "75px",
                          objectFit: "contain",
                        }}
                        alt="WA image"
                      />
                    </td>
                    <td>
                      <button
                        className="d-none d-sm-inline-block btn btn-sm btn-info shadow-sm"
                        onClick={() => setSelectedWorkoutActivity(activity)}
                      >
                        <i className="bi bi-gear-fill"></i>
                        Edit
                      </button>
                      <button
                        className="d-none d-sm-inline-block btn btn-sm btn-danger shadow-sm"
                        onClick={() => handleDeleteWorkoutActivity(activity)}
                      >
                        <i className="bi bi-trash3-fill"></i>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </table>
            </div>
            {selectedWorkoutActivity && (
              <EditWorkoutActivityModal
                workoutActivity={selectedWorkoutActivity}
                handleClose={handleCloseEditModal}
              />
            )}
            {isAddWorkoutActivity && (
              <AddWorkoutActivityModal handleClose={handleCloseAddModal} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminWorkoutActivitiesPage;
