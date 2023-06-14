import { User } from "@prisma/client";
import getConversationById from "./getConversationById";

const getOtherUser = async (conversationId: string, currentUser: User) => {
  const currentConversation = await getConversationById(conversationId);
  const conversationUsers = currentConversation?.users;
  const otherUser = conversationUsers?.filter(
    (user) => user.id !== currentUser.id
  );

  return otherUser;
};

export default getOtherUser;
