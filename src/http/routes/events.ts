import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getEvents } from '../../services/get-event'

export const getEventsRoute: FastifyPluginAsyncZod = async (app) => {
  app.get('/events', async (request, reply) => {
    const events = await getEvents()
    if (!events) {
      return reply.status(404).send({
        message: 'Nenhum evento encontrado',
      })
    }

    return reply.status(200).send(events[0])
  })
}
