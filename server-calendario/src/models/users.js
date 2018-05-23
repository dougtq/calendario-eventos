import connection from './../db/mongo'

const users = new connection.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		trim: true
	},
	password: {
		type: String,
		required: true,
		select: false
	},
	tokenPassword: {
		type: String,
		select: false
	},
	tokenExpiration: {
		type: Date,
		select: false
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
})

export default connection.model('users', users)
