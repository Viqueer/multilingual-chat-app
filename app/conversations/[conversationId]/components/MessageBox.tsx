"use client";

import clsx from "clsx";
import Image from "next/image";
import { useState, useMemo } from "react";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { FullMessageType } from "@/app/types";
import { MdTranslate } from "react-icons/md";

import Avatar from "@/app/components/Avatar";
import ImageModal from "./ImageModal";

interface MessageBoxProps {
  data: FullMessageType;
  isLast?: boolean;
}

const MessageBox: React.FC<MessageBoxProps> = ({ data, isLast }) => {
  const session = useSession();
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [seeOriginal, setSeeOriginal] = useState(false);

  const isOwn = session.data?.user?.email === data?.sender?.email;
  const seenList = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.name)
    .join(", ");

  const msg = useMemo(() => {
    return data?.body
      ? isOwn
        ? JSON.parse(data?.body as string).original
        : seeOriginal
        ? JSON.parse(data?.body as string).original
        : JSON.parse(data?.body as string).translated ||
          JSON.parse(data?.body as string).original
      : "";
  }, [isOwn, data, seeOriginal]);

  const container = clsx("flex gap-3 p-4", isOwn && "justify-end");
  const avatar = clsx(isOwn && "order-2");
  const body = clsx("flex flex-col gap-2", isOwn && "items-end");
  const message = clsx(
    "text-sm w-fit overflow-hidden",
    isOwn
      ? "bg-sky-500 text-white"
      : seeOriginal
      ? "bg-green-300"
      : "bg-gray-100",
    data.image ? "rounded-md p-0" : "rounded-full py-2 px-3"
  );

  return (
    <div className={container}>
      <div className={`${avatar} justify-center`}>
        <Avatar user={data.sender} />
        {!isOwn && (
          <div
            onClick={() => setSeeOriginal(!seeOriginal)}
            className="cursor-pointer p-1 my-1 bg-gray-100 hover:bg-gray-300 rounded-full flex justify-center align-middle">
            <MdTranslate />
          </div>
        )}
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">{data.sender.name}</div>
          <div className="text-xs text-gray-400">
            {format(new Date(data.createdAt), "p")}
          </div>
        </div>
        <div className={message}>
          <ImageModal
            src={data.image}
            isOpen={imageModalOpen}
            onClose={() => setImageModalOpen(false)}
          />
          {data.image ? (
            <Image
              alt="Image"
              height="288"
              width="288"
              onClick={() => setImageModalOpen(true)}
              src={data.image}
              className="
                object-cover 
                cursor-pointer 
                hover:scale-110 
                transition 
                translate
              "
            />
          ) : (
            <>
              <div className="relative flex align-bottom">{msg}</div>
            </>
          )}
        </div>
        {isLast && isOwn && seenList.length > 0 && (
          <div
            className="
            text-xs 
            font-light 
            text-gray-500
            ">
            {`Seen by ${seenList}`}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBox;
