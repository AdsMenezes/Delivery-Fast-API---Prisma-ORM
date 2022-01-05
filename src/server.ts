import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'

import routes from './shared/routes'

const app = express()

app.use(express.json())
app.use(routes)

app.use(
  (err: Error, request: Request, response: Response, _: NextFunction) => {
    if(err instanceof Error) {
      return response.status(400).json({
        status: 'Error',
        message: err.message
      })
    }
    
    console.error(err)

    return response.status(500).json({
      status: 'Error',
      message: 'Internal server error'
    })
  }
)

app.listen(3333, () => {
  console.log('🚀 Server started in port 3333')
})