import { SignUp } from '@clerk/nextjs'
import Image from "next/image";

export default function Page() {
  return <div className="flex gap-16 items-center justify-center h-screen bg-white">
    <div className="flex flex-col gap-2">
      <span className="text-2xl font-bold text-slate-500">Welcome to</span>
      <Image src="/logo.svg" alt="Company logo" width={300} height={10} />
      <span className="text-sm text-gray-400">
        Tedious SQL writing made easy with interactive AI-powered platform</span>
    </div>
    <SignUp />
  </div>
}