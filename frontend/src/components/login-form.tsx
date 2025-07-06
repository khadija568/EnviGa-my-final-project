import { cn, handleError, handleSuccess } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Leaf } from "lucide-react" // Optional: Leaf icon for eco-vibe
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {

  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    if ( !email || !password ) {
      return handleError("email and password are required.");
    }


    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
      });

      const result = await response.json();
      const { message, token, user, error } = result;
      console.log("User role:", user.role);

      if (token && user) {
  handleSuccess(message || "Login successful");

  // تخزين المعلومات في localStorage
  localStorage.setItem("token", token);
  localStorage.setItem("name", user.name);
  localStorage.setItem("role", user.role);

  setTimeout(() => {
  if (user.role === 'hotel') {
    navigate("/dashboard/hotel");
  } else if (user.role === 'association') {
    navigate("/dashboard/association");
  } else {
    navigate("/"); // توجيه افتراضي إذا كان النوع غير معروف
  }
}, 1000);
} else if (error) {
  const details = error?.details?.[0]?.message || "Something went wrong.";
  handleError(details);
} else {
  handleError(message || "Login failed.");
}
    } catch (err) {
      handleError("An unexpected error occurred.");
    }
  };

  return (
    <form onSubmit={handleLogin}
      className={cn(
        "flex flex-col gap-6 p-8 rounded-xl bg-emerald-50 border border-emerald-100 shadow-lg shadow-emerald-100/40 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      {/* Title */}
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold text-emerald-900">Login to your account</h1>
        <p className="text-muted-foreground text-sm max-w-xs">
          Enter your email below to login to your account
        </p>
      </div>

      {/* Inputs */}
      <div className="grid gap-5 mt-4">
        <div className="grid gap-2">
          <Label htmlFor="email" className="text-emerald-900">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            onChange={handleChange}
            value={loginInfo.email}
            required
            className="rounded-md border-emerald-200 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password" className="text-emerald-900">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            onChange={handleChange}
            value={loginInfo.password}
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
          Login
        </Button>

        {/* Divider */}
        <div className="relative text-center text-sm text-gray-500 mt-2">
          
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-gray-700 mt-2">
        Don’t have an account?{" "}
        <a href="/register" className="underline underline-offset-4 text-emerald-700 hover:text-emerald-900">
          Sign up
        </a>
      </div>
      <ToastContainer />
    </form>
  )
}