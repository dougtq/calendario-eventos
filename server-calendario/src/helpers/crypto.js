import { createHash } from 'crypto'
import bcrypt from 'bcryptjs'

export default class Hasher {
	static createBcryptHash(text, rounds = 10) {
		try {
			return bcrypt.hashSync(text, rounds)
		} catch (err) {
			return false
		}
	}

	static compareBcrypt(text, hash) {
		try {
			return bcrypt.compareSync(text, hash)
		} catch (err) {
			return false
		}
	}
}
