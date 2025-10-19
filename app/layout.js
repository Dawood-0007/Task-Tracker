import "./globals.css";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from '@clerk/nextjs'

export const metadata = {
  title: "Task Tracker",
  description: "A simple task tracker app to manage your tasks",
  icons: {
    icon: "/locked.svg",
  },
};


export default function RootLayout({ children }) {
  return (
    <ClerkProvider 
      localization={{
          signIn: {
            start: {
              title: "Task Tracker",
            },
          },
      }}>
      <html lang="en">
        <body className={`antialiased`}>
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
