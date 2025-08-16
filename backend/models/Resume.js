const mongoose = require('mongoose');

if (mongoose.models.Resume) {
  delete mongoose.models.Resume;
}

const resumeSchema = new mongoose.Schema({
resumeNumber: { type: String, default: () => `RES-${Date.now()}`, unique: true },
  name: { type: String, required: true },
  number: { type: Number, required: true }, // fixed type
  email: { type: String, required: true },
  address: { type: String, default: null },
  careerGoal: { type: String, default: null },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  // Added work experience & education
  workExperience: [
    {
      company: String,
      position: String,
      startDate: Date,
      endDate: Date,
      description: String,
    }
  ],
  education: [
    {
      school: String,
      degree: String,
      fieldOfStudy: String,
      startDate: Date,
      endDate: Date,
      description: String,
    }
  ],

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

resumeSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.models.Resume || mongoose.model('Resume', resumeSchema);
