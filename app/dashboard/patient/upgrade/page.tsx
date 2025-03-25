"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Check, CreditCard, Lock, Shield, Star, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function UpgradePage() {
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      // Show success message and redirect to premium dashboard
      alert("Payment successful! Your account has been upgraded to Premium.")
      router.push("/dashboard/premium")
    }, 2000)
  }

  const formatCardNumber = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, "")

    // Add space after every 4 digits
    const formatted = digits.replace(/(\d{4})(?=\d)/g, "$1 ")

    // Limit to 19 characters (16 digits + 3 spaces)
    return formatted.slice(0, 19)
  }

  const formatExpiryDate = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, "")

    // Format as MM/YY
    if (digits.length > 2) {
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`
    }

    return digits
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-6">
        <Link href="/dashboard/patient" className="mr-4">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-white">Upgrade to Premium</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-white/10 backdrop-blur-sm border-blue-800/30">
            <CardHeader>
              <CardTitle className="text-white">Premium Benefits</CardTitle>
              <CardDescription className="text-blue-100">
                Unlock advanced features and priority services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-md">
                  <div className="flex items-start gap-3">
                    <div className="bg-amber-500/20 p-2 rounded-md mt-0.5">
                      <Zap className="h-5 w-5 text-amber-300" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Instant AI Analysis</p>
                      <p className="text-sm text-blue-200">
                        Get immediate AI analysis of your medical documents without waiting
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-md">
                  <div className="flex items-start gap-3">
                    <div className="bg-amber-500/20 p-2 rounded-md mt-0.5">
                      <Star className="h-5 w-5 text-amber-300" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Doctor Network</p>
                      <p className="text-sm text-blue-200">
                        Access to our network of specialist doctors for consultations
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-md">
                  <div className="flex items-start gap-3">
                    <div className="bg-amber-500/20 p-2 rounded-md mt-0.5">
                      <CreditCard className="h-5 w-5 text-amber-300" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Direct Document Upload</p>
                      <p className="text-sm text-blue-200">Upload any medical document, even from other laboratories</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-md">
                  <div className="flex items-start gap-3">
                    <div className="bg-amber-500/20 p-2 rounded-md mt-0.5">
                      <Shield className="h-5 w-5 text-amber-300" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Priority Support</p>
                      <p className="text-sm text-blue-200">Get priority responses from our medical team</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-gradient-to-r from-amber-500/20 to-amber-300/10 p-4 rounded-md">
                <div className="flex items-center">
                  <Badge className="bg-gradient-to-r from-amber-500 to-amber-300 text-black border-0 mr-3">
                    PREMIUM
                  </Badge>
                  <p className="text-white font-medium">Upgrade today and get 20% off your first month!</p>
                </div>
                <p className="text-sm text-blue-200 mt-2">
                  Premium membership gives you access to all our advanced features and priority services for just 2,500
                  DZD/month.
                </p>
                <Button className="w-full bg-gradient-to-r from-amber-500 to-amber-300 text-black hover:from-amber-600 hover:to-amber-400">
                  Upgrade Now - 2,500 DZD/month
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-blue-800/30">
            <CardHeader>
              <CardTitle className="text-white">Payment Information</CardTitle>
              <CardDescription className="text-blue-100">Enter your payment details to upgrade</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="payment-method">Payment Method</Label>
                    <RadioGroup
                      id="payment-method"
                      value={paymentMethod}
                      onValueChange={setPaymentMethod}
                      className="flex flex-col space-y-1 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="credit-card" id="credit-card" />
                        <Label htmlFor="credit-card" className="flex items-center">
                          <CreditCard className="h-4 w-4 mr-2" />
                          Credit / Debit Card
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 opacity-50">
                        <RadioGroupItem value="paypal" id="paypal" disabled />
                        <Label htmlFor="paypal">PayPal (Coming Soon)</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {paymentMethod === "credit-card" && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="card-number">Card Number</Label>
                        <div className="relative">
                          <Input
                            id="card-number"
                            placeholder="1234 5678 9012 3456"
                            className="bg-white/5 border-blue-800/30 text-white pl-10"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                            maxLength={19}
                            required
                          />
                          <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 h-4 w-4" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="card-name">Cardholder Name</Label>
                        <Input
                          id="card-name"
                          placeholder="John Smith"
                          className="bg-white/5 border-blue-800/30 text-white"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry-date">Expiry Date</Label>
                          <Input
                            id="expiry-date"
                            placeholder="MM/YY"
                            className="bg-white/5 border-blue-800/30 text-white"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                            maxLength={5}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <div className="relative">
                            <Input
                              id="cvv"
                              placeholder="123"
                              className="bg-white/5 border-blue-800/30 text-white pl-10"
                              value={cvv}
                              onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                              maxLength={3}
                              required
                            />
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 h-4 w-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="pt-4">
                    <Button type="submit" className="w-full" disabled={isProcessing}>
                      {isProcessing ? "Processing..." : "Upgrade Now - 2,500 DZD/month"}
                    </Button>
                    <p className="text-xs text-blue-200 text-center mt-2">
                      Your payment is secured with 256-bit encryption. You can cancel anytime.
                    </p>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="bg-white/10 backdrop-blur-sm border-blue-800/30 sticky top-6">
            <CardHeader>
              <CardTitle className="text-white">Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-blue-200">Premium Membership</span>
                  <span className="text-white">3,000 DZD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-200">Discount (20%)</span>
                  <span className="text-green-400">-500 DZD</span>
                </div>
                <div className="border-t border-blue-800/30 pt-4 flex justify-between">
                  <span className="text-white font-medium">Total (monthly)</span>
                  <span className="text-white font-bold">2,500 DZD</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-start">
                  <Check className="h-4 w-4 text-green-400 mt-0.5 mr-2" />
                  <p className="text-sm text-blue-100">Instant AI analysis of medical documents</p>
                </div>
                <div className="flex items-start">
                  <Check className="h-4 w-4 text-green-400 mt-0.5 mr-2" />
                  <p className="text-sm text-blue-100">Access to specialist doctor network</p>
                </div>
                <div className="flex items-start">
                  <Check className="h-4 w-4 text-green-400 mt-0.5 mr-2" />
                  <p className="text-sm text-blue-100">Direct upload of any medical document</p>
                </div>
                <div className="flex items-start">
                  <Check className="h-4 w-4 text-green-400 mt-0.5 mr-2" />
                  <p className="text-sm text-blue-100">Priority support from our medical team</p>
                </div>
                <div className="flex items-start">
                  <Check className="h-4 w-4 text-green-400 mt-0.5 mr-2" />
                  <p className="text-sm text-blue-100">Cancel anytime, no long-term commitment</p>
                </div>
              </div>

              <div className="mt-6 bg-blue-500/10 border border-blue-500/30 rounded-md p-4 text-center">
                <p className="text-sm text-blue-100">
                  Need help? Contact our support team at{" "}
                  <span className="text-blue-300">support@deepvisionlab.com</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-6">
        <Card className="bg-white/10 backdrop-blur-sm border-blue-800/30">
          <CardHeader>
            <CardTitle className="text-white">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-white font-medium mb-1">What is included in the Premium membership?</h3>
                <p className="text-sm text-blue-100">
                  Premium membership includes instant AI analysis of medical documents, access to our specialist doctor
                  network, direct upload of any medical document, and priority support from our medical team.
                </p>
              </div>
              <div>
                <h3 className="text-white font-medium mb-1">Can I cancel my subscription?</h3>
                <p className="text-sm text-blue-100">
                  Yes, you can cancel your subscription at any time. Your premium benefits will continue until the end
                  of your current billing period.
                </p>
              </div>
              <div>
                <h3 className="text-white font-medium mb-1">How secure is my payment information?</h3>
                <p className="text-sm text-blue-100">
                  We use industry-standard encryption to protect your payment information. We never store your full
                  credit card details on our servers.
                </p>
              </div>
              <div>
                <h3 className="text-white font-medium mb-1">Will I be charged automatically?</h3>
                <p className="text-sm text-blue-100">
                  Yes, your subscription will automatically renew each month until you cancel. You will receive an email
                  reminder before each renewal.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

