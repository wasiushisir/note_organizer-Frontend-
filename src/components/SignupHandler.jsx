export const SignupHandler = async (data) => {
  const res = await fetch(
    "https://note-organizer-zkht.onrender.com/api/users",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const datas = await res.json();

  console.log(datas);
  const accessToken = datas.token;
  localStorage.setItem("accessToken", accessToken);

  return datas;
};
