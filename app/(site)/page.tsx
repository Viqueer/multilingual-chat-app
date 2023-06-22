import Image from "next/image";
import AuthForm from "./components/AuthForm";
import Header from "./components/Header";
import { listLanguages } from "../actions/getTranslation";

const Auth = async () => {
  const languages = await listLanguages();
  return (
    <div
      className="
        flex 
        min-h-full 
        flex-col 
        justify-center 
        py-12 
        sm:px-6 
        lg:px-8 
        bg-gray-100
      ">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          height="100"
          width="200"
          className="mx-auto w-auto"
          src="/images/logo2.png"
          alt="Logo"
        />
        <Header />
      </div>
      <AuthForm languages={languages} />
    </div>
  );
};

export default Auth;
