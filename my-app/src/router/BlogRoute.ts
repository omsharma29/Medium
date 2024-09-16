import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { blogInputs } from "@omsharma/mediumclone";

export const BlogRoute = new Hono<
    {
        Bindings: {
            JWT_SECRET: string
            DATABASE_URL: string
        },
        Variables:  {
            userId: any,
        }
    }>()

BlogRoute.use('/*', async (c, next) => {
    //take token from header
    const header = c.req.header("authorization") || ""
    const token = header.split(" ")[1]
    //verify it 
    try {
        const response = await verify(token, c.env.JWT_SECRET)
        if (response && response.id) {
            c.set("userId", response.id)
            await next()
        }
    } catch (error) {
        c.status(500)
    return c.json({ mgs: "unauthorised" })
    }
   
    
})

// write a blog
BlogRoute.post('/create', async (c) => {

    const userId = c.get('userId')
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    const body = await c.req.json()
    const {success} = blogInputs.safeParse(body)
    if(!success){
      return c.json({
        message: "Invalid Inputs"
      })
    }

    const blog = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: userId
        }
    })

    return c.json({ mgs: blog.id })
})


// Update a blog
BlogRoute.put('/update/:id', async (c) => {
    const id = c.req.param("id")

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    const body = await c.req.json()
    const {success} = blogInputs.safeParse(body)
    if(!success){
      return c.json({
        message: "Invalid Inputs"
      })
    }
    const blog = await prisma.post.update({
        where: {
            id: id
        },
        data: {
            title: body.title,
            content: body.content,
        }
    })
    return c.json({ mgs:"updated" })
})


// getting specific blog
BlogRoute.get('/:id', async (c) => {
    const id = c.req.param("id")
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    const blog = await prisma.post.findUnique({
        where: {
            id
        },
    })
    return c.json({ mgs: blog })
})



//getting all the blog also add pagination

