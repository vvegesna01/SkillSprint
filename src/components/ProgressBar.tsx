"use client";

import React, { useEffect, useState } from 'react';
import { cn } from 'cn';

interface ProgressBarProps {
  percentage: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

function getColor(percentage: number) {
  if (percentage >= 70) return { stroke: '#10b981', text: 'text-emerald-600' };
  if (percentage >= 40) return { stroke: '#f59e0b', text: 'text-amber-600' };
  return { stroke: '#ef4444', text: 'text-red-600' };
}

export function ProgressBar({ percentage, label, size = 'md' }: ProgressBarProps) {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => setAnimatedPercentage(percentage), 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  const sizeConfig = {
    sm: { width: 80, stroke: 6, fontSize: 'text-lg' },
    md: { width: 120, stroke: 8, fontSize: 'text-2xl' },
    lg: { width: 160, stroke: 10, fontSize: 'text-4xl' },
  };

  const config = sizeConfig[size];
  const radius = (config.width - config.stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedPercentage / 100) * circumference;
  const color = getColor(percentage);

  return (
    <div className="flex flex-col items-center">
      <svg width={config.width} height={config.width} className="-rotate-90">
        <circle
          cx={config.width / 2}
          cy={config.width / 2}
          r={radius}
          fill="none"
          stroke="#f3f4f6"
          strokeWidth={config.stroke}
        />
        <circle
          cx={config.width / 2}
          cy={config.width / 2}
          r={radius}
          fill="none"
          stroke={color.stroke}
          strokeWidth={config.stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <span className={cn('font-bold -mt-[calc(50%+0.5rem)] mb-[calc(50%-0.5rem)]', config.fontSize, color.text)} style={{ marginTop: `-${config.width / 2 + 8}px`, marginBottom: `${config.width / 2 - 8}px` }}>
        {animatedPercentage}%
      </span>
      {label && <span className="text-sm text-gray-500 mt-2">{label}</span>}
    </div>
  );
}

export function LinearProgress({ percentage, label }: { percentage: number; label?: string }) {
  const color = getColor(percentage);
  
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <span className={cn('text-sm font-bold', color.text)}>{percentage}%</span>
        </div>
      )}
      <div className="w-full bg-gray-100 rounded-full h-2.5">
        <div 
          className="h-2.5 rounded-full transition-all duration-700 ease-out" 
          style={{ width: `${percentage}%`, backgroundColor: color.stroke }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
