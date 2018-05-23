import { config } from 'dotenv'

export function getEnv() {
	config()
	return Object.assign({}, process.env)
}