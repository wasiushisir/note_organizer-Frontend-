export const DeleteHandler = async (id, refetch) => {
  const res = await fetch(`http://localhost:3000/api/note/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  const data = await res.json();

  if (data?.success) {
    refetch();
  }

  return data;
};
