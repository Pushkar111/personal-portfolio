
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Paperclip } from 'lucide-react';

const ChatSupport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "We're real people, not bots. Please ask your question as we connect you.",
      isUser: false,
      time: "8 Jan 2025"
    },
    {
      id: 2,
      text: "Hi there, sorry we're unavailable at the moment. Please leave your details and we will get back to you shortly.",
      isUser: false,
      time: new Date().toLocaleTimeString()
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputMessage.trim() === '') return;
    
    // Add user message
    setMessages(prev => [...prev, {
      id: Date.now(),
      text: inputMessage,
      isUser: true,
      time: new Date().toLocaleTimeString()
    }]);
    
    setInputMessage('');
    
    // Simulate auto-reply after 1 second
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: "Thanks for your message! We'll get back to you soon.",
        isUser: false,
        time: new Date().toLocaleTimeString()
      }]);
    }, 1000);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-lg shadow-xl w-[350px] h-[500px] mb-4 overflow-hidden flex flex-col"
          >
            {/* Chat header */}
            <div className="bg-white p-4 border-b flex justify-between items-center">
              <div>
                <h3 className="font-bold text-xl">We're happy to chat.</h3>
              </div>
              <button 
                onClick={toggleChat} 
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {messages.map(message => (
                <div 
                  key={message.id} 
                  className={`mb-4 flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.isUser 
                        ? 'bg-blue-500 text-white rounded-br-none' 
                        : 'bg-white border border-gray-200 rounded-bl-none'
                    }`}
                  >
                    <p>{message.text}</p>
                    <p className={`text-xs mt-1 ${message.isUser ? 'text-blue-100' : 'text-gray-500'}`}>
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Chat input */}
            <form onSubmit={handleSubmit} className="border-t p-3 flex items-center">
              <button 
                type="button" 
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <Paperclip size={20} />
              </button>
              <input
                type="text"
                placeholder="Send your message..."
                className="flex-1 px-3 py-2 focus:outline-none"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
              />
              <button 
                type="submit" 
                className={`p-2 rounded-full ${inputMessage.trim() ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'}`}
                disabled={!inputMessage.trim()}
              >
                <Send size={20} />
              </button>
            </form>
            
            <div className="p-2 bg-gray-50 border-t text-center text-xs text-gray-500">
              Powered by <span className="font-semibold">ChatSupport</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Chat button */}
      <motion.button
        onClick={toggleChat}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 bg-white border rounded-full px-4 py-2 shadow-lg hover:shadow-xl transition-all"
      >
        <div className="h-10 w-10 rounded-full overflow-hidden">
          <img 
            src="public/lovable-uploads/971eebb3-3aa7-4346-ac56-1ef57ca5921e.png" 
            alt="Support Agent" 
            className="h-full w-full object-cover"
          />
        </div>
        <span className="font-medium">Chat with us</span>
      </motion.button>
    </div>
  );
};

export default ChatSupport;
