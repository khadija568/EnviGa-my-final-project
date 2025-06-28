import { cn, handleError, handleSuccess } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Leaf } from "lucide-react";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [registerInfo, setRegisterInfo] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = registerInfo;

    if (!name || !email || !password || !confirmPassword) {
      return handleError("Name, email, password, and confirm password are required.");
    }

    if (password !== confirmPassword) {
      return handleError("Passwords do not match.");
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerInfo)
      });

      const result = await response.json();
      const { success, message } = result;

      if(success) {
      handleSuccess(message);
        setTimeout(() => navigate('/login'), 1000);
    }
    if (!response.ok) {
      return handleError(result.message || "Registration failed");
    }
    handleSuccess(result.message || "Registration successful!");

    setRegisterInfo({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  }catch (err) {
    handleError(err instanceof Error ? err.message : "Something went wrong");
  }
  };

  return (
    <form
      onSubmit={handleRegister}
      className={cn(
        "flex flex-col gap-6 p-8 rounded-xl bg-emerald-50 border border-emerald-100 shadow-lg shadow-emerald-100/40 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold text-emerald-900">Create Account</h1>
        <p className="text-muted-foreground text-sm max-w-xs">
          Enter your information below to create your account
        </p>
      </div>

      <div className="grid gap-5 mt-4">
        <div className="grid gap-2">
          <Label htmlFor="name" className="text-emerald-900">Full Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="John Doe"
            onChange={handleChange}
            value={registerInfo.name}
            // required
            className="rounded-md border-emerald-200 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email" className="text-emerald-900">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            onChange={handleChange}
            value={registerInfo.email}
            // required
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
            value={registerInfo.password}
            // required
            className="rounded-md border-emerald-200 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="confirmPassword" className="text-emerald-900">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            onChange={handleChange}
            value={registerInfo.confirmPassword}
            // required
            className="rounded-md border-emerald-200 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        <Button
          type="submit"
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-green-600 via-lime-400 to-emerald-600 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:brightness-110 active:scale-95"
        >
          <Leaf className="w-4 h-4" />
          Sign up
        </Button>
      </div>
      <ToastContainer />
    </form>
  );
}
