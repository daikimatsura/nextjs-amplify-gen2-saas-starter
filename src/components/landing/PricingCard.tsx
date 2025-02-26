"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plans } from "@/types/plan";
import { PricingEnum } from "@/schema/appSync/schema";
import { CheckIcon } from "@/components/ui/icons/checkIcons";

export const PricingCard: React.FC<Plans[number]> = ({
  description,
  price,
  features,
  buttonText,
  variant,
  highlight = false,
  plan,
}) => {
  const router = useRouter();
  const onClick = () => {
    router.push(`/onboarding?plan=${plan}`);
  };
  return (
    <div
      className={`
      rounded-lg border p-8 shadow-sm flex flex-col h-full
      ${
        highlight
          ? "border-indigo-200 ring-1 ring-indigo-600"
          : "border-gray-200"
      }
    `}
    >
      <div className="flex flex-col mb-5">
        <h3 className="text-lg font-semibold text-gray-900">
          {PricingEnum[plan as keyof typeof PricingEnum]}
        </h3>
        <p className="mt-4 text-sm text-gray-600">{description}</p>
        <p className="mt-4">
          <span className="text-4xl font-bold tracking-tight text-gray-900">
            ${price}
          </span>
          <span className="text-base font-medium text-gray-500">/月</span>
        </p>
        <ul className="mt-6 space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex gap-x-3">
              <CheckIcon />
              <span className="text-sm text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <Button
        className={`mt-auto  w-full ${
          highlight ? "bg-indigo-600 text-white hover:bg-indigo-700" : ""
        }`}
        variant={variant}
        onClick={onClick}
      >
        {buttonText}
      </Button>
    </div>
  );
};
