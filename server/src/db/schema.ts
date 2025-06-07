import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { createId } from '@paralleldrive/cuid2'

export const event = pgTable('event', {
  id: text('id').primaryKey().$defaultFn(createId),
  title: text('title').notNull(),
  details: text('details'),
  slug: text('slug').unique().notNull(),
  maximumAttendees: integer('maximum_attendees').notNull(),
})

export const attendee = pgTable('attendee', {
  id: text('id').primaryKey().$defaultFn(createId),
  name: text('name').notNull(),
  email: text('email').notNull(),
  eventId: text('event_id')
    .notNull()
    .references(() => event.id),
  createdAt: timestamp('createdAt', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const checkIn = pgTable('check_in', {
  id: text('id').primaryKey().$defaultFn(createId),
  attendeeId: text('attendee_id')
    .notNull()
    .references(() => attendee.id),
  createdAt: timestamp('createdAt', { withTimezone: true })
    .notNull()
    .defaultNow(),
})
