import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const { data, error } = await supabase
          .from('jobs')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setJob(data);
      } catch (err) {
        console.error('Error fetching job details:', err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJob();
    }
  }, [id]);

  if (loading) {
    return <div className="max-w-5xl mx-auto px-4 py-20 text-center text-gray-500">Loading job details...</div>;
  }

  if (!job) {
    return <div className="max-w-5xl mx-auto px-4 py-20 text-center text-gray-500">Job not found.</div>;
  }

  const handleApply = () => {
    if (job.apply_link.includes('@')) {
      window.location.href = `mailto:${job.apply_link}?subject=Application for ${job.title}`;
    } else {
      window.open(job.apply_link.startsWith('http') ? job.apply_link : `https://${job.apply_link}`, '_blank');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/" className="text-orange-600 hover:text-orange-700 font-medium mb-8 inline-flex items-center">
        &larr; Back to all jobs
      </Link>
      
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Main Content */}
        <div className="lg:w-2/3">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{job.title}</h1>
            <div className="flex flex-wrap gap-3 text-sm text-gray-600 font-medium">
              <span className="flex items-center gap-1">
                {job.company_name}
              </span>
              <span>&bull;</span>
              <span>{job.is_worldwide ? 'Remote (Worldwide)' : `Remote (${job.country})`}</span>
              <span>&bull;</span>
              <span>{job.category}</span>
            </div>
          </div>
          
          <div className="prose prose-orange max-w-none whitespace-pre-wrap">
            <h2 className="text-xl font-bold mb-4 mt-8">About the Role</h2>
            <div className="text-gray-700 leading-relaxed mb-6">
              {job.description}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-28">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gray-100 border border-gray-200 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                {job.company_logo_url ? (
                  <img src={job.company_logo_url} alt={job.company_name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-400 text-xl font-medium">{job.company_name.substring(0,2).toUpperCase()}</span>
                )}
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900">{job.company_name}</h3>
                <span className="text-sm text-gray-500">Posted {new Date(job.created_at).toLocaleDateString()}</span>
              </div>
            </div>
            
            <div className="space-y-4 mb-8">
              {job.salary && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Salary</p>
                  <p className="font-medium text-gray-900">{job.salary}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-gray-500 mb-1">Category</p>
                <p className="font-medium text-gray-900">{job.category}</p>
              </div>
            </div>
            
            <button onClick={handleApply} className="btn-primary w-full text-center">
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
