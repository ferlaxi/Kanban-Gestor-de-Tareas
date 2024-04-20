import axios from "axios";
import { useEffect, useState } from "react";
import useKanban from "@/hooks/useKanban";

export default function SubtareasLength({ id }: any) {
  const [length, setLength] = useState(0);

  const { subtarea, aux } = useKanban();

  useEffect(() => {
    async function subtareasLength() {
      const { data } = await axios(`/api/tarea/subtarea/${id}`);
      setLength(data.length);
    }
    subtareasLength();
  }, [subtarea, aux]);
  return <>{length}</>;
}
