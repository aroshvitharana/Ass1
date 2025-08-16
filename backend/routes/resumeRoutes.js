const express = require('express');
const { createResume, getResumes, updateResume, deleteResume } = require('../controllers/resumeController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, getResumes)
  .post(protect, createResume);

router.route('/:id')
  .put(protect, updateResume)
  .delete(protect, deleteResume);

module.exports = router;
