import styles from "./index.module.scss";
import { SideBar, ChatSection } from "../../components/conversation";
import PrimaryBar from "../../components/primarybar";
import { useContext, useEffect, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../utils/store";
import { toast } from "sonner";
import { getConversationsAsync } from "../../utils/store/slices/conversation.slice";
import { ActiveChatContext } from "../../utils/context/activeChatContext";

const ConversationPage = () => {
  const { id, mode } = useParams<{ id: string; mode: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { activeChat } = useContext(ActiveChatContext)

  useLayoutEffect(() => {
    if (mode !== "d" && mode !== "g") {
      window.location.href = "/conversations/d";
    }
  }, [mode]);

  useEffect(() => {
    dispatch(getConversationsAsync(mode!))
      .unwrap()
      .then(() => {
        toast.success("Fetched conversations");
      })
      .catch(() => {
        toast.error("No conversations found on this mode");
      });
  }, [mode]);

  return (
    <main className={styles.main__wrapper}>
      <PrimaryBar />
      <SideBar activeGroup={mode} activeConversationId={id} />
      {activeChat && <ChatSection />}
    </main>
  );
};

export default ConversationPage;
