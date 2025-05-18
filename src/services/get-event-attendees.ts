import { db } from '../db'
import { attendee, checkIn } from '../db/schema'
import { eq, desc } from 'drizzle-orm'

export function getEventAttendees(eventId: string) {
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
    .where(eq(attendee.eventId, eventId))
    .orderBy(desc(attendee.createdAt))
}
