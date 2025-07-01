"use client";
import Navbar from "@/components/common/navbar";
import { I18nProvider } from "@/lib/i18n-context";
import { ThemeProvider } from "@/lib/theme-context";
import React from "react";

interface Props {
  children?: React.ReactNode;
}

function MainProvider({ children }: Props) {
  return (
    <ThemeProvider>
      <I18nProvider>
        <Navbar />
        {children}
      </I18nProvider>
    </ThemeProvider>
  );
}

export default MainProvider;
