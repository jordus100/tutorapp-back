import express from 'express'

export default class LessonsRouter {
    constructor(lessonService, passport) {
        this.lessonService = lessonService
        this.passport = passport.passport
        this.configRouter()
    }
    router = express.Router()
    configRouter = () => {
        this.router.post('/signup', this.passport.isAuthenticated, this.lessonService.signUpForLesson)
        this.router.get('/student', this.passport.isAuthenticated, this.lessonService.getStudentLessons)
        this.router.post('/student/cancel', this.passport.isAuthenticated, this.lessonService.cancelStudentLesson)
        this.router.get('/tutor', this.passport.isAuthenticated, this.lessonService.getTutorLessons)
    }
}
