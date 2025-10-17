import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export async function getUsers(req, res) {
  try {
    let users
    const { name } = req.query
    if (name) {
      users = await User.find({
        name: { $regex: `.*${name}.*`, $options: 'i' },
      })
    } else {
      users = await User.find({})
    }

    if (users) {
      return res.status(202).json(users)
    } else {
      return res.status(400).json({ message: 'An error has occured!' })
    }
  } catch (error) {
    return res.status('400').send(error)
  }
}

export async function getUser(req, res) {
  try {
    let user = await User.findById({ _id: req.params.id })

    if (user) {
      return res.status(202).json(user)
    } else {
      return res.status(400).json({ message: 'An error has occured.' })
    }
  } catch (error) {
    return res.status(400).send({ message: 'User not found.' })
  }
}

export async function createUser(req, res) {
  try {
    const user = req.body
    user.password = await bcrypt.hashSync(user.password, 10)

    const newUser = await User.create(user)
    newUser.password = undefined

    if (newUser) {
      return res.status(201).send({ message: 'User created!', data: newUser })
    } else {
      return res
        .status(400)
        .send({ message: 'An error has occured! User not created!' })
    }
  } catch (error) {
    return res.status(400).send(error.message)
  }
}

export async function updateUser(req, res) {
  try {
    const userId = req.params.id

    const user = req.body

    const userUpdated = await User.findByIdAndUpdate(
      mongoose.Types.ObjectId(usertId),
      { $set: user },
      { new: true }
    )

    if (userUpdated) {
      return res
        .status(202)
        .json({ message: 'User Updated', data: userUpdated })
    } else {
      return res
        .status(400)
        .json({ message: 'An error has occured! User not updated!' })
    }
  } catch (error) {
    return res.status(400).json(error.message)
  }
}

export async function deleteUser(req, res) {
  try {
    const userId = req.params.id
    const deletedUser = await User.deleteOne({ _id: userId })

    if (deletedUser.n > 0) {
      return res.status(200).json({ message: 'User deleted' })
    } else {
      return res.status(400).json({ message: 'Sorry, user not deleted!' })
    }
  } catch (error) {
    return res.status(400).send(error)
  }
}

function generateToken(params = {}) {
  return jwt.sign({ params }, process.env.TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRES_IN,
    algorithm: 'HS256',
  })
}

export async function login(req, res) {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email: email }) // mas pode abreviar somente "email"

    if (!user) {
      return res.status(400).json({ message: 'email or password invalid' })
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'email or password invalid' })
    }

    res.send({
      data: user,
      token: generateToken({ id: user.id }),
    })
  } catch (error) {
    return res.status(400).send({ message: error.message }) // erros inesperados
  }
}
