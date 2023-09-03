import 'dotenv/config'

import express from 'express'
import usersRoute from './routes/users.route'
import errorHandler from './middlewares/error-handler.middleware'

const app = express()
const PORT = process.env.PORT || 8080

app.use(express.json())

app.use('/users', usersRoute)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running at: http://localhost:${PORT}`)
})
