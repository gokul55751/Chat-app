import React from "react";
import PopupWrapper from "./PopupWrapper";
import { useChatContext } from "@/context/chatContext";
import { useAuth } from "@/context/authContext";
import { RiErrorWarningLine } from "react-icons/ri";
import { DELETED_FOR_EVERYONE, DELETED_FOR_ME } from "@/utils/constants";

const DeleteMsgPopup = (props) => {
  const { users, dispatch } = useChatContext();
  const { currentUser } = useAuth();

  return (
    <PopupWrapper {...props}>
      <div className="mt-10 md-5">
        <div className="flex items-center justify-center gap-3">
          <RiErrorWarningLine className="text-red-500" />
          <div className="text-lg">
            Are you sure, you want to delete message?
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 mt-10">
          {props.self && (
            <button
              className="bottom-[2px] border-red-700 py-2 px-4 text-sm rounded-md text-red-500 hover:bg-red-700 hover:text-white"
              onClick={() => props.deleteMessage(DELETED_FOR_ME)}
            >
              Delete for me
            </button>
          )}
          <button
            className="bottom-[2px] border-red-700 py-2 px-4 text-sm rounded-md text-red-500 hover:bg-red-700 hover:text-white"
            onClick={() => props.deleteMessage(DELETED_FOR_EVERYONE)}
          >
            Delete for everyone
          </button>
          <button
            className="bottom-[2px] border-white py-2 px-4 text-sm rounded-md text-white hover:bg-white hover:text-black"
            onClick={props.onHide}
          >
            Cancel
          </button>
        </div>
      </div>
    </PopupWrapper>
  );
};

export default DeleteMsgPopup;
