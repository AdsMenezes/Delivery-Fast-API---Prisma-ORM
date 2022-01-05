import { Request, Response } from "express"

import CreateSessionDeliverymanUseCase from './CreateSessionDeliverymanUseCase'

export default class CreateSessionDeliverymanController {
  public async handle (request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body

    const createSessionDeliverymanUseCase = new CreateSessionDeliverymanUseCase()

    const session = await createSessionDeliverymanUseCase.execute({
      username,
      password
    })

    return response.json(session)
  }
}