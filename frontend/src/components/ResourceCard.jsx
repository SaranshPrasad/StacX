import {
  FileText,
  Eye,
  Download,
} from "lucide-react";

export default function ResourceCard({
  resource,
  handleView,
  handleDownload,
}) {
  return (
    <div className="group bg-white/[0.03] border border-white/10 rounded-[28px] p-5 hover:border-indigo-500/30 hover:bg-indigo-500/[0.04] transition duration-300">

      <div className="flex items-start justify-between">

        <div className="bg-indigo-500/10 border border-indigo-500/20 p-4 rounded-2xl">
          <FileText className="text-indigo-400" />
        </div>

        <span className="text-xs bg-white/10 px-3 py-1 rounded-full capitalize">
          {resource.type}
        </span>
      </div>

      <div className="mt-5">

        <h2 className="text-xl font-bold line-clamp-2">
          {resource.title}
        </h2>

        <p className="text-gray-400 mt-3 text-sm">
          {resource.subject}
        </p>

        <div className="flex flex-wrap gap-2 mt-4">

          <span className="bg-indigo-500/10 text-indigo-300 px-3 py-1 rounded-full text-xs">
            {resource.course}
          </span>

          <span className="bg-pink-500/10 text-pink-300 px-3 py-1 rounded-full text-xs">
            Sem {resource.semester}
          </span>
        </div>

        <div className="mt-6 flex gap-3">

          <button
            onClick={() => handleView(resource._id)}
            className="flex-1 bg-white/10 hover:bg-white/20 py-3 rounded-2xl flex items-center justify-center gap-2 transition"
          >
            <Eye size={18} />
            View
          </button>

          <button
            onClick={() => handleDownload(resource._id)}
            className="flex-1 bg-indigo-500 hover:bg-indigo-600 py-3 rounded-2xl flex items-center justify-center gap-2 transition"
          >
            <Download size={18} />
            Download
          </button>
        </div>
      </div>
    </div>
  );
}