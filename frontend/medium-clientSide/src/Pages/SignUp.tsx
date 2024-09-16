// 'use client'

// import { useState } from 'react'
// import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import * as z from 'zod'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
// import { Icons } from "@/components/ui/icons"

// const formSchema = z.object({
//   name: z.string().min(2, {
//     message: "Name must be at least 2 characters.",
//   }),
//   email: z.string().email({
//     message: "Please enter a valid email address.",
//   }),
//   password: z.string().min(8, {
//     message: "Password must be at least 8 characters.",
//   }),
// })

// export default function SignupPage() {
//   const [isLoading, setIsLoading] = useState<boolean>(false)

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
//     },
//   })

//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     setIsLoading(true)

//     // Here you would typically send the form data to your backend
//     // For demonstration, we'll just simulate a delay
//     console.log(values)
//     await new Promise(resolve => setTimeout(resolve, 2000))

//     setIsLoading(false)
//   }

//   return (
//     <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
//       <div className="flex flex-col space-y-2 text-center">
//         <Icons.logo className="mx-auto h-6 w-6" />
//         <h1 className="text-2xl font-semibold tracking-tight">Join Medium</h1>
//         <p className="text-sm text-muted-foreground">
//           Enter your details to create an account
//         </p>
//       </div>
//       <div className="grid gap-6">
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//             <FormField
//               control={form.control}
//               name="name"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Name</FormLabel>
//                   <FormControl>
//                     <Input placeholder="John Doe" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="email"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Email</FormLabel>
//                   <FormControl>
//                     <Input placeholder="name@example.com" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="password"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Password</FormLabel>
//                   <FormControl>
//                     <Input type="password" placeholder="********" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <Button type="submit" className="w-full" disabled={isLoading}>
//               {isLoading && (
//                 <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
//               )}
//               Sign Up
//             </Button>
//           </form>
//         </Form>
//         <div className="relative">
//           <div className="absolute inset-0 flex items-center">
//             <span className="w-full border-t" />
//           </div>
//           <div className="relative flex justify-center text-xs uppercase">
//             <span className="bg-background px-2 text-muted-foreground">
//               Or continue with
//             </span>
//           </div>
//         </div>
//         <div className="grid grid-cols-2 gap-6">
//           <Button variant="outline" disabled={isLoading}>
//             <Icons.google className="mr-2 h-4 w-4" />
//             Google
//           </Button>
//           <Button variant="outline" disabled={isLoading}>
//             <Icons.facebook className="mr-2 h-4 w-4" />
//             Facebook
//           </Button>
//         </div>
//       </div>
//       <p className="px-8 text-center text-sm text-muted-foreground">
//         By clicking continue, you agree to our{" "}
//         <a
//           href="/terms"
//           className="underline underline-offset-4 hover:text-primary"
//         >
//           Terms of Service
//         </a>{" "}
//         and{" "}
//         <a
//           href="/privacy"
//           className="underline underline-offset-4 hover:text-primary"
//         >
//           Privacy Policy
//         </a>
//         .
//       </p>
//     </div>
//   )
// }