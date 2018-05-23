import { expect } from 'chai'

import Crypto from './../src/helpers/crypto'

describe('Crypto:::', () => {
  const text =  'a simple string'
  const hashedCrypto = Crypto.createBcryptHash(text)

  it('Crypto should be a function', (done) => {
    expect(Crypto).to.be.a('function')
    done()
  })


  it('createBcryptHash should be a function', (done) => {
    expect(Crypto.createBcryptHash).to.be.a('function')
    done()
  })

  it('compareBcrypt should be a function', (done) => {
    expect(Crypto.compareBcrypt).to.be.a('function')
    done()
  })

  it('should encrypt a simple string with Bcrypt and return a hashed string', (done) => {
    expect(Crypto.createBcryptHash(text)).to.be.a('string')
    done()
  })

  it('should compare strings with Bcrypt and return true', (done) => {
    expect(Crypto.compareBcrypt(text, hashedCrypto)).to.be.true
    done()
  })
})