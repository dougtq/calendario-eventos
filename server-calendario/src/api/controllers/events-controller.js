import { Router } from 'express'

import { sessionCheckers, eventCheckers } from './../../helpers/checkers'
import { createEvent, deleteEvent, updateEvent, findByAuthor } from '../services/events-services'

const routing = Router()

routing.post('/events', sessionCheckers, eventCheckers, async (req, res) => {
  const { author, name, initialDate, finalDate, initialTime, finalTime } = req.body
  try {
    const data = await createEvent({ name, initialDate, finalDate, initialTime, finalTime, author })
    const status = 201

    return res.status(status).send({ data, status })
  } catch (err) {
    return res.status(err.status).send({ data: { message: err.message, code: err.code}, status: err.status })
  }
})


routing.get('/events/author/:author', sessionCheckers, async (req, res) => {
  try {
    const { author } = req.params
    const data = await findByAuthor({ author })
    
    return res.send({ data, status: 201 }).status(201)
  } catch (err) {
    return res.status(err.status).send({ data: { message: err.message, code: err.code }, status: err.status })
  }
})

routing.put('/events/:_id/author/:author', sessionCheckers, eventCheckers, async (req, res) => {
  try {
    const { _id, author } = req.params
    const { name, initialDate, finalDate, initialTime, finalTime } = req.body
    const data = await updateEvent({ _id, name, initialDate, finalDate, initialTime, finalTime, author })
    
    return res.send({
      data,
      status: 201
    }).status(201)
  } catch (err) {
    res.status(err.status)
    .send({ 
      data: {
        message: err.message,
        code: err.code,
      },
      status: err.status
    })
  }
 
})

routing.delete('/events/:_id/author/:author', sessionCheckers,  async (req, res) => {
  const { _id, author } = req.params
  
  try {
    const data = await deleteEvent({ _id, author })
    
    return res.send({ data, status: 200 }).status(200)
  } catch (err) {
    return res.status(err.status).send({ data: { message: err.message, code: err.code }, status: err.status })    
  }
})

export default routing
