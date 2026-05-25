import {
  useEffect,
  useState,
} from "react";

import API from "../services/api";

import io from "socket.io-client";

import {
  Plus,
  Clock3,
  CheckCircle2,
  FileText,
  Send,
  Download,
  Eye,
  X,
  BookOpen,
  Layers3,
} from "lucide-react";
import LoginToView from "./LoginToView";

const socket = io(
  import.meta.env.VITE_API_URL
);

export default function RequestPage() {
  const [downloadingId, setDownloadingId] =
    useState(null);
  const [requests, setRequests] =
    useState([]);

  const [courses, setCourses] =
    useState([]);

  const [subjects, setSubjects] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [showModal, setShowModal] =
    useState(false);

  const [form, setForm] = useState({
    message: "",
    type: "notes",
    course: "",
    subject: "",
    semester: "",
  });

  const token = localStorage.getItem("token");

    if (!token) {
      return <LoginToView title="Login for Requests" />;
    }

  const fetchMyRequests =
    async () => {

      try {

        const res =
          await API.get(
            "/requests/my",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setRequests(
          res.data.requests || []
        );

      } catch (err) {

        console.log(err);

      }
    };

  const fetchCourses =
    async () => {

      try {

        const res =
          await API.get(
            "/courses/all"
          );

        setCourses(
          res.data.courses || []
        );

      } catch (err) {

        console.log(err);

      }
    };

  const fetchSubjects =
    async (courseId) => {

      try {

        const res =
          await API.get(
            `/subjects/all/${courseId}`
          );

        setSubjects(
          res.data.subjects || []
        );

      } catch (err) {

        console.log(err);

      }
    };
  useEffect(() => {

    fetchMyRequests();

    fetchCourses();

    socket.on(
      "request_resolved",
      (updatedRequest) => {

        setRequests((prev) =>
          prev.map((req) =>
            req._id ===
            updatedRequest._id
              ? updatedRequest
              : req
          )
        );
      }
    );

    socket.on(
      "new_request",
      (newRequest) => {

        console.log(
          "New Request:",
          newRequest
        );
      }
    );

    return () => {

      socket.off(
        "request_resolved"
      );

      socket.off(
        "new_request"
      );
    };

  }, []);

  const handleCourseChange =
    async (courseId) => {

      setForm({
        ...form,
        course: courseId,
        subject: "",
        semester: "",
      });

      fetchSubjects(courseId);
    };

  const handleSubjectChange =
    (subjectId) => {

      const selectedSubject =
        subjects.find(
          (sub) =>
            sub._id === subjectId
        );

      setForm({
        ...form,
        subject: subjectId,
        semester:
          selectedSubject?.semester ||
          "",
      });
    };

  const createRequest =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        const res =
          await API.post(
            "/requests/add",
            form,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        if (
          res.data.alreadyExists
        ) {

          alert(
            "Resource already exists already."
          );

          return;
        }

        setRequests((prev) => [
          res.data.request,
          ...prev,
        ]);

        setShowModal(false);

        setForm({
          message: "",
          type: "notes",
          course: "",
          subject: "",
          semester: "",
        });

        setSubjects([]);

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);

      }
    };
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


  return (
    <div className="min-h-screen  text-white p-6 max-w-7xl mx-auto px-4 md:px-8 pt-28 md:pt-36 pb-40">

      {/* HEADER */}

      <div className="flex items-center justify-between mb-8">

        <div>
          <h1 className="text-3xl font-black">
            My Requests
          </h1>

          <p className="text-gray-500 mt-1">
            Request notes,
            assignments &
            PYQs
          </p>
        </div>

        <button
          onClick={() =>
            setShowModal(true)
          }
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 px-5 py-3 rounded-2xl font-semibold"
        >
          <Plus size={18} />
        </button>
      </div>

      {/* REQUESTS */}

      {requests.length === 0 ? (

        <div className="bg-white/[0.03] border border-white/[0.06] rounded-3xl p-12 text-center">

          <FileText
            size={50}
            className="mx-auto text-gray-700 mb-4"
          />

          <h2 className="text-xl font-bold">
            No Requests Yet
          </h2>

          <p className="text-gray-500 mt-2">
            Create your first request
          </p>
        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

          {requests.map(
            (request) => (

              <div
                key={request._id}
                className="bg-white/[0.03] border border-white/[0.06] rounded-3xl p-5"
              >

                <div className="flex items-center justify-between">

                  <span className="text-xs uppercase text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">

                    {request.type}

                  </span>

                  {request.status ===
                  "pending" ? (

                    <div className="flex items-center gap-1 text-amber-400 text-xs">

                      <Clock3 size={14} />

                      Pending

                    </div>

                  ) : (

                    <div className="flex items-center gap-1 text-emerald-400 text-xs">

                      <CheckCircle2 size={14} />

                      Resolved

                    </div>

                  )}
                </div>

                <h2 className="text-lg font-bold mt-4">

                  {request.message}

                </h2>

                <div className="mt-4 space-y-2 text-sm text-gray-400">

                  <p>
                    Semester:
                    {" "}
                    {request.semester}
                  </p>

                  <p>
                    Subject:
                    {" "}
                    {
                      request
                        ?.subject
                        ?.name
                    }
                  </p>

                  <p>
                    Course:
                    {" "}
                    {
                      request
                        ?.course
                        ?.name
                    }
                  </p>
                </div>



                {request.status ===
                  "resolved" &&
                  request.resolvedResource && (

                    <div className="mt-5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4">

                      <div className="flex items-center gap-2 text-emerald-400 mb-3">

                        <FileText size={16} />

                        <span className="font-semibold text-sm">

                          Resource Added

                        </span>
                      </div>

                      <h3 className="font-bold text-white">

                        {
                          request
                            .resolvedResource
                            .title
                        }

                      </h3>

                      <div className="flex gap-2 mt-4">

                        <a
                          href={
                            request
                              .resolvedResource
                              .pdfUrl
                          }
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 bg-indigo-500/20 text-indigo-400 rounded-xl px-3 py-2 flex items-center justify-center gap-2 text-sm"
                        >
                          <Eye size={15} />
                          View
                        </a>

                        <button 
                        onClick={() => handleDownload(request.resolvedResource)}
                          
                          className="flex-1 bg-white/5 text-gray-300 rounded-xl px-3 py-2 flex items-center justify-center gap-2 text-sm"
                        >
                          <Download size={15} />
                          Download
                        </button>

                      </div>
                    </div>
                  )}
              </div>
            )
          )}
        </div>
      )}

 

      {showModal && (

        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">

          <div className="w-full max-w-md bg-[#0f172a] border border-white/10 rounded-3xl p-6">


            <div className="flex items-center justify-between mb-6">

              <h2 className="text-2xl font-black">
                Create Request
              </h2>

              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center"
              >
                <X size={18} />
              </button>
            </div>

            <form
              onSubmit={createRequest}
              className="space-y-4"
            >


              <textarea
                required
                placeholder="What resource do you need?"
                value={form.message}
                onChange={(e) =>
                  setForm({
                    ...form,
                    message:
                      e.target.value,
                  })
                }
                className="w-full h-28 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 outline-none resize-none"
              />

          

              <select
                value={form.type}
                onChange={(e) =>
                  setForm({
                    ...form,
                    type:
                      e.target.value,
                  })
                }
                className="w-full bg-white/900 border border-white/10 rounded-2xl px-4 py-3 text-white"
              >

                <option value="notes" className="text-black">
                  Notes
                </option>

                <option value="pyq"  className="text-black">
                  PYQ
                </option>

                <option value="assignment"  className="text-black">
                  Assignment
                </option>

              </select>

              

              <select
                required
                value={form.course}
                onChange={(e) =>
                  handleCourseChange(
                    e.target.value
                  )
                }
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3"
              >

                <option value="">
                  Select Course
                </option>

                {courses.map(
                  (course) => (

                    <option
                      key={course._id}
                      value={course._id}
                       className="text-black"
                    >
                      {course.name}
                    </option>
                  )
                )}
              </select>

              {/* SUBJECT */}

              <select
                required
                value={form.subject}
                onChange={(e) =>
                  handleSubjectChange(
                    e.target.value
                  )
                }
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3"
              >

                <option value="">
                  Select Subject
                </option>

                {subjects.map(
                  (subject) => (

                    <option
                      key={subject._id}
                      value={subject._id}
                       className="text-black"
                    >
                      {subject.name}
                    </option>
                  )
                )}
              </select>

              {/* AUTO SEM */}

              <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl px-4 py-3 text-sm text-indigo-300 flex items-center gap-2">

                <Layers3 size={16} />

                Semester:
                {" "}
                {form.semester || "-"}

              </div>

              {/* BUTTON */}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl py-3 font-semibold flex items-center justify-center gap-2"
              >

                <Send size={16} />

                {loading
                  ? "Creating..."
                  : "Create Request"}

              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}