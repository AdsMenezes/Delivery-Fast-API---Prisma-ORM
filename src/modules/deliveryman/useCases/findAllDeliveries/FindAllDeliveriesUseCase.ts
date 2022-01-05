import { prisma } from '../../../../shared/database/prismaClient'

export default class FindAllDeliveriesUseCase {
  public async execute(id_deliveryman: string): Promise<any> {
    const deliveries = await prisma.deliveryman.findMany({
      where: { 
        id: id_deliveryman
      },
      select: {
        id: true,
        username: true,
        deliveries: true,
      }
    })

    return deliveries
  }
}