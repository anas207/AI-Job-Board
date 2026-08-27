"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UploadCloud } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { useAuth } from '../../../context/AuthContext';
import ProtectedRoute from '../../../components/auth/ProtectedRoute';

const PostJobContent = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    isWorldwide: false,
    country: '',
    applyLink: '',
    salary: '',
    companyName: '',
    category: '',
  });
  const [description, setDescription] = useState('');
  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleLogoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setLogo(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      let logoUrl = null;
      
      // Upload Logo if provided
      if (logo) {
        const fileExt = logo.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('company-logos')
          .upload(fileName, logo);
          
        if (uploadError) {
          throw new Error('Logo upload failed: ' + uploadError.message);
        }
        
        const { data: publicUrlData } = supabase.storage
          .from('company-logos')
          .getPublicUrl(fileName);
          
        logoUrl = publicUrlData.publicUrl;
      }

      const { error: insertError } = await supabase
        .from('jobs')
        .insert([
          {
            employer_id: user.id,
            title: formData.title,
            is_worldwide: formData.isWorldwide,
            country: formData.isWorldwide ? null : formData.country,
            apply_link: formData.applyLink,
            salary: formData.salary,
            company_name: formData.companyName,
            category: formData.category,
            description: description,
            company_logo_url: logoUrl,
            status: 'active'
          }
        ]);

      if (insertError) throw insertError;

      alert('Job posted successfully!');
      router.push('/employer/dashboard');
    } catch (err) {
      console.error(err);
      alert('Error posting job: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Post A New AI Job</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Job Details Section */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">Job Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="label">Job Title *</label>
                <input type="text" name="title" required className="input-field" placeholder="e.g. Senior AI Engineer" value={formData.title} onChange={handleInputChange} />
              </div>
              
              <div>
                <label className="label">Category *</label>
                <select name="category" required className="input-field" value={formData.category} onChange={handleInputChange}>
                  <option value="">Select a category</option>
                  <option value="AI Engineering">AI Engineering</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="Research">Research</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="label">Salary Range (Optional)</label>
                <input type="text" name="salary" className="input-field" placeholder="e.g. $120k - $160k" value={formData.salary} onChange={handleInputChange} />
              </div>

              <div className="md:col-span-2 flex items-center space-x-3 mt-2">
                <input type="checkbox" name="isWorldwide" id="isWorldwide" className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500" checked={formData.isWorldwide} onChange={handleInputChange} />
                <label htmlFor="isWorldwide" className="text-gray-700 font-medium">Is this role open worldwide?</label>
              </div>

              {!formData.isWorldwide && (
                <div className="md:col-span-2">
                  <label className="label">Country / Location *</label>
                  <input type="text" name="country" className="input-field" placeholder="e.g. United States, Remote" required={!formData.isWorldwide} value={formData.country} onChange={handleInputChange} />
                </div>
              )}
            </div>
          </section>

          {/* Job Description Section */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">Job Description *</h2>
            <div className="mb-6">
              <textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                className="input-field h-64 resize-y" 
                placeholder="Describe the role, requirements, and benefits..."
                required
              ></textarea>
            </div>
          </section>

          {/* Company Details Section */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">Company Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="label">Company Name *</label>
                <input type="text" name="companyName" required className="input-field" placeholder="e.g. TechCorp Inc." value={formData.companyName} onChange={handleInputChange} />
              </div>

              <div className="md:col-span-2">
                <label className="label">Application Link or Email *</label>
                <input type="text" name="applyLink" required className="input-field" placeholder="e.g. https://company.com/apply or apply@company.com" value={formData.applyLink} onChange={handleInputChange} />
              </div>

              <div className="md:col-span-2">
                <label className="label">Company Logo</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-orange-500 transition-colors bg-gray-50">
                  <div className="space-y-1 text-center">
                    <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600 justify-center">
                      <label htmlFor="logo-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-orange-500 px-2 py-1">
                        <span>Upload a file</span>
                        <input id="logo-upload" name="logo-upload" type="file" accept="image/*" className="sr-only" onChange={handleLogoChange} />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                    {logo && <p className="text-sm text-green-600 font-medium mt-2">Selected: {logo.name}</p>}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="pt-6 border-t border-gray-200">
            <button type="submit" disabled={loading} className="btn-primary w-full md:w-auto md:px-12 text-lg disabled:opacity-70 disabled:cursor-not-allowed">
              {loading ? 'Posting...' : 'Post Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function PostJob() {
  return (
    <ProtectedRoute>
      <PostJobContent />
    </ProtectedRoute>
  );
}
