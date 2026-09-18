export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <main className="mx-auto flex min-h-screen max-w-md items-center justify-center px-4">{children}</main>;
}
