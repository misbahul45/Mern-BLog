import { z } from "zod"
export const ValidationSignUp=z.object({
    username:z.string({ message: "Username is required"}).min(3, "Username min 3 character").max(20, " Username max 20 character"),
    email:z.string({ message: "Email is required"}).email("email invalid"),
    password:z.string({ message: "Password is required" }).min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character")
})

export const ValidationSignIn=z.object({
    data:z.string({ message: "Username or email is required"}).min(3, "Username or email min 3 character"),
    password:z.string({ message: "Password is required" }).min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character")
})


export const ValidationProfile = z.object({
    username: z.string({ message: "Username is required" })
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username can be at most 20 characters"),
    email: z.string({ message: "Email is required" })
        .email("Email is invalid"),
    password: z.string()
        .optional()
        .refine((value) => value === undefined || value.length === 0 || /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(value), {
            message: "Must contain 8 characters, one uppercase, one lowercase, one number, and one special case character",
        }),
});
