//import { GalleryVerticalEnd } from "lucide-react"
import image from "@/assets/green-environmental.png"
import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 bg-gradient-to-br from-green-100 via-green-300 to-emerald-500">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex items-center justify-center md:justify-start gap-2">
          <h1 className="text-xl font-bold text-green-900">EnviGa</h1>
        </div>
        <div className="text-center md:text-left text-green-900 mt-4">
          <h2 className="text-2xl font-semibold">Bienvenue chez EnviGa</h2>
          <p className="text-sm mt-1">Nous créons des synergies entre les hotels et les associations afin d'optimiser
            le recyclage et de contribuer à un environnement plus propre
          </p>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
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

