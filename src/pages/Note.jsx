import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Note({ notes }) {
  const [filter, setFilter] = useState(notes.data);
  const [inputValue, setInputValue] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const searchData = async () => {
      const res = await fetch(
        `https://note-organizer-zkht.onrender.com/api/note?searchTerm=${inputValue}`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      const data1 = await res.json();

      setFilter(data1?.data);
    };

    searchData();
  }, [inputValue]);

  useEffect(() => {
    if (category !== "All") {
      const filtering = async () => {
        const res = await fetch(
          `https://note-organizer-zkht.onrender.com/api/note?category=${category}`,
          {
            method: "GET",
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        const data1 = await res.json();
        if (data1) {
          setFilter(data1?.data);
        }
      };

      filtering();
    } else {
      setFilter(notes?.data);
    }
  }, [category]);

  console.log(filter);

  const handleDelete = async (id) => {
    // const result = await DeleteHandler(id, refetch);
    // console.log(result);
    const res = await fetch(
      `https://note-organizer-zkht.onrender.com/api/note/${id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    const datas = await res.json();
    console.log(datas);

    if (datas?.success) {
      const remaining = filter?.filter((or) => or._id !== id);

      setFilter(remaining);
    }
  };

  // console.log(filter);

  const propertyToMakeUnique = "category";

  // Use a Set to store unique values
  const uniqueValuesSet = new Set();

  // Iterate through the array and add the chosen property's value to the Set
  notes?.data?.forEach((obj) => {
    uniqueValuesSet.add(obj[propertyToMakeUnique]);
  });

  const uniqueValuesArray = Array.from(uniqueValuesSet);

  console.log(uniqueValuesArray);

  // console.log(notes);
  // console.log(filterData, "fi");
  return (
    <div className="px-[100px]">
      <div className="flex justify-center items-center mb-[50px]">
        <div className="form-control">
          <div className="input-group ">
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              type="text"
              placeholder="Search…"
              className="input input-bordered w-[200px] md:w-[450px]"
            />
            <button className="btn btn-square">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <select
          onChange={(e) => setCategory(e.target.value)}
          className="select select-bordered w-[100px] md:w-[160px]  "
        >
          <option className="" disabled selected>
            Select Category
          </option>
          {uniqueValuesArray?.map((note) => (
            <>
              <option>{note}</option>
            </>
          ))}
          <option>All</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {filter?.map((note) => (
          <>
            <div className="rounded-2xl h-max w-full md:w-[400px]  flex flex-col items-center cursor-pointer overflow-hidden shadow-md border border-gray-100   gap-2 pb-3">
              <h1 className="text-xl font-semibold">Title: {note?.title}</h1>
              <p className="text-md font-medium">Category: {note?.category}</p>
              <p className="text-md font-medium">Text: {note?.text}</p>
              <div className="flex justify-center">
                <p className="px-3 w-max">File:{note.fileData}</p>
              </div>

              <div className="flex justify-center items-center space-x-2">
                <button
                  onClick={() => handleDelete(note._id)}
                  className="btn btn-warning  md:btn-sm  btn-xs"
                >
                  Delete
                </button>
                <Link to={`/home/editNote/${note._id}`}>
                  <button className="btn btn-success md:btn-sm  btn-xs">
                    Update
                  </button>
                </Link>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
