// ==========================================
// src/pages/Chat.jsx
// ==========================================

import {
  Send,
  Image,
  FileText,
  X,
  MessageCircle,
  Users,
  Smile,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";
import {useNavigate} from "react-router-dom";
import socket from "../services/socket";
import API from "../services/api";
import LoginToView from "./LoginToView";
export default function Chat() {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const fileRef = useRef(null);
  const messagesRef = useRef(null);
  const inputRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [isConnected, setIsConnected] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  // ==========================================
  // SOCKET & MESSAGES
  // ==========================================

  const token = localStorage.getItem("token");
  if (!token) {
    return <LoginToView title="Login to Access Chat" />;
  }
  useEffect(() => {
    fetchMessages();

    socket.on("receive_message", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    socket.on("connect", () => setIsConnected(true));
    socket.on("disconnect", () => setIsConnected(false));

    return () => {
      socket.off("receive_message");
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  // ==========================================
  // AUTO SCROLL
  // ==========================================
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  // ==========================================
  // PREVENT BODY SCROLL
  // ==========================================
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // ==========================================
  // FETCH MESSAGES
  // ==========================================
  const fetchMessages = async () => {
    try {
      const res = await API.get("/messages");
      setMessages(res.data.messages || []);
    } catch (err) {
      console.log(err);
    }
  };

  // ==========================================
  // CHECK IF CURRENT USER - ROBUST CHECK
  // ==========================================
  const isMyMessage = (msg) => {
    // Try multiple ways to match the sender
    const oderId = storedUser?._id;
    const odeerEmail = storedUser?.email;
    const odeerName = storedUser?.name;

    // Check by ID (could be object or string)
    if (msg.sender) {
      const senderId =
        typeof msg.sender === "object" ? msg.sender._id : msg.sender;
      if (senderId && oderId && String(senderId) === String(oderId)) {
        return true;
      }
    }

    // Check by senderEmail if available
    if (msg.senderEmail && odeerEmail) {
      if (String(msg.senderEmail) === String(odeerEmail)) {
        return true;
      }
    }

    // Check by senderName as last resort
    if (msg.senderName && odeerName) {
      if (String(msg.senderName) === String(odeerName)) {
        return true;
      }
    }

    return false;
  };

  // ==========================================
  // FILE SELECT
  // ==========================================
  const handleFileSelect = (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed");
      return;
    }

    setSelectedFile(file);

    if (file.type.startsWith("image/")) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    } else {
      setPreview("");
    }
  };

  // ==========================================
  // SEND MESSAGE
  // ==========================================
  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      const payload = {
        text: message,
        type: "text",
        senderName: storedUser?.name,
        senderAvatar: storedUser?.avatar,
        senderEmail: storedUser?.email,
      };

      const res = await API.post("/messages", payload);
      socket.emit("send_message", res.data.message);
      setMessage("");
      inputRef.current?.focus();
    } catch (err) {
      console.log(err.response?.data || err);
    }
  };

  // ==========================================
  // SEND FILE
  // ==========================================
  const sendFile = async () => {
    try {
      if (!selectedFile) return;

      setLoading(true);

      const data = new FormData();
      data.append("file", selectedFile);
      data.append("upload_preset", "selfie_upload");

      const cloudName = import.meta.env.VITE_CLOUD_NAME;
      const isPdf = selectedFile.type === "application/pdf";
      const endpoint = isPdf ? "raw" : "image";

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/${endpoint}/upload`,
        {
          method: "POST",
          body: data,
        }
      );

      const uploaded = await uploadRes.json();

      const payload = {
        text: "",
        type: isPdf ? "pdf" : "image",
        fileUrl: uploaded.secure_url,
        fileName: selectedFile.name,
        senderName: storedUser?.name,
        senderAvatar: storedUser?.avatar,
        senderEmail: storedUser?.email,
      };

      const res = await API.post("/messages", payload);
      socket.emit("send_message", res.data.message);

      setSelectedFile(null);
      setPreview("");
      setLoading(false);
    } catch (err) {
      console.log(err.response?.data || err);
      setLoading(false);
    }
  };

  // ==========================================
  // CLEAR FILE
  // ==========================================
  const clearFile = () => {
    setSelectedFile(null);
    setPreview("");
    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };

  // ==========================================
  // FORMAT TIME
  // ==========================================
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="fixed inset-0 md:relative md:inset-auto flex flex-col bg-[#0a0a0f] md:bg-[#0a0a0f]/90 md:backdrop-blur-xl md:border md:border-white/10 md:rounded-[30px] overflow-hidden md:shadow-2xl md:shadow-indigo-500/10 z-40 md:h-[75vh] md:mt-30 mt-20">
     
      <div className="flex-shrink-0 px-4 py-3 md:px-6 md:py-4 border-b border-white/10 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-cyan-500/5 safe-top">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
       
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <MessageCircle size={20} className="text-white" />
            </div>

            <div>
              <h1 className="text-base md:text-xl font-bold text-white">
                Community Chat
              </h1>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    isConnected ? "bg-green-400 animate-pulse" : "bg-red-400"
                  }`}
                />
                <p className="text-gray-500 text-[10px] md:text-xs">
                  {isConnected ? "Live" : "Connecting..."}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-2.5 py-1.5 rounded-lg">
            <Users size={14} className="text-indigo-400" />
            <span className="text-xs text-gray-400">{messages.length}</span>
          </div>
        </div>
      </div>

   
      <div
        ref={messagesRef}
        className="flex-1 overflow-y-auto px-3 py-3 md:px-4 md:py-4 space-y-3 md:space-y-4 bg-gradient-to-b from-transparent to-black/20"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(99, 102, 241, 0.3) transparent",
        }}
      >
     
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center py-10">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4">
              <MessageCircle size={28} className="text-indigo-400" />
            </div>
            <h3 className="text-base md:text-lg font-semibold text-white mb-1">
              No messages yet
            </h3>
            <p className="text-gray-500 text-xs md:text-sm max-w-[200px]">
              Be the first to say hello!
            </p>
          </div>
        )}

 
        {messages.map((msg, index) => {
          const isMine = isMyMessage(msg);

          return (
            <div
              key={msg._id || index}
              className={`flex ${isMine ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex gap-2 max-w-[88%] sm:max-w-[75%] md:max-w-[70%] ${
                  isMine ? "flex-row-reverse" : "flex-row"
                }`}
              >
         
                <div className="flex-shrink-0 self-end mb-1">
                  {msg.senderAvatar ? (
                    <img
                      src={msg.senderAvatar}
                      alt=""
                      className={`w-7 h-7 md:w-8 md:h-8 rounded-full object-cover border-2 ${
                        isMine ? "border-indigo-500/30" : "border-white/10"
                      }`}
                    />
                  ) : (
                    <div
                      className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-white font-semibold text-xs ${
                        isMine
                          ? "bg-gradient-to-br from-indigo-500 to-purple-600"
                          : "bg-gradient-to-br from-gray-600 to-gray-700"
                      }`}
                    >
                      {msg.senderName?.charAt(0)?.toUpperCase() || "?"}
                    </div>
                  )}
                </div>

               
                <div
                  className={`flex flex-col ${
                    isMine ? "items-end" : "items-start"
                  }`}
                >
                 
                  <div
                    className={`flex items-center gap-2 mb-1 px-1 ${
                      isMine ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <span
                      className={`text-[11px] md:text-xs font-medium ${
                        isMine ? "text-indigo-300" : "text-gray-400"
                      }`}
                    >
                      {isMine ? "You" : msg.senderName || "Anonymous"}
                    </span>
                    <span className="text-[9px] md:text-[10px] text-gray-600">
                      {formatTime(msg.createdAt)}
                    </span>
                  </div>

                
                  <div
                    className={`relative px-3 py-2 md:px-4 md:py-2.5 ${
                      isMine
                        ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl rounded-br-md"
                        : "bg-white/[0.08] border border-white/10 text-white rounded-2xl rounded-bl-md"
                    } ${msg.type === "image" ? "p-1.5" : ""}`}
                  >
                   
                    {msg.type === "text" && (
                      <p className="text-[13px] md:text-sm leading-relaxed break-words">
                        {msg.text}
                      </p>
                    )}

           
                    {msg.type === "image" && (
                      <img
                        src={msg.fileUrl}
                        alt=""
                        className="rounded-xl max-h-[180px] md:max-h-[250px] w-auto object-cover cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => window.open(msg.fileUrl, "_blank")}
                      />
                    )}

                    {msg.type === "pdf" && (
                      <a
                        href={msg.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 hover:underline"
                      >
                        <FileText size={16} className="text-red-400" />
                        <span className="text-xs truncate max-w-[120px] md:max-w-[180px]">
                          {msg.fileName || "Document.pdf"}
                        </span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

   
      {selectedFile && (
        <div className="flex-shrink-0 px-3 md:px-4 pb-2">
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 relative">
         
            <button
              onClick={clearFile}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center shadow-lg"
            >
              <X size={12} className="text-white" />
            </button>

          
            <div className="flex items-center gap-3">
              {preview ? (
                <img
                  src={preview}
                  alt=""
                  className="rounded-lg h-16 md:h-20 w-auto object-cover"
                />
              ) : (
                <div className="flex items-center gap-2 text-white">
                  <FileText size={20} className="text-red-400" />
                  <span className="text-xs truncate max-w-[150px]">
                    {selectedFile.name}
                  </span>
                </div>
              )}

           
              <button
                onClick={sendFile}
                disabled={loading}
                className="ml-auto bg-gradient-to-r from-indigo-500 to-purple-600 disabled:opacity-50 px-4 py-2 rounded-lg text-white text-xs font-semibold flex items-center gap-1.5"
              >
                {loading ? (
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Send size={14} />
                )}
                <span>{loading ? "..." : "Send"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-shrink-0 px-3 py-3 md:px-4 md:py-4 border-t border-white/10 bg-black/60 backdrop-blur-xl safe-bottom">
        <div className="flex items-center gap-2">
         
          <button
            onClick={() => fileRef.current?.click()}
            className="flex-shrink-0 w-10 h-10 md:w-11 md:h-11 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors"
          >
            <Image size={18} className="text-gray-400" />
          </button>

         
          <input
            type="file"
            hidden
            ref={fileRef}
            accept="image/*"
            onChange={(e) => handleFileSelect(e.target.files[0])}
          />

   
          <input
            ref={inputRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Type a message..."
            className="flex-1 bg-white/5 border border-white/10 focus:border-indigo-500/50 rounded-xl px-4 py-2.5 md:py-3 outline-none text-white placeholder-gray-500 text-sm transition-colors"
          />

     
          <button
            onClick={sendMessage}
            disabled={!message.trim() || loading}
            className="flex-shrink-0 w-10 h-10 md:w-11 md:h-11 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 disabled:opacity-40 flex items-center justify-center transition-all shadow-lg shadow-indigo-500/20"
          >
            <Send size={18} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}