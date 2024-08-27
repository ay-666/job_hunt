import { z } from "zod";


export const signupSchema = z.object({
    fullname: z.string().min(3,"Full name must be at least 3 characters long"),
    email: z.string().email(),
    phoneNumber: z.string().length(10,"Phone number must be 0f 10 digits").regex(/^\d+$/, "Phone number must only contain digits"),
    password: z.string().min(6,"Password must be at least 6 characters long"),
    role: z.enum(["student", "recruiter"]),
    file: z.any().optional()

});

export const loginSchema = z.object({
    email: z.string().email()
})

export const jobSchema = z.object({
    title: z.string().min(3,"Title must be at least 3 characters long"),
    description: z.string().min(5,"Description must be at least 10 characters long"),
    requirements:z.string(),
    salary: z.object({
        val:z.string(),
        salaryType: z.enum(["LPA","K/month"],"Please select a salary type")
    }),
    location: z.string().min(3,"location must have at least 3 characters"),
    jobType: z.string(),
    experience: z.string().regex(/^\d+$/, "Experience must be a valid number"),

});