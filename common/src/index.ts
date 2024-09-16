import z from "zod"

export const SignupInput = z.object({
    email : z.string().email(),
    password: z.string().min(8),
    name : z.string().optional()
})

export type signupInput = z.infer<typeof SignupInput>


export const SignInInput = z.object({
    email : z.string().email(),
    password: z.string().min(8),
})

export type signinInput = z.infer<typeof SignInInput>


// blog 

export const blogInputs = z.object({
    title : z.string(),
    content: z.string(),
})

export type BlogInputs = z.infer<typeof blogInputs>