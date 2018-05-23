import mongoose from 'mongoose'

import connection from './../db/mongo'

const events = new connection.Schema({
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
		ref: 'user',
		required: true,
		trim: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
})


export default connection.model('events', events)
