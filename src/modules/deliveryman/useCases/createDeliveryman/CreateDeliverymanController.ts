import { Request, Response } from 'express'

import CreateDeliverymanUseCase from './CreateDeliverymanUseCase'

export default class CreateDeliverymanController {
  public async handle (request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body

    const createDeliverymanUseCase = new CreateDeliverymanUseCase()

    const client = await createDeliverymanUseCase.execute({
      username,
      password
    })

    return response.status(201).json(client)
  }
}