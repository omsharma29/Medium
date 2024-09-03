import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'


const app = new Hono<{
  Bindings:{
    JWT_SECRET: string
    DATABASE_URL: string
  }
}>()

//signup
app.post('/signup', async(c) => {
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
app.post('/signin', async(c) => {
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


//middleware
app.use('/blog/*', async (c, next) => {
  //take token from header
  const header = c.req.header("authorization")  || ""
  const token  = header.split(" ")[1]
  //verify it 
  const response  = await verify(token, c.env.JWT_SECRET)
  if(response.id){await next()}
   c.status(500) 
   return c.json({mgs: "unauthorised"})
})



app.get('/:id', (c) => {
  const id = c.req.param('id')
  return c.text('Got blog')
})











app.post('/blog', (c) => {
  return c.text('post new blog')
})
app.put('/blog/:id', (c) => {
  return c.text('edit blog')
})
app.get('/',(c)=>{
  return c.text('all blogs')
})

export default app
