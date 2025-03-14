import RegistrationForm from "@/components/registration-form"
import { Calendar, MapPin } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#faf7f2] py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 rounded-lg overflow-hidden shadow-md transform hover:shadow-lg transition-all duration-300">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/iscians%20iftar%20party%20even%20banner.jpg-ymo0lkkfxGLuK3WrY5RCvsBjJtNO6o.jpeg"
            alt="Ex ISCIAN's Iftar Party"
            className="w-full"
          />
        </div>

        {/* Event details */}
        <div className="bg-white rounded-lg p-5 mb-8 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Event Details</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-brown-600" />
              <span className="text-gray-700">Friday, March 21, 2025</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-brown-600" />
              <span className="text-gray-700">Ideal School And Collage, Banasree Branch</span>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <p>Registration fee: 200 BDT per person</p>
            <p>Last date to register: March 18, 2025</p>
          </div>
        </div>

        <RegistrationForm />
      </div>
    </main>
  )
}

