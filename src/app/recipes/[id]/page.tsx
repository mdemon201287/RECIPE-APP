import Link from 'next/link';
import { Recipe, Ingredient } from '@/types/recipe';

async function getRecipe(id: string): Promise<Recipe> {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await res.json();
  return data.meals[0];
}

export default async function RecipeDetail({ params }: { params: { id: string } }) {
  const recipe = await getRecipe(params.id);

  const ingredients: Ingredient[] = Object.keys(recipe)
    .filter(key => key.startsWith('strIngredient') && recipe[key])
    .map(key => ({
      ingredient: recipe[key] as string,
      measure: recipe[`strMeasure${key.slice(13)}`] as string
    }));

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/">
        <span className="text-blue-500 hover:underline mb-4 inline-block">&larr; Back to recipes</span>
      </Link>
      <h1 className="text-3xl font-bold mb-4">{recipe.strMeal}</h1>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full max-w-2xl mb-6 rounded-lg shadow-lg" />
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Category: {recipe.strCategory}</h2>
        <h2 className="text-xl font-semibold mb-2">Area: {recipe.strArea}</h2>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Ingredients:</h2>
        <ul className="list-disc list-inside">
          {ingredients.map((item, index) => (
            <li key={index}>{item.measure} {item.ingredient}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-2">Instructions:</h2>
        <p className="whitespace-pre-line">{recipe.strInstructions}</p>
      </div>
    </div>
  );
}