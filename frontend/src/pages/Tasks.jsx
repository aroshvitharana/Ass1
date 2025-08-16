import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';

const ResumePage = () => {
  const { user } = useAuth();

  const initialFormData = {
    name: '',
    email: '',
    number: '',
    address: '',
    careerGoal: '',
    workExperience: [{ company: '', position: '', startDate: '', endDate: '', description: '' }],
    education: [{ school: '', degree: '', fieldOfStudy: '', startYear: '', endYear: '' }]
  };

  const [formData, setFormData] = useState(initialFormData);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  // Fetch resumes
  useEffect(() => {
    if (!user) return;

    const fetchResumes = async () => {
      try {
        const res = await axiosInstance.get('/api/resume', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setResumes(res.data);
      } catch {
        alert('Failed to fetch resumes');
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        // Update
        const res = await axiosInstance.put(`/api/resume/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${user.token}` }
        });

        setResumes((prev) =>
          prev.map((r) => (r._id === editingId ? res.data : r))
        );
        alert('Resume updated successfully');
      } else {
        // Create
        const res = await axiosInstance.post('/api/resume', formData, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setResumes([...resumes, res.data]);
        alert('Resume created successfully');
      }

      setFormData(initialFormData);
      setEditingId(null);
    } catch {
      alert('Failed to save resume');
    }
  };

  const handleDelete = async (resumeId) => {
    try {
      await axiosInstance.delete(`/api/resume/${resumeId}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setResumes((prev) => prev.filter((r) => r._id !== resumeId));
      alert('Resume deleted successfully');
    } catch {
      alert('Failed to delete resume');
    }
  };

  const handleEdit = (resume) => {
    const copied = {
      name: resume.name || '',
      email: resume.email || '',
      number: resume.number || '',
      address: resume.address || '',
      careerGoal: resume.careerGoal || '',
      workExperience: resume.workExperience?.length ? resume.workExperience : [{ company: '', position: '', startDate: '', endDate: '', description: '' }],
      education: resume.education?.length ? resume.education : [{ school: '', degree: '', fieldOfStudy: '', startYear: '', endYear: '' }]
    };

    setFormData(copied);
    setEditingId(resume._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setFormData(initialFormData);
    setEditingId(null);
  };

  if (!user) return <p>Loading user info...</p>;
  if (loading) return <p>Loading resumes...</p>;

  return (
    (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* LEFT: Form */}
        <div className="w-full lg:w-2/3 bg-white p-8 rounded-lg shadow-md border">
          <h1 className="text-3xl font-semibold mb-6 text-blue-700">
            {editingId ? 'Edit Your Resume' : 'Create a New Resume'}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Email</label>
                <input
                  type="email"
                  className="w-full border px-3 py-2 rounded"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Phone Number</label>
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded"
                  value={formData.number}
                  onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Address</label>
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>
            </div>

            {/* Career Goal */}
            <div>
              <label className="block font-medium mb-1">Career Goal</label>
              <textarea
                className="w-full border px-3 py-2 rounded"
                value={formData.careerGoal}
                onChange={(e) => setFormData({ ...formData, careerGoal: e.target.value })}
              />
            </div>

            {/* Work Experience */}
            <div>
              <h3 className="text-lg font-semibold border-b pb-1 mb-2">Work Experience</h3>
              {formData.workExperience.map((exp, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 border p-4 rounded-md bg-gray-50"
                >
                  <input
                    type="text"
                    placeholder="Company"
                    className="border px-2 py-1 rounded"
                    value={exp.company}
                    onChange={(e) => {
                      const updated = [...formData.workExperience];
                      updated[idx].company = e.target.value;
                      setFormData({ ...formData, workExperience: updated });
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Position"
                    className="border px-2 py-1 rounded"
                    value={exp.position}
                    onChange={(e) => {
                      const updated = [...formData.workExperience];
                      updated[idx].position = e.target.value;
                      setFormData({ ...formData, workExperience: updated });
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Start Date"
                    className="border px-2 py-1 rounded"
                    value={exp.startDate}
                    onChange={(e) => {
                      const updated = [...formData.workExperience];
                      updated[idx].startDate = e.target.value;
                      setFormData({ ...formData, workExperience: updated });
                    }}
                  />
                  <input
                    type="text"
                    placeholder="End Date"
                    className="border px-2 py-1 rounded"
                    value={exp.endDate}
                    onChange={(e) => {
                      const updated = [...formData.workExperience];
                      updated[idx].endDate = e.target.value;
                      setFormData({ ...formData, workExperience: updated });
                    }}
                  />
                  <textarea
                    placeholder="Description"
                    className="col-span-full border px-2 py-1 rounded"
                    value={exp.description}
                    onChange={(e) => {
                      const updated = [...formData.workExperience];
                      updated[idx].description = e.target.value;
                      setFormData({ ...formData, workExperience: updated });
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Education */}
            <div>
              <h3 className="text-lg font-semibold border-b pb-1 mb-2">Education</h3>
              {formData.education.map((edu, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 border p-4 rounded-md bg-gray-50"
                >
                  <input
                    type="text"
                    placeholder="School"
                    className="border px-2 py-1 rounded"
                    value={edu.school}
                    onChange={(e) => {
                      const updated = [...formData.education];
                      updated[idx].school = e.target.value;
                      setFormData({ ...formData, education: updated });
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Degree"
                    className="border px-2 py-1 rounded"
                    value={edu.degree}
                    onChange={(e) => {
                      const updated = [...formData.education];
                      updated[idx].degree = e.target.value;
                      setFormData({ ...formData, education: updated });
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Field of Study"
                    className="border px-2 py-1 rounded"
                    value={edu.fieldOfStudy}
                    onChange={(e) => {
                      const updated = [...formData.education];
                      updated[idx].fieldOfStudy = e.target.value;
                      setFormData({ ...formData, education: updated });
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Start Year"
                    className="border px-2 py-1 rounded"
                    value={edu.startYear}
                    onChange={(e) => {
                      const updated = [...formData.education];
                      updated[idx].startYear = e.target.value;
                      setFormData({ ...formData, education: updated });
                    }}
                  />
                  <input
                    type="text"
                    placeholder="End Year"
                    className="border px-2 py-1 rounded"
                    value={edu.endYear}
                    onChange={(e) => {
                      const updated = [...formData.education];
                      updated[idx].endYear = e.target.value;
                      setFormData({ ...formData, education: updated });
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                {editingId ? 'Update Resume' : 'Save Resume'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </div>

        {/* RIGHT: Resume List */}
        <div className="w-full lg:w-1/3">
          <h2 className="text-2xl font-bold mb-4">Your Resumes</h2>
          <div className="space-y-4">
            {resumes.map((r) => (
              <div key={r._id} className="bg-white p-4 rounded-lg shadow border">
                <h3 className="text-lg font-bold">{r.name}</h3>
                <p className="text-gray-700">{r.email}</p>
                <p className="text-gray-700">Phone: {r.number}</p>
                <p className="text-sm italic text-gray-600">Career Goal: {r.careerGoal}</p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleEdit(r)}
                    className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(r._id)}
                    className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ))
};

export default ResumePage;
