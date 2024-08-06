import { z } from "zod"
export const ValidationSignUp=z.object({
    username:z.string({ message: "Username is required"}).min(3, "Username min 3 character").max(20, " Username max 20 character"),
    email:z.string({ message: "Email is required"}).email("email invalid"),
    password:z.string({ message: "Password is required" }).min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character")
})