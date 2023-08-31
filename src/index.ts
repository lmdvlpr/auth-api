import express, { Request, Response } from 'express'

const app = express()
const PORT = process.env.PORT || 8080

app.use(express.json())

app.get('/', (_req: Request, res: Response) => {
  return res.json({ message: 'Hello, world!' })
})

app.listen(PORT, () => {
  console.log(`Server is running at: http://localhost:${PORT}`)
})
