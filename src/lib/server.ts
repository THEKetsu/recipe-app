import { auth } from "./auth"; // path to your Better Auth server instance
import { headers } from "next/headers";
const response = await auth.api.signInEmail({
    body: {
        email,
        password
    },
    asResponse: true // returns a response object instead of data
});


 
const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
})

export { auth, response, session };