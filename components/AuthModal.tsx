"use client"

import { useState, useEffect } from "react"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { X } from "lucide-react"

interface AuthModalProps {
  onClose: () => void
  defaultMode?: "signin" | "signup"
}

export default function AuthModal({ onClose, defaultMode = "signin" }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(defaultMode === "signup")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "EVENT_OWNER",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const { data: session, status } = useSession()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "EVENT_OWNER",
    })
    setError("")
  }, [isSignUp])

  useEffect(() => {
    if (status === "authenticated") {
      onClose()
      router.push("/dashboard")
    }
  }, [status, router, onClose])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      if (isSignUp) {
        console.log("Attempting to register user...") 
        
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })

        console.log("Registration response status:", response.status) 

        if (response.ok) {
          console.log("Registration successful")
          
          toast({
            title: "Account Created Successfully",
            description: "Your account has been created. Please sign in to continue.",
          })
          console.log("Success toast triggered") 
          
          setIsSignUp(false)
          setFormData({
            name: "",
            email: formData.email, 
            password: "",
            role: "EVENT_OWNER",
          })
        } else {
          const data = await response.json()
          const errorMessage = data.error || "Something went wrong"
          console.log("Registration error:", errorMessage) 
          
          setError(errorMessage)
        }
      } else {
        console.log("Attempting to sign in...") 
        
        const result = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        })

        console.log("Sign in result:", result) 

        if (result?.error) {
          const errorMessage = result.error === "CredentialsSignin" 
            ? "Invalid email or password. Please check your credentials and try again."
            : "Authentication failed. Please try again."
          
          console.log("Sign in error:", errorMessage)
          
          setError(errorMessage)
        } else if (result?.ok) {
          console.log("Sign in successful") 
          
          toast({
            title: "Sign In Successful",
            description: "Welcome back! Redirecting to your dashboard...",
          })
          console.log("Success toast triggered") 
          setTimeout(() => {
            router.push("/dashboard")
            onClose()
          }, 1500)
        }
      }
    } catch (error) {
      console.error(isSignUp ? "Registration catch error:" : "Sign in catch error:", error) 
      
      const errorMessage = "Something went wrong. Please try again later."
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const toggleMode = () => {
    setIsSignUp(!isSignUp)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 py-4 px-4 sm:px-6 lg:px-8">
      <div className="relative w-full max-w-md">
        <div className="absolute top-2 right-2 z-10">
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 transition-colors bg-white rounded-full p-1 shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              {isSignUp ? "Sign Up" : "Sign In"}
            </CardTitle>
            <CardDescription className="text-center">
              {isSignUp
                ? "Create your account to get started"
                : "Enter your credentials to access your account"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                  minLength={isSignUp ? 6 : undefined}
                />
              </div>

              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select 
                    value={formData.role} 
                    onValueChange={(value) => setFormData({ ...formData, role: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EVENT_OWNER">Event Owner</SelectItem>
                      <SelectItem value="STAFF">Staff</SelectItem>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading 
                  ? (isSignUp ? "Creating account..." : "Signing in...") 
                  : (isSignUp ? "Sign Up" : "Sign In")
                }
              </Button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                {isSignUp ? "Already have an account? " : "Don't have an account? "}
                <button
                  type="button"
                  onClick={toggleMode}
                  className="text-blue-600 hover:underline"
                >
                  {isSignUp ? "Sign in" : "Sign up"}
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}