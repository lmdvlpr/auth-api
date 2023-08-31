import { Router, Request, Response } from 'express'

const usersRoute = Router()

usersRoute.get('/', (_req: Request, res: Response) => {
  const users = [{ userName: 'Lucas' }]
  res.status(200).json(users)
})

usersRoute.get('/:id', (req: Request, res: Response) => {
  const id = req.params.id
  res.status(200).json({ message: 'ID do usuário solicitado: ', id })
})

usersRoute.post('/', (req: Request, res: Response) => {
  const newUser = req.body
  res.status(201).json({ message: 'Usuário criado com sucesso!', newUser })
})

usersRoute.put('/:id', (req: Request, res: Response) => {
  const id = req.params.id
  res.status(200).json({ message: 'Usuário alterado com sucesso!', id })
})

usersRoute.delete('/:id', (req: Request, res: Response) => {
  const id = req.params.id
  res.status(200).json({ message: 'Deleted User:', id })
})

export default usersRoute
