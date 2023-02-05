const mongoose = require('mongoose')

const SubmissionSchema = new mongoose.Schema({
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
      },
      quiz:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Quiz'
      }
})

module.exports = mongoose.model("Submission", SubmissionSchema);