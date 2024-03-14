import { db } from "@/firebase/firebase";
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import React, { useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
import Avatar from "./Avatar";
import { useChatContext } from "@/context/chatContext";
import { useAuth } from "@/context/authContext";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { users, dispatch } = useChatContext();
  const { currentUser } = useAuth();

  const onkeyup = async (e) => {
    if (e.code === "Enter" && !!username) {
      try {
        setErr(false);
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("displayName", "==", username));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          setErr(true);
          setUser(null);
        } else {
          querySnapshot.forEach((doc) => {
            setUser(doc.data());
          });
        }
      } catch (error) {
        console.error(error);
        setErr(true);
      }
    }
  };

  const handleSelect = async () => {
    try {
      const combinedId =
        currentUser.uid > user.uid
          ? currentUser.uid + user.uid
          : user.uid + currentUser;
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        const currentUserChatRef = await getDoc(
          doc(db, "userChats", currentUser.uid)
        );
        const userChatRef = await getDoc(doc(db, "userChats", user.uid));
        if (!currentUserChatRef.exists()) {
          await setDoc(doc(db, "userChats", currentUser.uid), {});
        }
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL || null,
            color: user.color,
          },
          [combinedId + ".data"]: serverTimestamp(),
        });
        if (!userChatRef.exists()) {
          await setDoc(doc(db, "userChats", user.uid), {});
        }
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL || null,
            color: currentUser.color,
          },
          [combinedId + ".data"]: serverTimestamp(),
        });
      } else {
      }
      setUser(null)
      setUsername("")
      setErr(false)
      dispatch({ type: "CHANGE_USER", payload: user });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="shrink-0">
      <div className="relative">
        <RiSearch2Line className="absolute top-4 left-4 text-c3" />
        <input
          type="text"
          placeholder="Search User"
          onChange={(e) => setUsername(e.target.value)}
          onKeyUp={onkeyup}
          value={username}
          autoFocus
          className="w-full h-12 rounded-xl bg-c1/[0.5] pl-11 pr-16 placeholder:text-c3 outline-none text-base"
        />
        <span className="absolute top-[14px] right-4 text-sm text-c3">
          Enter
        </span>
      </div>
      {err && (
        <>
          <div className="mt-5 w-full text-center text-sm">User Not Found!</div>
          <div className="w-full h-[1px] bg-white/[0.1] mt-5"></div>
        </>
      )}
      {user && (
        <>
          <div
            onClick={() => handleSelect(user)}
            className="mt-5 flex items-center gap-4 rounded-xl hover:bg-c5 py-2 px-4 cursor-pointer"
          >
            <Avatar size="large" user={user} />
            <div className="flex flex-col gap-1 grow">
              <span className="text-base text-white flex items-center justify-between">
                <div className="font-medium">{user.displayName}</div>
              </span>
              <p className="text-small text-c3">{user.email}</p>
            </div>
          </div>
          <div className="w-full h-[1px] bg-white/[0.1] mt-5"></div>
        </>
      )}
    </div>
  );
};

export default Search;
