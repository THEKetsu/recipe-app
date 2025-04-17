"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface Recipe {
  id: string
  title: string
  description: string
  ingredients: string[]
  instructions: string[]
}

export default function RecipePage({ params }: { params: { id: string } }) {
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`/api/recipes/${params.id}`)
        if (!response.ok) throw new Error("Failed to fetch recipe")
        const data = await response.json()
        setRecipe(data)
      } catch (error) {
        console.error("Error fetching recipe:", error)
        router.push("/dashboard")
      } finally {
        setLoading(false)
      }
    }

    fetchRecipe()
  }, [params.id, router])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!recipe) {
    return <div>Recipe not found</div>
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{recipe.title}</h1>
      <p className="mt-4">{recipe.description}</p>
      <h2 className="mt-6 text-xl font-semibold">Ingredients</h2>
      <ul className="list-disc list-inside">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h2 className="mt-6 text-xl font-semibold">Instructions</h2>
      <ol className="list-decimal list-inside">
        {recipe.instructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ol>
    </div>
  )
}
