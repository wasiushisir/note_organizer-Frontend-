import { useQuery } from "react-query";
import Note from "./Note";

export default function Notes() {
  const {
    data: notes,
    isLoading,
    refetch,
  } = useQuery("notes", () =>
    fetch("http://localhost:3000/api/note", {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  if (isLoading) {
    return <progress className="progress w-56"></progress>;
  }

  return (
    <div>
      <Note notes={notes} refetch={refetch} />
    </div>
  );
}
