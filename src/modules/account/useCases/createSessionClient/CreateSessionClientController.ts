import { Request, Response } from "express"

import CreateSessionClientUseCase from './CreateSessionClientUseCase'

export default class CreateSessionClientController {
  public async handle (request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body

    const createSessionClientUseCase = new CreateSessionClientUseCase()

    const session = await createSessionClientUseCase.execute({
      username,
      password
    })

    return response.json(session)
  }
}