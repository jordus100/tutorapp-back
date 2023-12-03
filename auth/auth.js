export default class Auth {
    constructor(passportConfig) {
       this.passport = passportConfig.passport
    }

    authorizeUser = (req, res, next) => {
        this.passport.authenticate('localMongoDb', (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(401).json({message: 'Login failed'})
            } else {
                req.logIn(user, (loginErr) => {
                    if (loginErr) {
                        return res.status(500).json({message: 'Internal Server Error'});
                    }
                    return res.status(200).json({message: 'Authentication successful', user});
                });
            }
        })(req, res, next)
    }

    logoutUser = (req, res, next) => {
        const user = req.user
        if (!user) {
            return res.status(400).json({message: 'User not logged in, cannot log out'})
        }
        else {
            req.logOut((err) => {
                if (err) return next(err)
            })
            return res.status(200).json({message: 'Log out successful', user});
        }
    }
}