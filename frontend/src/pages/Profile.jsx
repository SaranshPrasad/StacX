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

  const fileRef = useRef();

  const [loading, setLoading] = useState(false);

  // ==========================================
  // AVATAR STATE
  // ==========================================

  const [avatar, setAvatar] = useState(
    storedUser?.avatar || ""
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

      console.log(uploadedImage);

      // ==========================================
      // UPDATE AVATAR STATE
      // ==========================================

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
        }
      );

      console.log(res.data);

      // ==========================================
      // UPDATE LOCAL STORAGE
      // ==========================================

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
    <div className="relative text-white max-w-7xl mx-auto px-4 md:px-8 pt-28 md:pt-36 pb-40">

      {/* GLOW EFFECT */}

      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-indigo-500/20 blur-[120px]" />

      {/* MAIN CARD */}

      <div className="relative bg-white/[0.04] backdrop-blur-2xl border border-white/10 rounded-[40px] overflow-hidden">

        {/* TOP BANNER */}

        <div className="h-48 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 relative">

          <div className="absolute inset-0 bg-black/20" />

        </div>

        {/* PROFILE CONTENT */}

        <div className="px-8 pb-10">

          {/* PROFILE IMAGE */}

          <div className="-mt-20 relative w-fit">

            <div className="w-40 h-40 rounded-full border-[6px] border-[#0a0a0a] overflow-hidden bg-black/30 shadow-2xl">

              {avatar ? (
                <img
                  src={avatar}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-5xl font-black bg-gradient-to-r from-indigo-500 to-cyan-500">
                  {storedUser?.name?.charAt(0)}
                </div>
              )}
            </div>

            {/* CAMERA BUTTON */}

            <button
              onClick={() => fileRef.current.click()}
              className="absolute bottom-2 right-2 w-12 h-12 rounded-full bg-indigo-500 hover:bg-indigo-600 flex items-center justify-center shadow-lg"
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

          <div className="mt-6">

            <h1 className="text-5xl font-black bg-gradient-to-r from-indigo-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
              {storedUser?.name}
            </h1>

            <p className="text-gray-400 mt-2 text-lg">
              @{storedUser?.email?.split("@")[0]}
            </p>

          </div>

          {/* INFO BOXES */}

          <div className="grid md:grid-cols-3 gap-5 mt-10">

            {/* EMAIL */}

            <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-5">

              <div className="flex items-center gap-3">

                <Mail className="text-indigo-400" />

                <div>
                  <p className="text-gray-400 text-sm">
                    Email
                  </p>

                  <h3 className="font-semibold mt-1">
                    {storedUser?.email}
                  </h3>
                </div>
              </div>
            </div>

            {/* COURSE */}

            <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-5">

              <div className="flex items-center gap-3">

                <GraduationCap className="text-cyan-400" />

                <div>
                  <p className="text-gray-400 text-sm">
                    Course
                  </p>

                  <h3 className="font-semibold mt-1">
                    {storedUser?.course || "Not Added"}
                  </h3>
                </div>
              </div>
            </div>

            {/* SEMESTER */}

            <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-5">

              <div className="flex items-center gap-3">

                <Layers className="text-pink-400" />

                <div>
                  <p className="text-gray-400 text-sm">
                    Semester
                  </p>

                  <h3 className="font-semibold mt-1">
                    {storedUser?.semester || "Not Added"}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* SAVE BUTTON */}

          <button
            onClick={updateProfile}
            disabled={loading}
            className="mt-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 hover:scale-[1.02] transition-all duration-300 px-8 py-4 rounded-2xl font-bold shadow-2xl shadow-indigo-500/20 flex items-center gap-3"
          >

            <Save size={20} />

            {loading
              ? "Updating..."
              : "Save Changes"}

          </button>
        </div>
      </div>
    </div>
  );
}