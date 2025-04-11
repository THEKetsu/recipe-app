import { betterAuth } from "better-auth";
import { resend } from "./resend";
import { Pool } from "pg";


export const auth = betterAuth({ 
    database: new Pool({
        // connection options
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    }),
    emailAndPassword: {
        enabled: true,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async sendResetPassword(data: any) {
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
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }
    },
})