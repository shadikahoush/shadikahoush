"use client"

import { Check } from "lucide-react"

type Step = {
  id: string
  title: string
}

type OnboardingProgressProps = {
  steps: Step[]
  currentStep: number
  onStepClick: (index: number) => void
}

export function OnboardingProgress({ steps, currentStep, onStepClick }: OnboardingProgressProps) {
  return (
    <div className="relative">
      <div className="hidden sm:flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center" onClick={() => onStepClick(index)}>
            <div
              className={`
                flex items-center justify-center w-10 h-10 rounded-full border-2 
                ${
                  index < currentStep
                    ? "bg-primary border-primary text-primary-foreground"
                    : index === currentStep
                      ? "border-primary text-primary"
                      : "border-muted-foreground text-muted-foreground"
                }
                ${index < currentStep ? "cursor-pointer" : ""}
              `}
            >
              {index < currentStep ? <Check className="w-5 h-5" /> : <span>{index + 1}</span>}
            </div>
            <span
              className={`
                mt-2 text-sm font-medium
                ${index <= currentStep ? "text-foreground" : "text-muted-foreground"}
              `}
            >
              {step.title}
            </span>
          </div>
        ))}
      </div>

      {/* Mobile view */}
      <div className="sm:hidden">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium">
            Step {currentStep + 1} of {steps.length}
          </span>
          <span className="text-sm font-medium">{steps[currentStep].title}</span>
        </div>
        <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
          <div
            className="bg-primary h-full transition-all duration-300 ease-in-out"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          />
        </div>
      </div>

      {/* Progress line for desktop */}
      <div className="hidden sm:block absolute top-5 left-0 right-0 h-[2px] bg-muted -z-10">
        <div
          className="h-full bg-primary transition-all duration-300 ease-in-out"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        />
      </div>
    </div>
  )
}
