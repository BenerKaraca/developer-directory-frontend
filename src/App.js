import React, { useState, useEffect, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeveloperForm from './components/DeveloperForm';
import DeveloperList from './components/DeveloperList';
import SearchFilter from './components/SearchFilter';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://developer-directory-backend.onrender.com';

function App() {
  const [developers, setDevelopers] = useState([]);
  const [filteredDevelopers, setFilteredDevelopers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('All');
  const [loading, setLoading] = useState(false);

  const fetchDevelopers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/developers`);
      if (response.data.success) {
        setDevelopers(response.data.data);
      }
    } catch (error) {
      toast.error('Failed to fetch developers');
      console.error('Error fetching developers:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const filterDevelopers = useCallback(() => {
    let filtered = [...developers];

    // Filter by role
    if (filterRole !== 'All') {
      filtered = filtered.filter(dev => dev.role === filterRole);
    }

    // Filter by search term (name or tech stack)
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(dev => {
        const nameMatch = dev.name.toLowerCase().includes(term);
        const techMatch = dev.techStack.some(tech => 
          tech.toLowerCase().includes(term)
        );
        return nameMatch || techMatch;
      });
    }

    setFilteredDevelopers(filtered);
  }, [developers, filterRole, searchTerm]);

  // Fetch developers on component mount
  useEffect(() => {
    fetchDevelopers();
  }, [fetchDevelopers]);

  // Filter developers when search term or role filter changes
  useEffect(() => {
    filterDevelopers();
  }, [filterDevelopers]);

  const handleAddDeveloper = async (developerData) => {
    try {
      const response = await axios.post(`${API_URL}/developers`, developerData);
      if (response.data.success) {
        toast.success('Developer added successfully!');
        fetchDevelopers();
        return true;
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to add developer';
      toast.error(errorMessage);
      return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Developer Directory
          </h1>
          <p className="text-gray-600">
            Manage and discover talented developers
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Add Developer
              </h2>
              <DeveloperForm onSubmit={handleAddDeveloper} />
            </div>
          </div>

          {/* List Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Developers ({filteredDevelopers.length})
                </h2>
                <SearchFilter
                  searchTerm={searchTerm}
                  filterRole={filterRole}
                  onSearchChange={setSearchTerm}
                  onRoleFilterChange={setFilterRole}
                />
              </div>
              
              {loading ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                  <p className="mt-2 text-gray-600">Loading developers...</p>
                </div>
              ) : (
                <DeveloperList developers={filteredDevelopers} />
              )}
            </div>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;

