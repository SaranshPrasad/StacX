// import {
//   useEffect,
//   useState,
// } from "react";

// import API from "../services/api";

// import io from "socket.io-client";

// import {
//   Plus,
//   Clock3,
//   CheckCircle2,
//   FileText,
//   Send,
//   Download,
//   Eye,
//   X,
//   BookOpen,
//   Layers3,
// } from "lucide-react";
// import LoginToView from "./LoginToView";

// const socket = io(
//   import.meta.env.VITE_API_URL
// );

// export default function RequestPage() {
//   const [downloadingId, setDownloadingId] =
//     useState(null);
//   const [requests, setRequests] =
//     useState([]);

//   const [courses, setCourses] =
//     useState([]);

//   const [subjects, setSubjects] =
//     useState([]);

//   const [loading, setLoading] =
//     useState(false);

//   const [showModal, setShowModal] =
//     useState(false);

//   const [form, setForm] = useState({
//     message: "",
//     type: "notes",
//     course: "",
//     subject: "",
//     semester: "",
//   });

//   const token = localStorage.getItem("token");

//     if (!token) {
//       return <LoginToView title="Login for Requests" />;
//     }

//   const fetchMyRequests =
//     async () => {

//       try {

//         const res =
//           await API.get(
//             "/requests/my",
//             {
//               headers: {
//                 Authorization:
//                   `Bearer ${token}`,
//               },
//             }
//           );

//         setRequests(
//           res.data.requests || []
//         );

//       } catch (err) {

//         console.log(err);

//       }
//     };

//   const fetchCourses =
//     async () => {

//       try {

//         const res =
//           await API.get(
//             "/courses/all"
//           );

//         setCourses(
//           res.data.courses || []
//         );

//       } catch (err) {

//         console.log(err);

//       }
//     };

//   const fetchSubjects =
//     async (courseId) => {

//       try {

//         const res =
//           await API.get(
//             `/subjects/all/${courseId}`
//           );

//         setSubjects(
//           res.data.subjects || []
//         );

//       } catch (err) {

//         console.log(err);

//       }
//     };
//   useEffect(() => {

//     fetchMyRequests();

//     fetchCourses();

//     socket.on(
//       "request_resolved",
//       (updatedRequest) => {

//         setRequests((prev) =>
//           prev.map((req) =>
//             req._id ===
//             updatedRequest._id
//               ? updatedRequest
//               : req
//           )
//         );
//       }
//     );

//     socket.on(
//       "new_request",
//       (newRequest) => {

//         console.log(
//           "New Request:",
//           newRequest
//         );
//       }
//     );

//     return () => {

//       socket.off(
//         "request_resolved"
//       );

//       socket.off(
//         "new_request"
//       );
//     };

//   }, []);

//   const handleCourseChange =
//     async (courseId) => {

//       setForm({
//         ...form,
//         course: courseId,
//         subject: "",
//         semester: "",
//       });

//       fetchSubjects(courseId);
//     };

//   const handleSubjectChange =
//     (subjectId) => {

//       const selectedSubject =
//         subjects.find(
//           (sub) =>
//             sub._id === subjectId
//         );

//       setForm({
//         ...form,
//         subject: subjectId,
//         semester:
//           selectedSubject?.semester ||
//           "",
//       });
//     };

//   const createRequest =
//     async (e) => {

//       e.preventDefault();

//       try {

//         setLoading(true);

//         const res =
//           await API.post(
//             "/requests/add",
//             form,
//             {
//               headers: {
//                 Authorization:
//                   `Bearer ${token}`,
//               },
//             }
//           );

//         if (
//           res.data.alreadyExists
//         ) {

//           alert(
//             "Resource already exists already."
//           );

//           return;
//         }

//         setRequests((prev) => [
//           res.data.request,
//           ...prev,
//         ]);

//         setShowModal(false);

//         setForm({
//           message: "",
//           type: "notes",
//           course: "",
//           subject: "",
//           semester: "",
//         });

//         setSubjects([]);

//       } catch (err) {

//         console.log(err);

//       } finally {

//         setLoading(false);

//       }
//     };
//       const handleDownload = async (
//     resource
//   ) => {

//     try {

//       setDownloadingId(
//         resource._id
//       );

//       window.open(
//         `${import.meta.env.VITE_API_URL}/api/resources/download/${resource._id}`,
//         "_blank"
//       );

//     } catch (err) {

//       console.log(err);

//       alert("Download failed");

//     } finally {

//       setDownloadingId(null);
//     }
//   };


//   return (
//     <div className="min-h-screen  text-white p-6 max-w-7xl mx-auto px-4 md:px-8 pt-28 md:pt-36 pb-40">

//       {/* HEADER */}

//       <div className="flex items-center justify-between mb-8">

//         <div>
//           <h1 className="text-3xl font-black">
//             My Requests
//           </h1>

//           <p className="text-gray-500 mt-1">
//             Request notes,
//             assignments &
//             PYQs
//           </p>
//         </div>

//         <button
//           onClick={() =>
//             setShowModal(true)
//           }
//           className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 px-5 py-3 rounded-2xl font-semibold"
//         >
//           <Plus size={18} />
//         </button>
//       </div>

//       {/* REQUESTS */}

//       {requests.length === 0 ? (

//         <div className="bg-white/[0.03] border border-white/[0.06] rounded-3xl p-12 text-center">

//           <FileText
//             size={50}
//             className="mx-auto text-gray-700 mb-4"
//           />

//           <h2 className="text-xl font-bold">
//             No Requests Yet
//           </h2>

//           <p className="text-gray-500 mt-2">
//             Create your first request
//           </p>
//         </div>

//       ) : (

//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

//           {requests.map(
//             (request) => (

//               <div
//                 key={request._id}
//                 className="bg-white/[0.03] border border-white/[0.06] rounded-3xl p-5"
//               >

//                 <div className="flex items-center justify-between">

//                   <span className="text-xs uppercase text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">

//                     {request.type}

//                   </span>

//                   {request.status ===
//                   "pending" ? (

//                     <div className="flex items-center gap-1 text-amber-400 text-xs">

//                       <Clock3 size={14} />

//                       Pending

//                     </div>

//                   ) : (

//                     <div className="flex items-center gap-1 text-emerald-400 text-xs">

//                       <CheckCircle2 size={14} />

//                       Resolved

//                     </div>

//                   )}
//                 </div>

//                 <h2 className="text-lg font-bold mt-4">

//                   {request.message}

//                 </h2>

//                 <div className="mt-4 space-y-2 text-sm text-gray-400">

//                   <p>
//                     Semester:
//                     {" "}
//                     {request.semester}
//                   </p>

//                   <p>
//                     Subject:
//                     {" "}
//                     {
//                       request
//                         ?.subject
//                         ?.name
//                     }
//                   </p>

//                   <p>
//                     Course:
//                     {" "}
//                     {
//                       request
//                         ?.course
//                         ?.name
//                     }
//                   </p>
//                 </div>



//                 {request.status ===
//                   "resolved" &&
//                   request.resolvedResource && (

//                     <div className="mt-5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4">

//                       <div className="flex items-center gap-2 text-emerald-400 mb-3">

//                         <FileText size={16} />

//                         <span className="font-semibold text-sm">

//                           Resource Added

//                         </span>
//                       </div>

//                       <h3 className="font-bold text-white">

//                         {
//                           request
//                             .resolvedResource
//                             .title
//                         }

//                       </h3>

//                       <div className="flex gap-2 mt-4">

//                         <a
//                           href={
//                             request
//                               .resolvedResource
//                               .pdfUrl
//                           }
//                           target="_blank"
//                           rel="noreferrer"
//                           className="flex-1 bg-indigo-500/20 text-indigo-400 rounded-xl px-3 py-2 flex items-center justify-center gap-2 text-sm"
//                         >
//                           <Eye size={15} />
//                           View
//                         </a>

//                         <button 
//                         onClick={() => handleDownload(request.resolvedResource)}
                          
//                           className="flex-1 bg-white/5 text-gray-300 rounded-xl px-3 py-2 flex items-center justify-center gap-2 text-sm"
//                         >
//                           <Download size={15} />
//                           Download
//                         </button>

//                       </div>
//                     </div>
//                   )}
//               </div>
//             )
//           )}
//         </div>
//       )}

 

//       {showModal && (

//         <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">

//           <div className="w-full max-w-md bg-[#0f172a] border border-white/10 rounded-3xl p-6">


//             <div className="flex items-center justify-between mb-6">

//               <h2 className="text-2xl font-black">
//                 Create Request
//               </h2>

//               <button
//                 onClick={() =>
//                   setShowModal(false)
//                 }
//                 className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center"
//               >
//                 <X size={18} />
//               </button>
//             </div>

//             <form
//               onSubmit={createRequest}
//               className="space-y-4"
//             >


//               <textarea
//                 required
//                 placeholder="What resource do you need?"
//                 value={form.message}
//                 onChange={(e) =>
//                   setForm({
//                     ...form,
//                     message:
//                       e.target.value,
//                   })
//                 }
//                 className="w-full h-28 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 outline-none resize-none"
//               />

          

//               <select
//                 value={form.type}
//                 onChange={(e) =>
//                   setForm({
//                     ...form,
//                     type:
//                       e.target.value,
//                   })
//                 }
//                 className="w-full bg-white/900 border border-white/10 rounded-2xl px-4 py-3 text-white"
//               >

//                 <option value="notes" className="text-black">
//                   Notes
//                 </option>

//                 <option value="pyq"  className="text-black">
//                   PYQ
//                 </option>

//                 <option value="assignment"  className="text-black">
//                   Assignment
//                 </option>

//               </select>

              

//               <select
//                 required
//                 value={form.course}
//                 onChange={(e) =>
//                   handleCourseChange(
//                     e.target.value
//                   )
//                 }
//                 className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3"
//               >

//                 <option value="">
//                   Select Course
//                 </option>

//                 {courses.map(
//                   (course) => (

//                     <option
//                       key={course._id}
//                       value={course._id}
//                        className="text-black"
//                     >
//                       {course.name}
//                     </option>
//                   )
//                 )}
//               </select>

//               {/* SUBJECT */}

//               <select
//                 required
//                 value={form.subject}
//                 onChange={(e) =>
//                   handleSubjectChange(
//                     e.target.value
//                   )
//                 }
//                 className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3"
//               >

//                 <option value="">
//                   Select Subject
//                 </option>

//                 {subjects.map(
//                   (subject) => (

//                     <option
//                       key={subject._id}
//                       value={subject._id}
//                        className="text-black"
//                     >
//                       {subject.name}
//                     </option>
//                   )
//                 )}
//               </select>

//               {/* AUTO SEM */}

//               <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl px-4 py-3 text-sm text-indigo-300 flex items-center gap-2">

//                 <Layers3 size={16} />

//                 Semester:
//                 {" "}
//                 {form.semester || "-"}

//               </div>

//               {/* BUTTON */}

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl py-3 font-semibold flex items-center justify-center gap-2"
//               >

//                 <Send size={16} />

//                 {loading
//                   ? "Creating..."
//                   : "Create Request"}

//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
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
    <div className="min-h-screen text-slate-800 bg-slate-50 p-4 sm:p-6 md:p-8 max-w-7xl mx-auto pt-28 md:pt-36 pb-40 transition-colors duration-200">

      {/* HEADER */}

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">

        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            My Requests
          </h1>

          <p className="text-slate-500 mt-1 text-sm md:text-base">
            Request notes, assignments &amp; PYQs from the StacX community
          </p>
        </div>

        <button
          onClick={() =>
            setShowModal(true)
          }
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg shadow-indigo-500/20 transition-all duration-200 transform hover:-translate-y-0.5"
        >
          <Plus size={18} />
          <span>New Request</span>
        </button>
      </div>

      {/* REQUESTS */}

      {requests.length === 0 ? (

        <div className="bg-white border border-slate-200/80 shadow-sm rounded-3xl p-12 text-center transition-all">

          <FileText
            size={50}
            className="mx-auto text-slate-300 mb-4 stroke-[1.5]"
          />

          <h2 className="text-xl font-bold text-slate-800">
            No Requests Yet
          </h2>

          <p className="text-slate-500 mt-2 text-sm">
            Create your first resource request to get started
          </p>
        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

          {requests.map(
            (request) => (

              <div
                key={request._id}
                className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">

                    <span className="text-xs uppercase font-semibold tracking-wide text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
                      {request.type}
                    </span>

                    {request.status ===
                    "pending" ? (

                      <div className="flex items-center gap-1.5 text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full text-xs font-medium">
                        <Clock3 size={13} />
                        Pending
                      </div>

                    ) : (

                      <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full text-xs font-medium">
                        <CheckCircle2 size={13} />
                        Resolved
                      </div>

                    )}
                  </div>

                  <h2 className="text-lg font-bold text-slate-900 mt-4 leading-snug">
                    {request.message}
                  </h2>

                  <div className="mt-4 space-y-1.5 text-sm text-slate-600 border-t border-slate-100 pt-4">
                    <p className="flex justify-between">
                      <span className="text-slate-400 font-medium">Semester:</span>
                      <span className="font-semibold text-slate-700">{request.semester || "-"}</span>
                    </p>

                    <p className="flex justify-between">
                      <span className="text-slate-400 font-medium">Subject:</span>
                      <span className="font-semibold text-slate-700 text-right truncate max-w-[180px]">
                        {
                          request
                            ?.subject
                            ?.name || "-"
                        }
                      </span>
                    </p>

                    <p className="flex justify-between">
                      <span className="text-slate-400 font-medium">Course:</span>
                      <span className="font-semibold text-slate-700 text-right truncate max-w-[180px]">
                        {
                          request
                            ?.course
                            ?.name || "-"
                        }
                      </span>
                    </p>
                  </div>
                </div>



                {request.status ===
                  "resolved" &&
                  request.resolvedResource && (

                    <div className="mt-5 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4">

                      <div className="flex items-center gap-2 text-emerald-700 mb-2">
                        <FileText size={16} />
                        <span className="font-semibold text-xs tracking-wide uppercase">
                          Resource Added
                        </span>
                      </div>

                      <h3 className="font-bold text-slate-800 text-sm line-clamp-1">
                        {
                          request
                            .resolvedResource
                            .title
                        }
                      </h3>

                      <div className="flex gap-2 mt-3">

                        <a
                          href={
                            request
                              .resolvedResource
                              .pdfUrl
                          }
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-3 py-2 flex items-center justify-center gap-1.5 text-xs font-semibold shadow-sm transition-colors"
                        >
                          <Eye size={14} />
                          View
                        </a>

                        <button 
                        onClick={() => handleDownload(request.resolvedResource)}
                          className="flex-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl px-3 py-2 flex items-center justify-center gap-1.5 text-xs font-semibold shadow-sm transition-colors"
                        >
                          <Download size={14} />
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

        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-50 p-4 transition-all animate-in fade-in duration-200">

          <div className="w-full max-w-md bg-white border border-slate-200 shadow-2xl rounded-3xl p-6 sm:p-8 transform transition-all">


            <div className="flex items-center justify-between mb-6">

              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Create Request
              </h2>

              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
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
                placeholder="What resource do you need? (e.g. Unit 3 data structures notes)"
                value={form.message}
                onChange={(e) =>
                  setForm({
                    ...form,
                    message:
                      e.target.value,
                  })
                }
                className="w-full h-28 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none transition-all text-sm"
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
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm font-medium"
              >

                <option value="notes">
                  Notes
                </option>

                <option value="pyq">
                  PYQ
                </option>

                <option value="assignment">
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
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm font-medium"
              >

                <option value="">
                  Select Course
                </option>

                {courses.map(
                  (course) => (

                    <option
                      key={course._id}
                      value={course._id}
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
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm font-medium"
              >

                <option value="">
                  Select Subject
                </option>

                {subjects.map(
                  (subject) => (

                    <option
                      key={subject._id}
                      value={subject._id}
                    >
                      {subject.name}
                    </option>
                  )
                )}
              </select>

              {/* AUTO SEM */}

              <div className="bg-indigo-50/80 border border-indigo-100 rounded-2xl px-4 py-3 text-sm text-indigo-900 flex items-center gap-2 font-medium">

                <Layers3 size={16} className="text-indigo-600" />

                <span>Semester:</span>
                <span className="font-bold text-indigo-700">
                  {form.semester || "-"}
                </span>

              </div>

              {/* BUTTON */}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl py-3 font-semibold flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 transition-all disabled:opacity-50"
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