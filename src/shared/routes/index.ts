import { Router } from "express"

import ensureAuthenticateClient from '../middlewares/ensureAuthenticateClient'
import ensureAuthenticateDeliveryman from '../middlewares/ensureAuthenticateDeliveryman'

import CreateSessionClientController from '../../modules/account/useCases/createSessionClient/CreateSessionClientController'
import CreateSessionDeliverymanController from '../../modules/account/useCases/createSessionDeliveryman/CreateSessionDeliverymanController'

import CreateClientController from '../../modules/clients/useCases/createClient/CreateClientController'
import FindAllDeliveriesClientController from '../../modules/clients/useCases/findAllDeliveries/FindAllDeliveriesController'

import CreateDeliverymanController from '../../modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController'
import FindAllDeliveriesDeliverymanController from '../../modules/deliveryman/useCases/findAllDeliveries/FindAllDeliveriesController'

import CreateDeliveryController from '../../modules/deliveries/useCases/createDelivery/CreateDeliveryController'
import FindAllAvailableController from '../../modules/deliveries/useCases/findAllAvailable/FindAllAvailableController'
import UpdateDeliverymanController from '../../modules/deliveries/useCases/updateDeliveryman/UpdateDeliverymanController'
import UpdateEndDateController from '../../modules/deliveries/useCases/updateEndDate/UpdateEndDateController'

const routes = Router()

const createSessionClientController = new CreateSessionClientController()
const createSessionDeliverymanController = new CreateSessionDeliverymanController()

const createClientController = new CreateClientController()
const findAllDeliveriesClientController = new FindAllDeliveriesClientController()

const createDeliverymanController = new CreateDeliverymanController()
const findAllDeliveriesDeliverymanController = new FindAllDeliveriesDeliverymanController()

const createDeliveryController = new CreateDeliveryController()
const findAllAvailableController = new FindAllAvailableController()
const updateDeliverymanController = new UpdateDeliverymanController()
const updateEndDateController = new UpdateEndDateController()

routes.post(
  '/clients/session',
  createSessionClientController.handle
)
routes.post(
  '/deliveryman/session',
  createSessionDeliverymanController.handle
)

routes.post(
  '/clients',
  createClientController.handle
)
routes.get(
  '/clients/deliveries',
  ensureAuthenticateClient,
  findAllDeliveriesClientController.handle
)

routes.post(
  '/deliveryman',
  createDeliverymanController.handle
)
routes.get(
  '/deliveryman/deliveries',
  ensureAuthenticateDeliveryman,
  findAllDeliveriesDeliverymanController.handle
)

routes.post(
  '/deliveries',
  ensureAuthenticateClient,
  createDeliveryController.handle
)
routes.get(
  '/deliveries/available',
  ensureAuthenticateDeliveryman,
  findAllAvailableController.handle
)
routes.put(
  '/deliveries/updateDeliveryman/:id_delivery',
  ensureAuthenticateDeliveryman,
  updateDeliverymanController.handle
)
routes.put(
  '/deliveries/updateEndDate/:id_delivery',
  ensureAuthenticateDeliveryman,
  updateEndDateController.handle
)

export default routes