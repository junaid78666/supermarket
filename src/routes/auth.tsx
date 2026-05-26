import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) navigate({ to: "/" });
  }, [user, navigate]);

  return (
    <div className="container mx-auto flex min-h-[70vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border bg-card p-8 shadow-[var(--shadow-card)]">
        <h1 className="text-center font-display text-3xl font-bold">Welcome to <span className="text-primary">DailyBasket</span></h1>
        <p className="mt-1 text-center text-sm text-muted-foreground">Sign in to start ordering fresh groceries.</p>

        <Tabs defaultValue="signin" className="mt-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign in with code</TabsTrigger>
            <TabsTrigger value="signup">Sign up</TabsTrigger>
          </TabsList>
          <TabsContent value="signin"><SignInForm /></TabsContent>
          <TabsContent value="signup"><SignUpForm /></TabsContent>
        </Tabs>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          By continuing you agree to our terms. <Link to="/" className="text-primary hover:underline">Back to home</Link>
        </p>
      </div>
    </div>
  );
}

function SignInForm() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [sendingCode, setSendingCode] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const codeInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (resendCooldown <= 0) return;

    const timer = setInterval(() => {
      setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [resendCooldown]);

  useEffect(() => {
    if (!codeSent) return;
    codeInputRef.current?.focus();
  }, [codeSent]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !code) {
      toast.error("Enter your email and verification code.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: "email",
    });
    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Welcome back!");
  };

  const sendCode = async () => {
    if (!email) {
      toast.error("Enter your email first.");
      return;
    }

    if (resendCooldown > 0) {
      toast.error(`Please wait ${resendCooldown}s before requesting another code.`);
      return;
    }

    setSendingCode(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: false },
    });
    setSendingCode(false);

    if (error) toast.error(error.message);
    else {
      setCodeSent(true);
      setResendCooldown(60);
      toast.success("Verification code sent. Check inbox/spam and Promotions.");
    }
  };

  return (
    <form onSubmit={submit} className="mt-4 space-y-4">
      <div>
        <Label htmlFor="si-email">Email</Label>
        <Input id="si-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <p className="mt-1 text-xs text-muted-foreground">Use the exact same email you used during signup.</p>
      </div>
      <Button type="button" variant="outline" className="w-full" disabled={sendingCode || resendCooldown > 0} onClick={sendCode}>
        {sendingCode
          ? "Sending code..."
          : resendCooldown > 0
            ? `Resend code in ${resendCooldown}s`
            : codeSent
              ? "Resend verification code"
              : "Send verification code"}
      </Button>
      <p className="text-xs text-muted-foreground">
        Didn&apos;t get the code? Check Spam and Promotions, then use resend after the timer.
      </p>
      {codeSent && (
        <>
          <div>
            <Label htmlFor="si-code">Verification code</Label>
            <Input
              id="si-code"
              ref={codeInputRef}
              inputMode="numeric"
              autoComplete="one-time-code"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter the code from your email"
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>{loading ? "Verifying..." : "Verify and sign in"}</Button>
        </>
      )}
    </form>
  );
}

function SignUpForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const redirectUrl = `${window.location.origin}/`;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: redirectUrl, data: { full_name: name } },
    });
    setLoading(false);
    if (error) {
      if (error.status === 429 || error.message?.toLowerCase().includes("rate limit") || error.message?.toLowerCase().includes("security")) {
        toast.error("Rate limit exceeded! By default, Supabase limits signups to 3 per hour. You can easily increase or disable this limit in your Supabase Dashboard under Authentication ➔ Rate Limits.", {
          duration: 10000
        });
      } else {
        toast.error(error.message);
      }
    } else if (data?.session) {
      toast.success("Account created! You're signed in.");
      navigate({ to: "/" });
    } else {
      toast.success("Account created! Please check your email inbox to verify your account.");
    }
  };

  return (
    <form onSubmit={submit} className="mt-4 space-y-4">
      <div>
        <Label htmlFor="su-name">Full name</Label>
        <Input id="su-name" required value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <Label htmlFor="su-email">Email</Label>
        <Input id="su-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <p className="mt-1 text-xs text-muted-foreground">Double-check spelling before creating the account.</p>
      </div>
      <div>
        <Label htmlFor="su-pass">Password</Label>
        <Input id="su-pass" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>{loading ? "Creating..." : "Create account"}</Button>
    </form>
  );
}