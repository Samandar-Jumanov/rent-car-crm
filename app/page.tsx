"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useSidebar } from "@/lib/hooks/useSidebar";


export default function Home() {
  const router = useRouter();
  const {  theme,  } = useSidebar();


  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     router.push("/login");
  //   }
  // }, [status, router , theme ]);

  // if (status === "loading") {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <Loader2 className="w-8 h-8 animate-spin text-primary" />
  //     </div>
  //   );
  // }


  return (
    <div className=" dark:text-white flex flex-col items-center justify-center min-h-screen p-4 bg-background text-foreground">
      <h1 className="text-4xl font-bold mb-4">Welcome</h1>
      
    </div>
  );
}