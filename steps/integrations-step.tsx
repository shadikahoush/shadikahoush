"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { useOnboarding } from "../context/onboarding-context"
import type { StepProps } from "../types/step-props"

const formSchema = z.object({
  selectedIntegrations: z.array(z.string()),
})

const integrations = [
  {
    id: "slack",
    name: "Slack",
    description: "Connect with your team's Slack workspace",
    icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/slack.svg",
  },
  {
    id: "google",
    name: "Google Workspace",
    description: "Connect with Google Calendar, Drive, and more",
    icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/google.svg",
  },
  {
    id: "github",
    name: "GitHub",
    description: "Connect with your GitHub repositories",
    icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/github.svg",
  },
  {
    id: "salesforce",
    name: "Salesforce",
    description: "Connect with your Salesforce account",
    icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/salesforce.svg",
  },
  {
    id: "jira",
    name: "Jira",
    description: "Connect with your Jira projects",
    icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/jira.svg",
  },
]

export function IntegrationsStep({ onNext, onPrevious }: StepProps) {
  const { data, updateData } = useOnboarding()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      selectedIntegrations: data.selectedIntegrations,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateData(values)
    onNext()
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Connect Your Tools</h2>
        <p className="text-muted-foreground mt-2">Integrate with your favorite tools to streamline your workflow</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="selectedIntegrations"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Available Integrations</FormLabel>
                  <FormDescription>Select the tools you want to connect with</FormDescription>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {integrations.map((integration) => (
                    <FormField
                      key={integration.id}
                      control={form.control}
                      name="selectedIntegrations"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={integration.id}
                            className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(integration.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, integration.id])
                                    : field.onChange(field.value?.filter((value) => value !== integration.id))
                                }}
                              />
                            </FormControl>
                            <div className="flex flex-1 space-x-3">
                              <img
                                src={integration.icon || "/placeholder.svg"}
                                alt={integration.name}
                                className="h-6 w-6"
                              />
                              <div className="space-y-1 leading-none">
                                <FormLabel className="text-base">{integration.name}</FormLabel>
                                <FormDescription>{integration.description}</FormDescription>
                              </div>
                            </div>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                </div>
                <FormDescription className="mt-4 text-center">
                  You can always add or remove integrations later
                </FormDescription>
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
