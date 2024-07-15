import RecipeCard from '@/components/RecipeCard';
import { Recipe } from '@/types/recipe';

async function getRecipes(): Promise<Recipe[]> {
  const res = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const data = await res.json();
  return data.meals;
}

export default async function Home() {
  const recipes = await getRecipes();

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-8">Recipe List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe: Recipe) => (
          <RecipeCard key={recipe.idMeal} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}