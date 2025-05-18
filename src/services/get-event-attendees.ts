import { off } from 'process'
import { db } from '../db'
import { attendee, checkIn } from '../db/schema'
import { eq, and, ilike, count } from 'drizzle-orm'

export async function getEventAttendees(
  eventId: string,
  page: number,
  query?: string
) {
  const pageSize = 10
  const searchQuery = query ? `%${query.toLowerCase()}%` : undefined
  const offset = (page - 1) * pageSize
  const limit = pageSize

  const totalAttendees = await db
    .select({
      total: count(attendee.id).as('total'),
    })
    .from(attendee)
    .where(searchQuery ? ilike(attendee.name, searchQuery) : undefined)
    .then((rows) => rows as { total: number }[])

  const total = totalAttendees[0]?.total ?? 0

  const result = await db
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
    .orderBy(attendee.createdAt)
    .limit(limit)
    .offset(offset)

  return { result, total }
}
