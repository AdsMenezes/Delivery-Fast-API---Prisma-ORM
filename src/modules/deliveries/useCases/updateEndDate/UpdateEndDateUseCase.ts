import { prisma } from '../../../../shared/database/prismaClient'

interface IRequest {
  id_delivery: string
  id_deliveryman: string
}

export default class UpdateEndDateUseCase {
  public async execute({ id_delivery, id_deliveryman }: IRequest): Promise<any> {
    const deliveryAlreadyExists = await prisma.deliveries.findFirst({
      where: {
        id: id_delivery
      }
    })

    if (!deliveryAlreadyExists) {
      throw new Error('Delivery not exists')
    }

    const delivery = await prisma.deliveries.updateMany({
      where: {
        id: id_delivery,
        id_deliveryman
      },
      data: {
        end_at: new Date()
      }
    })

    return delivery
  }
}