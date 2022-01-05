import { prisma } from '../../../../shared/database/prismaClient'

export default class FindAllDeliveriesUseCase {
  public async execute(id_client: string): Promise<any> {
    const deliveries = await prisma.clients.findMany({
      where: { 
        id: id_client
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