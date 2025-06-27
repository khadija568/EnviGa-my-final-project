//import { GalleryVerticalEnd } from "lucide-react"
import image from "@/assets/green-environmental.png"
import { RegisterForm } from "@/components/ui/register-from"

export default function RegisterPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 bg-gradient-to-br from-green-100 via-green-300 to-emerald-500">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex items-center justify-center md:justify-start gap-2">
          <h1 className="text-3xl font-bold text-green-400">EnviGa</h1>
        </div>
        <div className="text-center md:text-left text-green-900 mt-4">
          <h2 className="text-2xl font-semibold">Bienvenue chez EnviGa</h2>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-[400px]">
            <RegisterForm />
          </div>
        </div>
      </div>
      <div className="relative hidden lg:block">
        <img
          src= {image}
          alt="Eco Hotel"
          className="absolute inset-0 h-full w-full object-cover brightness-90"
        />
      </div>
    </div>
  );
}

