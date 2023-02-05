const express = require('express')
const router = express.Router()
const authenticateToken = require('./api/auth')
const Quiz = require('../models/quiz')
const Submission = require('../models/submission')
const geolib = require('geolib')
const submission = require('../models/submission')

router.get('/',authenticateToken,async (req,res)=>{
    const quiz = await Quiz.find({status:true})
    if(req.user.instructor){
        return res.render('quiz/instructor/quiz',{user:req.user, quizzes:quiz})
    }
    return res.render('quiz/quiz',{user:req.user, quizzes:quiz})
})

router.get('/take',authenticateToken,async (req,res)=>{
    const quizTaken = await (await Submission.find({user:req.user.id},{quiz:1})).map(function(a){return a.quiz;})
    const quiz = await Quiz.find({status:true, _id:{$nin:quizTaken}})

    return res.render('quiz/quiz',{user:req.user, quizzes:quiz})
})
router.get('/submitted',authenticateToken, async(req,res)=>{
    const quizTaken = await (await Submission.find({user:req.user.id},{quiz:1})).map(function(a){return a.quiz;})
    const quiz = await Quiz.find({status:true, _id:{$in:quizTaken}})
    return res.render('quiz/submitted',{user:req.user, quizzes:quiz})
})

router.get('/new',authenticateToken,(req,res)=>{
    if(!req.user.instructor){
        return res.sendStatus(403)
    }
    return res.render('quiz/new', { quiz: new Quiz(), user:req.user})
})

router.post('/',authenticateToken,async (req,res)=>{
    const quiz = new Quiz({
        title:req.body.title,
        status:req.body.status=="on"?true:false,
        latitude:req.body.latitude,
        longitude:req.body.longitude,
        ip:req.body.ip
    })
    try{
        const newQuiz = await quiz.save()
        return res.redirect('/dashboard')
    }catch(e){
        return res.render('quiz/new',{quiz:quiz,errorMessage:"Cannot create quiz"})
    }
})

router.get("/:id",authenticateToken, async (req,res)=>{
    const quiz = await Quiz.findById(req.params.id,{id:1,title:1})
    return res.render('quiz/take',{quiz:quiz, user:req.user})
})

router.get("/summary/:id",authenticateToken, async (req,res)=>{
    const submissions = await Submission.find({quiz:req.params.id}).lean()
    const quiz = await Quiz.findById(req.params.id)

    const l1 = Number(quiz.latitude)
    const l2 = Number(quiz.longitude)
    const obj = []

    submissions.forEach(submission => {
        obj.push({
            submission: submission,
            inClass: geolib.getDistance(
                {latitude:Number(submission.latitude),longitude:Number(submission.longitude)},
                {latitude: l1, longitude: l2}
                ),
        })
 
    })
    return res.render('quiz/instructor/submissions',{submissions:obj,user:req.user,quiz:quiz})
})

router.post("/submit/:id", authenticateToken,async (req,res)=>{
    const quiz = await Quiz.findById(req.params.id)
    const submission = new Submission({
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        ip: req.body.ip,
        quiz:req.params.id,
        user:req.user.id
    })
    try{
        const newsubmission= await submission.save()
        return res.redirect('/dashboard')
    }catch(e){
        console.log(e)
        return res.render('quiz/take',{quiz:quiz,user:req.user,errorMessage:"Cannot submit quiz"})
    }
})

module.exports = router