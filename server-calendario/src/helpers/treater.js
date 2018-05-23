export function errorTreater(message) {
	const error = {
		message: '',
		code: '',
		status: 500
	}

	switch (message) {
		case 'user_not_found':
			error.message = 'Usuário não encontrado',
			error.code = 'USR_NOT_FOUND',
			error.status = 404
			break
		
		case 'not_found':
			error.message = 'Não conseguimos encontrar os dados que você procura',
			error.code = 'NOT_FOUND',
			error.status = 404
			break

		case 'create_user_error':
			error.message = 'Seu usuário não foi criado',
			error.code = 'CREATE_USR_ERROR',
			error.status = 500
			break

		case 'create_error':
			error.message = 'Sua requisição não pode ser completada',
			error.code = 'CREATE_ERROR',
			error.status = 500
			break

		case 'encrypt_error':
			error.message = 'Ocorreu um erro com os dados recebidos',
			error.code = 'PWD_ERROR',
			error.status = 400
			break

		case 'duplicate_email':
			error.message = 'Esse usuário já possui uma conta',
			error.code = 'DUPLICATE_ERROR',
			error.status = 400
			break

		case 'incorrect_session':
			error.message = 'Email e/ou senha inválidos',
			error.code =  'SESSION_ERROR',
			error.status = 400
			break

		default:
			error.message = 'Aconteceu um erro, tente novamente mais tarde...',
			error.code = 'UNEXPECTED_ERROR',
			error.status = 500
			break
	}

	return error
}

export function errorMsgMounter ( message = 'Aconteceu um erro, tente novamente mais tarde...', code = 'UNKNOWN_ERROR', status = 500 ) {
	const error = {
		message: message,
		code: code.toString().trim().toUpperCase(),
		status: Number(status)
	}

	return error
}
