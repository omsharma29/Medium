import { Hono } from 'hono'

const app = new Hono()

app.get('/blog/:id', (c) => {
  const id = c.req.param('id')
  return c.text('Got blog')
})
app.post('/signup', (c) => {
  return c.text('signup done')
})
app.post('/signin', (c) => {
  return c.text('signin done!')
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
