const express = require('express');
const router = express.Router();
const Submission = require('../models/submission.model.js');

// GET all submissions
router.get('/', async (req, res) => {
    try {
        const submissions = await Submission.find();
        res.json(submissions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new submission
router.post('/', async (req, res) => {
    const { text } = req.body;

    // Automatically generate the current timestamp
    const timestamp = new Date().getTime();

    const newSubmission = new Submission({
        text,
        timestamp
    });

    try {
        const savedSubmission = await newSubmission.save();
        res.status(201).json(savedSubmission);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT request to upvote a submission
router.put('/:id/upvote', async (req, res) => {
    try {
        const submission = await Submission.findById(req.params.id);
        submission.votes += 1; // Increment votes
        const updatedSubmission = await submission.save();
        res.json(updatedSubmission);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/:id/downvote', async (req, res) => {
    try {
        const submission = await Submission.findById(req.params.id);
        submission.votes -= 1; // Decrement votes
        const updatedSubmission = await submission.save();
        res.json(updatedSubmission);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


module.exports = router;
