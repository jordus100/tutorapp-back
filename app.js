import createError from 'http-errors'
import express from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import session from 'express-session'
import cors from 'cors'

export default class App {
  constructor(passportConfig, usersRouter, offersRouter, lessonsRouter) {
    this.passport = passportConfig.passport
    this.usersRouter = usersRouter.router
    this.offersRouter = offersRouter.router
    this.lessonsRouter = lessonsRouter.router
  }
  runApp = async () => {
    const app = express();

    app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
    app.use((await logger)('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(session({
      secret: 'big-blind',
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: false
      }
    }));
    app.use(this.passport.initialize());
    app.use(this.passport.session());
    app.use('/users', this.usersRouter);
    app.use('/offers', this.offersRouter);
    app.use('/lessons', this.lessonsRouter);

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      next(createError(404));
    });

    // error handler
    app.use(function(err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};
      // render the error page
      res.status(err.status || 500);
      res.send(err.message)
    });
    return app
  }
}
