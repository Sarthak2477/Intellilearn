import NavigationBar from "@/components/navigation";
import React from "react";

function Layout({
  children
}: {
  children: React.ReactNode,
}) {
  return (
    <div className="w-screen h-screen relative">
      <NavigationBar />
      { children }
    </div>
  );
}

export default Layout;