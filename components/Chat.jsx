import React from "react";
import ChatHeader from "./ChatHeader";
import Messages from "./Messages";
import { useChatContext } from "@/context/chatContext";
import ChatFooter from "./ChatFooter";
import { useAuth } from "@/context/authContext";

const Chat = () => {
  const { data, users } = useChatContext();
  const { currentUser } = useAuth();

  const isUserBlocked = users?.[currentUser.uid]?.blockedUsers?.find(
    (u) => u === data.user.uid
  );
  const iamblocked = users?.[data.user.uid]?.blockedUsers?.find(
    (u) => u === currentUser.uid
  );
  return (
    <div className="flex flex-col p-5 grow">
      <ChatHeader />
      {data.chatId && <Messages />}
      {!isUserBlocked && !iamblocked && <ChatFooter />}
      {isUserBlocked && (
        <div className="w-full text-center text-c3 py-5">
          This user has been Blocked
        </div>
      )}
      {iamblocked && <div className="w-full text-center text-c3 py-5">{`${data.user.displayName} has blocked you!`}</div>}
    </div>
  );
};

export default Chat;
