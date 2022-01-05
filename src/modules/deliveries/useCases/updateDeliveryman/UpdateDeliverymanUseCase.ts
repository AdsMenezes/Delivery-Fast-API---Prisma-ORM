import { prisma } from '../../../../shared/database/prismaClient'

interface IRequest {
  id_delivery: string
  id_deliveryman: string
}

export default class UpdateDeliverymanUseCase {
  public async execute({ id_delivery, id_deliveryman }: IRequest): Promise<any> {
    const deliveryAlreadyExists = await prisma.deliveries.findFirst({
      where: {
        id: id_delivery
      }
    })

    if (!deliveryAlreadyExists) {
      throw new Error('Delivery not exists')
    }

    const delivery = await prisma.deliveries.update({
      where: {
        id: id_delivery
      },
      data: {
        id_deliveryman
      }
    })

    return delivery
  }
}