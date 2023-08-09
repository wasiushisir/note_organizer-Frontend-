import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

export default function EditNoteForm() {
  const { id } = useParams();
  const [selectedFile, setSelectedFile] = useState(null);
  const [secured, setSecured] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    text: "",
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    console.log(file);
  };

  const {
    data: notes,
    isLoading,
    refetch,
  } = useQuery("notes", () =>
    fetch("https://note-organizer-zkht.onrender.com/api/note", {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );
  console.log(notes.data);
  useEffect(() => {
    const securedData = notes.data.find((r) => r._id === id);

    setSecured(securedData);
  }, [id]);

  console.log(secured, "ooo");

  // console.log(securedData, "ya");
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a new FormData object
    const formDataObj = new FormData();
    formDataObj.append(
      "title",
      formData.title ? formData.title : secured.title
    );
    formDataObj.append(
      "category",
      formData.category ? formData.category : secured.category
    );
    formDataObj.append("text", formData.text ? formData.text : secured.text);
    formDataObj.append(
      "fileData",
      selectedFile ? selectedFile : secured.fileData
    );

    // Add your authentication token to the headers

    // const res = await fetch(
    //   `https://note-organizer-zkht.onrender.com/api/note/${id}`,
    //   {
    //     method: "PUT",
    //     headers: {
    //       authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    //     },
    //     body: formDataObj,
    //   }
    // );

    // const datas = await res.json();

    // console.log(datas, "datas");

    const result = await edit(id, formDataObj);
    console.log(result);
  };

  const edit = async (id, formDataObj) => {
    console.log(secured._id);
    const res = await fetch(
      `https://note-organizer-zkht.onrender.com/api/note/${id}`,
      {
        method: "PUT",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: formDataObj,
      }
    );

    const datas = await res.json();
    console.log(datas);

    return datas;
  };

  if (isLoading) {
    return <progress className="progress w-56"></progress>;
  }
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* register your input into the hook by invoking the "register" function */}
          {/* <input defaultValue="test" {...register("example")} /> */}

          <div className="form-control w-[220px]  md:w-full ">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Type here"
              className="input input-bordered w-[250px] md:w-[400px] "
            />
          </div>

          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              placeholder="Type here"
              className="input input-bordered w-[250px] md:w-[400px] "
            />
          </div>

          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Text</span>
            </label>

            <textarea
              type="text"
              name="text"
              value={formData.text}
              onChange={handleInputChange}
              className="textarea textarea-bordered w-[250px] md:w-[400px]"
              placeholder="Bio"
            />
          </div>

          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Choose file</span>
            </label>
            <input
              type="file"
              name="fileData"
              onChange={handleFileChange}
              className="file-input file-input-bordered file-input-sm w-[250px] md:w-[400px] max-w-xs"
            />
          </div>

          <button type="submit" className="btn mt-3">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
