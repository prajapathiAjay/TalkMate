import React from "react";

const MessageInput = ({ newMsg, setNewMsg, onSend, onKeyPress, disabled = false }) => {

  return (
    <div className="bg-white border-t border-gray-200 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center space-x-3">
          <button
            title="Attach file"
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
          </button>
          <button
            title="Emoji"
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>

          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Type your message..."
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              onKeyPress={onKeyPress}
              disabled={disabled}
              className={`w-full px-4 py-3 pl-12 bg-gray-50 border text-black border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all ${
                disabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
          </div>

          <button
            onClick={onSend}
            disabled={!newMsg.trim() || disabled}
            className={`px-6 py-3 rounded-2xl font-medium transition-all duration-200 ${
              newMsg.trim() && !disabled
                ? "bg-linear-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Send
          </button>
        </div>
        
        <div className="mt-2 text-xs text-gray-500 text-center">
          Press Enter to send, Shift+Enter for new line
        </div>
      </div>
    </div>
  );
};

export default MessageInput;