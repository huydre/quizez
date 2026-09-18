export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      {/* Authenticated shell: sidebar/nav lands here (UC-AUTH-02 post-login) */}
      <main>{children}</main>
    </div>
  );
}
