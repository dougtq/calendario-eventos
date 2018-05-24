import mongoose from 'mongoose'
import connection from '../db/mongo'

const eventsSchema = new connection.Schema({
	name: {
		type: String,
		required: true
  },
  initialDate: {
		type: String,
		required: true
  },
  finalDate: {
		type: String,
		required: true
  },
  initialTime: {
		type: String,
		required: true
  },
  finalTime: {
		type: String,
		required: true
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users',
		required: true,
		trim: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
})

const eventsModel = connection.model('events', eventsSchema)

export default eventsModel
