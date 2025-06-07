import fastify from 'fastify'
import fastifyCors from '@fastify/cors'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { getEventAttendeesRoute } from './routes/event-attendees'
import { getEventsRoute } from './routes/events'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*',
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(getEventAttendeesRoute)
app.register(getEventsRoute)

app
  .listen({
    port: 3000,
  })
  .then(() => {
    console.log('Server rodando em http://localhost:3000')
  })
