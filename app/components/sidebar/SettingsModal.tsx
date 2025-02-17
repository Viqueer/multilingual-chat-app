"use client";

import axios from "axios";
import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { User } from "@prisma/client";
import { CldUploadButton } from "next-cloudinary";

import Input from "../inputs/Input";
import Modal from "../modals/Modal";
import Button from "../Button";
import Image from "next/image";
import { Controller } from "react-hook-form";
import Select from "../inputs/Select";
import { toast } from "react-hot-toast";
import TranslationContext from "@/app/context/TranslationContext";

interface SettingsModalProps {
  isOpen?: boolean;
  onClose: () => void;
  currentUser: User;
  languages: object[];
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  languages,
  currentUser = {},
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const translations = useContext(TranslationContext);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image,
    },
  });

  const image = watch("image");

  const handleUpload = (result: any) => {
    setValue("image", result.info.secure_url, {
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/settings", data)
      .then(() => {
        localStorage.setItem("language", data.primaryLanguage.value);
        router.refresh();
        onClose();
        window.location.reload();
      })
      .catch(() => toast.error("Something went wrong!"))
      .finally(() => setIsLoading(false));
  };

  const primaryLanguage = watch("primaryLanguage");
  const language = JSON.parse(currentUser?.primaryLanguage as string).label;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2
              className="
                text-base 
                font-semibold 
                leading-7 
                text-gray-900
              ">
              {translations?.settings.header}
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              {translations?.settings.subHeader}
            </p>

            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                disabled={isLoading}
                label={translations?.general.name}
                id="name"
                errors={errors}
                required
                register={register}
              />
              <Controller
                name="primaryLanguage"
                control={control}
                render={() => (
                  <Select
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    label={translations?.general.language}
                    value={primaryLanguage}
                    placeholder={language}
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
              <div>
                <label
                  htmlFor="photo"
                  className="
                    block 
                    text-sm 
                    font-medium 
                    leading-6 
                    text-gray-900
                  ">
                  Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <Image
                    width="48"
                    height="48"
                    className="rounded-full"
                    src={
                      image || currentUser?.image || "/images/placeholder.jpg"
                    }
                    alt="Avatar"
                  />
                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onUpload={handleUpload}
                    uploadPreset="ypdywwef">
                    <Button disabled={isLoading} secondary type="button">
                      {translations?.settings.change}
                    </Button>
                  </CldUploadButton>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="
            mt-6 
            flex 
            items-center 
            justify-end 
            gap-x-6
          ">
          <Button disabled={isLoading} secondary onClick={onClose}>
            {translations?.settings.cancel}
          </Button>
          <Button disabled={isLoading} type="submit">
            {translations?.settings.save}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default SettingsModal;
