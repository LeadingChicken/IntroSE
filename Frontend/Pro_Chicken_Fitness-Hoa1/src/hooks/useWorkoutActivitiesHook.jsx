import { useMutation, useQuery, useQueryClient } from "react-query";
import ActivityService from "../api/services/ActivityService";

function useWorkoutActivitiesHook() {
  const query = useQuery({
    queryKey: ["workout-activities"],
    queryFn: ActivityService.getAllActivities,
  });
  const queryClient = useQueryClient();
  const workoutActivities = query.data?.data || [];
  const updateWorkoutActivitiesMutation = useMutation({
    mutationFn: (activity) => ActivityService.updateActivity(activity),
    onSuccess: () => {
      queryClient.invalidateQueries(["workout-activities"]);
    },
  });
  const deleteWorkoutActivitiesMutation = useMutation({
    mutationFn: (activityId) => ActivityService.deleteActivity(activityId),
    onSuccess: () => {
      queryClient.invalidateQueries(["workout-activities"]);
    },
  });

  return {
    workoutActivities,
    isLoading: query.isLoading,
    isError: query.isError,
    updateWorkoutActivitiesMutation,
    deleteWorkoutActivitiesMutation,
  };
}

export default useWorkoutActivitiesHook;
