import express from 'express'
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  login,
} from '../controllers/user.controller.js'
import jwt from 'jsonwebtoken'

const router = express.Router()

const middleware = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const userToken = req.headers.authorization.split(' ')[1]

      let decoded = await jwt.verify(userToken, process.env.TOKEN_SECRET)
      if (!decoded.params.id) {
        throw Error('Invalid token!')
      } else {
        next()
        // const userId = decoded.params.id;
        // return userId;
      }
    } else {
      return res.status(403).send({ message: 'User not authorized.' })
    }
  } catch (error) {
    return res.status(400).send({ message: error.message })
  }
}

router.get('/', middleware, getUsers)
router.get('/:id', getUser)
router.post('/', createUser)
router.post('/login', login)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

export default router
