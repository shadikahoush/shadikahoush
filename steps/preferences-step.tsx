"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { useOnboarding } from "../context/onboarding-context"
import type { StepProps } from "../types/step-props"

const formSchema = z.object({
  notifications: z.boolean(),
  theme: z.enum(["light", "dark", "system"]),
  features: z.array(z.string()).min(1, "Please select at least one feature"),
})

const features = [
  {
    id: "analytics",
    label: "Analytics Dashboard",
    description: "Get detailed insights about your business performance",
  },
  {
    id: "automation",
    label: "Workflow Automation",
    description: "Automate repetitive tasks and save time",
  },
  {
    id: "collaboration",
    label: "Team Collaboration",
    description: "Work together with your team in real-time",
  },
  {
    id: "reporting",
    label: "Advanced Reporting",
    description: "Generate comprehensive reports for your business",
  },
]

export function PreferencesStep({ onNext, onPrevious }: StepProps) {
  const { data, updateData } = useOnboarding()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      notifications: data.notifications,
      theme: data.theme,
      features: data.features,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateData(values)
    onNext()
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Your Preferences</h2>
        <p className="text-muted-foreground mt-2">Customize your experience to match your workflow</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="notifications"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Email Notifications</FormLabel>
                  <FormDescription>Receive updates about product features and important announcements</FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="theme"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Theme Preference</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="light" />
                      </FormControl>
                      <FormLabel className="font-normal">Light</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="dark" />
                      </FormControl>
                      <FormLabel className="font-normal">Dark</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="system" />
                      </FormControl>
                      <FormLabel className="font-normal">System</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="features"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Features you're interested in</FormLabel>
                  <FormDescription>Select the features you want to explore first</FormDescription>
                </div>
                {features.map((feature) => (
                  <FormField
                    key={feature.id}
                    control={form.control}
                    name="features"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={feature.id}
                          className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 mb-4"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(feature.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, feature.id])
                                  : field.onChange(field.value?.filter((value) => value !== feature.id))
                              }}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-base">{feature.label}</FormLabel>
                            <FormDescription>{feature.description}</FormDescription>
                          </div>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </FormItem>
            )}
          />

          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={onPrevious}>
              Back
            </Button>
            <Button type="submit">Continue</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
