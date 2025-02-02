import React, { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  bgColor: string;
}

export function FeatureCard({
  icon,
  title,
  description,
  bgColor,
}: FeatureCardProps) {
  return (
    <div className="flex flex-col items-start">
      <div className={`rounded-lg ${bgColor} p-3`}>{icon}</div>
      <h3 className="mt-4 text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  );
}
