import { Router } from 'express'

import { userCheckers, loginCheckers } from './../../helpers/checkers'
import { startSession, createUser, findByEmail } from './../services/user-services'

const routing = Router()

routing.post('/users', userCheckers, async (req, res) => {
  const { name, email, password } = req.body

  try {
    const data = await createUser({ name, email, password })
    const status = 201

    data.user.password = undefined
    res.setHeader('Authorization', data.token)
    
    return res.send({ data: data.user, status }).status(status);
  } catch (err) {
    res.status(err.status)
    .send({ data: { message: err.message, code: err.code }, status: err.status })    
  }
})

routing.post('/users/session', loginCheckers, async (req, res) => {
  const { email, password } = req.body
  try {
    const data = await startSession({ email, password })
    res.setHeader('authorization', data.token)
    return res
      .status(200)
      .send({ data: { user: data.user }, status: 200 })
  } catch (err) {
    res.status(err.status)
    .send({ data: { message: err.message, code: err.code }, status: err.status })
  }
})

export default routing
