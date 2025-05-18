import { db } from '../db'
import { event } from '../db/schema'

export async function getEvents() {
  const events = db.select().from(event)
  return events
}
