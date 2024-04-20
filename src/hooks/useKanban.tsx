import { useContext } from "react";
import { KanbanContext } from "@/context/kanbanContext";

export default function useKanban() {
  return useContext(KanbanContext);
}
