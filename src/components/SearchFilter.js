import React from 'react';

const SearchFilter = ({ searchTerm, filterRole, onSearchChange, onRoleFilterChange }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Search Input */}
      <div className="flex-1">
        <input
          type="text"
          placeholder="Search by name or tech stack..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Role Filter */}
      <div className="sm:w-48">
        <select
          value={filterRole}
          onChange={(e) => onRoleFilterChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="All">All Roles</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Full-Stack">Full-Stack</option>
        </select>
      </div>
    </div>
  );
};

export default SearchFilter;

