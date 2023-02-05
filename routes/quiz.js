const express = require('express')
const router = express.Router()
const authenticateToken = require('./api/auth')
const Quiz = require('../models/quiz')
const Submission = require('../models/submission')

router.get('/',authenticateToken,async (req,res)=>{
    const quiz = await Quiz.find({status:true})
    if(req.user.instructor){
        res.render('quiz/instructor/quiz',{user:req.user, quizzes:quiz})
    }
    res.render('quiz/quiz',{user:req.user, quizzes:quiz})
})

router.get('/take',authenticateToken,async (req,res)=>{
    const quizTaken = await (await Submission.find({user:req.user.id},{quiz:1})).map(function(a){return a.quiz;})
    console.log(quizTaken)
    const quiz = await Quiz.find({status:true, _id:{$nin:quizTaken}})

    res.render('quiz/quiz',{user:req.user, quizzes:quiz})
})
router.get('/submitted',authenticateToken, async(req,res)=>{
    const quizTaken = await (await Submission.find({user:req.user.id},{quiz:1})).map(function(a){return a.quiz;})
    const quiz = await Quiz.find({status:true, _id:{$in:quizTaken}})
    res.render('quiz/submitted',{user:req.user, quizzes:quiz})
})

router.get('/new',authenticateToken,(req,res)=>{
    if(!req.user.instructor){
        res.sendStatus(403)
    }
    res.render('quiz/new', { quiz: new Quiz()})
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
        res.redirect('/dashboard')
    }catch(e){
        console.log(quiz)
        console.log(e)
        res.render('quiz/new',{quiz:quiz,errorMessage:"Cannot create quiz"})
    }
})

router.get("/:id",authenticateToken, async (req,res)=>{
    const quiz = await Quiz.findById(req.params.id,{id:1,title:1})
    res.render('quiz/take',{quiz:quiz})
})

router.get("/summary/:id",authenticateToken, async (req,res)=>{
    const submissions = await Submission.find({quiz:req.params.id})
    const quiz = await Quiz.findById(req.params.id)

    res.render('quiz/instructor/submissions',{submissions:submissions,user:req.user,quiz:quiz})
})

router.post("/submit/:id", authenticateToken,async (req,res)=>{
    const submission = new Submission({
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        ip: req.body.ip,
        quiz:req.params.id,
        user:req.user.id
    })
    try{
        const newsubmission= await submission.save()
        res.redirect('/dashboard')
    }catch(e){
        console.log(submission)
        console.log(e)
        res.render('quiz/take/',{quiz:quiz,errorMessage:"Cannot submit quiz"})
    }
})

module.exports = router