import React, { useState } from 'react';

const DeveloperForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    role: 'Frontend',
    techStack: '',
    experience: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.techStack.trim()) {
      newErrors.techStack = 'Tech stack is required';
    }

    if (!formData.experience) {
      newErrors.experience = 'Experience is required';
    } else {
      const exp = Number(formData.experience);
      if (isNaN(exp) || exp < 0) {
        newErrors.experience = 'Experience must be a non-negative number';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    
    const developerData = {
      name: formData.name.trim(),
      role: formData.role,
      techStack: formData.techStack.trim(),
      experience: Number(formData.experience)
    };

    const success = await onSubmit(developerData);
    
    if (success) {
      // Reset form
      setFormData({
        name: '',
        role: 'Frontend',
        techStack: '',
        experience: ''
      });
      setErrors({});
    }
    
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
            errors.name
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-indigo-500'
          }`}
          placeholder="Enter developer name"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name}</p>
        )}
      </div>

      {/* Role Field */}
      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
          Role <span className="text-red-500">*</span>
        </label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Full-Stack">Full-Stack</option>
        </select>
      </div>

      {/* Tech Stack Field */}
      <div>
        <label htmlFor="techStack" className="block text-sm font-medium text-gray-700 mb-1">
          Tech Stack <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="techStack"
          name="techStack"
          value={formData.techStack}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
            errors.techStack
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-indigo-500'
          }`}
          placeholder="e.g., React, Node.js, MongoDB"
        />
        <p className="mt-1 text-xs text-gray-500">
          Separate multiple technologies with commas
        </p>
        {errors.techStack && (
          <p className="mt-1 text-sm text-red-500">{errors.techStack}</p>
        )}
      </div>

      {/* Experience Field */}
      <div>
        <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
          Experience (years) <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          id="experience"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          min="0"
          step="0.5"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
            errors.experience
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-indigo-500'
          }`}
          placeholder="e.g., 3.5"
        />
        {errors.experience && (
          <p className="mt-1 text-sm text-red-500">{errors.experience}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-2 px-4 rounded-lg font-medium text-white transition-colors ${
          isSubmitting
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
        }`}
      >
        {isSubmitting ? 'Adding...' : 'Add Developer'}
      </button>
    </form>
  );
};

export default DeveloperForm;

