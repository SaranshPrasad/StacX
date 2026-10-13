// ==========================================
// src/pages/Profile.jsx
// ==========================================

import { useRef, useState } from "react";
import API from "../services/api";

import {
  Camera,
  Mail,
  GraduationCap,
  Layers,
  Save,
  Shield,
  UserCheck,
  FileText,
  HelpCircle,
  CheckCircle2,
} from "lucide-react";
import LoginToView from "./LoginToView";

export default function Profile() {

  const storedUser = JSON.parse(
    localStorage.getItem("user")
  );
  const token = localStorage.getItem("token");
  if (!token) {
    return <LoginToView title="Login to get a personalised profile" />;
  }
  console.log(storedUser)

  const fileRef = useRef();

  const [loading, setLoading] = useState(false);

  // ==========================================
  // AVATAR & SEMESTER STATE
  // ==========================================

  const [avatar, setAvatar] = useState(
    storedUser?.avatar || ""
  );

  const [semester, setSemester] = useState(
    storedUser?.semester || ""
  );

  // ==========================================
  // CLOUDINARY IMAGE UPLOAD
  // ==========================================

  const uploadAvatar = async (file) => {
    try {

      if (!file) return;

      setLoading(true);

      const data = new FormData();

      data.append("file", file);

      data.append(
        "upload_preset",
        "selfie_upload"
      );
      const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );

      const uploadedImage = await res.json();

      setAvatar(uploadedImage.secure_url);

      setLoading(false);

    } catch (err) {

      console.log(err);

      setLoading(false);
    }
  };

  // ==========================================
  // UPDATE PROFILE
  // ==========================================

  const updateProfile = async () => {
    try {

      setLoading(true);

      const res = await API.patch(
        "/user/update",
        {
          avatar: avatar,
          semester: semester,
        }
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      alert("Profile Updated Successfully");

      setLoading(false);

    } catch (err) {

      console.log(err.response?.data || err);

      alert(
        err.response?.data?.message ||
        "Something went wrong"
      );

      setLoading(false);
    }
  };


  return (
    <div className="relative text-slate-800 bg-slate-50 min-h-screen max-w-7xl mx-auto px-4 md:px-8 pt-28 md:pt-36 pb-40 transition-colors duration-200">

      {/* SOFT GLOW BACKGROUND */}

      <div className="absolute top-20 left-10 w-[350px] h-[350px] bg-indigo-200/50 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-purple-200/50 blur-[120px] pointer-events-none rounded-full" />

      {/* MAIN CARD */}

      <div className="relative bg-white border border-slate-200/90 rounded-[32px] overflow-hidden shadow-xl shadow-slate-200/50">

        {/* TOP BANNER */}

        <div className="h-48 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 relative">
          <div className="absolute inset-0 bg-slate-900/10" />
          
          <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-xs font-semibold flex items-center gap-1.5 border border-white/20">
            <Shield size={13} />
            <span className="capitalize">{storedUser?.role || "Student"} Account</span>
          </div>
        </div>

        {/* PROFILE CONTENT */}

        <div className="px-6 sm:px-8 pb-10">

          {/* PROFILE IMAGE & HEADER ROW */}

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 -mt-20 mb-8">
            
            <div className="relative w-fit">
              <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-full border-[6px] border-white overflow-hidden bg-slate-100 shadow-xl">

                {avatar ? (
                  <img
                    src={avatar}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-5xl font-black text-white bg-gradient-to-r from-indigo-600 to-cyan-600">
                    {storedUser?.name?.charAt(0)}
                  </div>
                )}
              </div>

              {/* CAMERA BUTTON */}

              <button
                onClick={() => fileRef.current.click()}
                className="absolute bottom-2 right-2 w-11 h-11 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95"
                title="Change Avatar"
              >
                <Camera size={18} />
              </button>

              {/* FILE INPUT */}

              <input
                type="file"
                hidden
                ref={fileRef}
                accept="image/*"
                onChange={(e) =>
                  uploadAvatar(e.target.files[0])
                }
              />
            </div>

            {/* USER DETAILS */}

            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                {storedUser?.name}
              </h1>
              <p className="text-slate-500 font-medium text-sm sm:text-base mt-1 flex items-center gap-1.5">
                <UserCheck size={16} className="text-indigo-600" />
                @{storedUser?.email?.split("@")[0]}
              </p>
            </div>
          </div>

          {/* STATS OVERVIEW CARDS (Reading from storedUser) */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            
            {/* UPLOADED RESOURCES COUNTER */}
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100/50 border border-indigo-200/80 rounded-2xl p-5 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-indigo-500/20">
                <FileText size={22} />
              </div>
              <div>
                <p className="text-xs font-bold text-indigo-900/60 uppercase tracking-wider">
                  Uploaded Resources
                </p>
                <h3 className="text-2xl font-black text-indigo-950 mt-0.5">
                  {storedUser?.uploaded}
                </h3>
              </div>
            </div>

            {/* REQUESTED RESOURCES COUNTER */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 border border-purple-200/80 rounded-2xl p-5 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-purple-500/20">
                <HelpCircle size={22} />
              </div>
              <div>
                <p className="text-xs font-bold text-purple-900/60 uppercase tracking-wider">
                  Requested Resources
                </p>
                <h3 className="text-2xl font-black text-purple-950 mt-0.5">
                  {storedUser?.requested}
                </h3>
              </div>
            </div>

            {/* VERIFICATION / STATUS */}
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 border border-emerald-200/80 rounded-2xl p-5 shadow-sm flex items-center gap-4 sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/20">
                <CheckCircle2 size={22} />
              </div>
              <div>
                <p className="text-xs font-bold text-emerald-900/60 uppercase tracking-wider">
                  Account Status
                </p>
                <h3 className="text-lg font-black text-emerald-950 mt-0.5">
                  Active Contributor
                </h3>
              </div>
            </div>

          </div>

          {/* INFO & EDITABLE FIELDS */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            {/* EMAIL (Read-only) */}

            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                  <Mail size={20} />
                </div>
                <div className="overflow-hidden">
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                    Email Address
                  </p>
                  <h3 className="font-semibold text-slate-800 text-sm sm:text-base mt-0.5 truncate" title={storedUser?.email}>
                    {storedUser?.email}
                  </h3>
                </div>
              </div>
            </div>

            {/* COURSE (Read-only) */}

            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600 shrink-0">
                  <GraduationCap size={20} />
                </div>
                <div className="overflow-hidden">
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                    Course
                  </p>
                  <h3 className="font-semibold text-slate-800 text-sm sm:text-base mt-0.5 truncate" title={storedUser?.course || "Not Added"}>
                    {storedUser?.course || "Not Added"}
                  </h3>
                </div>
              </div>
            </div>

            {/* SEMESTER (Editable) */}

            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-pink-50 border border-pink-100 flex items-center justify-center text-pink-600 shrink-0">
                  <Layers size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    Semester
                  </p>
                  <input
                    type="text"
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    placeholder="e.g. 4th Semester"
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-slate-800 font-semibold text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/15 transition-all"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* SAVE BUTTON */}

          <div className="mt-8 flex justify-end">
            <button
              onClick={updateProfile}
              disabled={loading}
              className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-3.5 rounded-2xl font-bold shadow-lg shadow-indigo-500/20 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 text-sm sm:text-base disabled:opacity-50"
            >
              <Save size={18} />
              {loading ? "Saving Changes..." : "Save Changes"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}