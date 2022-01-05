import { prisma } from '../../../../shared/database/prismaClient'

export default class FindAllAvailableUseCase {
  public async execute(): Promise<any> {
    const deliveries = await prisma.deliveries.findMany({
      where: {
        id_deliveryman: null,
      }
    })

    return deliveries
  }
}