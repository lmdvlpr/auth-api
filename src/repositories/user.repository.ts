import db from '../db'
import User from '../models/user.model'

class UserRepository {
  async findAllUsers(): Promise<User[]> {
    const sqlQuery = `SELECT id, username FROM app_user`

    const result = await db.query<User>(sqlQuery)

    const rows = result.rows

    return rows || []
  }

  async findById(id: string): Promise<User> {
    const sqlQuery = `SELECT id, username FROM app_user WHERE id = $1`
    const values = [id]
    const { rows } = await db.query<User>(sqlQuery, values)
    const [user] = rows

    return user
  }

  async createUser(user: User): Promise<string> {
    const sqlQuery = `INSERT INTO app_user (username, password) VALUES ($1, crypt($2, 'my_salt')) RETURNING id`
    const values = [user.username, user.password]
    const { rows } = await db.query<{ id: string }>(sqlQuery, values)
    const [newUser] = rows
    return newUser.id
  }

  async updateUser(user: User): Promise<void> {
    const sqlQuery = `
      UPDATE app_user 
      SET 
        username = $1,
        password = crypt($2, 'my_salt')
      WHERE id = $3
    `
    const values = [user.username, user.password, user.id]
    await db.query(sqlQuery, values)
  }

  async removeUser(id: string): Promise<void> {
    const sqlQuery = `
      DELETE
      FROM app_user 
      WHERE id = $1
    `
    const values = [id]
    await db.query(sqlQuery, values)
  }
}

export default new UserRepository()
