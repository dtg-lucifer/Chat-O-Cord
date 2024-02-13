import { FaPlus, FaSmileWink } from "react-icons/fa";
import { BiX } from "react-icons/bi";
import {
  TextField as TextFieldCVA,
  Message as MessageCVA,
} from "../index.components";
import {
  AttachmentPreviewImage,
  ChatBottomWrapper,
  ChatMessagesStatus,
  ChatSectionMainWrapper,
  ChatTopWrapper,
  ChatTypingStatusWrapper,
  ConversationWrapper,
  ImageViewerWrapper,
} from "../index.styled";
import EmojiPicker, { EmojiStyle, SkinTones, Theme } from "emoji-picker-react";
import { useContext, useEffect, useRef, useState } from "react";
import { useDebouncedTyping } from "../../../utils/hooks/useDebounce";
import { ActiveChatContext } from "../../../utils/context/activeChatContext";
import AuthContext from "../../../utils/context/authContext";
import { Message } from "../../../types/conversation";
import {
  addMessages,
  getMessagesAsync,
} from "../../../utils/store/slices/messages.slice";
import { AppDispatch, RootState } from "../../../utils/store";
import { useDispatch, useSelector } from "react-redux";
import { formatDistance, formatRelative } from "date-fns";
import { SocketContext } from "../../../utils/context/socketContext";
import { createMessage, createMessageWithAsset } from "../../../lib/api";
import { updateLastMessage } from "../../../utils/store/slices/conversation.slice";
import classNames from "classnames";
import { useBufferToImageSrc } from "../../../utils/hooks/useBufferToImageSrc";
import { toast } from "sonner";

export default function ChatSection() {
  const emojiPanelRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const [message, setMessage] = useState<string>("");
  const [messagesLocal, setMessagesLocal] = useState<Message[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [imagePreviewSrc, setImagePreviewSrc] = useState<string>("");
  const [activeAssetToView, setActiveAssetToView] = useState<string>("");
  const [activeImage, setActiveImage] = useState<boolean>(false);
  const [isTypingStatus, setIsTypingStatus] = useState<{
    userName: string;
    status: boolean;
  }>({ userName: "", status: false });

  const { isTyping, debouncedVal } = useDebouncedTyping<string>(message, 2000);
  const { activeChat } = useContext(ActiveChatContext);
  const { user } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const getSrc = useBufferToImageSrc();

  const { loading } = useSelector((state: RootState) => state.messages);

  const { conversations } = useSelector(
    (state: RootState) => state.conversation
  );

  const currentChatUser =
    activeChat?.recipient.id === user?.id
      ? activeChat?.creator
      : activeChat?.recipient;

  const timeStamp = (msg: Message): string => {
    return formatRelative(new Date(msg.createdAt), new Date());
  };

  const showTimeStampAndAvatar = (
    msg: Message,
    i: number,
    msgs: Message[]
  ): boolean => {
    if (i === msgs.length - 1) return true;

    const index = i === msgs.length - 1 ? i : i + 1;

    if (msg.author.id !== msgs[index].author.id) return true;

    if (
      msg.author.id === msgs[index].author.id &&
      timeStamp(msg) === timeStamp(msgs[index])
    )
      return false;

    return true;
  };

  /**
   *! ---- NOTE ----
   *! MAKE THIS FUNCTION WITH REACT-QUERY
   *! SO THAT WE CAN RECEIVE THE MESSAGE FROM THE SERVER AND UPDATE THE UI
   *! SOMETIMES IF THE NETWORK CONNECTION IS SLOW OR THE SERVER TAKES TOO MUCH TO TIME TO RESPOND
   *! THEN THE MESSAGE WILL NOT BE UPDATED IN THE UI
   *! BUT THE MESSAGE WILL BE SENT TO THE SERVER
   *! SO THE MESSAGE WILL FIRST COME UP FADED THEN AFTER SAVING TO THE SERVER IT WILL BE UPDATED
   *! IN CASE OF ERROR THE FADED MESSAGE WILL BE DELETED FROM THE UI
   **/
  const handleMessageSubmit = async () => {
    const messageToSend = message.trim();
    let messageToBeSent: string = "";

    if (!messageToSend && !file) return;

    if (!messageToSend && file) messageToBeSent = "📷 𝔸𝕥𝕥𝕒𝕔𝕙𝕞𝕖𝕟𝕥";

    if (file) {
      const formData = new FormData();
      formData.append("attachment", file);
      formData.append("content", messageToBeSent);
      formData.append("id", activeChat!.id);
      const { data: messageFromApi } = await createMessageWithAsset(formData);
      setMessagesLocal((prevMsgs) => [messageFromApi.message, ...prevMsgs]);
      setFile(null);
      setImagePreviewSrc("");
      socket.emit("message:create", {
        message: messageFromApi.message,
        authorId: user?.id,
        convId: activeChat?.id,
      });
      socket.emit("attachment:create", {
        convId: activeChat?.id,
        attachmentSrc: messageFromApi.secureUrl,
        message: messageFromApi.message,
      });
      return;
    }

    const { data: messageFromApi } = await createMessage({
      content: messageToSend!,
      id: activeChat!.id,
    });

    setMessagesLocal((prevMsgs) => [messageFromApi, ...prevMsgs]);

    socket.emit("message:create", {
      message: messageFromApi,
      authorId: user?.id,
      convId: activeChat?.id,
    });
  };

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        emojiPanelRef.current?.firstElementChild?.classList.remove(
          "emoji__wrapper__active"
        );
      }
    });

    return () => {
      window.removeEventListener("keydown", () => {});
    };
  }, []);

  useEffect(() => {
    if (activeChat) {
      dispatch(getMessagesAsync({ id: activeChat.id, limit: 100, page: 1 }))
        .unwrap()
        .then((data) => {
          setMessagesLocal(data.data.messages);
        });
    }
    socket.emit("conversation:join", {
      convId: activeChat?.id,
      userId: user?.id,
      userName: user?.userName,
    });
  }, [activeChat, dispatch, socket]);

  useEffect(() => {
    socket.on(
      "message:received",
      (data: {
        convId: string;
        message: Message;
        authorId: string;
        attachmentSrc: string;
      }) => {
        if (data.authorId === user?.id) {
          dispatch(
            updateLastMessage({
              id: data.convId,
              lastMessageContent: data.message.content,
            })
          );
          return;
        }
        dispatch(
          addMessages({
            convId: data.convId,
            message: data.message,
          })
        );
        dispatch(
          updateLastMessage({
            id: data.convId,
            lastMessageContent: data.message.content,
          })
        );
        setMessagesLocal((prevMsgs) => [data.message, ...prevMsgs]);
      }
    );

    socket.on(
      "attachment:received",
      (data: {
        convId: string;
        secureUrl: string;
        message: Message;
        attachmentSrc: string;
      }) => {
        setMessagesLocal((prevMsgs) => {
          return prevMsgs.map((msg) => {
            if (msg.attachmentSrc) return msg;
            if (msg.id === data.message.id)
              return { ...msg, attachmentSrc: data.attachmentSrc };
            return msg;
          });
        });
      }
    );

    socket.on("typing:started", ({ userName }) => {
      setIsTypingStatus({ userName, status: true });
    });

    socket.on("typing:stopped", () => {
      setIsTypingStatus({ userName: "", status: false });
    });

    return () => {
      socket.off("attachment:received", () => {});
      socket.off("message:received", () => {});
      socket.off("typing:started", () => {});
      socket.off("typing:stopped", () => {});
    };
  }, [socket]);

  useEffect(() => {
    if (isTyping) {
      socket.emit("typing:start", {
        convId: activeChat?.id,
        userName: user?.userName,
      });
    }

    if (message && !isTyping) {
      socket.emit("typing:stop", {
        convId: activeChat?.id,
        userName: user?.userName,
      });
    }
  }, [isTyping]);

  return (
    <ChatSectionMainWrapper>
      {activeImage && (
        <ImageViewerWrapper>
          <img
            src={activeAssetToView}
            alt="attachment"
            className={classNames("w-full h-full", {
              hidden: !activeImage,
              block: activeImage,
            })}
          />
          <BiX
            size={30}
            className="cursor-pointer text-white absolute top-2 right-2"
            onClick={() => {
              setActiveImage(false);
              setActiveAssetToView("");
            }}
          />
        </ImageViewerWrapper>
      )}
      <ChatTopWrapper>
        <img src={currentChatUser?.profilePic || "/BLANK.jpeg"} alt="" />
        <span>{currentChatUser?.userName}</span>
        <span>{currentChatUser?.online}</span>
      </ChatTopWrapper>
      <ConversationWrapper>
        {loading ? (
          <ChatMessagesStatus>
            <div className="spinner__wrapper">
              <div className="spinner">
                <div></div>
              </div>
            </div>
            <span>Loading up your messages !!</span>
          </ChatMessagesStatus>
        ) : messagesLocal.length === 0 ? (
          <ChatMessagesStatus>
            <span>
              Seems like no ones here for a while, add something up here...
            </span>
          </ChatMessagesStatus>
        ) : (
          messagesLocal.map((msg, i, msgs) => {
            return (
              <MessageCVA
                variant={currentChatUser?.profilePic ? "withImg" : "withoutImg"}
                key={msg?.id}
                style={{
                  marginBlockStart: !showTimeStampAndAvatar(msg, i, msgs)
                    ? ""
                    : "0.8rem",
                }}
              >
                {msg.author.profilePic ? (
                  <img
                    src={msg.author.profilePic}
                    className="w-10 rounded-full aspect-square"
                    alt="profle_pic"
                    style={{
                      display: showTimeStampAndAvatar(msg, i, msgs)
                        ? ""
                        : "none",
                    }}
                  />
                ) : (
                  <img
                    src="/BLANK.jpeg"
                    className="w-10 rounded-full aspect-square"
                    alt="profile_pic"
                    style={{
                      display: showTimeStampAndAvatar(msg, i, msgs)
                        ? ""
                        : "none",
                    }}
                  />
                )}
                <div className="flex-1">
                  <h3
                    style={{
                      display: showTimeStampAndAvatar(msg, i, msgs)
                        ? ""
                        : "none",
                    }}
                    className="font-semibold text-[16px]"
                  >
                    {msg.author.userName}
                  </h3>
                  <div>
                    {msg.attachmentSrc && (
                      <img
                        // src={getSrc(msg)}
                        src={msg.attachmentSrc}
                        alt="attachment"
                        className="w-[300px] rounded-md lazyload cursor-pointer"
                        loading="lazy"
                        onClick={() => {
                          setActiveAssetToView(msg.attachmentSrc!);
                          setActiveImage(true);
                        }}
                        style={{
                          marginInlineStart: showTimeStampAndAvatar(
                            msg,
                            i,
                            msgs
                          )
                            ? ""
                            : "3rem",
                          marginBlockStart: !showTimeStampAndAvatar(
                            msg,
                            i,
                            msgs
                          )
                            ? ""
                            : "0.8rem",
                        }}
                      />
                    )}
                    <p
                      style={{
                        marginInlineStart: showTimeStampAndAvatar(msg, i, msgs)
                          ? ""
                          : "3rem",
                        wordWrap: "break-word",
                        wordBreak: "break-all",
                        whiteSpace: "pre-wrap",
                      }}
                      className=" text-sm text-[#c5c5c5]"
                    >
                      {msg.content === "📷 𝔸𝕥𝕥𝕒𝕔𝕙𝕞𝕖𝕟𝕥" ? "" : msg.content}
                    </p>
                  </div>
                </div>
                <p
                  style={{
                    display: showTimeStampAndAvatar(msg, i, msgs) ? "" : "none",
                  }}
                  className="text-xs text-[#555555] self-start mt-[5px] ml-[3rem]"
                >
                  {formatDistance(new Date(msg.createdAt), new Date(), {
                    addSuffix: true,
                  })
                    .charAt(0)
                    .toUpperCase() +
                    formatDistance(new Date(msg.createdAt), new Date(), {
                      addSuffix: true,
                    }).slice(1)}
                </p>
              </MessageCVA>
            );
          })
        )}
      </ConversationWrapper>
      {isTypingStatus.status && isTypingStatus.userName !== user?.userName && (
        <ChatTypingStatusWrapper>
          {isTypingStatus.userName} is typing...
        </ChatTypingStatusWrapper>
      )}
      <ChatBottomWrapper>
        <FaPlus size={20} onClick={() => fileInputRef.current?.click()} />
        <FaSmileWink
          size={20}
          onClick={() => {
            emojiPanelRef.current?.firstElementChild?.classList.toggle(
              "emoji__wrapper__active"
            );
          }}
        />
        <AttachmentPreviewImage
          className={classNames(
            "h-20",
            "cursor-pointer",
            "outline-1 outline-blue-500",
            "outline-solid outline-opacity-50",
            "absolute -top-[5.5rem] left-[1rem]",
            {
              hidden: !imagePreviewSrc,
              block: imagePreviewSrc,
            }
          )}
          src={imagePreviewSrc && imagePreviewSrc}
          alt="preview"
          onClick={() => {
            setFile(null);
            setImagePreviewSrc("");
            toast.error("Attachment removed !!");
          }}
        />
        <input
          ref={fileInputRef}
          type="file"
          name="attachment"
          accept=".jpg,.jpeg,.png"
          hidden
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setFile(file);
              setImagePreviewSrc(URL.createObjectURL(file));
            }
          }}
        />
        <TextFieldCVA
          variant={"chat"}
          size={"lg"}
          placeholder="Send something"
          autoFocus
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (e.target.value.trim() === "") {
              socket.emit("typing:stop", {
                convId: activeChat?.id,
                userName: user?.userName,
              });
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleMessageSubmit();
              setMessage("");
              socket.emit("typing:stop", {
                convId: activeChat?.id,
                userName: user?.userName,
              });
            }
          }}
        />
        <div
          ref={emojiPanelRef}
          className="emoji__wrapper absolute bottom-[100%] right-0"
        >
          <EmojiPicker
            theme={Theme.DARK}
            defaultSkinTone={SkinTones.NEUTRAL}
            lazyLoadEmojis={true}
            emojiStyle={EmojiStyle.APPLE}
            onEmojiClick={(e) => setMessage((prevMsg) => prevMsg + e.emoji)}
          />
        </div>
      </ChatBottomWrapper>
    </ChatSectionMainWrapper>
  );
}
