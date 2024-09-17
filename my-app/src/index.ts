import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { UserRoute } from './router/UserRoute'
import { BlogRoute } from './router/BlogRoute'
import { cors } from 'hono/cors'



const app = new Hono<{
  Bindings:{
    JWT_SECRET: string
    DATABASE_URL: string
  }
}>()

app.use('/*', cors())
app.route('/user', UserRoute)
app.route('/blog', BlogRoute)


app.get('/', async (c) => {
  const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate())
  const blog = await prisma.post.findMany({})
  return c.json({ mgs: blog })
})





export default app
