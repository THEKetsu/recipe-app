import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "../../../../lib/auth"; // Adjusted the import path
 

export const { POST, GET } = toNextJsHandler(auth); 