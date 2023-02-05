const mongoose = require('mongoose')

const QuizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
      },
      status: {
        type: Boolean, 
        required: true
      },
      latitude: { 
        type: String,
        required:true
        },
        longitude: { 
        type: String,
        required:true
        },
      ip: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
})

module.exports = mongoose.model("Quiz", QuizSchema);