import { useEffect, useState } from "react";

import API from "../services/api";

import {
  Bell,
  Upload,
  CheckCircle2,
  Clock3,
  FileText,
  X,
  AlertCircle,
  BookOpen,
} from "lucide-react";
import LoginToView from "./LoginToView";

export default function Notifications() {

  const [requests, setRequests] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [uploading, setUploading] =
    useState(false);

  const [selectedRequest, setSelectedRequest] =
    useState(null);

  const [file, setFile] =
    useState(null);

  const [title, setTitle] =
    useState("");

  const token =
    localStorage.getItem("token");

   if (!token) {
     return <LoginToView title="Login to Access Notifications" />;
   }

  const fetchRequests =
    async () => {

      try {

        setLoading(true);

        const res =
          await API.get(
            "/requests",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        const unresolved =
          res.data.requests.filter(
            (r) =>
              r.status !==
              "resolved"
          );

        setRequests(unresolved);

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {

    fetchRequests();

  }, []);

  // ==========================================
  // NORMALIZE TYPE
  // ==========================================

  const normalizeType =
    (type) => {

      if (!type)
        return "notes";

      const lower =
        type
          .toLowerCase()
          .trim();

      // NOTES

      if (
        lower === "note" ||
        lower === "notes"
      ) {

        return "notes";
      }

      // ASSIGNMENTS

      if (
        lower ===
          "assignment" ||
        lower ===
          "assignments"
      ) {

        return "assignment";
      }

      // PYQ

      if (
        lower === "pyq" ||
        lower === "pyqs"
      ) {

        return "pyq";
      }

      // FALLBACK

      return "notes";
    };

  // ==========================================
  // UPLOAD + RESOLVE
  // ==========================================

  const handleUpload =
    async (e) => {

      e.preventDefault();

      if (!title.trim()) {

        return alert(
          "Please enter resource title"
        );
      }

      if (!file) {

        return alert(
          "Please select a PDF"
        );
      }

      if (
        file.type !==
        "application/pdf"
      ) {

        return alert(
          "Only PDF files are allowed"
        );
      }

      try {

        setUploading(true);

        const resourceType =
          normalizeType(
            selectedRequest?.type ||
              "notes"
          );

        console.log({
          originalType:
            selectedRequest?.type,
          normalizedType:
            resourceType,
        });

        const formData =
          new FormData();

        formData.append(
          "title",
          title
        );

        // ALWAYS VALID ENUM

        formData.append(
          "type",
          resourceType ||
            "notes"
        );

        formData.append(
          "course",
          selectedRequest
            ?.course?._id
        );

        formData.append(
          "subject",
          selectedRequest
            ?.subject?._id
        );

        formData.append(
          "semester",
          selectedRequest
            ?.semester
        );

        formData.append(
          "file",
          file
        );

        // ==========================================
        // UPLOAD RESOURCE
        // ==========================================

        const uploadRes =
          await API.post(
            "/resources/upload",
            formData,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
                "Content-Type":
                  "multipart/form-data",
              },
            }
          );

        // ==========================================
        // RESOLVE REQUEST
        // ==========================================

        await API.post(
          `/requests/${selectedRequest._id}/resolve`,
          {
            resourceId:
              uploadRes.data
                .resource._id,
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        alert(
          "Request resolved successfully"
        );

        // RESET

        setSelectedRequest(
          null
        );

        setFile(null);

        setTitle("");

        fetchRequests();

      } catch (err) {

        console.log(err);

        alert(
          err?.response?.data
            ?.message ||
            "Upload failed"
        );

      } finally {

        setUploading(false);
      }
    };

  return (
    <div className="min-h-screen text-slate-800 bg-slate-50 px-4 py-6 sm:px-6 lg:px-10 max-w-7xl mx-auto md:px-8 pt-28 md:pt-36 pb-40 transition-colors duration-200">

      {/* HEADER */}

      <div className="flex items-center gap-4 mb-8">

        <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center border border-indigo-100 shadow-sm">

          <Bell
            size={24}
            className="text-indigo-600"
          />

        </div>

        <div>

          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Notifications
          </h1>

          <p className="text-slate-500 text-sm mt-1">
            Pending resource requests from the student community
          </p>

        </div>
      </div>

      {/* LOADING */}

      {loading && (

        <div className="flex justify-center py-20">

          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />

        </div>
      )}

      {/* EMPTY */}

      {!loading &&
        requests.length ===
          0 && (

          <div className="bg-white border border-slate-200/80 shadow-sm rounded-3xl p-14 text-center">

            <CheckCircle2
              size={44}
              className="mx-auto text-emerald-600 mb-4 stroke-[2]"
            />

            <h2 className="text-2xl font-bold text-slate-900">
              All Requests Solved
            </h2>

            <p className="text-slate-500 mt-2 text-sm">
              No pending requests found right now. Great job!
            </p>

          </div>
        )}

      {/* REQUESTS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

        {requests.map(
          (request) => (

            <div
              key={
                request._id
              }
              className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* TOP */}

                <div className="flex items-start justify-between">

                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">

                    <FileText
                      size={20}
                      className="text-indigo-600"
                    />

                  </div>

                  <div className="flex items-center gap-1.5 text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full text-xs font-semibold">

                    <Clock3 size={13} />

                    Pending

                  </div>
                </div>

                {/* MESSAGE */}

                <h2 className="text-lg font-bold text-slate-900 mt-4 leading-snug line-clamp-2">

                  {
                    request.message
                  }

                </h2>

                {/* DETAILS */}

                <div className="mt-4 space-y-2 text-sm text-slate-600 border-t border-slate-100 pt-4">

                  <p className="flex justify-between">
                    <span className="text-slate-400 font-medium">Type:</span>
                    <span className="text-indigo-600 capitalize font-semibold">
                      {normalizeType(
                        request.type
                      )}
                    </span>
                  </p>

                  <p className="flex justify-between">
                    <span className="text-slate-400 font-medium">Course:</span>
                    <span className="font-semibold text-slate-700 text-right truncate max-w-[180px]">
                      {
                        request
                          .course
                          ?.name || "-"
                      }
                    </span>
                  </p>

                  <p className="flex justify-between">
                    <span className="text-slate-400 font-medium">Subject:</span>
                    <span className="font-semibold text-slate-700 text-right truncate max-w-[180px]">
                      {
                        request
                          .subject
                          ?.name || "-"
                      }
                    </span>
                  </p>

                  <p className="flex justify-between">
                    <span className="text-slate-400 font-medium">Semester:</span>
                    <span className="font-semibold text-slate-700">
                      {
                        request.semester || "-"
                      }
                    </span>
                  </p>

                  <p className="flex justify-between">
                    <span className="text-slate-400 font-medium">Requested By:</span>
                    <span className="font-semibold text-slate-700 text-right truncate max-w-[160px]">
                      {
                        request
                          .requestedBy
                          ?.name || "-"
                      }
                    </span>
                  </p>
                </div>
              </div>

              {/* BUTTON */}

              <button
                onClick={() =>
                  setSelectedRequest(
                    request
                  )
                }
                className="mt-6 w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl py-3 flex items-center justify-center gap-2 font-semibold shadow-lg shadow-indigo-500/20 transition-all transform hover:-translate-y-0.5 text-sm"
              >

                <Upload size={16} />

                Upload Resource

              </button>
            </div>
          )
        )}
      </div>

      {/* MODAL */}

      {selectedRequest && (

        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">

          <div className="w-full max-w-md bg-white border border-slate-200 shadow-2xl rounded-3xl overflow-hidden transform transition-all">

            {/* HEADER */}

            <div className="flex items-center justify-between p-6 border-b border-slate-100">

              <div>

                <h2 className="text-xl font-black text-slate-900 tracking-tight">
                  Resolve Request
                </h2>

                <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
                  Upload the requested PDF resource
                </p>

              </div>

              <button
                onClick={() => {

                  setSelectedRequest(
                    null
                  );

                  setFile(
                    null
                  );

                  setTitle(
                    ""
                  );
                }}
                className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
              >

                <X size={18} />

              </button>
            </div>

            {/* FORM */}

            <form
              onSubmit={
                handleUpload
              }
              className="p-6 space-y-4"
            >

              {/* REQUEST TYPE */}

              <div className="bg-indigo-50 border border-indigo-100 rounded-2xl px-4 py-3 flex items-center gap-3">

                <BookOpen
                  size={18}
                  className="text-indigo-600 shrink-0"
                />

                <div>

                  <p className="text-xs font-medium text-slate-400">
                    Resource Type
                  </p>

                  <p className="capitalize font-bold text-indigo-700 text-sm">
                    {normalizeType(
                      selectedRequest.type
                    )}
                  </p>

                </div>
              </div>

              {/* TITLE */}

              <input
                type="text"
                required
                placeholder="Resource title (e.g. Midterm PYQ Solutions)"
                value={title}
                onChange={(e) =>
                  setTitle(
                    e.target.value
                  )
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-800 placeholder:text-slate-400 outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/15 transition-all text-sm font-medium"
              />

              {/* FILE */}

              <label className="w-full h-36 border-2 border-dashed border-slate-200 bg-slate-50 hover:bg-indigo-50/20 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 transition-all p-4 text-center">

                <Upload
                  size={28}
                  className="text-indigo-600 mb-2"
                />

                <p className="text-sm font-semibold text-slate-700 truncate max-w-[280px]">

                  {file
                    ? file.name
                    : "Click to upload PDF document"}

                </p>
                <p className="text-xs text-slate-400 mt-1">
                  {file ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` : "PDF format only"}
                </p>

                <input
                  type="file"
                  hidden
                  accept=".pdf"
                  required
                  onChange={(e) =>
                    setFile(
                      e.target
                        .files[0]
                    )
                  }
                />
              </label>

              {/* INFO */}

              <div className="flex items-center gap-2.5 text-xs text-amber-800 bg-amber-50 border border-amber-200 px-4 py-3 rounded-2xl font-medium">

                <AlertCircle
                  size={16}
                  className="text-amber-600 shrink-0"
                />

                <span>Uploading will automatically resolve and close this request.</span>

              </div>

              {/* SUBMIT */}

              <button
                type="submit"
                disabled={
                  uploading
                }
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl py-3.5 font-bold transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-50 text-sm sm:text-base flex items-center justify-center gap-2"
              >

                {uploading
                  ? "Uploading..."
                  : "Upload & Resolve"}

              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}