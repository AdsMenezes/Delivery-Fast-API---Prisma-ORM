import { prisma } from '../../../../shared/database/prismaClient'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

interface IRequest {
  username: string
  password: string
}

export default class CreateSessionClientUseCase {
  public async execute({ username, password }: IRequest): Promise<string> {
    const client = await prisma.clients.findFirst({
      where: {
        username
      }
    })

    if (!client) {
      throw new Error('Username or password invalid')
    }

    const passwordMatch = await compare(password, client.password)

    if (!passwordMatch) {
      throw new Error('Username or password invalid')
    }

    const token = sign({}, `${process.env.TOKEN_SECRET}`, {
      subject: client.id,
      expiresIn: '1d',
    })

    return token
  }
}