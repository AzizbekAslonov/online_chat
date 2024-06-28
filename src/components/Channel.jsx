import React, { useEffect, useRef, useState } from "react";
import Messages from "./Messages";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faDownLong, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useLazyGetMessagesQuery,
  useSendFileMutation,
  useSendMessageMutation,
} from "../store/services/messageService";

export default function Channels() {
  const [value, setValue] = useState("");
  const users = useSelector((state) => state.app.users);
  const inputRef = useRef(null);
  const fileRef = useRef(null);
  const blockRef = useRef(null);
  const [action, setAction] = useState("");
  const [postMessage, { isLoading: messageLoading }] = useSendMessageMutation();
  const [postFile, { isLoading: fileLoading }] = useSendFileMutation();
  const [getMessages, { data, isLoading, isSuccess }] =
    useLazyGetMessagesQuery();

  const sendMessage = () => {
    const file = fileRef.current.files[0];
    if (!value && !file) return toast.error("Text is required");

    if (file) {
      const formData = new FormData();
      formData.append("img", file);
      postFile(formData)
        .unwrap()
        .then(() => {
          fileRef.current.value = "";
          setValue("");
          setAction("FILE");
          getMessages();
        });
    } else if (value) {
      postMessage({ text: value })
        .unwrap()
        .then(() => {
          setValue("");
          setAction("MESSAGE");
          getMessages();
        });
    }
  };

  useEffect(() => {
    if (action === "MESSAGE" || action === "FILE") {
      scrollToBottom();

      setAction("");
    }

    inputRef.current.focus();
  }, [data]);

  const prepareFile = () => {
    fileRef.current.click();
  };

  const scrollToBottom = () => {
    blockRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="static pb-16 pt-16  ">
      <div className="h-1/12  w-[70%]  p-2 bg-saidbar-background text-white absolute top-0 fixed">
        <h1>G53</h1>
        <small className="italic">{users?.length} members</small>
      </div>
      <Messages action={action} scrollToBottom={scrollToBottom} />
      <div ref={blockRef}></div>
      <div className="w-[70%] p-2 bg-saidbar-background gap-3 flex justify-between text-white absolute bottom-0 fixed ">
        <button
          onClick={scrollToBottom}
          className="fixed bottom-[60px] right-[30px] bg-slate-900 w-10 h-10 rounded-md"
        >
          <FontAwesomeIcon className="text-white" icon={faDownLong} />
        </button>
        <button>
          <input
            onChange={(e) => {
              if (e.target.files[0]) setValue(e.target.files[0].name);
            }}
            type="file"
            disabled={messageLoading || fileLoading}
            hidden
            ref={fileRef}
          />
          <FontAwesomeIcon onClick={prepareFile} icon={faPaperclip} />
        </button>
        <input
          ref={inputRef}
          disabled={messageLoading || fileLoading}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{ caretColor: "white", cursor: "auto" }}
          className=" w-full bg-transparent border-none outline-0 focus:border-none focus:border-black"
          type="text"
        />
        <button disabled={messageLoading || fileLoading} onClick={sendMessage}>
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
}
