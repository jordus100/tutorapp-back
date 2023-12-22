import { ObjectId } from "mongodb";

export default class LessonService {
    constructor(dbClient) {
        this.dbClient = dbClient
    }

    signUpForLesson = async (req, res, next) => {
        const offerObjId = new ObjectId(req.body.offerId)
        const offer = await this.dbClient.collection('offers').findOne({_id: offerObjId})
        if (!offer) return res.status(400).json({message: 'No tutoring offer with given id'})
        req.body.offerId = offerObjId
        req.body.username = req.user.username
        await this.dbClient.collection('lessons').insertOne(req.body)
        return res.status(200).json({message: 'Lesson signup successful'})
    }

    getStudentLessons = async (req, res, next) => {
        const lessons = await this.dbClient.collection('lessons')
            .aggregate([
                { $match: {username: req.user.username} },
                { $lookup: {
                    from: 'offers',
                    localField: 'offerId',
                    foreignField: '_id',
                    as: 'offer'
                }}
            ])
            .toArray()
        return res.status(200).json(lessons)
    }

    getTutorLessons = async (req, res, next) => {
        const signups = await this.dbClient.collection('offers')
            .aggregate([
                { $match: {username: req.user.username} },
                { $lookup: {
                    from: 'lessons',
                    localField: '_id',
                    foreignField: 'offerId',
                    as: 'lesson'
                } }
            ])
    }

}