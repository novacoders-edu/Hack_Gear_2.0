"use client"
import React from 'react';

export const SkeletonLoader = ({ type = 'card', count = 1 }) => {
  const skeletons = Array(count).fill(0);

  const CardSkeleton = () => (
    <div className="relative p-6 border border-neutral-800 bg-black/60 animate-pulse">
      <div className="h-4 w-20 bg-neutral-800 rounded mb-4"></div>
      <div className="h-8 w-32 bg-neutral-800 rounded mb-6"></div>
      <div className="space-y-3">
        <div className="h-3 w-full bg-neutral-800 rounded"></div>
        <div className="h-3 w-3/4 bg-neutral-800 rounded"></div>
        <div className="h-3 w-1/2 bg-neutral-800 rounded"></div>
      </div>
      <div className="mt-6 h-10 w-full bg-neutral-800 rounded"></div>
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-neutral-700/10 to-transparent"></div>
    </div>
  );

  const TextSkeleton = () => (
    <div className="animate-pulse space-y-3">
      <div className="h-4 w-3/4 bg-neutral-800 rounded"></div>
      <div className="h-4 w-full bg-neutral-800 rounded"></div>
      <div className="h-4 w-2/3 bg-neutral-800 rounded"></div>
    </div>
  );

  const StatSkeleton = () => (
    <div className="p-6 border border-neutral-800 bg-black/60 animate-pulse">
      <div className="h-12 w-24 bg-neutral-800 rounded mb-2"></div>
      <div className="h-3 w-16 bg-neutral-800 rounded"></div>
    </div>
  );

  const ImageSkeleton = () => (
    <div className="aspect-[3/4] bg-neutral-800 animate-pulse relative overflow-hidden">
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-neutral-700/20 to-transparent"></div>
    </div>
  );

  const renderSkeleton = () => {
    switch(type) {
      case 'card': return <CardSkeleton />;
      case 'text': return <TextSkeleton />;
      case 'stat': return <StatSkeleton />;
      case 'image': return <ImageSkeleton />;
      default: return <CardSkeleton />;
    }
  };

  return (
    <>
      {skeletons.map((_, idx) => (
        <div key={idx}>{renderSkeleton()}</div>
      ))}
    </>
  );
};
