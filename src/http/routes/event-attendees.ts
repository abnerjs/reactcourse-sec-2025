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
        querystring: z.object({
          query: z.string().nullish(),
          pageIndex: z.coerce.number().optional(),
        }),
      },
    },
    async (request, reply) => {
      const { eventId } = request.params as { eventId: string }
      const { pageIndex, query } = request.query as {
        pageIndex?: number
        query?: string
      }
      const pageNumber = pageIndex ? pageIndex : 1

      const attendees = await getEventAttendees(eventId, pageNumber, query)

      if (!attendees) {
        return reply.status(404).send({
          message: 'Evento não encontrado ou sem participantes',
        })
      }

      return reply.status(200).send({
        attendees: attendees.map((attendee) => ({
          id: attendee.id,
          name: attendee.name,
          email: attendee.email,
          createdAt: attendee.createdAt,
          checkIn: attendee.checkIn,
        })),
        total: attendees.length,
      })
    }
  )
}
