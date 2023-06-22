"use client";

import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useCallback, useEffect, useState, useContext } from "react";
// import { BsGithub, BsGoogle } from "react-icons/bs";
import {
  FieldValues,
  SubmitHandler,
  useForm,
  Controller,
} from "react-hook-form";
import { useRouter } from "next/navigation";

import Input from "@/app/components/inputs/Input";
import Select from "@/app/components/inputs/Select";
// import AuthSocialButton from "./AuthSocialButton";
import Button from "@/app/components/Button";
import { toast } from "react-hot-toast";
import TranslationContext from "@/app/context/TranslationContext";

type Variant = "LOGIN" | "REGISTER";

interface AuthFormProps {
  languages: object[];
}

const AuthForm: React.FC<AuthFormProps> = ({ languages }) => {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);
  const translation = useContext(TranslationContext);

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/conversations");
    }
  }, [session?.status, router]);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      primaryLanguage: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === "REGISTER") {
      axios
        .post("/api/register", data)
        .then(() =>
          signIn("credentials", {
            ...data,
            redirect: false,
          })
        )
        .then((callback) => {
          if (callback?.error) {
            toast.error(translation?.error.error1);
          }

          if (callback?.ok) {
            router.push("/conversations");
            localStorage.setItem("language", data.primaryLanguage.value);
            window.location.reload();
          }
        })
        .catch(() => toast.error(translation?.error.error2))
        .finally(() => setIsLoading(false));
    }

    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error(translation?.error.error1);
          }

          if (callback?.ok) {
            router.push("/conversations");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  // const socialAction = (action: string) => {
  //   setIsLoading(true);

  //   signIn(action, { redirect: false })
  //     .then((callback) => {
  //       if (callback?.error) {
  //         toast.error("Invalid credentials!");
  //       }

  //       if (callback?.ok) {
  //         router.push("/conversations");
  //       }
  //     })
  //     .finally(() => setIsLoading(false));
  // };

  const primaryLanguage = watch("primaryLanguage");

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div
        className="
        bg-white
          px-4
          py-8
          shadow
          sm:rounded-lg
          sm:px-10
        ">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              id="name"
              label={translation?.general.name}
            />
          )}
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="email"
            label={translation?.general.email}
            type="email"
          />
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="password"
            label={translation?.authForm.passwordFormLabel}
            type="password"
          />
          {variant === "REGISTER" && (
            <Controller
              name="primaryLanguage"
              control={control}
              rules={{ required: true }}
              render={() => (
                <Select
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  label={translation?.general.language}
                  placeholder={translation?.authForm.selectLanguage}
                  value={primaryLanguage}
                  onChange={(value) =>
                    setValue("primaryLanguage", value, {
                      shouldValidate: true,
                    })
                  }
                  options={languages?.map((lang: any) => ({
                    value: lang.code,
                    label: lang.name,
                  }))}
                />
              )}
            />
          )}
          <div>
            <Button disabled={isLoading} fullWidth type="submit">
              {variant === "LOGIN"
                ? translation?.authForm.signIn
                : translation?.authForm.register}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div
              className="
                absolute 
                inset-0 
                flex 
                items-center
              ">
              <div className="w-full border-t border-gray-300" />
            </div>
            {/* <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div> */}
          </div>

          {/* <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction("github")}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction("google")}
            />
          </div> */}
        </div>
        <div
          className="
            flex 
            gap-2 
            justify-center 
            text-sm 
            mt-6 
            px-2 
            py-3
            text-gray-500
          ">
          <div>
            {variant === "LOGIN"
              ? `${translation?.authForm.newTo} Multilingua?`
              : translation?.authForm.alreadyHaveAccount}
          </div>
          <div onClick={toggleVariant} className="underline cursor-pointer">
            {variant === "LOGIN"
              ? translation?.authForm.createAccount
              : translation?.authForm.login}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
