"use client";

import React from 'react';
import { cn } from 'cn';
import SkillBadge from '@/components/SkillBadge';

interface SkillGapCardProps {
  title: string;
  skills: string[];
  variant: 'current' | 'required' | 'missing';
  icon?: React.ReactNode;
}

export function SkillGapCard({ title, skills, variant, icon }: SkillGapCardProps) {
  const bgClasses = {
    current: 'bg-white',
    required: 'bg-gray-50',
    missing: 'bg-amber-50/30',
  };
  
  const badgeVariant = {
    current: 'matched' as const,
    required: 'default' as const,
    missing: 'missing' as const,
  };

  return (
    <div className={cn('rounded-xl border border-gray-200 p-6', bgClasses[variant])}>
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <SkillBadge key={skill} skill={skill} variant={badgeVariant[variant]} />
        ))}
      </div>
    </div>
  );
}

export default SkillGapCard;
