import React, { useEffect, useState } from "react";
import { useLazyGetMessagesQuery } from "../store/services/messageService";
import Message from "./Message";
export default function Messages({ scrollToBottom }) {
  const [getMessages, { data, isLoading, isSuccess }] =
    useLazyGetMessagesQuery();
  const [first, setFirst] = useState(true);

  useEffect(() => {
    if (data) {
      if (first) {
        scrollToBottom();
        setFirst(false);
      }
    }
  }, [data]);

  useEffect(() => {
    getMessages();
    const timer = setInterval(() => {
      getMessages();
    }, 5000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      {data?.map((msg) => (
        <Message key={msg.id} getMessages={getMessages} msg={msg} />
      ))}
    </div>
  );
}
