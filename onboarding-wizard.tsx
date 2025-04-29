"use client"

import { useState } from "react"
import { PersonalInfoStep } from "./steps/personal-info-step"
import { CompanyInfoStep } from "./steps/company-info-step"
import { PreferencesStep } from "./steps/preferences-step"
import { IntegrationsStep } from "./steps/integrations-step"
import { CompletionStep } from "./steps/completion-step"
import { OnboardingProvider } from "./context/onboarding-context"
import { OnboardingProgress } from "./components/onboarding-progress"
import { Card, CardContent } from "@/components/ui/card"

export default function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    { id: "personal", title: "Personal Info", component: PersonalInfoStep },
    { id: "company", title: "Company Details", component: CompanyInfoStep },
    { id: "preferences", title: "Preferences", component: PreferencesStep },
    { id: "integrations", title: "Integrations", component: IntegrationsStep },
    { id: "complete", title: "All Set!", component: CompletionStep },
  ]

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  const CurrentStepComponent = steps[currentStep].component

  return (
    <OnboardingProvider>
      <div className="container mx-auto py-10 px-4 max-w-3xl">
        <h1 className="text-3xl font-bold text-center mb-8">Welcome to ProductName</h1>
        <p className="text-center text-muted-foreground mb-8">Let's get you set up in just a few steps</p>

        <OnboardingProgress
          steps={steps}
          currentStep={currentStep}
          onStepClick={(index) => {
            // Only allow clicking on completed steps
            if (index < currentStep) {
              setCurrentStep(index)
            }
          }}
        />

        <Card className="mt-8">
          <CardContent className="pt-6">
            <CurrentStepComponent
              onNext={goToNextStep}
              onPrevious={goToPreviousStep}
              isFirstStep={currentStep === 0}
              isLastStep={currentStep === steps.length - 1}
            />
          </CardContent>
        </Card>
      </div>
    </OnboardingProvider>
  )
}
