import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import Image from "next/image";

type Props = {}

export default function NavigationBar({}: Props) {
  return (
    <div className="flex items-center justify-between ps-2 pe-6  border-b-[1px] border-gray-800">
      <div className="flex items-center">
        <Image src="/logo_no_text.svg" alt="Company header logo" width={70} height={20}/>
        <div className="flex flex-col">
          <span className="font-poppins text-2xl text-white font-[700]">Logoipsum</span>
          <span className="text-[10px] font-poppins text-gray-300">SQL made easy with AI-powered platform</span>
        </div>
      </div>
      <div className="px-2 py-1 border-[1px] border-gray-800 rounded-lg">
        <UserButton userProfileMode="modal" showName appearance={{
          baseTheme: dark,
        }}/>
      </div>
    </div>
  );
}