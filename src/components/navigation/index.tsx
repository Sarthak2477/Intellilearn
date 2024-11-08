import Image from "next/image";

type Props = {}

export default function NavigationBar({}: Props) {
  return (
    <div className="flex items-center">
      <div className="flex items-center">
        <Image src="/logo_no_text.svg" alt="Company header logo" width={70} height={20}/>
        <span className="font-poppins text-2xl text-white font-[700]">Logoipsum</span>
      </div>
    </div>
  );
}