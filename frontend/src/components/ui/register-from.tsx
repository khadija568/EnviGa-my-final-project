import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Leaf } from "lucide-react" // Optional: Leaf icon for eco-vibe

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form
      className={cn(
        "flex flex-col gap-6 p-8 rounded-xl bg-emerald-50 border border-emerald-100 shadow-lg shadow-emerald-100/40 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      {/* Title */}
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold text-emerald-900">Create Account</h1>
        <p className="text-muted-foreground text-sm max-w-xs">
          Enter your information below to create your account
        </p>
      </div>

      {/* Inputs */}
      
      <div className="grid gap-5 mt-4">
        <div className="grid gap-2">
          <Label htmlFor="first-name" className="text-emerald-900">Full Name</Label>
          <Input
            id="first-name"
            type="text"
            placeholder="John Doe"
            required
            className="rounded-md border-emerald-200 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email" className="text-emerald-900">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            className="rounded-md border-emerald-200 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password" className="text-emerald-900">Password</Label>
          <Input
            id="password"
            type="password"
            required
            className="rounded-md border-emerald-200 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirmed-password" className="text-emerald-900">Confirm Password</Label>
          <Input
            id="confirmed-password"
            type="password"
            required
            className="rounded-md border-emerald-200 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-green-600 via-lime-400 to-emerald-600 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:brightness-110 active:scale-95"
        >
          <Leaf className="w-4 h-4" />
          Sign up
        </Button>
      </div>

    </form>
  )
}