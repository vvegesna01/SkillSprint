"use client";

import React from 'react';
import { Trash2 } from 'lucide-react';
import { JobDescription } from '@/lib/types';

interface JobDescriptionCardProps {
  job: JobDescription;
  index: number;
  onUpdate: (id: string, field: keyof JobDescription, value: string) => void;
  onRemove: (id: string) => void;
}

export function JobDescriptionCard({ job, index, onUpdate, onRemove }: JobDescriptionCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 relative">
      <div className="flex items-center justify-between mb-5">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold">
          {index + 1}
        </span>
        {index > 0 && (
          <button
            onClick={() => onRemove(job.id)}
            className="text-gray-400 hover:text-red-500 transition-colors p-1"
            aria-label="Remove job"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Target Role</label>
          <input
            type="text"
            placeholder="e.g., Backend Software Engineer"
            value={job.role}
            onChange={(e) => onUpdate(job.id, 'role', e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-gray-50/50"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Company <span className="text-gray-400 font-normal">(Optional)</span></label>
          <input
            type="text"
            placeholder="e.g., Google"
            value={job.company}
            onChange={(e) => onUpdate(job.id, 'company', e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-gray-50/50"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Job Description</label>
          <textarea
            placeholder="Paste the full job description here..."
            value={job.description}
            onChange={(e) => onUpdate(job.id, 'description', e.target.value)}
            rows={6}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none bg-gray-50/50"
          />
        </div>
      </div>
    </div>
  );
}

export default JobDescriptionCard;
