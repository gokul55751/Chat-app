import { useAuth } from "@/context/authContext";
import { useChatContext } from "@/context/chatContext";
import { db } from "@/firebase/firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import React from "react";
import ClickAwayListener from "react-click-away-listener";

const ChatMenu = ({ showMenu, setShowMenu }) => {
  const { currentUser } = useAuth();
  const { data, users } = useChatContext();

  const handleClickAway = () => {
    setShowMenu(false);
  };

  const isUserBlocked = users?.[currentUser.uid]?.blockedUsers?.find(
    (u) => u === data.user.uid
  );
  const iamblocked = users?.[data.user.uid]?.blockedUsers?.find(
    (u) => u === currentUser.uid
  );

  const handleBlock = async (action) => {
    setShowMenu(false);
    if (action === "block") {
      await updateDoc(doc(db, "users", currentUser.uid), {
        blockedUsers: arrayUnion(data.user.uid),
      });
    }
    if (action === "unblock") {
      await updateDoc(doc(db, "users", currentUser.uid), {
        blockedUsers: arrayRemove(data.user.uid),
      });
    }
  };

  const handleDelete = async () => {
    setShowMenu(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className="w-[200px] absolute top-[70px] right-5 bg-c0 z-10 rounded-md overflow-hidden">
        <ul className="flex flex-col py-2">
          {!iamblocked && (
            <li
              className="flex items-center py-3 px-5 hover:bg-black cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handleBlock(isUserBlocked ? "unblock" : "block");
              }}
            >
              {isUserBlocked ? "Unblock user" : "block user"}
            </li>
          )}
          <li
            className="flex items-center py-3 px-5 hover:bg-black cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
          >
            Delete chat
          </li>
        </ul>
      </div>
    </ClickAwayListener>
  );
};

export default ChatMenu;
