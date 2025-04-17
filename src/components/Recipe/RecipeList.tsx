'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  teamId: string;
  createdAt: string;
}

interface RecipeListProps {
  teamId: string;
}

export function RecipeList({ teamId }: RecipeListProps) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`/api/recipes?teamId=${teamId}`);
        if (!response.ok) throw new Error('Failed to fetch recipes');
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setError('Failed to load recipes');
        toast.error('Failed to load recipes');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, [teamId]);

  const handleRecipeClick = (recipeId: string) => {
    router.push(`/dashboard/recipes/${recipeId}`);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-32">Loading recipes...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (recipes.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        No recipes found. Create your first recipe!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Recipes</h2>
        <Button onClick={() => router.push('/dashboard/recipes/create')}>
          Create Recipe
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <Card 
            key={recipe.id} 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleRecipeClick(recipe.id)}
          >
            <CardHeader>
              <CardTitle>{recipe.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{recipe.description}</p>
              {recipe.imageUrl && (
                <img
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  className="mt-4 w-full h-48 object-cover rounded"
                />
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 