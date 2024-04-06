import { useMutation, useQuery, useQueryClient } from "react-query";
import IngredientService from "../api/services/IngredientService";

function useIngredientsHook() {
  const query = useQuery({
    queryKey: ["ingredients"],
    queryFn: IngredientService.getAllIngredients,
  });
  const queryClient = useQueryClient();
  const ingredients = query.data?.data || [];
  const updateIngredientMutation = useMutation({
    mutationFn: (ingredient) => IngredientService.updateIngredient(ingredient),
    onSuccess: () => {
      queryClient.invalidateQueries(["ingredients"]);
    },
  });
  const deleteIngredientMutation = useMutation({
    mutationFn: (ingredientId) =>
      IngredientService.deleteIngredient(ingredientId),
    onSuccess: () => {
      queryClient.invalidateQueries(["ingredients"]);
    },
  });

  return {
    ingredients,
    isLoading: query.isLoading,
    isError: query.isError,
    deleteIngredientMutation,
    updateIngredientMutation,
  };
}

export default useIngredientsHook;
