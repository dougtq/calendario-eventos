import user from './../../models/users'
import Crypto from './../../helpers/crypto'
import Jwt from './../../helpers/jwt'
import { errorTreater } from './../../helpers/treater'

const findUserById = ({ _id }) => {
  return new Promise((resolve, reject) => {
    user.findById(_id)
      .then((data) => {
        if (data) {
          return resolve(data)
        }
        throw new Error('user_not_found')
      })
      .catch((err) => {
        return reject(errorTreater(err.message))
      })
  })
}

const findByEmail = ({ email }) => {
  return new Promise((resolve, reject) => {
    user.findOne({ email })
      .then((data) => {
        if (data) {
          return resolve(data)
        }
        throw new Error('user_not_found')
      })
      .catch((err) => {
        return reject(errorTreater(err.message))
      })
  })
}

const startSession = ({ email, password }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await user.findOne({ email }).select('+password')
      if (data) {
        if (Crypto.compareBcrypt(password, data.password)) {
          const token = Jwt.createToken({ _id: data._id })
          if (!token) {
            throw new Error('incorrect_session')
          }
          return resolve({ token, user: { _id: data._id, email: data.email, name: data.name, createdAt: data.createdAt } })
        }
        throw new Error('incorrect_session')
      }
      throw new Error('user_not_found')  
    } catch (err) {
      return reject(errorTreater(err.message))
    }
  })
}

const verifyDuplication = ({ email }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await user.findOne({ email })
      if (!data) {
        return resolve({ notFound: true })
      }
      throw new Error('duplicate_email') 
    } catch (err) {
      return reject(err)
    }
  })
}

const createUser = ({ name, email, password }) => {
  return new Promise(async (resolve, reject) => {
    
    try {
      const data = await verifyDuplication({ email })
      const hash = Crypto.createBcryptHash(password)
      const newUser = await user.create({ name, email, password: hash })
            
      if (newUser) {
        const token = Jwt.createToken({ _id: newUser._id })
        return resolve({ user: newUser, token })
      }
  
      throw new Error('create_user_error')
      
    } catch (err) {
      return reject(errorTreater(err.message))
    }
    
  })
}

const updateTokenAndExpiration = ({ _id }, { tokenPassword, tokenExpiration }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await user.findByIdAndUpdate(_id, { '$set': { tokenPassword, tokenExpiration }})
      return resolve({ sucess: true })
    } catch (err) {
      return reject(errorTreater(err.message))
    }
  })
}

const findUserAndSelect = ({ email }, { select }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await user.findOne({ email }).select(select)
      if (!data) throw new Error('not_found')
      
      return resolve(data)
    } catch (err) {
      reject(errorTreater(err.message))     
    }
  })
}

export { startSession, createUser, findByEmail, updateTokenAndExpiration, findUserAndSelect }
