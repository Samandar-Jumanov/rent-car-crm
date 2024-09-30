"use client"

import { withAuth } from "@/utils/authanticated";
 function Home() {


  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background text-foreground">
      <h1 className="text-4xl font-bold mb-4">Welcome</h1>
      <p>You&apos;re successfully logged in!</p>
    </div>
  );
}

export default withAuth(Home);