import bcrypt from "bcrypt";

export default class UserService {
    constructor(dbClient) {
        this.dbClient = dbClient
    }

    registerUser = async (req, res, next) => {
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({ message: 'Username or password not provided'})
        }
        const user = await this.dbClient.collection('users').findOne({ username: req.body.username });
        if (user) {
            return res.status(400).json({ message: 'User already exists'})
        } else if(req.body.password.length < 8) {
            return res.status(400).json({ message: 'Password too short'})
        } else {
            const salt = await bcrypt.genSalt(5)
            const hash = await bcrypt.hash(req.body.password, salt)
            await this.dbClient.collection('users').insertOne({ username: req.body.username, password: hash})
            return res.status(200).json({message: 'User registered successfully'});
        }
    }
}