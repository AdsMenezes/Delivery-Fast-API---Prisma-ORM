import { prisma } from '../../../../shared/database/prismaClient'

interface IRequest {
  item_name: string
  id_client: string
}

export default class CreateDeliveryUseCase {
  public async execute({ item_name, id_client }: IRequest): Promise<any> {
    const delivery = await prisma.deliveries.create({
      data: { 
        item_name,
        id_client,
      }
    })

    return delivery
  }
}