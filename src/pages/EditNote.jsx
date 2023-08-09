import EditNoteForm from "../components/EditNoteForm";

export default function EditNote() {
  return (
    <div>
      <div className="flex justify-center items-center mt-[0px] overflow-x-auto whitespace-nowrap">
        <div className="card w-[300px] md:w-[500px] bg-base-100 shadow-xl ">
          <figure className="px-10 pt-10">
            <h1 className="text-3xl font-bold">Edit Note</h1>
          </figure>
          <div className="card-body items-center text-center">
            <EditNoteForm />
          </div>
        </div>
      </div>
    </div>
  );
}
