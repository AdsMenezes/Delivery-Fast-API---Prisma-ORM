import { NextFunction, Request, Response } from "express"
import { verify } from 'jsonwebtoken'

interface IPayload {
  sub: string;
}

export default function ensureAuthenticateDeliveryman(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { authorization } = request.headers
  
  if (!authorization) {
    throw new Error('Token missing')
  }

  const [_, token] = authorization.split(' ')

  try {
    const { sub } = verify(token, `${process.env.TOKEN_SECRET}`) as IPayload

    request.id_deliveryman = sub
  } catch {
    throw new Error('Invalid token')
  }

  return next()
}