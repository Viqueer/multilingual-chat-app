"use client";

import { useContext } from "react";
import TranslationContext from "@/app/context/TranslationContext";

const Header = () => {
  const translations = useContext(TranslationContext);
  return (
    <h2
      className="
            mt-6 
            text-center 
            text-3xl 
            font-bold 
            tracking-tight 
            text-gray-900
          ">
      {translations?.authForm.header}
    </h2>
  );
};

export default Header;
