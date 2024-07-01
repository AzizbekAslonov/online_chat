import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import React from "react";
import {
  useDeleteMessageMutation,
  useLikeMutation,
} from "../store/services/messageService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Message({ msg, getMessages }) {
  const [like, { isLoading: likeLoading }] = useLikeMutation();
  const [deleteMessage, { isLoading: deleteLoading }] =
    useDeleteMessageMutation();

  const likeOrUnlike = (id) => {
    if (likeLoading) return;
    like(id)
      .unwrap()
      .then(() => {
        getMessages();
      });
  };
  const removeMessage = (id) => {
    if (deleteLoading) return;
    deleteMessage(id)
      .unwrap()
      .then(() => {
        getMessages();
      });
  };

  return (
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
          {deleteLoading ? (
            <p>Deleting...</p>
          ) : (
            <div>
              {msg.userName && (
                <small className="inline-block pb-1.5">{msg.userName}</small>
              )}
              {msg.file && (
                <div className="h-[300px] w-[300px] flex justify-center items-center">
                  <a href={msg.file} target="_blank">
                    <img
                      className="max-w-full max-h-full object-cover mx-auto"
                      src={msg.file}
                      alt={msg.fileName}
                    />
                  </a>
                </div>
              )}
              <p>{msg.text || msg.fileName}</p>
              <div className="flex items-center justify-between pt-2">
                <small className="italic">
                  {new Date(msg.time).toLocaleTimeString()}
                </small>
                {likeLoading ? (
                  <p>loading...</p>
                ) : (
                  <div className="text-white ">
                    <FontAwesomeIcon
                      onClick={() => likeOrUnlike(msg.id)}
                      color="yellow"
                      icon={faThumbsUp}
                    />
                    <a className="ps-1">{msg.likes}</a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Message;
