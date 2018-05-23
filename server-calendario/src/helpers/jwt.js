import { sign, decode, verify } from 'jsonwebtoken'

import { getEnv } from './../config/env'
getEnv()

const secretKey = process.env.TOKEN_SECRET || 
(Math.floor((Math.random() * 9999) * Math.random())).toString()

export default class Token {
	static createToken (payload) {
		try {
			const token = sign(payload, secretKey)
			return `Bearer ${token}`
		} catch (err) {
			return false
		}
	}

	static verifyToken (token) {
		try {
			const valid = verify(Token.getRawToken(token), secretKey.toString())
			return Boolean(valid)
		} catch (err) {
			return false
		}
	}

	static decodeToken (token) {
		try {
			const payload = decode(Token.getRawToken(token))
			return payload
		} catch (err) {
			return false
		}
	}

	static getRawToken (token) {
		const rawToken = token.split('Bearer').pop().trim()
		return rawToken
	}
}
