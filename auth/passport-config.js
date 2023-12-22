import passport from 'passport'
import LocalStrategy from 'passport-local'
import bcrypt from "bcrypt";

export default class PassportConfig {
    constructor(dbClient) {
        this.passport = passport
        this.dbClient = dbClient
        this.initPassport()
    }

    initPassport = () => {
        passport.use('localMongoDb', new LocalStrategy.Strategy(async (username, password, done) => {
                const user = await this.dbClient.collection('users').findOne({ username: username });
                if (user && await this.checkPassword(user, password)) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Incorrect username or password' });
                }
            }
        ))

        passport.serializeUser((user, done) => {
            done(null, user.username);
        })

        passport.deserializeUser(async (username, done) => {
            const user = await this.dbClient.collection('users').findOne({ username: username });
            done(null, user);
        })

        passport.isAuthenticated = (req, res, next) => {
            if (req.isAuthenticated() && req.user.username) {
                return next();
            }
            res.status(401).json({ message: 'User not logged in' });
        }

        return passport
    }

    checkPassword = async (user, password) => {
        return await bcrypt.compare(password, user.password)
    }

}