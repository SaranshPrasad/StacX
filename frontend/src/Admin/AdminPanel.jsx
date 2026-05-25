// ==========================================
// src/pages/AdminPanel.jsx
// ==========================================

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  FileText,
  Trash2,
  CheckCircle,
  LogOut,
  BookOpen,
  Plus,
  X,
  GraduationCap,
  Calendar,
  ChevronRight,
  Edit2,
  Sparkles,
  ArrowLeft,
  Loader2,
  LogOutIcon,
} from "lucide-react";

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [pendingUsers, setPendingUsers] = useState([]);
  const [resources, setResources] = useState([]);
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [showAddSubject, setShowAddSubject] = useState(false);
  const [loading, setLoading] = useState(false);
const [verifiedResources, setVerifiedResources] = useState([]);
  const token = localStorage.getItem("token");
const API_URL = import.meta.env.VITE_API_URL;
  const API = axios.create({
    baseURL: `${API_URL}/api`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // ==========================
  // FETCH DATA
  // ==========================

  const fetchStats = async () => {
    try {
      const res = await API.get("/admin/stats");
      setStats(res.data.stats);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await API.get("/admin/users");
      setUsers(res.data.users);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPendingUsers = async () => {
    try {
      const res = await API.get("/admin/verifications/pending");
      setPendingUsers(res.data.users);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchResources = async () => {
    try {
      const res = await API.get("/admin/resources");
      setResources(res.data.resources);
      const filteredVerified = res.data.resources.filter((r) => {return r.verified === true });
      const filteredUnverified = res.data.resources.filter((r) => {return r.verified === false });
      setVerifiedResources(filteredVerified);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await API.get("/courses/all");
      setCourses(res.data.courses || []);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchSubjects = async (courseId, semester) => {
    try {
      const endpoint = semester
        ? `/subjects/all/${courseId}/${semester}`
        : `/subjects/all/${courseId}`;
      const res = await API.get(endpoint);
      setSubjects(res.data.subjects || []);
    } catch (err) {
      console.log(err);
      setSubjects([]);
    }
  };

  // ==========================
  // VERIFY USER
  // ==========================

  const verifyUser = async (id) => {
    try {
      await API.post(`/admin/verify/${id}`);
      fetchPendingUsers();
      fetchUsers();
      fetchStats();
      alert("User Verified Successfully");
    } catch (err) {
      console.log(err);
    }
  };

  // ==========================
  // DELETE RESOURCE
  // ==========================

  const deleteResource = async (id) => {
    if (!confirm("Delete this resource?")) return;
    try {
      await API.delete(`/admin/resource/${id}`);
      fetchResources();
      fetchStats();
      alert("Resource Deleted");
    } catch (err) {
      console.log(err);
    }
  };

  // ==========================
  // ADD COURSE
  // ==========================

  const addCourse = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(e.target);
      await API.post("/courses/add", {
        name: formData.get("name"),
        code: formData.get("code"),
        totalSemesters: parseInt(formData.get("totalSemesters")),
      });
      setShowAddCourse(false);
      fetchCourses();
      alert("Course added successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add course");
    }
    setLoading(false);
  };

  // ==========================
  // ADD SUBJECT
  // ==========================

  const addSubject = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(e.target);
      await API.post("/subjects/add", {
        name: formData.get("name"),
        code: formData.get("code"),
        semester: parseInt(formData.get("semester")),
        course: selectedCourse._id,
      });
      setShowAddSubject(false);
      fetchSubjects(selectedCourse._id, selectedSemester);
      alert("Subject added successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add subject");
    }
    setLoading(false);
  };

  // ==========================
  // DELETE COURSE
  // ==========================

  const deleteCourse = async (id) => {
    if (!confirm("Delete this course?")) return;
    try {
      await API.delete(`/courses/delete/${id}`);
      fetchCourses();
      alert("Course deleted");
    } catch (err) {
      alert("Failed to delete course");
    }
  };

  // ==========================
  // LOGOUT
  // ==========================

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/auth";
  };

  // ==========================
  // INITIAL LOAD
  // ==========================

  useEffect(() => {
    fetchStats();
    fetchUsers();
    fetchPendingUsers();
    fetchResources();
    fetchCourses();
  }, []);

  // ==========================
  // NAVIGATION HELPERS
  // ==========================

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    setSelectedSemester(null);
    setSubjects([]);
  };

  const handleSemesterClick = (sem) => {
    setSelectedSemester(sem);
    fetchSubjects(selectedCourse._id, sem);
  };

  const handleBackToCourses = () => {
    setSelectedCourse(null);
    setSelectedSemester(null);
    setSubjects([]);
  };

  const handleBackToSemesters = () => {
    setSelectedSemester(null);
    setSubjects([]);
  };

  const verifyResource = async (id) => {
  try {

    await API.patch(
      `/admin/verify-resource/${id}`
    );

    setResources((prev) =>
      prev.map((resource) =>
        resource._id === id
          ? {
              ...resource,
              verified: true,
            }
          : resource
      )
    );

  } catch (err) {
    console.log(err);
  }
};
  return (
    <div className="min-h-screen bg-[#050816] text-white overflow-hidden">

      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 blur-[150px]" />
      </div>

      <div className="flex overflow-hidden">

        {/* ==========================
            DESKTOP SIDEBAR
        ========================== */}

        <div className="hidden lg:flex w-72 bg-white/[0.02] backdrop-blur-xl border-r border-white/10 flex-col p-5 h-screen sticky top-0">

          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Sparkles size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Admin
              </h1>
              <p className="text-[10px] text-gray-500 -mt-1">Control Panel</p>
            </div>
          </div>

          {/* Nav Links */}
          <div className="space-y-2 flex-1">
            {[
              { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, color: "indigo" },
              { id: "courses", label: "Courses", icon: BookOpen, color: "purple" },
              { id: "users", label: "Users", icon: Users, color: "pink" },
              { id: "verification", label: "Verification", icon: ShieldCheck, color: "green" },
              { id: "resources", label: "Resources", icon: FileText, color: "orange" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 ${
                  activeTab === item.id
                    ? `bg-gradient-to-r from-${item.color}-500 to-${item.color}-600 text-white shadow-lg shadow-${item.color}-500/30`
                    : "hover:bg-white/5 text-gray-400 hover:text-white"
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Logout */}
          <button
            onClick={logout}
            className="flex items-center justify-center gap-3 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/20 px-4 py-3.5 rounded-2xl transition-all duration-300 font-medium"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>

        {/* ==========================
            MAIN CONTENT
        ========================== */}

        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto h-screen pb-28 lg:pb-8">

          {/* Mobile Header */}
          <div className="lg:hidden flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Sparkles size={16} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Admin Panel
              </h1>
              <p className="text-[10px] text-gray-500">Control Center</p>
            </div>
          </div>

          {/* ==========================
              DASHBOARD TAB
          ========================== */}

          {activeTab === "dashboard" && (
            <>
              <div className="mb-8">
                <h2 className="text-3xl sm:text-4xl font-black">
                  Dashboard
                </h2>
                <p className="text-gray-400 mt-2 text-sm sm:text-base">
                  Manage users, resources and verifications
                </p>
              </div>

              <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                {[
                  { label: "Total Users", value: stats?.totalUsers || 0, color: "indigo", icon: Users },
                  { label: "Students", value: stats?.students || 0, color: "pink", icon: GraduationCap },
                  { label: "Teachers", value: stats?.teachers || 0, color: "green", icon: ShieldCheck },
                  { label: "Resources", value: stats?.resources || 0, color: "orange", icon: FileText },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className={`bg-${stat.color}-500/10 border border-${stat.color}-500/20 p-5 rounded-3xl backdrop-blur-xl hover:scale-[1.02] transition-all duration-300`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className={`text-sm text-${stat.color}-300 font-medium`}>
                        {stat.label}
                      </h3>
                      <stat.icon size={20} className={`text-${stat.color}-400`} />
                    </div>
                    <p className="text-3xl sm:text-4xl font-black">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ==========================
              COURSES TAB
          ========================== */}

          {activeTab === "courses" && (
            <>
              {/* Header */}
              <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
                <div>
                  {selectedCourse && (
                    <button
                      onClick={selectedSemester ? handleBackToSemesters : handleBackToCourses}
                      className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 mb-3 text-sm font-medium transition-colors"
                    >
                      <ArrowLeft size={16} />
                      Back
                    </button>
                  )}
                  <h2 className="text-3xl sm:text-4xl font-black">
                    {selectedCourse
                      ? selectedSemester
                        ? `Semester ${selectedSemester} Subjects`
                        : selectedCourse.name
                      : "Courses"}
                  </h2>
                  <p className="text-gray-400 mt-2 text-sm sm:text-base">
                    {selectedCourse
                      ? selectedSemester
                        ? `Manage subjects for semester ${selectedSemester}`
                        : "Select a semester to view subjects"
                      : "Manage all courses and subjects"}
                  </p>
                </div>

                {!selectedCourse && (
                  <button
                    onClick={() => setShowAddCourse(true)}
                    className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 px-5 py-3 rounded-2xl font-semibold shadow-lg shadow-indigo-500/30 transition-all duration-300"
                  >
                    <Plus size={18} />
                    Add Course
                  </button>
                )}

                {selectedCourse && selectedSemester && (
                  <button
                    onClick={() => setShowAddSubject(true)}
                    className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 px-5 py-3 rounded-2xl font-semibold shadow-lg shadow-indigo-500/30 transition-all duration-300"
                  >
                    <Plus size={18} />
                    Add Subject
                  </button>
                )}
              </div>

              {/* COURSES LIST */}
              {!selectedCourse && (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {courses.map((course) => (
                    <div
                      key={course._id}
                      className="group bg-white/[0.03] border border-white/10 rounded-3xl p-6 backdrop-blur-xl hover:bg-white/[0.06] hover:border-indigo-500/30 transition-all duration-300 cursor-pointer"
                      onClick={() => handleCourseClick(course)}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                          <BookOpen size={24} className="text-indigo-400" />
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteCourse(course._id);
                          }}
                          className="opacity-0 group-hover:opacity-100 w-9 h-9 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white flex items-center justify-center transition-all duration-300"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <h3 className="text-xl font-bold mb-2">{course.name}</h3>
                      <p className="text-gray-500 text-sm mb-4">Code: {course.code}</p>

                      <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Calendar size={14} />
                          <span>{course.totalSemesters} Semesters</span>
                        </div>
                        <ChevronRight size={18} className="text-gray-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </div>
                  ))}

                  {courses.length === 0 && (
                    <div className="col-span-full text-center py-16">
                      <BookOpen size={48} className="text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-500">No courses yet. Add your first course!</p>
                    </div>
                  )}
                </div>
              )}

              {/* SEMESTERS LIST */}
              {selectedCourse && !selectedSemester && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {Array.from({ length: selectedCourse.totalSemesters }, (_, i) => i + 1).map((sem) => (
                    <button
                      key={sem}
                      onClick={() => handleSemesterClick(sem)}
                      className="group bg-white/[0.03] border border-white/10 rounded-3xl p-6 backdrop-blur-xl hover:bg-white/[0.06] hover:border-purple-500/30 transition-all duration-300 text-center"
                    >
                      <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                        <span className="text-2xl font-black text-purple-400">{sem}</span>
                      </div>
                      <p className="text-sm font-semibold">Semester {sem}</p>
                    </button>
                  ))}
                </div>
              )}

              {/* SUBJECTS LIST */}
              {selectedCourse && selectedSemester && (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {subjects.map((subject) => (
                    <div
                      key={subject._id}
                      className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 backdrop-blur-xl hover:bg-white/[0.06] transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                          <FileText size={24} className="text-cyan-400" />
                        </div>
                      </div>

                      <h3 className="text-lg font-bold mb-2">{subject.name}</h3>
                      <p className="text-gray-500 text-sm">Code: {subject.code}</p>

                      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/5">
                        <span className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-xs">
                          Sem {subject.semester}
                        </span>
                      </div>
                    </div>
                  ))}

                  {subjects.length === 0 && (
                    <div className="col-span-full text-center py-16">
                      <FileText size={48} className="text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-500">No subjects for this semester yet.</p>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {/* ==========================
              USERS TAB
          ========================== */}

          {activeTab === "users" && (
            <>
              <div className="mb-8">
                <h2 className="text-3xl sm:text-4xl font-black">Users</h2>
                <p className="text-gray-400 mt-2 text-sm sm:text-base">
                  Manage all platform users
                </p>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                {users.map((user) => (
                  <div
                    key={user._id}
                    className="bg-white/[0.03] border border-white/10 rounded-3xl p-5 backdrop-blur-xl hover:bg-white/[0.05] transition-all duration-300"
                  >
                    <div className="flex gap-4">
                      <img
                        src={user.selfie || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                        alt=""
                        className="w-16 h-16 rounded-2xl object-cover border border-indigo-500/40"
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-3 flex-wrap">
                          <h3 className="text-xl font-bold truncate">{user.name}</h3>
                          {user.verified ? (
                            <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-medium">
                              Verified
                            </span>
                          ) : (
                            <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-medium">
                              Pending
                            </span>
                          )}
                        </div>

                        <p className="text-gray-400 text-sm mt-1 truncate">{user.email}</p>

                        <div className="flex flex-wrap gap-2 mt-4">
                          <span className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-xs">
                            {user.role}
                          </span>
                          {user.course && (
                            <span className="bg-pink-500/20 text-pink-300 px-3 py-1 rounded-full text-xs">
                              {user.course}
                            </span>
                          )}
                          {user.semester && (
                            <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-xs">
                              Sem {user.semester}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ==========================
              VERIFICATION TAB
          ========================== */}

          {activeTab === "verification" && (
            <>
              <div className="mb-8">
                <h2 className="text-3xl sm:text-4xl font-black">Verifications</h2>
                <p className="text-gray-400 mt-2 text-sm sm:text-base">
                  Verify pending users
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {pendingUsers.map((user) => (
                  <div
                    key={user._id}
                    className="bg-white/[0.03] border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl"
                  >
                    <img
                      src={user.selfie}
                      alt=""
                      className="w-full h-56 object-cover"
                    />

                    <div className="p-5">
                      <h3 className="text-2xl font-bold">{user.name}</h3>
                      <p className="text-gray-400 text-sm mt-1 truncate">{user.email}</p>

                      <div className="flex flex-wrap gap-2 mt-4">
                        <span className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-xs">
                          {user.role}
                        </span>
                        {user.course && (
                          <span className="bg-pink-500/20 text-pink-300 px-3 py-1 rounded-full text-xs">
                            {user.course}
                          </span>
                        )}
                        {user.semester && (
                          <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-xs">
                            Sem {user.semester}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => verifyUser(user._id)}
                        className="mt-5 w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:opacity-90 p-3 rounded-2xl flex items-center justify-center gap-2 font-semibold transition-all duration-300 shadow-lg shadow-green-500/30"
                      >
                        <CheckCircle size={18} />
                        Verify User
                      </button>
                    </div>
                  </div>
                ))}

                {pendingUsers.length === 0 && (
                  <div className="col-span-full text-center py-16">
                    <ShieldCheck size={48} className="text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-500">No pending verifications</p>
                  </div>
                )}
              </div>
            </>
          )}

          {/* ==========================
              RESOURCES TAB
          ========================== */}

          {/* {activeTab === "resources" && (
            <>
              <div className="mb-8">
                <h2 className="text-3xl sm:text-4xl font-black">Resources</h2>
                <p className="text-gray-400 mt-2 text-sm sm:text-base">
                  Manage uploaded resources
                </p>
              </div>

              <div className="grid gap-4">
                {resources.map((resource) => (
                  <div
                    key={resource._id}
                    className="bg-white/[0.03] border border-white/10 rounded-3xl p-5 flex flex-col sm:flex-row justify-between gap-4 backdrop-blur-xl hover:bg-white/[0.05] transition-all duration-300"
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold truncate">{resource.title}</h3>
                      <p className="text-gray-400 mt-2 text-sm">
                        Uploaded by {resource.uploadedBy?.name}
                      </p>
                      <p className="text-gray-500 text-xs mt-1 truncate">
                        {resource.uploadedBy?.email}
                      </p>
                    </div>

                    <button
                      onClick={() => deleteResource(resource._id)}
                      className="bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/20 p-3 rounded-2xl transition-all duration-300 self-start"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}

                {resources.length === 0 && (
                  <div className="text-center py-16">
                    <FileText size={48} className="text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-500">No resources uploaded yet</p>
                  </div>
                )}
              </div>
            </>
          )} */}
          {activeTab === "resources" && (
  <>
    <div className="mb-8">
      <h2 className="text-3xl sm:text-4xl font-black">
        Resources
      </h2>

      <p className="text-gray-400 mt-2 text-sm sm:text-base">
        Manage uploaded resources
      </p>
    </div>

    {/* ================= VERIFIED ================= */}

    <div className="mb-10">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-2 h-2 rounded-full bg-emerald-400" />

        <h3 className="text-xl font-bold text-emerald-400">
          Verified Resources
        </h3>

        <span className="text-xs bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full">
          {
            resources.filter(
              (resource) => resource.verified
            ).length
          }
        </span>
      </div>

      <div className="grid gap-4">
        {resources
          .filter((resource) => resource.verified)
          .map((resource) => (
            <div
              key={resource._id}
              className="bg-white/[0.03] border border-emerald-500/10 rounded-3xl p-5 flex flex-col sm:flex-row justify-between gap-4 backdrop-blur-xl hover:bg-white/[0.05] transition-all duration-300"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold truncate">
                    {resource.title}
                  </h3>

                  <span className="text-[10px] px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Verified
                  </span>
                </div>

                <p className="text-gray-400 mt-2 text-sm">
                  Uploaded by{" "}
                  {resource.uploadedBy?.name}
                </p>

                <p className="text-gray-500 text-xs mt-1 truncate">
                  {resource.uploadedBy?.email}
                </p>
              </div>

              <button
                onClick={() =>
                  deleteResource(resource._id)
                }
                className="bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/20 p-3 rounded-2xl transition-all duration-300 self-start"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}

        {resources.filter(
          (resource) => resource.verified
        ).length === 0 && (
          <div className="text-center py-10 border border-dashed border-white/10 rounded-3xl">
            <p className="text-gray-500">
              No verified resources
            </p>
          </div>
        )}
      </div>
    </div>

    {/* ================= UNVERIFIED ================= */}

    <div>
      <div className="flex items-center gap-3 mb-5">
        <div className="w-2 h-2 rounded-full bg-yellow-400" />

        <h3 className="text-xl font-bold text-yellow-400">
          Unverified Resources
        </h3>

        <span className="text-xs bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full">
          {
            resources.filter(
              (resource) => !resource.verified
            ).length
          }
        </span>
      </div>

      <div className="grid gap-4">
        {resources
          .filter((resource) => !resource.verified)
          .map((resource) => (
            <div
              key={resource._id}
              className="bg-white/[0.03] border border-yellow-500/10 rounded-3xl p-5 flex flex-col sm:flex-row justify-between gap-4 backdrop-blur-xl hover:bg-white/[0.05] transition-all duration-300"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-xl font-bold truncate">
                    {resource.title}
                  </h3>

                  <span className="text-[10px] px-2 py-1 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                    Pending
                  </span>
                </div>

                <p className="text-gray-400 mt-2 text-sm">
                  Uploaded by{" "}
                  {resource.uploadedBy?.name}
                </p>

                <p className="text-gray-500 text-xs mt-1 truncate">
                  {resource.uploadedBy?.email}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    verifyResource(resource._id)
                  }
                  className="cursor-pointer px-4 py-2 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white border border-emerald-500/20 transition-all duration-300 text-sm font-medium"
                >
                  Verify
                </button>

                <button
                  onClick={() =>
                    deleteResource(resource._id)
                  }
                  className="bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/20 p-3 rounded-2xl transition-all duration-300"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}

        {resources.filter(
          (resource) => !resource.verified
        ).length === 0 && (
          <div className="text-center py-10 border border-dashed border-white/10 rounded-3xl">
            <p className="text-gray-500">
              No unverified resources
            </p>
          </div>
        )}
      </div>
    </div>
  </>
)}

          
        </div>
      </div>

      {/* ==========================
          MOBILE BOTTOM NAVBAR
      ========================== */}

      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0a0e1a]/95 backdrop-blur-2xl border-t border-white/10">
        <div className="flex justify-around items-center py-3 px-2">
          {[
            { id: "dashboard", label: "Home", icon: LayoutDashboard, color: "indigo" },
            { id: "courses", label: "Courses", icon: BookOpen, color: "purple" },
            { id: "users", label: "Users", icon: Users, color: "pink" },
            { id: "verification", label: "Verify", icon: ShieldCheck, color: "green" },
            { id: "resources", label: "Files", icon: FileText, color: "orange" },
            { id: "logout", label: "Logout", icon: LogOutIcon, color: "red" },

          ].map((item) => (
            <button
              key={item.id}
              onClick={() => 
                
                {
                  if (item.id === "logout") {

            localStorage.removeItem("token");

            localStorage.removeItem("user");

            window.location.href = "/auth";

            return;
          }
                  setActiveTab(item.id)
                
                }
              }
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-300 ${
                activeTab === item.id
                  ? `text-${item.color}-400`
                  : "text-gray-500"
              }`}
            >

              <item.icon size={22} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ==========================
          ADD COURSE MODAL
      ========================== */}

      {showAddCourse && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#0a0e1a] border border-white/10 rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-black">Add Course</h3>
              <button
                onClick={() => setShowAddCourse(false)}
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={addCourse} className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Course Name</label>
                <input
                  name="name"
                  placeholder="e.g., Bachelor of Computer Application"
                  required
                  className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-gray-500 outline-none focus:border-indigo-500/50 transition-all"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Course Code</label>
                <input
                  name="code"
                  placeholder="e.g., BCA"
                  required
                  className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-gray-500 outline-none focus:border-indigo-500/50 transition-all"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Total Semesters</label>
                <input
                  name="totalSemesters"
                  type="number"
                  min="1"
                  max="12"
                  placeholder="e.g., 6"
                  required
                  className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-gray-500 outline-none focus:border-indigo-500/50 transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 py-3.5 rounded-xl font-semibold shadow-lg shadow-indigo-500/30 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <Plus size={18} />
                    Add Course
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ==========================
          ADD SUBJECT MODAL
      ========================== */}

      {showAddSubject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#0a0e1a] border border-white/10 rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-black">Add Subject</h3>
              <button
                onClick={() => setShowAddSubject(false)}
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={addSubject} className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Subject Name</label>
                <input
                  name="name"
                  placeholder="e.g., Data Structures"
                  required
                  className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-gray-500 outline-none focus:border-indigo-500/50 transition-all"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Subject Code</label>
                <input
                  name="code"
                  placeholder="e.g., CS201"
                  required
                  className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-gray-500 outline-none focus:border-indigo-500/50 transition-all"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Semester</label>
                <input
                  name="semester"
                  type="number"
                  value={selectedSemester}
                  readOnly
                  className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 py-3.5 rounded-xl font-semibold shadow-lg shadow-indigo-500/30 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <Plus size={18} />
                    Add Subject
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}