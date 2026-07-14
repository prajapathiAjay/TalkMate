


import React, { useState, useEffect } from "react";
import { FormatLastSeen } from "../utilityFuntions/FormatLastSeen";

const Lightbox = ({ images, startIndex, onClose }) => {
  const [index, setIndex] = useState(startIndex);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        setIndex(prev => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === 'ArrowRight') {
        setIndex(prev => (prev < images.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [images.length, onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!images || images.length === 0) return null;

  return (
    <div 
      className="fixed inset-0 bg-blue-500/80 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <button
        className="absolute top-4 right-4 text-white text-4xl font-bold hover:text-gray-300 z-10"
        onClick={onClose}
      >
        &times;
      </button>
      
      {index > 0 && (
        <button
          className="absolute left-4 text-white text-5xl font-bold hover:text-gray-300 w-12 h-12 flex items-center justify-center bg-black/30 rounded-full"
          onClick={() => setIndex(prev => prev - 1)}
        >
          ‹
        </button>
      )}
      
      <div className="relative flex flex-col items-center">
        <img
          src={images[index]?.fileUrl}
          alt={images[index]?.fileName || 'Lightbox image'}
          className="max-h-[85vh] max-w-[85vw] object-contain rounded-md"
        />
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
          {index + 1} / {images.length}
        </div>
      </div>
      
      {index < images.length - 1 && (
        <button
          className="absolute right-4 text-white text-5xl font-bold hover:text-gray-300 w-12 h-12 flex items-center justify-center bg-black/30 rounded-full"
          onClick={() => setIndex(prev => prev + 1)}
        >
          ›
        </button>
      )}
    </div>
  );
};

const MessageItem = ({ msg, currentUser, prevMessage }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxStart, setLightboxStart] = useState(0);

  const isCurrentUser = msg?.senderId === currentUser;
  // console.log("isCurrentUser",isCurrentUser)
  const isJoinMessage = msg?.messageType === "join";
  const isSameSenderAsPrev = prevMessage && prevMessage?.senderId === msg?.senderId;

  if (isJoinMessage) {
    return (
      <div className="flex justify-center my-2">
        <div className="text-gray-600 px-4 py-1 rounded-full text-xs font-normal ">
          {msg?.message}
        </div>
      </div>
    );
  }

  const images = msg?.attachments?.filter(file => file.fileType?.startsWith("image/")) || [];
  const imagesToShow = images.slice(0, 4);
  const remainingCount = images.length - 4;

  const handleOpenLightbox = (startIndex) => {
    setLightboxStart(startIndex); // Fixed: use the actual clicked index
    setLightboxOpen(true);
  };
  const formatMessageTime = (date) => {
  return new Date(date).toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

  const renderImageGrid = () => {
    if (images.length === 0) return null;
    
    if (images.length === 1) {
      return (
        <img
          src={images[0].fileUrl}
          alt={images[0].fileName}
          className="object-cover w-full h-48 rounded-md cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => handleOpenLightbox(0)}
        />
      );
    }
    
    if (images.length === 2) {
      return (
        <div className="grid grid-cols-2 gap-1">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img.fileUrl}
              alt={img.fileName}
              className="object-cover w-full h-48 rounded-md cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => handleOpenLightbox(idx)}
            />
          ))}
        </div>
      );
    }
    
    if (images.length === 3) {
      return (
        <div className="grid grid-cols-2 gap-1">
          <img
            src={images[0].fileUrl}
            alt={images[0].fileName}
            className="object-cover w-full h-48 col-span-2 rounded-md cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => handleOpenLightbox(0)}
          />
          <img
            src={images[1].fileUrl}
            alt={images[1].fileName}
            className="object-cover w-full h-24 rounded-md cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => handleOpenLightbox(1)}
          />
          <img
            src={images[2].fileUrl}
            alt={images[2].fileName}
            className="object-cover w-full h-24 rounded-md cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => handleOpenLightbox(2)}
          />
        </div>
      );
    }
    
    if (images.length >= 4) {
      return (
        <div className="grid grid-cols-2 gap-1">
          {images.slice(0, 4).map((img, idx) => (
            <div key={idx} className="relative">
              <img
                src={img.fileUrl}
                alt={img.fileName}
                className="object-cover w-full h-24 rounded-md cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => handleOpenLightbox(idx)}
              />
              {idx === 3 && remainingCount > 0 && (
                <div 
                  className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-md text-white text-lg font-bold cursor-pointer hover:bg-black/60 transition-colors"
                  onClick={() => handleOpenLightbox(idx)}
                >
                  +{remainingCount}
                </div>
              )}
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <>
      <div className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} mb-1 `}>
        <div className={`flex ${isCurrentUser ? "flex-row-reverse" : "flex-row"} max-w-[90%] md:max-w-[80%]`}>
          {!isCurrentUser && !isSameSenderAsPrev && (
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-2 flex-shrink-0">
              {msg?.senderName?.charAt(0)?.toUpperCase() || "U"}
            </div>
          )}

          <div className={`flex flex-col ${isSameSenderAsPrev ? "ml-10" : ""} ${isCurrentUser ? "items-end" : "items-start"} flex-1 min-w-0`}>
            {!isCurrentUser && !isSameSenderAsPrev && (
              <p className="font-semibold text-gray-700 text-xs mb-1 ml-1">{msg?.senderName}</p>
            )}

            <div className={`${isCurrentUser ? "flex-row" : "flex-row-reverse"} group flex items-center gap-1`}>
              <span className="text-xs opacity-0 group-hover:opacity-100 text-gray-500 mt-1 px-1 transition-opacity">
              {formatMessageTime(msg?.createdAt)}
              </span>

              <div className={`px-4 py-2 rounded-lg shadow-sm max-w-full ${
                isCurrentUser 
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-none" 
                  : "bg-white text-gray-800 rounded-bl-none border border-gray-100"
              }`}>
                {msg?.message && (
                  <p className="text-sm break-words whitespace-pre-wrap">{msg?.message}</p>
                )}

                {images.length > 0 && (
                  <div className="mt-2">
                    {renderImageGrid()}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {lightboxOpen && (
        <Lightbox 
          images={images} 
          startIndex={lightboxStart} 
          onClose={() => setLightboxOpen(false)} 
        />
      )}
    </>
  );
};

export default MessageItem;