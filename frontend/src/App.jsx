import { useState, useRef, useEffect } from 'react'
import './App.css'
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

function App() {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! How can I assist you today?', sender: 'bot', timestamp: new Date() }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Listen for socket connection
    socket.on('connect', () => {
      console.log('Connected to server')
    })

    // Listen for AI responses
    socket.on('ai-message-response', (data) => {
      setIsTyping(false)
      const botResponse = {
        id: Date.now(),
        text: data.response,
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
    })

    // Cleanup on unmount
    return () => {
      socket.off('connect')
      socket.off('ai-message-response')
    }
  }, [])

  const handleSend = () => {
    if (inputText.trim() === '') return

    const newMessage = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages([...messages, newMessage])
    const promptText = inputText
    setInputText('')
    setIsTyping(true)

    // Send message to backend via socket.io
    socket.emit('ai-message', { prompt: promptText })
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="chat-container">
      {/* Header */}
      <div className="chat-header">
        <div className="header-content">
          <div className="bot-avatar">
            <div className="avatar-icon">👨‍💻</div>
          </div>
          <div className="header-info">
            <h2>Echo AI</h2>
            <p className="status">Online</p>
          </div>
        </div>
        <div className="header-actions">
          <button className="icon-btn">⋮</button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="messages-container">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message-wrapper ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
          >
            <div className="message-bubble">
              <p className="message-text">{message.text}</p>
              <span className="message-time">{formatTime(message.timestamp)}</span>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="message-wrapper bot-message">
            <div className="message-bubble typing-indicator">
              <div className="typing-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="input-container">
        <button className="icon-btn attach-btn">📎</button>
        <div className="input-wrapper">
          <input
            type="text"
            className="message-input"
            placeholder="Type a message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
        <button className="send-btn" onClick={handleSend}>
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default App
