export function resetToken ( clientToken, dbToken, expiration ) {
	if (Date() > expiration) {
		return { message: 'SUa autenticação expirou, gere uma nova...', status: 400, code: 'PASS_TOKEN_EXPIRED' }
	}

	if (clientToken !== dbToken) {
		return { message: 'Autenticação inválida', status: 400, code: 'INVALID_PASS_TOKEN' }
	}

	return true
}
