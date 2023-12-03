import App from './app.js'
import PassportConfig from './auth/passport-config.js'
import DbConnection from './db/db-connection.js'
import Auth from './auth/auth.js'
import { router as indexRouter } from './routes/index.js'
import UsersRouter from "./routes/users.js";
import UserService from "./services/users.js";

const dbClient = await new DbConnection().connectDb()
const passportConfig = new PassportConfig(dbClient)
const auth = new Auth(passportConfig)
const userService = new UserService(dbClient)
const usersRouter = new UsersRouter(auth, userService)
export const app = new App(passportConfig, indexRouter, usersRouter)