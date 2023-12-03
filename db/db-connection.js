import { MongoClient } from 'mongodb'
const url = 'mongodb://localhost:27017/'; // Default MongoDB port is 27017
const dbName = 'TutorApp'

export default class DbConnection {
    client = new MongoClient(url + dbName)
    connectDb = async () => {
        await this.client.connect().then(client => {
            console.log('Connected to DB successfully')
            this.client = client.db(dbName)
        }).catch((err) => {
            console.log('Failed to connect to DB: ' + err)
        })
        return this.client
    }
}