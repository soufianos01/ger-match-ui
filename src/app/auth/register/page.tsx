import { AuthForm } from "../auth-form";

export default async function RegisterPage({ searchParams }: { searchParams: Promise<{ role?: string }> }) {
  const { role } = await searchParams;
  return <AuthForm mode="register" initialRole={role === "provider" ? "provider" : "talent"} />;
}
