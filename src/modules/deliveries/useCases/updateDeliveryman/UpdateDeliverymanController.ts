import { Request, Response } from "express"

import UpdateDeliverymanUseCase from './UpdateDeliverymanUseCase'

export default class UpdateDeliverymanController {
  public async handle (request: Request, response: Response): Promise<Response> {
    const { id_delivery } = request.params
    const { id_deliveryman } = request

    const updateDeliverymanUseCase = new UpdateDeliverymanUseCase()

    const delivery = await updateDeliverymanUseCase.execute({
      id_delivery,
      id_deliveryman
    })

    return response.json(delivery)
  }
}