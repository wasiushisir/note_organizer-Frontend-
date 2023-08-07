import { useState } from "react";

export default function AddNoteForm() {
  const [selectedFile, setSelectedFile] = useState(null);
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
    const file = event.target.file[0];
    setSelectedFile(file);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a new FormData object
    const formDataObj = new FormData();
    formDataObj.append("title", formData.title);
    formDataObj.append("category", formData.category);
    formDataObj.append("text", formData.text);
    formDataObj.append("fileData", selectedFile);

    // Add your authentication token to the headers

    const res = await fetch("http://localhost:3000/api/note", {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: formDataObj,
    });

    const datas = await res.json();

    console.log(datas);
  };
  // const {
  //   register,
  //   handleSubmit,

  //   formState: { errors },
  // } = useForm();
  // const onSubmit = async (data) => {
  //   console.log(data);
  //   const formDataObj = new FormData();
  //   formDataObj.append("title", data.title);
  //   formDataObj.append("category", data.category);
  //   formDataObj.append("text", data.text);
  //   formDataObj.append("file", data.file[0]);
  //   // Assuming "file" is the name attribute of the file input

  //   const res = await fetch("http://localhost:3000/api/note", {
  //     method: "POST",
  //     headers: {
  //       authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //     },
  //     body: formDataObj,
  //   });

  //   const datas = await res.json();

  //   console.log(datas);
  // };
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* register your input into the hook by invoking the "register" function */}
          {/* <input defaultValue="test" {...register("example")} /> */}

          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Type here"
              className="input input-bordered w-[400px] "
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
              className="input input-bordered w-[400px] "
            />
          </div>

          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Text</span>
            </label>
            {/* <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-[400px] "
            {...register("Genre", { required: true })}
          /> */}
            <textarea
              type="text"
              name="text"
              value={formData.text}
              onChange={handleInputChange}
              className="textarea textarea-bordered w-[400px]"
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
              className="file-input file-input-bordered file-input-sm w-[400px] max-w-xs"
            />
          </div>

          <button type="submit" className="btn mt-3">
            Submit
          </button>
          {/* <input type="submit" /> */}
        </form>
      </div>
    </div>
  );
}
