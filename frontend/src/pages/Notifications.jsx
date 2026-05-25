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
    <div className="min-h-screen  text-white px-4 py-6 sm:px-6 lg:px-10 max-w-7xl mx-auto px-4 md:px-8 pt-28 md:pt-36 pb-40">

      {/* HEADER */}

      <div className="flex items-center gap-4 mb-8">

        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center border border-indigo-500/20">

          <Bell
            size={24}
            className="text-indigo-400"
          />

        </div>

        <div>

          <h1 className="text-3xl font-black">
            Notifications
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            Pending resource requests
          </p>

        </div>
      </div>

      {/* LOADING */}

      {loading && (

        <div className="flex justify-center py-20">

          <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />

        </div>
      )}

      {/* EMPTY */}

      {!loading &&
        requests.length ===
          0 && (

          <div className="bg-white/[0.03] border border-white/[0.06] rounded-3xl p-14 text-center">

            <CheckCircle2
              size={44}
              className="mx-auto text-emerald-400 mb-4"
            />

            <h2 className="text-2xl font-bold">
              All Requests Solved
            </h2>

            <p className="text-gray-500 mt-2">
              No pending requests found.
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
              className="bg-white/[0.03] border border-white/[0.06] rounded-3xl p-5 hover:border-indigo-500/30 transition-all duration-300"
            >

              {/* TOP */}

              <div className="flex items-start justify-between">

                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center">

                  <FileText
                    size={20}
                    className="text-indigo-400"
                  />

                </div>

                <div className="flex items-center gap-2 text-amber-400 text-xs bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">

                  <Clock3 size={12} />

                  Pending

                </div>
              </div>

              {/* MESSAGE */}

              <h2 className="text-lg font-bold mt-4 line-clamp-2">

                {
                  request.message
                }

              </h2>

              {/* DETAILS */}

              <div className="mt-4 space-y-2 text-sm text-gray-400">

                <p>
                  Type:{" "}
                  <span className="text-indigo-400 capitalize font-medium">
                    {normalizeType(
                      request.type
                    )}
                  </span>
                </p>

                <p>
                  Course:{" "}
                  <span className="text-white">
                    {
                      request
                        .course
                        ?.name
                    }
                  </span>
                </p>

                <p>
                  Subject:{" "}
                  <span className="text-white">
                    {
                      request
                        .subject
                        ?.name
                    }
                  </span>
                </p>

                <p>
                  Semester:{" "}
                  <span className="text-white">
                    {
                      request.semester
                    }
                  </span>
                </p>

                <p>
                  Requested By:{" "}
                  <span className="text-white">
                    {
                      request
                        .requestedBy
                        ?.name
                    }
                  </span>
                </p>
              </div>

              {/* BUTTON */}

              <button
                onClick={() =>
                  setSelectedRequest(
                    request
                  )
                }
                className="mt-5 w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 rounded-2xl py-3 flex items-center justify-center gap-2 font-semibold transition-all"
              >

                <Upload size={18} />

                Upload Resource

              </button>
            </div>
          )
        )}
      </div>

      {/* MODAL */}

      {selectedRequest && (

        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">

          <div className="w-full max-w-md bg-[#0a0f1e] border border-white/10 rounded-3xl overflow-hidden">

            {/* HEADER */}

            <div className="flex items-center justify-between p-6 border-b border-white/5">

              <div>

                <h2 className="text-xl font-black">
                  Resolve Request
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                  Upload requested resource
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
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all"
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

              <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl px-4 py-3 flex items-center gap-3">

                <BookOpen
                  size={18}
                  className="text-indigo-400"
                />

                <div>

                  <p className="text-xs text-gray-400">
                    Resource Type
                  </p>

                  <p className="capitalize font-semibold text-indigo-300">
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
                placeholder="Resource title"
                value={title}
                onChange={(e) =>
                  setTitle(
                    e.target.value
                  )
                }
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 outline-none"
              />

              {/* FILE */}

              <label className="w-full h-36 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500/40 transition-all">

                <Upload
                  size={30}
                  className="text-indigo-400 mb-2"
                />

                <p className="text-sm text-gray-500">

                  {file
                    ? file.name
                    : "Click to upload PDF"}

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

              <div className="flex items-center gap-2 text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-3 rounded-2xl">

                <AlertCircle
                  size={14}
                />

                Uploading will automatically resolve this request.

              </div>

              {/* SUBMIT */}

              <button
                type="submit"
                disabled={
                  uploading
                }
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 rounded-2xl py-3.5 font-bold transition-all"
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