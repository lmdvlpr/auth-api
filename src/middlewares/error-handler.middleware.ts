import { NextFunction, Request, Response } from 'express'
import DatabaseError from '../models/errors/database.error.model'

function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof DatabaseError) {
    res.status(400).send('ID do usuário não foi encontrado no Banco de Dados')
  } else {
    res.sendStatus(500)
  }
}

export default errorHandler
