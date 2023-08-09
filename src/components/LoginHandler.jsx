import { toast } from "react-toastify";

export const LoginHandler = async (data) => {
  const res = await fetch(
    "https://note-organizer-zkht.onrender.com/api/users/login",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const datas = await res.json();
  toast("login successfully");

  console.log(datas);
  const accessToken = datas.token;
  localStorage.setItem("accessToken", accessToken);

  return datas;
};
