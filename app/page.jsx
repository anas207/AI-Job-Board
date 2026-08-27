"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { supabase } from '../src/lib/supabase';
import { COUNTRIES } from '../src/Constants/countries';

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [worldwideFilter, setWorldwideFilter] = useState(false);

  // Searchable country dropdown
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const countryDropdownRef = useRef(null);

  const filteredCountries = COUNTRIES.filter(c =>
    c.toLowerCase().includes(countrySearch.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(e.target)) {
        setCountryDropdownOpen(false);
        setCountrySearch('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const handleApply = (job) => {
    if (job.apply_link.includes('@')) {
      window.location.href = `mailto:${job.apply_link}?subject=Application for ${job.title}`;
    } else {
      window.open(job.apply_link.startsWith('http') ? job.apply_link : `https://${job.apply_link}`, '_blank');
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 text-center border-b border-orange-100/50">
        <h1 className="text-4xl md:text-4xl lg:text-7xl font-bold mb-6">
          Find the Best AI Remote Jobs
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover top remote opportunities in Artificial Intelligence, Machine Learning, and Data Science.
        </p>
      </section>

      {/* Search and Filters */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 relative z-10">
        <div className="bg-[#FFFEFC] rounded-xl shadow-sm p-6 border border-orange-350 flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search job title or company..."
            className="input-field flex-grow"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="relative md:w-48 flex-shrink-0">
            <select className="input-field appearance-none w-full pr-8 cursor-pointer" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              <option value="">All Categories</option>
              <option value="AI Engineering">AI Engineering</option>
              <option value="Data Science">Data Science</option>
              <option value="Machine Learning">Machine Learning</option>
              <option value="Research">Research</option>
              <option value="Other">Other</option>
            </select>
            <svg
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-900"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          {/* Searchable Country Dropdown */}
          <div
            ref={countryDropdownRef}
            className={`relative md:w-48 flex-shrink-0 ${worldwideFilter ? 'opacity-50 pointer-events-none' : ''}`}
          >
            <button
              type="button"
              onClick={() => {
                if (!worldwideFilter) {
                  setCountryDropdownOpen(prev => !prev);
                  setCountrySearch('');
                }
              }}
              className="input-field w-full text-left flex items-center justify-between gap-2 whitespace-nowrap"
            >
              <span className={countryFilter ? 'text-gray-900' : 'text-gray-900'}>
                {countryFilter || 'Any Country'}
              </span>
              <svg
                className={`w-4 h-4 text-gray-900 flex-shrink-0 transition-transform duration-200 ${countryDropdownOpen ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {countryDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-black shadow-lg z-50 overflow-hidden">
                {/* Search input */}
                <div className="p-2 border-b border-gray-100">
                  <div className="relative">
                    <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                    </svg>
                    <input
                      autoFocus
                      type="text"
                      placeholder="Search country..."
                      value={countrySearch}
                      onChange={(e) => setCountrySearch(e.target.value)}
                      className="w-full pl-7 pr-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-200"
                    />
                  </div>
                </div>

                {/* Options list */}
                <ul className="max-h-52 overflow-y-auto py-1">
                  {/* Clear option */}
                  <li>
                    <button
                      type="button"
                      onClick={() => { setCountryFilter(''); setCountryDropdownOpen(false); setCountrySearch(''); }}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-orange-50 transition-colors ${countryFilter === '' ? 'text-orange-600 font-medium bg-orange-50/60' : 'text-gray-500'
                        }`}
                    >
                      Any Country
                    </button>
                  </li>

                  {filteredCountries.length > 0 ? filteredCountries.map(country => (
                    <li key={country}>
                      <button
                        type="button"
                        onClick={() => { setCountryFilter(country); setCountryDropdownOpen(false); setCountrySearch(''); }}
                        className={`w-full text-left px-3 py-2 text-sm hover:bg-orange-50 transition-colors ${countryFilter === country ? 'text-orange-600 font-medium bg-orange-50/60' : 'text-gray-800'
                          }`}
                      >
                        {country}
                      </button>
                    </li>
                  )) : (
                    <li className="px-3 py-3 text-sm text-gray-400 text-center">No countries found</li>
                  )}
                </ul>
              </div>
            )}
          </div>
          <label className="flex items-center space-x-2 px-1">
            <input
              type="checkbox"
              className="rounded text-orange-500 focus:ring-orange-500 w-4 h-4 flex-shrink-0"
              checked={worldwideFilter}
              onChange={(e) => setWorldwideFilter(e.target.checked)}
            />
            <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Anywhere Globally</span>
          </label>
        </div>
      </div>

      {/* Job List */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
              <Link
                href={`/job/${job.id}`}
                key={job.id}
                className="bg-[#FFFEFC] rounded-xl p-6 border border-gray-50 shadow-md hover:shadow-md transition-all flex flex-col sm:flex-row gap-6 items-start sm:items-center cursor-pointer"
              >
                <div className="w-16 h-16 bg-orange-80 rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-200 overflow-hidden">
                  {job.company_logo_url ? (
                    <img src={job.company_logo_url} alt={job.company_name} className="w-full h-full object-scale-down" />
                  ) : (
                    <span className="text-orange-700 text-xs text-center px-1 font-medium">{job.company_name.substring(0, 2).toUpperCase()}</span>
                  )}
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{job.title}</h3>
                  <p className="text-gray-600 font-medium text-sm mb-2">
                    {job.company_name} &bull; <span className="text-gray-500">{job.is_worldwide ? 'Remote (Worldwide)' : `Remote (${job.country})`}</span>
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-3 py-1 bg-orange-50 text-orange-700 text-xs font-semibold rounded-full">{job.category}</span>
                    {job.salary && <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full">{job.salary} USD</span>}
                  </div>
                </div>
                <div className="flex flex-col sm:items-end gap-3 w-full sm:w-auto mt-4 sm:mt-0">
                  <span className="text-sm text-gray-500">{new Date(job.created_at).toLocaleDateString()}</span>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <span className="btn-secondary flex-1 sm:flex-none text-sm py-2 px-4 text-center">View Job</span>
                    <button
                      onClick={(e) => { e.preventDefault(); handleApply(job); }}
                      className="btn-primary flex-1 sm:flex-none text-sm py-2 px-4 text-center"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
