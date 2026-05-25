import { X } from "lucide-react";

export default function RequestModal({
  showRequestModal,
  setShowRequestModal,
  createRequest,
}) {
  if (!showRequestModal) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">

      <div className="w-full max-w-lg bg-[#111111] border border-white/10 rounded-[35px] p-6">

        <div className="flex items-center justify-between">

          <h2 className="text-2xl font-bold">
            Request Resource
          </h2>

          <button
            onClick={() =>
              setShowRequestModal(false)
            }
            className="bg-white/10 p-2 rounded-xl"
          >
            <X />
          </button>
        </div>

        <form
          onSubmit={createRequest}
          className="space-y-4 mt-6"
        >

          <input
            name="subject"
            placeholder="Subject Name"
            className="w-full bg-black/30 border border-white/10 rounded-2xl px-4 py-4 outline-none"
          />

          <textarea
            name="message"
            placeholder="Describe what notes or PYQ you need..."
            className="w-full bg-black/30 border border-white/10 rounded-2xl px-4 py-4 outline-none h-32"
          />

          <div className="grid grid-cols-2 gap-4">

            <input
              name="course"
              placeholder="Course"
              className="bg-black/30 border border-white/10 rounded-2xl px-4 py-4 outline-none"
            />

            <input
              name="semester"
              placeholder="Semester"
              className="bg-black/30 border border-white/10 rounded-2xl px-4 py-4 outline-none"
            />
          </div>

          <select
            name="type"
            className="w-full bg-black/30 border border-white/10 rounded-2xl px-4 py-4 outline-none"
          >
            <option value="notes">Notes</option>

            <option value="pyq">PYQ</option>
          </select>

          <button className="w-full bg-indigo-500 hover:bg-indigo-600 py-4 rounded-2xl font-semibold transition">
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}