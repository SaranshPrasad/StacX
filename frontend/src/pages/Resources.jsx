
import { useEffect, useState } from "react";
import API from "../services/api";

import {
  ArrowLeft,
  BookOpen,
  Download,
  Eye,
  FileText,
  GraduationCap,
  Layers3,
  Plus,
  Upload,
  X,
  AlertCircle,
} from "lucide-react";

export default function Resources() {

  const [courses, setCourses] =
    useState([]);

  const [selectedCourse, setSelectedCourse] =
    useState(null);

  const [semester, setSemester] =
    useState(null);

  const [subjects, setSubjects] =
    useState([]);

  const [selectedSubject, setSelectedSubject] =
    useState(null);

  const [resources, setResources] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [showUploadModal, setShowUploadModal] =
    useState(false);

  const [uploading, setUploading] =
    useState(false);

  const [downloadingId, setDownloadingId] =
    useState(null);

  const [uploadForm, setUploadForm] =
    useState({
      title: "",
      type: "notes",
      file: null,
    });

  const token =
    localStorage.getItem("token");

  const storedUser = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const isLoggedIn =
    !!token && !!storedUser;

  // ==========================================
  // FETCH COURSES
  // ==========================================

  useEffect(() => {
    fetchCourses();
    window.location.reload;
  }, []);

  const fetchCourses = async () => {

    try {

      setLoading(true);

      const res =
        await API.get("/courses/all");

      setCourses(
        res.data.courses || []
      );

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);
    }
  };

  // ==========================================
  // FETCH SUBJECTS
  // ==========================================

  const fetchSubjects = async (
    courseId,
    semesterNo
  ) => {

    try {

      setLoading(true);

      const res = await API.get(
        `/subjects/all/${courseId}/${semesterNo}`
      );

      setSubjects(
        res.data.subjects || []
      );

    } catch (err) {

      console.log(err);

      setSubjects([]);

    } finally {

      setLoading(false);
    }
  };

  // ==========================================
  // FETCH RESOURCES
  // ==========================================

  const fetchResources = async (
    courseId,
    semesterNo,
    subjectId
  ) => {

    try {

      setLoading(true);

      const res = await API.get(
        `/resources/all/${courseId}/${semesterNo}/${subjectId}`
      );

      setResources(
        res.data.resources || []
      );

    } catch (err) {

      console.log(err);

      setResources([]);

    } finally {

      setLoading(false);
    }
  };

  // ==========================================
  // UPLOAD RESOURCE
  // ==========================================

  const uploadResource = async (e) => {

    e.preventDefault();

    if (!isLoggedIn) {

      alert(
        "Please login to upload resources."
      );

      return;
    }

    if (!uploadForm.file) {

      alert("Please select a PDF");

      return;
    }

    try {

      setUploading(true);

      const formData =
        new FormData();

      formData.append(
        "title",
        uploadForm.title
      );

      formData.append(
        "type",
        uploadForm.type
      );

      formData.append(
        "course",
        selectedCourse._id
      );

      formData.append(
        "subject",
        selectedSubject._id
      );

      formData.append(
        "semester",
        semester
      );

      formData.append(
        "file",
        uploadForm.file
      );

      await API.post(
        "/resources/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      await fetchResources(
        selectedCourse._id,
        semester,
        selectedSubject._id
      );

      setShowUploadModal(false);

      setUploadForm({
        title: "",
        type: "notes",
        file: null,
      });

    } catch (err) {

      console.log(err);

      alert(
        err?.response?.data?.message ||
        "Upload failed"
      );

    } finally {

      setUploading(false);
    }
  };

  // ==========================================
  // DOWNLOAD HANDLER
  // ==========================================

  const handleDownload = async (
    resource
  ) => {

    try {

      setDownloadingId(
        resource._id
      );

      window.open(
        `${import.meta.env.VITE_API_URL}/api/resources/download/${resource._id}`,
        "_blank"
      );


    } catch (err) {

      console.log(err);

      alert("Download failed");

    } finally {

      setDownloadingId(null);
    }
  };

  // ==========================================
  // BACK HANDLERS
  // ==========================================

  const backToCourses = () => {

    setSelectedCourse(null);

    setSemester(null);

    setSubjects([]);

    setSelectedSubject(null);

    setResources([]);
  };

  const backToSemesters = () => {

    setSemester(null);

    setSubjects([]);

    setSelectedSubject(null);

    setResources([]);
  };

  const backToSubjects = () => {

    setSelectedSubject(null);

    setResources([]);
  };

  // ==========================================
  // TYPE COLORS
  // ==========================================

  const typeColors = {
    notes:
      "bg-blue-500/20 text-blue-400 border-blue-500/30",

    pyq:
      "bg-amber-500/20 text-amber-400 border-amber-500/30",

    assignment:
      "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  };

  const typeIcons = {
    notes: BookOpen,
    pyq: FileText,
    assignment: Layers3,
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className="min-h-screen  text-white px-4 py-6 sm:px-6 lg:px-10 max-w-7xl mx-auto px-4 md:px-8 pt-28 md:pt-36 pb-40">

      {/* HEADER */}

      <div className="mb-8">

        <div className="flex items-center gap-4">

          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/30 to-purple-500/30 flex items-center justify-center border border-indigo-500/20">

            <GraduationCap
              size={24}
              className="text-indigo-400"
            />

          </div>

          <div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              Resources Hub
            </h1>

            <p className="text-gray-500 mt-1 text-xs sm:text-sm">
              Browse notes,
              assignments &
              previous year questions
            </p>

          </div>
        </div>
      </div>

      {/* LOADING */}

      {loading && (

        <div className="flex justify-center py-24">

          <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />

        </div>
      )}

      {/* COURSES */}

      {!loading &&
        !selectedCourse && (

          <div>

            <div className="flex items-center justify-between mb-6">

              <h2 className="text-xl font-bold">
                All Courses
              </h2>

              <span className="text-xs text-gray-500 bg-white/5 px-3 py-1 rounded-full border border-white/5">

                {courses.length} course
                {courses.length !== 1
                  ? "s"
                  : ""}

              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">

              {courses.map(
                (course) => (

                  <div
                    key={course._id}
                    onClick={() => {

                      setSelectedCourse(
                        course
                      );

                      setSemester(null);

                      setSubjects([]);

                      setSelectedSubject(
                        null
                      );

                      setResources([]);
                    }}
                    className="group cursor-pointer bg-white/[0.03] border border-white/[0.06] hover:border-indigo-500/40 hover:bg-white/[0.06] rounded-2xl p-4 transition-all duration-300"
                  >

                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">

                      <BookOpen
                        size={18}
                        className="text-indigo-400"
                      />

                    </div>

                    <h3 className="text-sm font-bold mt-3 line-clamp-1">
                      {course.name}
                    </h3>

                    <p className="text-gray-600 mt-1 text-[11px]">
                      {course.totalSemesters} Sem
                    </p>

                  </div>
                )
              )}
            </div>
          </div>
        )}

      {/* SEMESTERS */}

      {!loading &&
        selectedCourse &&
        !semester && (

          <div>

            <button
              onClick={backToCourses}
              className="mb-6 flex items-center gap-2 bg-white/5 px-4 py-2.5 rounded-xl text-sm"
            >

              <ArrowLeft size={16} />
              Back to Courses

            </button>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">

              {Array.from({
                length:
                  selectedCourse.totalSemesters,
              }).map(
                (_, index) => (

                  <div
                    key={index}
                    onClick={() => {

                      setSemester(
                        index + 1
                      );

                      fetchSubjects(
                        selectedCourse._id,
                        index + 1
                      );
                    }}
                    className="cursor-pointer bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 text-center"
                  >

                    <p className="text-gray-600 text-[10px] uppercase">
                      Sem
                    </p>

                    <h3 className="text-3xl font-black text-cyan-400">
                      {index + 1}
                    </h3>

                  </div>
                )
              )}
            </div>
          </div>
        )}

      {/* SUBJECTS */}

      {!loading &&
        semester &&
        !selectedSubject && (

          <div>

            <button
              onClick={backToSemesters}
              className="mb-6 flex items-center gap-2 bg-white/5 px-4 py-2.5 rounded-xl text-sm"
            >

              <ArrowLeft size={16} />
              Back to Semesters

            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">

              {subjects.map(
                (subject) => (

                  <div
                    key={subject._id}
                    onClick={() => {

                      setSelectedSubject(
                        subject
                      );

                      fetchResources(
                        selectedCourse._id,
                        semester,
                        subject._id
                      );
                    }}
                    className="cursor-pointer bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4"
                  >

                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center">

                      <BookOpen
                        size={18}
                        className="text-violet-400"
                      />

                    </div>

                    <h3 className="text-sm font-bold mt-3">
                      {subject.name}
                    </h3>

                    <p className="text-gray-600 mt-1 text-[11px]">
                      {subject.code}
                    </p>

                  </div>
                )
              )}
            </div>
          </div>
        )}

      {/* RESOURCES */}

      {!loading &&
        selectedSubject && (

          <div>

            <button
              onClick={backToSubjects}
              className="mb-6 flex items-center gap-2 bg-white/5 px-4 py-2.5 rounded-xl text-sm"
            >

              <ArrowLeft size={16} />
              Back to Subjects

            </button>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">

              <div>

                <h2 className="text-xl font-bold">
                  {selectedSubject.name}
                </h2>

                <p className="text-gray-500 text-xs mt-1">
                  {resources.length} resources
                </p>

              </div>

              {isLoggedIn ? (

                <button
                  onClick={() =>
                    setShowUploadModal(true)
                  }
                  className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 px-5 py-2.5 rounded-xl text-sm font-semibold"
                >

                  <Plus size={16} />
                  Add Resource

                </button>

              ) : (

                <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 px-4 py-2.5 rounded-xl text-xs sm:text-sm">

                  <AlertCircle size={14} />

                  Login to add resources

                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">

              {resources.map(
                (resource) => {

                  const Icon =
                    typeIcons[
                    resource.type
                    ] || FileText;

                  const isDownloading =
                    downloadingId ===
                    resource._id;

                  return (

                    <div
                      key={resource._id}
                      className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4"
                    >

                      <div className="flex items-start justify-between">

                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center">

                          <Icon
                            size={18}
                            className="text-red-400"
                          />

                        </div>

                        <span
                          className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border ${typeColors[
                            resource.type
                          ]}`}
                        >
                          {resource.type}
                        </span>
                      </div>

                      <h3 className="text-sm font-bold mt-3 line-clamp-2">
                        {resource.title}
                      </h3>

                      <div className="flex gap-2 justify-between">
                        <div className="flex gap-2">
                          <p className="text-[11px] text-gray-600 mt-2">

                        by{" "}
                        {resource?.uploadedBy
                          ?.name || "Unknown"}

                      </p>
                      <p className="text-[11px] text-gray-600 mt-2 flex gap-1">

                        <Download className="text-white w-4 h-4" />
                        <span>{resource?.downloads
                          || 0}</span>

                      </p>
                        </div>
                      <p
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium mt-2 border
                           ${resource?.verified
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-red-500/10 text-red-400 border-red-500/20"
                          }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${resource?.verified
                              ? "bg-emerald-400"
                              : "bg-red-400"
                            }`}
                        />

                        {resource?.verified
                          ? "V"
                          : "NV"}
                      </p>
                      
                      </div>

                      <div className="flex gap-2 mt-4">





                        {/* DOWNLOAD */}

                        {token ? <button
                          onClick={() =>
                            handleDownload(
                              resource
                            )
                          }
                          disabled={
                            isDownloading
                          }
                          className="flex-1 bg-red hover:bg-white/10 border border-white/5 hover:border-white/10 text-gray-400 hover:text-white rounded-xl px-3 py-2.5 flex items-center justify-center gap-1.5 text-xs font-semibold transition-all "
                        >

                          {isDownloading ? (
                            <>
                              <div className="w-3 h-3 border-2 border-gray-400/20 border-t-gray-400 rounded-full animate-spin" />
                              Downloading...
                            </>
                          ) : (
                            <>
                              <Download size={14} />
                              Download
                            </>
                          )}

                        </button> : <button
                          onClick={() => (window.location.href = "/auth")}
                          className="
    px-4 py-2
    rounded-lg
    border border-red-500/30
    text-red-400
    hover:bg-red-500/10
    transition
    text-sm
    font-medium
    cursor-pointer
  "
                        >
                          Login to Download
                        </button>}
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        )}

      {/* FLOATING BUTTON */}

      {selectedSubject &&
        isLoggedIn && (

          <button
            onClick={() =>
              setShowUploadModal(true)
            }
            className="fixed bottom-6 right-6 w-14 h-14 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 shadow-2xl flex items-center justify-center z-50"
          >

            <Plus size={24} />

          </button>
        )}

      {/* UPLOAD MODAL */}

      {showUploadModal && (

        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">

          <div className="w-full max-w-md bg-[#0a0f1e] border border-white/10 rounded-3xl overflow-hidden">

            <div className="flex items-center justify-between p-6 pb-0">

              <h2 className="text-xl font-black">
                Upload Resource
              </h2>

              <button
                onClick={() =>
                  setShowUploadModal(false)
                }
                className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center"
              >

                <X size={16} />

              </button>
            </div>

            <form
              onSubmit={uploadResource}
              className="p-6 space-y-4"
            >

              <input
                type="text"
                required
                placeholder="Resource title"
                value={uploadForm.title}
                onChange={(e) =>
                  setUploadForm({
                    ...uploadForm,
                    title:
                      e.target.value,
                  })
                }
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none"
              />

              <select
                value={uploadForm.type}
                onChange={(e) =>
                  setUploadForm({
                    ...uploadForm,
                    type:
                      e.target.value,
                  })
                }
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none"
              >

                <option value="notes" className="text-black">
                  📝 Notes
                </option>

                <option value="pyq" className="text-black">
                  📄 PYQ
                </option>

                <option value="assignment" className="text-black">
                  📋 Assignment
                </option>

              </select>

              <label className="w-full h-32 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500/40 transition-colors">

                <Upload
                  size={28}
                  className="text-indigo-400/60 mb-2"
                />

                <p className="text-gray-500 text-xs">

                  {uploadForm.file
                    ? uploadForm.file.name
                    : "Click to upload PDF"}

                </p>

                <input
                  type="file"
                  accept=".pdf"
                  hidden
                  required
                  onChange={(e) =>
                    setUploadForm({
                      ...uploadForm,
                      file:
                        e.target.files[0],
                    })
                  }
                />
              </label>

              <button
                type="submit"
                disabled={uploading}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl py-3.5 text-sm font-bold disabled:opacity-50"
              >

                {uploading
                  ? "Uploading..."
                  : "Upload Resource"}

              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}