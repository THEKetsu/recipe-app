import { auth } from "./auth"; // path to your Better Auth server instance
import { headers } from "next/headers";



export const getServerSession = async () => {
    const session = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
        
        }).catch((err) => {
            console.error("Error getting session:", err);
            return null;
            
    })
    if (!session) {
        console.error("Session is null");
        return null;
    }
    
    return session;

}
