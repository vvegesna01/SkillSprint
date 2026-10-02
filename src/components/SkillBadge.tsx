"use client";

import React from 'react';
import { AlertCircle } from 'lucide-react';
import { cn } from "cn";

export interface SkillBadgeProps {
  skill: string;
  variant?: 'default' | 'matched' | 'missing' | 'new';
}

export function SkillBadge({ skill, variant = 'default' }: SkillBadgeProps) {
  const baseClasses = "px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1";
  
  const variantClasses = {
    default: "bg-gray-100 text-gray-700 border border-gray-200",
    matched: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    missing: "bg-amber-50 text-amber-700 border border-amber-200",
    new: "bg-blue-50 text-blue-700 border border-blue-200",
  };

  return (
    <span className={cn(baseClasses, variantClasses[variant])}>
      {variant === 'missing' && <AlertCircle className="w-3 h-3" />}
      {skill}
    </span>
  );
}
export default SkillBadge;
