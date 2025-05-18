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
          page: z.coerce.number().optional(),
        }),
      },
    },
    async (request, reply) => {
      const { eventId } = request.params as { eventId: string }
      const { page, query } = request.query as {
        page?: number
        query?: string
      }

      const pageNumber = page ? page : 1

      const { result: attendees, total: total } = await getEventAttendees(
        eventId,
        pageNumber,
        query
      )

      if (!attendees) {
        return reply.status(404).send({
          message: 'Evento não encontrado ou sem participantes',
        })
      }

      return reply.status(200).send({
        attendees: (await attendees).map(
          (attendee: {
            id: any
            name: any
            email: any
            createdAt: any
            checkIn: any
          }) => ({
            id: attendee.id,
            name: attendee.name,
            email: attendee.email,
            createdAt: attendee.createdAt,
            checkIn: attendee.checkIn,
          })
        ),
        total: total,
      })
    }
  )
}
