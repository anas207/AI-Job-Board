import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [worldwideFilter, setWorldwideFilter] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data, error } = await supabase
          .from('jobs')
          .select('*')
          .eq('status', 'active')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setJobs(data || []);
      } catch (err) {
        console.error('Error fetching jobs:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = job.title.toLowerCase().includes(searchLower) || 
                          job.company_name.toLowerCase().includes(searchLower);
    
    if (searchQuery && !matchesSearch) return false;
    if (categoryFilter && job.category !== categoryFilter) return false;
    
    if (worldwideFilter) {
      if (!job.is_worldwide) return false;
    } else if (countryFilter) {
      if (!job.country || !job.country.toLowerCase().includes(countryFilter.toLowerCase())) return false;
    }

    return true;
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-orange-50/50 py-20 px-4 sm:px-6 lg:px-8 text-center border-b border-orange-100/50">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          Find the Best AI Remote Jobs
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Discover top remote opportunities in Artificial Intelligence, Machine Learning, and Data Science.
        </p>
      </section>
      
      {/* Search and Filters */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 flex flex-col md:flex-row gap-4">
          <input 
            type="text" 
            placeholder="Search job title or company..." 
            className="input-field flex-grow"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select className="input-field md:w-48" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="">All Categories</option>
            <option value="AI Engineering">AI Engineering</option>
            <option value="Data Science">Data Science</option>
            <option value="Machine Learning">Machine Learning</option>
            <option value="Research">Research</option>
            <option value="Other">Other</option>
          </select>
          <select 
            className={`input-field md:w-48 ${worldwideFilter ? 'opacity-50 cursor-not-allowed' : ''}`} 
            value={countryFilter} 
            onChange={(e) => setCountryFilter(e.target.value)}
            disabled={worldwideFilter}
          >
            <option value="">Any Country</option>
            <option value="United States">United States</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Canada">Canada</option>
            <option value="India">India</option>
            <option value="Australia">Australia</option>
          </select>
          <label className="flex items-center space-x-2 md:w-48 px-2">
            <input 
              type="checkbox" 
              className="rounded text-orange-500 focus:ring-orange-500 w-5 h-5" 
              checked={worldwideFilter} 
              onChange={(e) => setWorldwideFilter(e.target.checked)} 
            />
            <span className="text-sm font-medium text-gray-700">Anywhere Globally</span>
          </label>
        </div>
      </div>

      {/* Job List */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold mb-8">Latest AI Jobs</h2>
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-12 text-gray-500">Loading jobs...</div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-12 text-gray-500">No jobs posted yet. Be the first!</div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-12 text-gray-500">No jobs match your filters. Try adjusting them.</div>
          ) : (
            filteredJobs.map((job) => (
              <div key={job.id} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-200 overflow-hidden">
                  {job.company_logo_url ? (
                    <img src={job.company_logo_url} alt={job.company_name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-gray-400 text-xs text-center px-1 font-medium">{job.company_name.substring(0,2).toUpperCase()}</span>
                  )}
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{job.title}</h3>
                  <p className="text-gray-600 font-medium text-sm mb-2">
                    {job.company_name} &bull; <span className="text-gray-500">{job.is_worldwide ? 'Remote (Worldwide)' : `Remote (${job.country})`}</span>
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-3 py-1 bg-orange-50 text-orange-700 text-xs font-semibold rounded-full">{job.category}</span>
                    {job.salary && <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full">{job.salary}</span>}
                  </div>
                </div>
                <div className="flex flex-col sm:items-end gap-3 w-full sm:w-auto mt-4 sm:mt-0">
                  <span className="text-sm text-gray-500">{new Date(job.created_at).toLocaleDateString()}</span>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Link to={`/job/${job.id}`} className="btn-secondary flex-1 sm:flex-none text-sm py-2 px-4 text-center">View Job</Link>
                    <Link to={`/job/${job.id}`} className="btn-primary flex-1 sm:flex-none text-sm py-2 px-4 text-center">Apply Now</Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
