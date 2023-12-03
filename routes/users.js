import express from 'express'

export default class UsersRouter {
  constructor(auth, userService) {
    this.auth = auth
    this.userService = userService
    this.configRouter()
  }
  router = express.Router();

  configRouter = () => {
    this.router.post('/login', this.auth.authorizeUser)
    this.router.post('/logout', this.auth.logoutUser)
    this.router.post('/register', this.userService.registerUser)
  }
}