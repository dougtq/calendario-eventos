import { expect } from 'chai'

import Jwt from './../src/helpers/jwt'

describe('Jwt:::', () => {
  let token 
  before(() => {
    token = Jwt.createToken({ tested: true })
  })

  it('Jwt should be a function', (done) => {
    expect(Jwt).to.be.a('function')
    done()
  })

  it('the created token should be a string', (done) => {
    expect(token).to.be.a('string')
    done()
  })

  it('raw token should not contain Bearer', (done) => {
    const rawToken = Jwt.getRawToken(token).toString()
    expect(rawToken.startsWith('Bearer')).to.be.false
    done()
  })

  it('should verify successfully the token', (done) => {
    expect(Jwt.verifyToken(token)).to.be.true
    done()
  })

  it('decoded token should be an object', (done) => {
    expect(Jwt.decodeToken(token)).to.be.a('object')
    done()
  })

  it('decoded token should have key { tested: true }', (done) => {
    expect(Jwt.decodeToken(token).tested).to.be.true
    done()
  })
})