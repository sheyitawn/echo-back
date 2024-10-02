const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    timestamp: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Submission', SubmissionSchema);
