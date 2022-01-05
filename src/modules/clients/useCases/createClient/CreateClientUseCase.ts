import { prisma } from '../../../../shared/database/prismaClient'
import { hash } from 'bcrypt'

interface IRequest {
  username: string
  password: string
}

export default class CreateClientUseCase {
  public async execute({ username, password }: IRequest): Promise<any> {
    const clientAlreadyExists = await prisma.clients.findFirst({
      where: { 
        username: {
          equals: username,
          mode: "insensitive"
        }
      }
    })

    if (clientAlreadyExists) {
      throw new Error('Client already exists')
    }

    const hashedPassword = await hash(password, 8)

    const client = await prisma.clients.create({
      data: {
        username,
        password: hashedPassword
      }
    })

    return client
  }
}