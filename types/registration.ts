export interface RegistrationData {
  name: string
  branch: string
  batch: string
  whatsappNumber: string
  paymentMethod: string
  sendMoneyNumber: string
  transactionId: string
}

export interface ServerResponse {
  success: boolean
  message: string
  error?: string
}

