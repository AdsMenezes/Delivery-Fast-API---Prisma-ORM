import { prisma } from '../../../../shared/database/prismaClient'
import { hash } from 'bcrypt'

interface IRequest {
  username: string
  password: string
}

export default class CreateDeliverymanUseCase {
  public async execute({ username, password }: IRequest): Promise<any> {
    const deliverymanAlreadyExists = await prisma.deliveryman.findFirst({
      where: { 
        username: {
          equals: username,
          mode: "insensitive"
        }
      }
    })

    if (deliverymanAlreadyExists) {
      throw new Error('Deliveryman already exists')
    }

    const hashedPassword = await hash(password, 8)

    const deliveryman = await prisma.deliveryman.create({
      data: {
        username,
        password: hashedPassword
      }
    })

    return deliveryman
  }
}