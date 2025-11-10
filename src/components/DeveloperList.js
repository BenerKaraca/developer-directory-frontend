import React from 'react';

const DeveloperList = ({ developers }) => {
  if (developers.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">👨‍💻</div>
        <p className="text-gray-600 text-lg">No developers found</p>
        <p className="text-gray-500 text-sm mt-2">
          Try adjusting your search or filters
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {developers.map((developer) => (
        <div
          key={developer.id}
          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white"
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                {developer.name}
              </h3>
              <span className="inline-block mt-1 px-3 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800">
                {developer.role}
              </span>
            </div>
          </div>

          <div className="mb-3">
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">Experience:</span>{' '}
              {developer.experience} {developer.experience === 1 ? 'year' : 'years'}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Tech Stack:</p>
            <div className="flex flex-wrap gap-2">
              {developer.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DeveloperList;

