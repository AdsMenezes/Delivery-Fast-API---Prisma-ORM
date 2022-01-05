import { Request, Response } from 'express'

import FindAllDeliveriesUseCase from './FindAllDeliveriesUseCase'

export default class FindAllDeliveriesController {
  public async handle (request: Request, response: Response): Promise<Response> {
    const { id_deliveryman } = request

    const findAllDeliveriesUseCase = new FindAllDeliveriesUseCase()

    const deliveries = await findAllDeliveriesUseCase.execute(id_deliveryman)

    return response.json(deliveries)
  }
}