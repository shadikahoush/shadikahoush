"use client"

import { Button } from "@/components/ui/button"
import { useOnboarding } from "../context/onboarding-context"
import type { StepProps } from "../types/step-props"
import { CheckCircle2 } from "lucide-react"
import { useRouter } from "next/navigation"

export function CompletionStep({ onPrevious }: StepProps) {
  const { data } = useOnboarding()
  const router = useRouter()

  const handleFinish = () => {
    // In a real application, you would submit all the collected data to your backend
    console.log("Onboarding data:", data)

    // Redirect to the dashboard or home page
    // router.push("/dashboard")

    // For demo purposes, we'll just log the data and show an alert
    alert("Onboarding complete! Check the console for the collected data.")
  }

  return (
    <div className="space-y-6 text-center">
      <div className="flex justify-center">
        <CheckCircle2 className="h-16 w-16 text-green-500" />
      </div>

      <div>
        <h2 className="text-2xl font-bold">You're All Set!</h2>
        <p className="text-muted-foreground mt-2">Thank you for completing the onboarding process, {data.firstName}!</p>
      </div>

      <div className="bg-muted p-4 rounded-lg text-left">
        <h3 className="font-medium mb-2">Here's what we've set up for you:</h3>
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <span className="font-medium">Personal Profile:</span>
            <span>
              {data.firstName} {data.lastName}
            </span>
          </li>
          <li className="flex items-center gap-2">
            <span className="font-medium">Company:</span>
            <span>{data.companyName}</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="font-medium">Preferences:</span>
            <span>{data.features.length} features selected</span>
          </li>
          {data.selectedIntegrations.length > 0 && (
            <li className="flex items-center gap-2">
              <span className="font-medium">Integrations:</span>
              <span>{data.selectedIntegrations.length} tools connected</span>
            </li>
          )}
        </ul>
      </div>

      <div className="space-y-4">
        <p>Your workspace is ready. You can now start using all the features of our platform.</p>
        <p className="text-muted-foreground">
          Need help getting started? Check out our{" "}
          <a href="#" className="text-primary underline">
            documentation
          </a>{" "}
          or{" "}
          <a href="#" className="text-primary underline">
            contact support
          </a>
          .
        </p>
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onPrevious}>
          Back
        </Button>
        <Button onClick={handleFinish}>Go to Dashboard</Button>
      </div>
    </div>
  )
}
