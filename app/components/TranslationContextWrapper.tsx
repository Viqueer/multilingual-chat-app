"use client";

import TranslationContext from "../context/TranslationContext";
import { useEffect, useState } from "react";
import axios from "axios";

const TranslationContextWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [translationObject, setTranslationObject] = useState();
  console.log(translationObject);
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!localStorage.getItem("language")) {
        const browserLanguage = window.navigator.language.slice(0, 2);
        localStorage.setItem("language", browserLanguage);
      }

      const language = localStorage.getItem("language");
      axios
        .post("/api/translate", { language: language })
        .then((res: any) => setTranslationObject(res.data));
    }
  }, []);
  return (
    <TranslationContext.Provider value={translationObject}>
      {children}
    </TranslationContext.Provider>
  );
};

export default TranslationContextWrapper;
