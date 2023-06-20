import Image from "next/image";
import AuthForm from "./components/AuthForm";
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
        <h2
          className="
            mt-6 
            text-center 
            text-3xl 
            font-bold 
            tracking-tight 
            text-gray-900
          ">
          Sign in to your account
        </h2>
      </div>
      <AuthForm languages={languages} />
    </div>
  );
};

export default Auth;
