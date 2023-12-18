import App from './app.js'
import PassportConfig from './auth/passport-config.js'
import DbConnection from './db/db-connection.js'
import Auth from './auth/auth.js'
import { router as indexRouter } from './routes/index.js'
import UsersRouter from "./routes/users.js";
import UserService from "./services/users.js";
import OfferService from "./services/offers.js";
import OffersRouter from "./routes/offers.js";

const dbClient = await new DbConnection().connectDb()
const passportConfig = new PassportConfig(dbClient)
const auth = new Auth(passportConfig)
const userService = new UserService(dbClient)
const usersRouter = new UsersRouter(auth, userService)
const offerService = new OfferService(dbClient)
const offersRouter = new OffersRouter(offerService)
export const app = new App(passportConfig, indexRouter, usersRouter, offersRouter)