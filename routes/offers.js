import express from 'express'

export default class OffersRouter {
    constructor(offerService) {
        this.offerService = offerService
        this.configRouter()
    }
    router = express.Router()
    configRouter = () => {
        this.router.get('/subjects', async (req, res, next) => {
            return res.status(200).json(JSON.stringify(this.offerService.TutoringSubjects))
        })
        this.router.post('/post', this.offerService.addOffer)
        this.router.get('/', this.offerService.getAllOffers)
        this.router.post('/signup', this.offerService.signUpForLesson)
    }
}

