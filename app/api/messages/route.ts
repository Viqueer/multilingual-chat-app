import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import { pusherServer } from "@/app/libs/pusher";
import prisma from "@/app/libs/prismadb";
import { translateText } from "@/app/actions/getTranslation";
import getOtherUser from "@/app/actions/getOtherUser";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { message, image, conversationId } = body;
    let msg = "";

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const otherUserArray = await getOtherUser(conversationId, currentUser);
    const otherUser = otherUserArray?.[0];

    if (message) {
      if (currentUser.primaryLanguage !== otherUser?.primaryLanguage) {
        const targetCode = JSON.parse(
          otherUser?.primaryLanguage as string
        ).value;
        const sourceCode = JSON.parse(
          currentUser?.primaryLanguage as string
        ).value;
        const translatedText = await translateText(
          message,
          sourceCode,
          targetCode
        );

        msg = JSON.stringify({
          original: message,
          translated: translatedText,
        });
      } else {
        msg = JSON.stringify({ original: message });
      }
    }

    const newMessage = await prisma.message.create({
      include: {
        seen: true,
        sender: true,
      },
      data: {
        body: msg,
        image: image,
        conversation: {
          connect: { id: conversationId },
        },
        sender: {
          connect: { id: currentUser.id },
        },
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    });

    const updatedConversation = await prisma.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id,
          },
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true,
          },
        },
      },
    });

    await pusherServer.trigger(conversationId, "messages:new", newMessage);

    const lastMessage =
      updatedConversation.messages[updatedConversation.messages.length - 1];

    updatedConversation.users.map((user) => {
      pusherServer.trigger(user.email!, "conversation:update", {
        id: conversationId,
        messages: [lastMessage],
      });
    });

    return NextResponse.json(newMessage);
  } catch (error) {
    console.log(error, "ERROR_MESSAGES");
    return new NextResponse("Error", { status: 500 });
  }
}
