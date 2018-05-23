import Mongo from 'mongoose'
Mongo.Promise = global.Promise

Mongo.connect(`mongodb://${process.env.DB_HOST || 'localhost'}/${process.env.DB_NAME || 'tokenLabCalendario'}`, (err) => {
	if (err) {
		console.log('Erro na tentativa conexão ao banco de dados!')
		console.error(err)
		process.exit(1)	
	}
})

export default Mongo
