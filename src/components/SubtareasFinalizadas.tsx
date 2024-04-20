import axios from "axios";
import { useEffect, useState } from "react";
import useKanban from "@/hooks/useKanban";

export default function SubtareasFinalizadas({ id }: any) {
  const [length, setLength] = useState(0);

  const { aux } = useKanban();

  useEffect(() => {
    async function subtareasLength() {
      const { data } = await axios(`/api/tarea/subtarea/${id}`);
      let count = 0;
      data.forEach((dato: any) => {
        if (dato.finalizada) {
          setLength(++count);
        }
      });
      count === 0 && setLength(0);
    }
    subtareasLength();
  }, [aux]);

  return <>{length}</>;
}
