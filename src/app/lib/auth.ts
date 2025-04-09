import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { resend } from "./resend";
 
export const auth = betterAuth({
    database: new Pool({
        // connection options
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        

    }),
    emailAndPassword: {
        enabled: true,
        async sendResetPassword(data) {
            // Send an email to the user with a link to reset their password
            await resend.emails.send({
                from : "noreply@nowts.app",
                to: data.user.email,
                subject: "Reset your password",
                text: `Click here to reset your password: ${data.url}`,
            })

        },
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        },
        github: {
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!
        }
    },
})