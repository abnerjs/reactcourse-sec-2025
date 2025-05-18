import { db } from '../db'
import { attendee, checkIn } from '../db/schema'
import { eq, desc, and, ilike } from 'drizzle-orm'

export function getEventAttendees(
  eventId: string,
  page?: number,
  query?: string
) {
  const pageSize = 10
  page = page ? page : 1
  const searchQuery = query ? `%${query.toLowerCase()}%` : undefined
  const offset = (page - 1) * pageSize
  const limit = pageSize

  return db
    .select({
      id: attendee.id,
      name: attendee.name,
      email: attendee.email,
      createdAt: attendee.createdAt,
      checkIn: checkIn.createdAt,
    })
    .from(attendee)
    .leftJoin(checkIn, eq(checkIn.attendeeId, attendee.id))
    .where(
      and(
        eq(attendee.eventId, eventId),
        searchQuery ? ilike(attendee.name, searchQuery) : undefined
      )
    )
    .orderBy(desc(attendee.createdAt))
    .limit(limit)
    .offset(offset)
}
