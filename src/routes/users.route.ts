import { Router, Request, Response } from 'express'
import UserRepository from '../repositories/user.repository'

const usersRoute = Router()

usersRoute.get('/', async (_req: Request, res: Response) => {
  const users = await UserRepository.findAllUsers()
  res.status(200).json(users)
})

usersRoute.get('/:id', async (req: Request, res: Response) => {
  const id = req.params.id
  const user = await UserRepository.findById(id)
  res.status(200).json({ message: 'ID do usuário solicitado: ', user })
})

usersRoute.post('/', async (req: Request, res: Response) => {
  const newUser = req.body
  const id = await UserRepository.createUser(newUser)
  res.status(201).json({ message: 'Usuário criado com sucesso!', id })
})

usersRoute.put('/:id', async (req: Request<{ id: string }>, res: Response) => {
  const id = req.params.id
  const modifiedUser = req.body
  modifiedUser.id = id
  await UserRepository.updateUser(modifiedUser)
  res
    .status(200)
    .json({ message: 'Usuário alterado com sucesso!', modifiedUser })
})

usersRoute.delete(
  '/:id',
  async (req: Request<{ id: string }>, res: Response) => {
    const id = req.params.id
    await UserRepository.removeUser(id)
    res.status(200).json({ message: 'Usuário deletado com sucesso!:', id })
  }
)

export default usersRoute
