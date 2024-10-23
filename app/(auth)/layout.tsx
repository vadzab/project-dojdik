import "@/styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gray-100 dark:bg-gray-900">
      {children}
    </div>
  );
}
