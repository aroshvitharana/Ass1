
const Resume = require('../models/Resume');

// @desc    Get all resumes for logged-in user
// @route   GET /api/resumes
// @access  Private
const getResumes = async (req, res) => { 
      try {
    const resumes = await Resume.find({ user: req.user._id });
    res.json(resumes);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
 };



// @desc    Create new resume
// @route   POST /api/resumes
// @access  Private
const createResume = async (req, res) => { 
     try {
    const resume = new Resume({
      ...req.body,
      user: req.user._id,
    });
    const saved = await resume.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: 'Invalid resume data' });
  }
 };


// @desc    Update a resume
// @route   PUT /api/resumes/:id
// @access  Private
const updateResume = async (req, res) => { 
     try {
    const updated = await Resume.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
 };



// @desc    Delete a resume
// @route   DELETE /api/resumes/:id
// @access  Private
const deleteResume = async (req, res) => {
    try {
    const deleted = await Resume.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.json({ message: 'Resume deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }  };

module.exports = {
  getResumes,
  createResume,
  updateResume,
  deleteResume
};
