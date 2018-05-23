import events from './../../models/events'
import { errorTreater } from './../../helpers/treater'

const findByAuthor = ({ author }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await events.find({ author }).sort({ createdAt: 'desc' })
      //.populate('author')

      // const otherEvents = await events.where('author').ne(author).sort({ createdAt: 'desc' })
      // .populate('author')
      // console.log(otherEvents)

      return resolve(data)
    } catch (err) {
      return reject(errorTreater(err.message))
    }
  })
}

const createEvent = ({ name, initialDate, finalDate, initialTime, finalTime, author }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await events.create({ name, initialDate, finalDate, initialTime, finalTime, author })
      
      if (data) return resolve(data)
      
      throw new Error('create error')
    } catch (err) {
      return reject(errorTreater(err.message))
    }
  })
}


const deleteEvent = ({ _id, author }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await events.remove({ _id, author })
      if (data.n > 0) {
        return resolve({ sucess: true })
      }

      throw new Error('not found')
    } catch (err) {
      return reject(errorTreater(err.message))
    }
  })
}

const updateEvent = ({ _id, name, initialDate, finalDate, initialTime, finalTime, author }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await events.findOneAndUpdate({ _id, author }, { name, initialDate, finalDate, initialTime, finalTime }, { new: true })
      if (data) return resolve(data)

      throw new Error('not found')
    } catch (err) {
      return reject(errorTreater(err.message))
    }
  })
}

export { createEvent, findByAuthor, updateEvent, deleteEvent }
