import { expect } from 'chai'

import { errorTreater } from './../src/helpers/treater'
import { errorMsgMounter } from './../src/helpers/treater'

describe('Treater:::', () => {
  let error
  it('should return a treated response with status 500 and code CREATE_ERROR', (done) => {
    error = errorTreater('create error')
    expect(error.status).to.be.equal(500)
    expect(error.code).to.be.equal('CREATE_ERROR')
    done()
  })

  it('should return a treated response with status 400 and code DUPLICATE_ERROR', (done) => {
    error = errorTreater('duplicate username')
    expect(error.status).to.be.equal(400)
    expect(error.code).to.be.equal('DUPLICATE_ERROR')
    done()
  })

  it('should return a treated response with status 400 and code SESSION_ERROR', (done) => {
    error = errorTreater('incorrect session')
    expect(error.status).to.be.equal(400)
    expect(error.code).to.be.equal('SESSION_ERROR')
    done()
  })

  it('should return a treated response with status 400 and code PWD_ERROR', (done) => {
    error = errorTreater('encrypt error')
    expect(error.status).to.be.equal(400)
    expect(error.code).to.be.equal('PWD_ERROR')
    done()
  })

  it('should return a treated response with status 500 and code UNEXPECTED_ERR', (done) => {
    error = errorTreater('unknown error')
    expect(error.status).to.be.equal(500)
    expect(error.code).to.be.equal('UNEXPECTED_ERR')
    done()
  })

  it('should return a treated response with status 500 and code UNEXPECTED_ERR when function its called empty', (done) => {
    error = errorTreater()
    expect(error.status).to.be.equal(500)
    expect(error.code).to.be.equal('UNEXPECTED_ERR')
    done()
  })
})

describe('Mounter:::', () => {
  it('should mount error messages with the data provided', (done) => {
    const errMsg = errorMsgMounter('Teste de mensagem de erro', ' teste', 500)
    expect(errMsg.message).to.be.equal('Teste de mensagem de erro')
    expect(errMsg.code).to.be.equal('TESTE')
    expect(errMsg.status).to.be.equal(500)

    done()
  })

  it('should mount default error message if the data is not provided', (done) => {
    const errMsg = errorMsgMounter()
    expect(errMsg.message).to.be.equal('Aconteceu um erro, tente novamente mais tarde...')
    expect(errMsg.code).to.be.equal('UNKNOWN_ERR')
    expect(errMsg.status).to.be.equal(500)

    done()
  })
})
