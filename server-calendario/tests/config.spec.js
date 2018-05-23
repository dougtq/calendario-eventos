import { expect } from 'chai'

import { getEnv } from './../src/config/env'

describe('Config:::', () => {
  describe('Env Tests', () => {
    let envValues = undefined
    before(() => {
      envValues = getEnv()
    })

    it('Should be an object', (done) => {
      expect(envValues).to.be.a('object')
      done()
    })

    it('Values from envValues and process.env should be equal', (done) => {
      expect(envValues.PORT).to.equal(process.env.PORT)
      expect(envValues.NODE_ENV).to.equal(process.env.NODE_ENV)
      expect(envValues.MONGO_URI).to.equal(process.env.MONGO_URI)
      // expect(envValues.TOKEN_SECRET).to.equal(process.env.TOKEN_SECRET)
      // expect(envValues.TOKEN_EXPIRE).to.equal(process.env.TOKEN_EXPIRE)
      done()
    })
  })
})
