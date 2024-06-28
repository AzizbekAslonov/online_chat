import React, { useEffect, useState } from "react";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  useDeleteMessageMutation,
  useLazyGetMessagesQuery,
  useLikeMutation,
} from "../store/services/messageService";
export default function Messages({ scrollToBottom, action }) {
  const [getMessages, { data, isLoading, isSuccess }] =
    useLazyGetMessagesQuery();
  const [like, { isLoading: likeLoading }] = useLikeMutation();
  const [deleteMessage, { isLoading: deleteLoading }] =
    useDeleteMessageMutation();
  const [first, setFirst] = useState(true);

  useEffect(() => {
    if (data) {
      if (first) {
        scrollToBottom();
        setFirst(false);
      }
    }
  }, [data]);

  const likeOrUnlike = (id) => {
    if (likeLoading) return;
    like(id);
    // .unwrap().then()
  };
  const removeMessage = (id) => {
    if (deleteLoading) return;
    deleteMessage(id);
    // .unwrap().then()
  };

  useEffect(() => {
    getMessages();
    const timer = setInterval(() => {
      getMessages();
    }, 3000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      {data?.map((msg) => (
        <div
          onDoubleClick={() => removeMessage(msg.id)}
          key={msg.id}
          className=" ps-2 gap-10"
        >
          <div className="flex gap-4 items-end p-4 ">
            <img
              className="rounded-full flex-shrink-0 w-12 h-12 object-cover"
              src={msg.userImg}
            />
            <div className=" bg-[#0c1f2a] min-w-[200px] rounded-lg p-4">
              {msg.userName && (
                <small className="inline-block pb-1.5">{msg.userName}</small>
              )}
              {msg.file && (
                <img
                  className="max-w-full max-h-[300px] object-cover"
                  src={msg.file}
                  alt={msg.fileName}
                />
              )}
              <p>{msg.text || msg.fileName}</p>
              <div className="flex items-center justify-between pt-2">
                <small className="italic">
                  {new Date(msg.time).toLocaleTimeString()}
                </small>
                <div className="text-white ">
                  <FontAwesomeIcon
                    onClick={() => likeOrUnlike(msg.id)}
                    color="yellow"
                    icon={faThumbsUp}
                  />
                  <a className="ps-1">{msg.likes}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
