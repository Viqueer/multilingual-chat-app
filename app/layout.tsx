"use client";

import "./globals.css";
import AuthContext from "./context/AuthContext";
import ActiveStatus from "./components/ActiveStatus";
import ToasterContext from "./context/ToasterContext";
import TranslationContext from "./context/TranslationContext";
import { useEffect, useState } from "react";
import axios from "axios";

export const metadata = {
  title: "Multilingua",
  description: "A multilingual chat app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [translationObject, setTranslationObject] = useState();
  const [language, setLanguage] = useState("");
  console.log(translationObject);
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!localStorage.getItem("language")) {
        const browserLanguage = window.navigator.language.slice(0, 2);
        localStorage.setItem("language", browserLanguage);
      }

      const language = localStorage.getItem("language");
      setLanguage(language as string);
      axios
        .post("/api/translate", { language: language })
        .then((res: any) => setTranslationObject(res.data));
    }
  }, []);

  return (
    <html lang="en">
      <body>
        <TranslationContext.Provider value={translationObject}>
          <AuthContext>
            <ToasterContext />
            <ActiveStatus />
            {children}
          </AuthContext>
        </TranslationContext.Provider>
      </body>
    </html>
  );
}
