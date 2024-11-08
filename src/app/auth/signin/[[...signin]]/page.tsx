import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return <div className="flex gap-16 items-center justify-center h-screen bg-white">
    <div className="flex flex-col gap-2">
      <Image src="/logo.svg" alt="Company logo" width={300} height={10} />
      <span className="text-sm text-gray-400">
        Tedious SQL writing made easy with interactive AI-powered platform</span>
    </div>
    <SignIn signUpUrl="signup/" />
  </div>
}