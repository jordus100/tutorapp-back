export default class OfferService {
    constructor(dbClient) {
        this.dbClient = dbClient
    }

    TutoringSubjects = [
        'fizyka',
        'matematyka',
        'geografia',
        'ekonomia',
        'prawo',
        'informatyka',
        'języki'
    ]

    addOffer = async (req, res, next) => {
        if(!req.body) {
            return res.status(400).json({ message: 'Invalid body'})
        }
        req.body.username = req.user.username
        await this.dbClient.collection('offers').insertOne(req.body)
        return res.status(200).json({message: 'Tutoring offer added succesfully'});
    }

    getAllOffers = async (req, res, next) => {
        const allOffers = await this.dbClient.collection('offers').find({}).toArray()
        return res.status(200).json(allOffers)
    }

}