import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";

export const UserRoute = new Hono<{
    Bindings:{
      JWT_SECRET: string
      DATABASE_URL: string
    }
  }>()


UserRoute.post('/signup', async(c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate())
    const body = await c.req.json()
    try {
      const user = await prisma.user.create({
        data: {
          name : body.name,
                  email: body.email,
                  password: body.password
              }
      })
      if (!c.env.JWT_SECRET || typeof c.env.JWT_SECRET !== 'string') {
        return c.json({ error: 'JWT secret is not properly configured' });
      }
      const jwt = await sign({id:user.id}, c.env.JWT_SECRET)
      return c.json({ jwt });
  
    } catch (error) {
      console.error('Error during signup:', error);
      return c.status(403)
    }
  })
  
  
  
  
  
  //signin
  UserRoute.post('/signin', async(c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate())
  const body = await c.req.json()
  
    const user = await prisma.user.findUnique({
      where:{
        email: body.email
      },
  })
  if (!user) {
    c.status(403);
    return c.json({ error: "User not found" });
  }
  const jwt = await sign({id:user.id}, c.env.DATABASE_URL)
  return c.json({jwt});
  
  })
  

