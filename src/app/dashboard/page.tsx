"use client"
import { authClient } from "@/lib/auth-client" // import the auth client

export default function Dashboard() {
    // Check if the user is authenticated
    const { data: session, error } = await authClient.getSession()
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="mt-4 text-lg">Welcome to your dashboard!</p>
        </div>
    )
}
