import App from './app.js'
import PassportConfig from './auth/passport-config.js'
import DbConnection from './db/db-connection.js'
import Auth from './auth/auth.js'
import UsersRouter from "./routes/users.js";
import UserService from "./services/users.js";
import OfferService from "./services/offers.js";
import OffersRouter from "./routes/offers.js";
import LessonService from "./services/lessons.js";
import LessonsRouter from "./routes/lessons.js";

const dbClient = await new DbConnection().connectDb()
const passport = new PassportConfig(dbClient)
const auth = new Auth(passport)

const userService = new UserService(dbClient)
const usersRouter = new UsersRouter(auth, userService)

const offerService = new OfferService(dbClient)
const offersRouter = new OffersRouter(offerService, passport)

const lessonService = new LessonService(dbClient)
const lessonsRouter = new LessonsRouter(lessonService, passport)
export const app = new App(passport, usersRouter, offersRouter, lessonsRouter)