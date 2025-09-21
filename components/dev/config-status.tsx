"use client"

import { useState, useEffect } from "react"
import { validateConfiguration } from "@/lib/config/environment"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, CheckCircle } from "lucide-react"

export function ConfigStatus() {
  const [configStatus, setConfigStatus] = useState<{ isValid: boolean; warnings: string[] } | null>(null)

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV === "development") {
      setConfigStatus(validateConfiguration())
    }
  }, [])

  if (!configStatus || process.env.NODE_ENV !== "development") {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md">
      {configStatus.isValid ? (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">All configurations are properly set up!</AlertDescription>
        </Alert>
      ) : (
        <Alert className="border-amber-200 bg-amber-50">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            <div className="font-medium mb-2">Using dummy configurations:</div>
            <ul className="text-sm space-y-1">
              {configStatus.warnings.map((warning, index) => (
                <li key={index}>• {warning.replace(/🔥|🔐|💰/g, "").trim()}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
