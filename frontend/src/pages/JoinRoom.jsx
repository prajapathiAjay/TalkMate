import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const JoinRoom = ({ onJoin, currentUser }) => {
  const schema = yup.object().shape({
    roomName: yup
      .string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters"),
    // roomId: yup.string().required("Room ID is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const fields = [
    {
      id: "roomName",
      label: "Room Name",
      name: "roomName",
      type: "text",
      placeholder: "Enter Room Name",
    },
    // {
    //   id: "roomId",
    //   label: "Room ID",
    //   name: "roomId",
    //   type:"text",
    //   placeholder: "Enter Room ID",
    // },
    // { id: "type", label: "Type of ChatRoom", name: "type", type: "checkbox" },
  ];

  if (currentUser) {
    return (
      <div className="w-[400px] h-screen bg-linear-to-br from-blue-50 to-purple-50 p-8 flex flex-col justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-linear-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
              {currentUser.charAt(0)}
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Welcome back!</h2>
            <p className="text-gray-600 mt-2">
              You're connected as{" "}
              <span className="font-semibold">{currentUser}</span>
            </p>
          </div>
          <div className="bg-linear-to-r from-green-50 to-blue-50 rounded-xl p-4">
            <div className="flex items-center justify-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse" />
              <p className="text-green-700 font-medium">Connected to chat</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[50%] h-screen bg-linear-to-br from-blue-500 to-purple-600 p-8 flex flex-col justify-center">
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome to TalkMate
          </h1>
          <p className="text-blue-100">
            Connect with friends and the world around you
          </p>
        </div>

        <form onSubmit={handleSubmit(onJoin)} className="space-y-6">
          <div>
            {fields.map((field) => {
              if (field.type === "text") {
                return (
                  <div key={field.id}>
                    <label className="block text-white text-sm font-medium mb-2">
                      {field.label}
                    </label>

                    <input
                      {...register(field?.name)}
                      placeholder={field?.placeholder}
                      className={`w-full px-4 py-3 rounded-xl border bg-white/10 backdrop-blur-sm text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 ${
                        errors[field?.name]
                          ? "border-red-300"
                          : "border-white/30"
                      }`}
                    />
                    {errors[field?.name] && (
                      <p className="text-red-200 text-sm mt-1">
                        {errors[field?.name]?.message}
                      </p>
                    )}
                  </div>
                );
              } else  {
                return null;
                // return (
                //   <div key={field.id} className="flex items-center">
                //     <label> {field.label}</label>
                //     <input
                //       type="checkbox"
                //       {...register(field?.name)}
                //       className={`w-full px-4 py-3 rounded-xl border bg-white/10 backdrop-blur-sm text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 ${
                //         errors[field?.name]
                //           ? "border-red-300"
                //           : "border-white/30"
                //       }`}
                //     />
                //     {errors[field?.name] && (
                //       <p className="text-red-200 text-sm mt-1">
                //         {errors[field?.name]?.message}
                //       </p>
                //     )}
                //   </div>
                // );
              }
            })}
          </div>

          <button
            type="submit"
            className="w-full bg-white text-blue-600 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
          >
            Join Chat
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/20">
          <p className="text-blue-100 text-sm text-center">
            Create a unique room ID to start a private conversation
          </p>
        </div>
      </div>
    </div>
  );
};

export default JoinRoom;
