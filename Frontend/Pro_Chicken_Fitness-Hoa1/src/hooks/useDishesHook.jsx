import { useMutation, useQuery, useQueryClient } from "react-query";
import DishService from "../api/services/DishService";

function useDishesHook() {
  const query = useQuery({
    queryKey: ["dishes"],
    queryFn: DishService.getAllDishes,
  });

  const queryClient = useQueryClient();
  const dishes = query.data?.data || [];
  const deleteDishMutation = useMutation({
    mutationFn: (dishId) => DishService.deleteDish(dishId),
    onSuccess: () => {
      queryClient.invalidateQueries(["dishes"]);
    },
  });
  const updateDishMutation = useMutation({
    mutationFn: DishService.updateDish,
    onSuccess: () => {
      queryClient.invalidateQueries(["dishes"]);
    },
  });

  return {
    dishes,
    isLoading: query.isLoading,
    isError: query.isError,
    deleteDishMutation,
    updateDishMutation,
  };
}

export default useDishesHook;
