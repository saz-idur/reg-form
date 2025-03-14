"use client"

import { useState, type FormEvent } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion, AnimatePresence } from "framer-motion"
import { Check, AlertCircle, User, School, CreditCard, Receipt, X, Loader2 } from "lucide-react"
import { submitRegistration, type RegistrationFormData, type RegistrationResponse } from "@/app/actions/registration"

export default function RegistrationForm() {
  const [formData, setFormData] = useState<RegistrationFormData>({
    name: "",
    branch: "",
    batch: "",
    whatsappNumber: "",
    paymentMethod: "",
    sendMoneyNumber: "",
    transactionId: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [serverResponse, setServerResponse] = useState<RegistrationResponse | null>(null)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Name validation - letters only
    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      newErrors.name = "Name should contain only letters and spaces"
    }

    if (!formData.branch) {
      newErrors.branch = "Branch selection is required"
    }

    if (!formData.batch.trim()) {
      newErrors.batch = "Batch information is required"
    }

    // WhatsApp number validation - 11 digits starting with 01
    if (!formData.whatsappNumber.trim()) {
      newErrors.whatsappNumber = "WhatsApp number is required"
    } else if (!/^01\d{9}$/.test(formData.whatsappNumber)) {
      newErrors.whatsappNumber = "Your WhatsApp number should be 11 digits (e.g. '01712345678')"
    }

    if (!formData.paymentMethod) {
      newErrors.paymentMethod = "Payment method is required"
    }

    // Send money number validation - 11-12 digits
    if (!formData.sendMoneyNumber.trim()) {
      newErrors.sendMoneyNumber = "Send money number is required"
    } else if (!/^\d{11,12}$/.test(formData.sendMoneyNumber)) {
      newErrors.sendMoneyNumber = "Send money number should be 11-12 digits"
    }

    if (!formData.transactionId.trim()) {
      newErrors.transactionId = "Transaction ID is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      setIsSubmitting(true)

      try {
        // Submit to Supabase via server action
        const response = await submitRegistration(formData)
        setServerResponse(response)

        if (response.success) {
          setShowModal(true)
          handleClear()

          // Hide modal after 4 seconds
          setTimeout(() => {
            setShowModal(false)
          }, 4000)
        } else {
          // If there's a specific field error, update the errors state
          if (response.error === "invalid_name") {
            setErrors((prev) => ({ ...prev, name: response.message }))
          } else if (response.error === "invalid_whatsapp") {
            setErrors((prev) => ({ ...prev, whatsappNumber: response.message }))
          } else if (response.error === "invalid_send_money") {
            setErrors((prev) => ({ ...prev, sendMoneyNumber: response.message }))
          }
        }
      } catch (error) {
        console.error("Error submitting form:", error)
        setServerResponse({
          success: false,
          message: "An unexpected error occurred. Please try again.",
        })
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const handleClear = () => {
    setFormData({
      name: "",
      branch: "",
      batch: "",
      whatsappNumber: "",
      paymentMethod: "",
      sendMoneyNumber: "",
      transactionId: "",
    })
    setErrors({})
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Clear error when field is filled
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  }

  return (
    <motion.div className="space-y-6" initial="hidden" animate="visible" variants={containerVariants}>
      <motion.h2 className="text-2xl font-medium text-center text-gray-700" variants={itemVariants}>
        Registration Form
      </motion.h2>

      {/* Success Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full relative"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="flex flex-col items-center text-center gap-4">
                <div className="bg-green-50 p-3 rounded-full">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Registration Successful!</h3>
                <p className="text-gray-600">
                  Thank you for registering! Your submission has been received and is currently under review. Once
                  verified, you will receive a unique QR code via WhatsApp.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4" variants={containerVariants}>
        {/* Personal Information Section */}
        <motion.div variants={itemVariants}>
          <Card className="p-5 bg-white border-gray-100 rounded-lg shadow-sm hover:shadow transition-shadow">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gray-50 p-2 rounded-md">
                <User className="h-5 w-5 text-gray-500" />
              </div>
              <h3 className="font-medium text-gray-700">Personal Information</h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium flex items-center text-gray-600">
                  Name <span className="text-gray-400 ml-1">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className={`w-full bg-gray-50/50 border-gray-200 focus:border-brown-500 focus:ring-brown-50 ${errors.name ? "border-red-200 ring-red-50" : ""}`}
                />
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-red-400 text-xs flex items-center gap-1 mt-1"
                  >
                    <AlertCircle className="h-3 w-3" /> {errors.name}
                  </motion.p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="whatsappNumber" className="text-sm font-medium flex items-center text-gray-600">
                  Number (WhatsApp) <span className="text-gray-400 ml-1">*</span>
                </Label>
                <Input
                  id="whatsappNumber"
                  placeholder="Your WhatsApp number (e.g. 01712345678)"
                  value={formData.whatsappNumber}
                  onChange={(e) => handleChange("whatsappNumber", e.target.value)}
                  className={`w-full bg-gray-50/50 border-gray-200 focus:border-brown-500 focus:ring-brown-50 ${errors.whatsappNumber ? "border-red-200 ring-red-50" : ""}`}
                />
                {errors.whatsappNumber && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-red-400 text-xs flex items-center gap-1 mt-1"
                  >
                    <AlertCircle className="h-3 w-3" /> {errors.whatsappNumber}
                  </motion.p>
                )}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Academic Information Section */}
        <motion.div variants={itemVariants}>
          <Card className="p-5 bg-white border-gray-100 rounded-lg shadow-sm hover:shadow transition-shadow">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gray-50 p-2 rounded-md">
                <School className="h-5 w-5 text-gray-500" />
              </div>
              <h3 className="font-medium text-gray-700">Academic Information</h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="branch" className="text-sm font-medium flex items-center text-gray-600">
                  Branch <span className="text-gray-400 ml-1">*</span>
                </Label>
                <Select value={formData.branch} onValueChange={(value) => handleChange("branch", value)}>
                  <SelectTrigger
                    className={`w-full bg-gray-50/50 border-gray-200 focus:border-brown-500 focus:ring-brown-50 ${errors.branch ? "border-red-200 ring-red-50" : ""}`}
                  >
                    <SelectValue placeholder="Select branch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="motijheel">Motijheel</SelectItem>
                    <SelectItem value="mugda">Mugda</SelectItem>
                    <SelectItem value="banasree">Banasree</SelectItem>
                  </SelectContent>
                </Select>
                {errors.branch && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-red-400 text-xs flex items-center gap-1 mt-1"
                  >
                    <AlertCircle className="h-3 w-3" /> {errors.branch}
                  </motion.p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="batch" className="text-sm font-medium flex items-center text-gray-600">
                  Batch <span className="text-gray-400 ml-1">*</span>
                </Label>
                <Input
                  id="batch"
                  placeholder="Your batch (e.g., 2015-2016)"
                  value={formData.batch}
                  onChange={(e) => handleChange("batch", e.target.value)}
                  className={`w-full bg-gray-50/50 border-gray-200 focus:border-brown-500 focus:ring-brown-50 ${errors.batch ? "border-red-200 ring-red-50" : ""}`}
                />
                {errors.batch && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-red-400 text-xs flex items-center gap-1 mt-1"
                  >
                    <AlertCircle className="h-3 w-3" /> {errors.batch}
                  </motion.p>
                )}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Payment Method Section - Full Width */}
        <motion.div variants={itemVariants} className="md:col-span-2">
          <Card className="p-5 bg-white border-gray-100 rounded-lg shadow-sm hover:shadow transition-shadow">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gray-50 p-2 rounded-md">
                <CreditCard className="h-5 w-5 text-gray-500" />
              </div>
              <h3 className="font-medium text-gray-700">Payment Method (Send Money)</h3>
            </div>

            <RadioGroup
              value={formData.paymentMethod}
              onValueChange={(value) => handleChange("paymentMethod", value)}
              className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center space-x-2 p-3 rounded-lg border border-gray-100 bg-gray-50/50 hover:bg-gray-50 transition-colors"
              >
                <RadioGroupItem value="bkash" id="bkash" className="text-brown-500" />
                <Label htmlFor="bkash" className="font-medium cursor-pointer flex-1 text-gray-600">
                  Bkash (01892747691)
                </Label>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center space-x-2 p-3 rounded-lg border border-gray-100 bg-gray-50/50 hover:bg-gray-50 transition-colors"
              >
                <RadioGroupItem value="nagad" id="nagad" className="text-brown-500" />
                <Label htmlFor="nagad" className="font-medium cursor-pointer flex-1 text-gray-600">
                  Nagad (01892747691)
                </Label>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center space-x-2 p-3 rounded-lg border border-gray-100 bg-gray-50/50 hover:bg-gray-50 transition-colors"
              >
                <RadioGroupItem value="rocket" id="rocket" className="text-brown-500" />
                <Label htmlFor="rocket" className="font-medium cursor-pointer flex-1 text-gray-600">
                  Rocket (018927476913)
                </Label>
              </motion.div>
            </RadioGroup>
            {errors.paymentMethod && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="text-red-400 text-xs flex items-center gap-1 mt-2"
              >
                <AlertCircle className="h-3 w-3" /> {errors.paymentMethod}
              </motion.p>
            )}
          </Card>
        </motion.div>

        {/* Transaction Details */}
        <motion.div variants={itemVariants} className="md:col-span-2">
          <Card className="p-5 bg-white border-gray-100 rounded-lg shadow-sm hover:shadow transition-shadow">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gray-50 p-2 rounded-md">
                <Receipt className="h-5 w-5 text-gray-500" />
              </div>
              <h3 className="font-medium text-gray-700">Transaction Details</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sendMoneyNumber" className="text-sm font-medium flex items-center text-gray-600">
                  Payment Number <span className="text-gray-400 ml-1">*</span>
                </Label>
                <Input
                  id="sendMoneyNumber"
                  placeholder="Your payment number"
                  value={formData.sendMoneyNumber}
                  onChange={(e) => handleChange("sendMoneyNumber", e.target.value)}
                  className={`w-full bg-gray-50/50 border-gray-200 focus:border-brown-500 focus:ring-brown-50 ${errors.sendMoneyNumber ? "border-red-200 ring-red-50" : ""}`}
                />
                {errors.sendMoneyNumber && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-red-400 text-xs flex items-center gap-1 mt-1"
                  >
                    <AlertCircle className="h-3 w-3" /> {errors.sendMoneyNumber}
                  </motion.p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="transactionId" className="text-sm font-medium flex items-center text-gray-600">
                  Transaction ID <span className="text-gray-400 ml-1">*</span>
                </Label>
                <Input
                  id="transactionId"
                  placeholder="Your payment transaction ID"
                  value={formData.transactionId}
                  onChange={(e) => handleChange("transactionId", e.target.value)}
                  className={`w-full bg-gray-50/50 border-gray-200 focus:border-brown-500 focus:ring-brown-50 ${errors.transactionId ? "border-red-200 ring-red-50" : ""}`}
                />
                {errors.transactionId && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-red-400 text-xs flex items-center gap-1 mt-1"
                  >
                    <AlertCircle className="h-3 w-3" /> {errors.transactionId}
                  </motion.p>
                )}
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>

      {/* Form Actions */}
      <motion.div className="flex flex-col sm:flex-row justify-between gap-3 mt-6" variants={itemVariants}>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            type="submit"
            onClick={handleSubmit}
            className="bg-brown-700 hover:bg-brown-800 text-white font-medium px-6 py-2 rounded-md w-full sm:w-auto"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Submitting...
              </span>
            ) : (
              "Submit Registration"
            )}
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            type="button"
            variant="outline"
            onClick={handleClear}
            className="border-gray-200 text-gray-600 hover:bg-gray-50 rounded-md w-full sm:w-auto"
          >
            Clear form
          </Button>
        </motion.div>
      </motion.div>

      {/* Additional help text */}
      <motion.div variants={itemVariants} className="text-center text-sm text-gray-500 mt-8">
        <p>
          Need help? Contact the organizer at <span className="font-medium">01892747691</span>
        </p>
      </motion.div>
    </motion.div>
  )
}

