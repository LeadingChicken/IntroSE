import AxiosInstance from "../../config/AxiosInstance";

class ActivityService {
  getAllActivities = async () => {
    try {
      const response = await AxiosInstance.get("workout/");
      return response;
    } catch (error) {
      return error;
    }
  };

  updateActivity = async (activity) => {
    try {
      const response = await AxiosInstance.put("workout/", activity);
      return response;
    } catch (error) {
      return error;
    }
  };
  deleteActivity = async (activityId) => {
    try {
      const response = await AxiosInstance.delete(`workout/${activityId}`);
      return response;
    } catch (error) {
      return error;
    }
  };

  createActivity = async (activityFormData) => {
    try {
      const response = await AxiosInstance.post(`workout/`, activityFormData);
      return response;
    } catch (error) {
      return error;
    }
  };
}

export default new ActivityService();
