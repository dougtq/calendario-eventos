import { Router } from 'express'
import { randomBytes } from 'crypto'

import { userCheckers, loginCheckers } from './../../helpers/checkers'
import { resetToken } from './../../helpers/tokenized'
import { startSession, createUser, findByEmail } from './../services/user-services'
import { findUserAndSelect, updateTokenAndExpiration } from './../services/user-services'
// import mailer from './../../utils/mailer'

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

// routing.post('/v1/forgot_password', async (req, res) => {
//   const { email } = req.body
//   findByEmail({ email })
//     .then((data) => {
//       const { _id } = data
//       const token = randomBytes(20).toString('hex')
//       const now = new Date()
//       now.setHours(now.getHours() + 1)
//       updateTokenAndExpiration({ _id }, {
//         tokenExpiration: now,
//         tokenPassword: token
//       })
//         .then((data) => {
//           mailer.sendMail({
//             to: email,
//             from: 'dougtq@hotmail.com',
//             template: 'forgot_password',
//             context: { token }
//           }, (err) => {
//             if (err) throw new Error('Cannot send email')
//             return res.status(202).send({ data: data, status: 202 })
//           })
//         })
//         .catch((err) =>
//           res.status(err.status)
//             .send({
//             data: {
//               message: err.message,
//               code: err.code,
//             },
//             status: err.status
//           })
//         )
//     })
//     .catch((err) =>
//       res.status(err.status)
//         .send({
//           data: {
//             message: err.message,
//             code: err.code,
//           },
//           status: err.status
//         })
//     )
//     .catch((err) =>
//       res.status(err.status)
//       .send({
//         data: {
//           message: 'Failed on password recovery, try again later',
//           code: err.code,
//         },
//         status: err.status
//       })
//     )
// })

// routing.patch('/v1/reset_password', async (req, res) => {
//   const { email, password, token } = req.body

//   findUserAndSelect({ email }, { select: '+tokenPassword tokenExpiration' })
//     .then(data => {
//       const resetStatus = resetToken({ clientToken: token, dbToken: data.tokenPassword, expiration: data.tokenExpiration })
//       if (resetStatus !== true) {
//         return res.status(resetStatus.status).send({
//           data: {
//             message: resetStatus.message,
//             code: resetStatus.code,
//           },
//           status: resetStatus.status
//         })
//       }

//       data.password = password
//       data.save()
//       return { data: { sucess: true }, status: 200 }

//     })
//     .catch(err => res.
//       status(err.status)
//       .send({
//         data: {
//           message: 'Failed on password recovery, try again later',
//           code: err.code,
//         },
//         status: err.status
//       })
//     )
// })

export default routing
