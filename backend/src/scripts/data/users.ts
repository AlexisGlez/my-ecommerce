import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Alexis Glez',
    email: 'alexis@test.com',
    password: bcrypt.hashSync('1234'),
    isAdmin: true,
  },
  {
    name: 'Carlos G',
    email: 'carlos@test.com',
    password: bcrypt.hashSync('1234'),
    isAdmin: false,
  },
]

export default users
