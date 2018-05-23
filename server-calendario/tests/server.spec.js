import { expect } from 'chai'

import middlewares from './../src/server/cors'

describe('Server:::', () => {
  it('Middlewares should be a function', (done) => {
    expect(middlewares).to.be.a('function')
    done()
  })
})
