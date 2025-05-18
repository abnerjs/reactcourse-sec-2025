import { db } from '../db'
import { event } from '../db/schema'

interface createEventRequest {
  title: string
  details: string
  slug: string
  maximumAttendees: number
}

export async function createEvent({
  title,
  details,
  slug,
  maximumAttendees,
}: createEventRequest) {
  const eventResult = await db
    .insert(event)
    .values({
      title,
      details,
      slug,
      maximumAttendees,
    })
    .returning()

  return eventResult[0]
}
