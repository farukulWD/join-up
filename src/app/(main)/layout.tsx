"use client";

import Navbar from "@/components/common/navbar";

function MainPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default MainPageLayout;
