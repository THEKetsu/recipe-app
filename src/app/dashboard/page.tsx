"use client"

import { useEffect } from "react"

export default function Dashboard() {
    // fetch user data from the server
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch("/api/user")
                if (!response.ok) throw new Error("Failed to fetch user data")
                const data = await response.json()
                console.log("User data:", data)
            } catch (error) {
                console.error("Error fetching user data:", error)
            }
        }

        fetchUserData()
    }, [])
    
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">Welcome to the Dashboard</h1>
            <p className="mt-4 text-lg">This is your dashboard where you can manage your recipes.</p>
        </div>
    )
}
