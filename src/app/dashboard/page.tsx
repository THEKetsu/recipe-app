"use client"

import { authClient } from "@/lib/auth-client"



// eslint-disable-next-line @next/next/no-async-client-component
export default async function Dashboard() {
    // Check if the user is authenticated
    const { data: session, error } = await authClient.getSession()
    if (error) {
        console.error("Error fetching session:", error)
        return <p>Error fetching session</p>
    }
    if (!session) {
        return <p>You are not authenticated. Please log in.</p>
    }
}
