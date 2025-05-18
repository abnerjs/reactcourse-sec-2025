import dayjs from 'dayjs'
import { client, db } from '.'
import { faker } from '@faker-js/faker'
import { attendee, checkIn, event } from './schema'

async function seed() {
  await db.delete(checkIn)
  await db.delete(attendee)
  await db.delete(event)

  const eventResult = await db
    .insert(event)
    .values([
      {
        title: 'Curso React com TypeScript',
        details: 'Crie uma aplicação com React e TypeScript do zero',
        slug: 'react-typescript',
        maximumAttendees: 40,
      },
      {
        title: 'Curso React Native',
        details:
          'Crie uma aplicação com React que rode em Android e iOS de forma nativa',
        slug: 'react-native',
        maximumAttendees: 40,
      },
      {
        title: 'Curso Figma',
        details: 'Aprenda a criar interfaces incríveis com o Figma',
        slug: 'figma',
        maximumAttendees: 40,
      },
      {
        title: 'Curso Node.js',
        details: 'Aprenda a criar APIs com Node.js',
        slug: 'nodejs',
        maximumAttendees: 40,
      },
    ])
    .returning()

  var attendeesToInsert = []
  for (let i = 0; i < 120; i++) {
    attendeesToInsert.push({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      eventId: eventResult[0].id,
      createdAt: faker.date.recent({
        days: 30,
        refDate: dayjs().subtract(8, 'days').toDate(),
      }),
    })
  }

  const attendeeResult = await db
    .insert(attendee)
    .values([
      {
        name: 'Kleber Trevisani',
        email: 'kleber.t@mail.com',
        eventId: eventResult[0].id,
        createdAt: dayjs('2025-03-02T00:00:00Z').toDate(),
      },
      {
        name: 'Vilson Maziero',
        email: 'vfmaziero@mail.com',
        eventId: eventResult[0].id,
        createdAt: dayjs('2025-04-14T00:00:00Z').toDate(),
      },
      {
        name: 'Kevin James',
        email: 'olivete@mail.com',
        eventId: eventResult[0].id,
        createdAt: dayjs('2025-04-28T00:00:00Z').toDate(),
      },
      {
        name: 'Frida Kahlo',
        email: 'kahlo@mail.com',
        eventId: eventResult[0].id,
        createdAt: dayjs('2025-05-07T00:00:00Z').toDate(),
      },
      {
        name: 'Ludwig van Beethoven',
        email: 'beethoven@mail.com',
        eventId: eventResult[0].id,
        createdAt: dayjs('2025-05-16T00:00:00Z').toDate(),
      },
      ...attendeesToInsert,
    ])
    .returning()

  const checkInResult = await db
    .insert(checkIn)
    .values([
      {
        attendeeId: attendeeResult[0].id,
        createdAt: dayjs('2025-03-02T00:00:00Z').toDate(),
      },
      {
        attendeeId: attendeeResult[1].id,
        createdAt: dayjs('2025-04-14T00:00:00Z').toDate(),
      },
      {
        attendeeId: attendeeResult[2].id,
        createdAt: dayjs('2025-04-28T00:00:00Z').toDate(),
      },
      {
        attendeeId: attendeeResult[4].id,
        createdAt: dayjs('2025-05-16T00:00:00Z').toDate(),
      },
    ])
    .returning()
}

seed().finally(() => {
  client.end()
})
