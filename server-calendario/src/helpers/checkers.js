import Jwt from './jwt'

function validateEmail(email) {
	const validator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return validator.test(String(email).toLowerCase());
}

const userCheckers = (req, res, next) => {
	let { name, email, password } = req.body
	
	name = name.trim()

	if (!name || !email || !password) {
		return res.status(400).send({
			data: {
				message: 'Dados insucifientes',
				code: 'INCORRECT_PAYLOAD'
			},
			status: 400
		})
	}

	if (!validateEmail(email)) {
		return res.status(400).send({
			data: {
				message: 'Formato de e-mail inválido',
				code: 'INCORRECT_EMAIL_FORMAT'
			},
			status: 400
		})
	}

	next()
}

const sessionCheckers = (req, res, next) => {
	const { authorization } = req.headers

	if (!authorization) {
		return res.status(400).send({
			data: {
				message: 'Ocorreu um erro com sua autenticação',
				code: 'MISSING_TOKEN'
			},
			status: 400
		})
	}

	if (!Jwt.verifyToken(authorization)) {
		return res.status(400).send({
			data: {
				message: 'Ocorreu um erro com sua autenticação',
				code: 'INVALID_TOKEN'
			},
			status: 400
		})
	}
	req.userSession = Jwt.decodeToken(authorization)
	next()
}

const loginCheckers = (req, res, next) => {
	const { email, password } = req.body
	
	if (!validateEmail(email)) {
		return res.status(400).send({
			data: {
				message: 'Formato de e-mail inválido',
				code: 'INCORRECT_EMAIL_FORMAT'
			},
			status: 400
		})
	}

	if (!email || !password) {
		return res.status(400).send({
			data: {
				message: 'Dados insucifientes',
				code: 'INCORRECT_PAYLOAD'
			},
			status: 400
		})
	}

	next()
}

const eventCheckers = (req, res, next) => {
	let { name, initialDate, finalDate, initialTime, finalTime } = req.body
	
	if (!name || !initialDate || !finalDate || !initialTime || !finalTime) {
		return res.status(400).send({
			data: {
				message: 'Sua requisição não possui dados suficientes...',
				code: 'INVALID_REQ'
			},
			status: 400
		});
	}

	initialDate = Date.parse(initialDate + ' ' + initialTime);
	finalDate = Date.parse(finalDate + ' ' + finalTime);
	
	if (initialDate > finalDate) {
		return res.status(400).send({
			data: {
				message: 'Data inicial não pode ser maior que a data final...',
				code: 'INVALID_DATE'
			},
			status: 400
		});
	}; 
	
	next();
}


export { userCheckers, loginCheckers, sessionCheckers, eventCheckers }
