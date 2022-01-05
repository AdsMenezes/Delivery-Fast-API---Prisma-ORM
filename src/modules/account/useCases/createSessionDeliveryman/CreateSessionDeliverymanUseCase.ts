import { prisma } from '../../../../shared/database/prismaClient'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

interface IRequest {
  username: string
  password: string
}

export default class CreateSessionDeliverymanUseCase {
  public async execute({ username, password }: IRequest): Promise<string> {
    const deliveryman = await prisma.deliveryman.findFirst({
      where: {
        username
      }
    })

    if (!deliveryman) {
      throw new Error('Username or password invalid')
    }

    const passwordMatch = await compare(password, deliveryman.password)

    if (!passwordMatch) {
      throw new Error('Username or password invalid')
    }

    const token = sign({}, `${process.env.TOKEN_SECRET}`, {
      subject: deliveryman.id,
      expiresIn: '1d',
    })

    return token
  }
}