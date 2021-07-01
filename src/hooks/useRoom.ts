import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type QuestionType = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likes?: Record<string, { authorId: string }>;
  likeCount: number;
  likeId: string | undefined;
};

type FirebaseQuestions = Record<string, QuestionType>;

export function useRoom(roomId: string, isAdminRoom = false) {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [title, setTitle] = useState("");
  const history = useHistory();

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on("value", (room) => {
      const databaseRoom = room.val();

      if (isAdminRoom) {
        const roomAuthorId = databaseRoom.authorId;
        if (user?.id !== roomAuthorId) {
          alert("Você não tem permissão para acessar essa página 🤔");

          history.push(`/rooms/${roomId}`);
        }
      }

      if (!isAdminRoom && room.val().endedAt) {
        alert("Essa sala já foi encerrada.");

        history.push("/");
      }

      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(
        ([key, { content, author, isHighlighted, isAnswered, likes }]) => {
          return {
            id: key,
            content,
            author,
            isHighlighted,
            isAnswered,
            likeCount: Object.values(likes ?? {}).length,
            likeId: Object.entries(likes ?? {}).find(
              ([_, like]) => like.authorId === user?.id,
            )?.[0],
          };
        },
      );

      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    });

    return () => {
      roomRef.off("value");
    };
  }, [roomId, user, history, isAdminRoom]);

  return { questions, title };
}
