import { Request, Response } from "express"

import UpdateEndDateUseCase from './UpdateEndDateUseCase'

export default class UpdateEndDateController {
  public async handle (request: Request, response: Response): Promise<Response> {
    const { id_delivery } = request.params
    const { id_deliveryman } = request

    const updateEndDateUseCase = new UpdateEndDateUseCase()

    const delivery = await updateEndDateUseCase.execute({
      id_delivery,
      id_deliveryman,
    })

    return response.json(delivery)
  }
}