"use server"

import { supabase } from "@/lib/supabase"

export type RegistrationFormData = {
  name: string
  branch: string
  batch: string
  whatsappNumber: string
  paymentMethod: string
  sendMoneyNumber: string
  transactionId: string
}

export type RegistrationResponse = {
  success: boolean
  message: string
  error?: string
}

export async function submitRegistration(data: RegistrationFormData): Promise<RegistrationResponse> {
  try {
    // Validate the data
    if (!isValidName(data.name)) {
      return {
        success: false,
        message: "Name should contain only letters and spaces",
        error: "invalid_name",
      }
    }

    if (!isValidWhatsappNumber(data.whatsappNumber)) {
      return {
        success: false,
        message: "WhatsApp number should be 11 digits and start with '01'",
        error: "invalid_whatsapp",
      }
    }

    if (!isValidSendMoneyNumber(data.sendMoneyNumber)) {
      return {
        success: false,
        message: "Send Money number should be 11-12 digits",
        error: "invalid_send_money",
      }
    }

    // Insert data into Supabase
    const { data: insertedData, error } = await supabase
      .from("users")
      .insert([
        {
          name: data.name,
          phone_number: data.whatsappNumber,
          branch: data.branch,
          batch: data.batch,
          payment_method: data.paymentMethod,
          send_money_number: data.sendMoneyNumber,
          transaction_id: data.transactionId,
          status: "pending",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()

    if (error) {
      console.error("Error inserting data:", error)
      return {
        success: false,
        message: "Failed to submit registration. Please try again.",
        error: error.message,
      }
    }

    return {
      success: true,
      message: "Registration submitted successfully!",
    }
  } catch (error) {
    console.error("Unexpected error:", error)
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
      error: String(error),
    }
  }
}

// Validation functions
function isValidName(name: string): boolean {
  return /^[A-Za-z\s]+$/.test(name)
}

function isValidWhatsappNumber(number: string): boolean {
  return /^01\d{9}$/.test(number)
}

function isValidSendMoneyNumber(number: string): boolean {
  return /^\d{11,12}$/.test(number)
}

