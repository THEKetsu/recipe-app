import { getServerSession } from "@/lib/server";
import { NextResponse } from "next/server";
import { Pool, PoolClient } from "pg";


const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const formData = await req.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const ingredients = formData.get("ingredients") as string;
    const instructions = formData.get("instructions") as string;
    const teamId = formData.get("teamId") as string;
    const imageFile = formData.get("image") as File | null;

    if (!title || !ingredients || !instructions || !teamId) {
      return NextResponse.json({ error: "Données manquantes" }, { status: 400 });
    }

    let imageUrl = null;
    if (imageFile) {
      // Handle image upload (e.g., save to a cloud storage or local directory)
      imageUrl = `/uploads/${imageFile.name}`;
    }

    const client = await pool.connect();
    const result = await client.query(
      `INSERT INTO recipe (
        id, title, description, ingredients, instructions, 
        imageUrl, teamId, createdBy, createdAt, updatedAt
      ) VALUES (
        gen_random_uuid()::text, $1, $2, $3, $4, $5, $6, $7, NOW(), NOW()
      ) RETURNING id`,
      [
        title,
        description,
        ingredients.split(',').map(i => i.trim()),
        instructions.split(',').map(i => i.trim()),
        imageUrl,
        teamId,
        session.user.id
      ]
    );
    client.release();

    return NextResponse.json(
      { 
        id: result.rows[0].id, 
        title, 
        description, 
        imageUrl, 
        ingredients: ingredients.split(',').map(i => i.trim()),
        instructions: instructions.split(',').map(i => i.trim())
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating recipe:", error);
    return NextResponse.json({ error: "Failed to create recipe" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }
    // get user from session  
    const client : PoolClient = await pool.connect();
    const result = await client.query(
      `SELECT * FROM user;`
    );
    console.log("User result:", result.rows[0]);

    client.release();

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return NextResponse.json({ error: "Failed to fetch recipes" }, { status: 500 });
  }
}
