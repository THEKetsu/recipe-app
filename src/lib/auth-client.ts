import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    /** the base url of the server (optional if you're using the same domain) */
    baseURL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
    providers: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
        },
        github: {
            clientId: process.env.GITHUB_CLIENT_ID!,
            
        }
    }
})

export const {
    signIn,
    signOut,
    signUp,
    useSession
} = authClient;