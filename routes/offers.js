import express from 'express'
import passport from "passport";

export default class OffersRouter {
    constructor(offerService, passport) {
        this.offerService = offerService
        this.passport = passport.passport
        this.configRouter()
    }
    router = express.Router()
    configRouter = () => {
        this.router.get('/subjects', async (req, res, next) => {
            return res.status(200).json(JSON.stringify(this.offerService.TutoringSubjects))
        })
        this.router.post('/post', this.passport.isAuthenticated, this.offerService.addOffer)
        this.router.get('/', this.offerService.getAllOffers)
    }
}

