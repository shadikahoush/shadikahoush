"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type OnboardingData = {
  // Personal info
  firstName: string
  lastName: string
  email: string
  role: string

  // Company info
  companyName: string
  companySize: string
  industry: string

  // Preferences
  notifications: boolean
  theme: "light" | "dark" | "system"
  features: string[]

  // Integrations
  selectedIntegrations: string[]
}

type OnboardingContextType = {
  data: OnboardingData
  updateData: (newData: Partial<OnboardingData>) => void
}

const defaultData: OnboardingData = {
  firstName: "",
  lastName: "",
  email: "",
  role: "",
  companyName: "",
  companySize: "",
  industry: "",
  notifications: true,
  theme: "system",
  features: [],
  selectedIntegrations: [],
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined)

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<OnboardingData>(defaultData)

  const updateData = (newData: Partial<OnboardingData>) => {
    setData((prevData) => ({ ...prevData, ...newData }))
  }

  return <OnboardingContext.Provider value={{ data, updateData }}>{children}</OnboardingContext.Provider>
}

export function useOnboarding() {
  const context = useContext(OnboardingContext)
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider")
  }
  return context
}
