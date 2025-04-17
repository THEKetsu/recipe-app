"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateRecipePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState<
    { name: string; quantity: string; unit: string }[]
  >([{ name: "", quantity: "", unit: "" }]);
  const [steps, setSteps] = useState<{ step: string; description: string }[]>([
    { step: "", description: "" },
  ]);
  const [image, setImage] = useState<File | null>(null);
  const router = useRouter();

  const handleIngredientChange = (
    index: number,
    field: "name" | "quantity" | "unit",
    value: string
  ) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][field] = value;
    setIngredients(updatedIngredients);
  };

  const addIngredient = () =>
    setIngredients([...ingredients, { name: "", quantity: "", unit: "" }]);

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleStepChange = (
    index: number,
    field: "step" | "description",
    value: string
  ) => {
    const updatedSteps = [...steps];
    updatedSteps[index][field] = value;
    setSteps(updatedSteps);
  };

  const addStep = () => setSteps([...steps, { step: "", description: "" }]);

  const removeStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("ingredients", JSON.stringify(ingredients));
    formData.append("steps", JSON.stringify(steps));
    if (image) formData.append("image", image);

    try {
      const response = await fetch("/api/recipes", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Failed to create recipe");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error creating recipe:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Create a New Recipe</h1>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border p-2"
          />
        </div>
        <div>
          <label className="block font-medium">Ingredients</label>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Ingredient name"
                value={ingredient.name}
                onChange={(e) =>
                  handleIngredientChange(index, "name", e.target.value)
                }
                className="w-1/3 border p-2"
                required
              />
              <input
                type="number"
                placeholder="Quantity"
                value={ingredient.quantity}
                onChange={(e) =>
                  handleIngredientChange(index, "quantity", e.target.value)
                }
                className="w-1/4 border p-2"
                required
              />
              <select
                value={ingredient.unit}
                onChange={(e) =>
                  handleIngredientChange(index, "unit", e.target.value)
                }
                className="w-1/4 border p-2"
                required
              >
                <option value="" disabled>
                  Select unit
                </option>
                <option value="grams">Grams</option>
                <option value="kilograms">Kilograms</option>
                <option value="cups">Cups</option>
                <option value="tablespoons">Tablespoons</option>
                <option value="teaspoons">Teaspoons</option>
                <option value="liters">Liters</option>
                <option value="milliliters">Milliliters</option>
                <option value="pieces">Pieces</option>
              </select>
              <button
                type="button"
                onClick={() => removeIngredient(index)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addIngredient}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Ingredient
          </button>
        </div>
        <div>
          <label className="block font-medium">Steps</label>
          {steps.map((step, index) => (
            <div key={index} className="space-y-2">
              <input
                type="text"
                placeholder="Step"
                value={step.step}
                onChange={(e) =>
                  handleStepChange(index, "step", e.target.value)
                }
                className="w-full border p-2"
                required
              />
              <textarea
                placeholder="Description"
                value={step.description}
                onChange={(e) =>
                  handleStepChange(index, "description", e.target.value)
                }
                className="w-full border p-2"
                required
              />
              <button
                type="button"
                onClick={() => removeStep(index)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Remove Step
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addStep}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Step
          </button>
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Create Recipe
        </button>
      </form>
    </div>
  );
}
