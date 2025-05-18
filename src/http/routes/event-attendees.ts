import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getEventAttendees } from '../../services/get-event-attendees'

export const getEventAttendeesRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/:eventId/attendees',
    {
      schema: {
        params: z.object({
          eventId: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { eventId } = request.params as { eventId: string }

      const attendees = await getEventAttendees(eventId)

      if (!attendees) {
        return reply.status(404).send({
          message: 'Evento não encontrado ou sem participantes',
        })
      }

      return reply.status(200).send(attendees[0])
    }
  )
}
