import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [userMessage, setUserMessage] = useState('')
  const [uploadedFile, setUploadedFile] = useState(null)
  const [response, setResponse] = useState('')
  const [displayedResponse, setDisplayedResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isStreaming, setIsStreaming] = useState(false)
  const streamingIntervalRef = useRef(null)
  const responseEndRef = useRef(null)

  // Auto-scroll to bottom when response updates
  useEffect(() => {
    if (isStreaming && responseEndRef.current) {
      responseEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }, [displayedResponse, isStreaming])

  // Streaming effect - types out response character by character
  useEffect(() => {
    if (!response || displayedResponse === response) {
      setIsStreaming(false)
      return
    }

    setIsStreaming(true)
    setDisplayedResponse('')

    let currentIndex = 0
    const streamingSpeed = 10 // milliseconds per character (adjust for faster/slower typing)

    streamingIntervalRef.current = setInterval(() => {
      if (currentIndex < response.length) {
        setDisplayedResponse(response.substring(0, currentIndex + 1))
        currentIndex++
      } else {
        clearInterval(streamingIntervalRef.current)
        setIsStreaming(false)
      }
    }, streamingSpeed)

    return () => {
      if (streamingIntervalRef.current) {
        clearInterval(streamingIntervalRef.current)
      }
    }
  }, [response])

  // Simple markdown renderer
  const renderMarkdown = (text) => {
    if (!text) return null
    
    const lines = text.split('\n')
    const elements = []
    let key = 0

    lines.forEach((line, index) => {
      // H1 headings
      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={key++} className="md-h1">
            {line.replace(/^# /, '')}
          </h1>
        )
      }
      // H2 headings
      else if (line.startsWith('## ')) {
        elements.push(
          <h2 key={key++} className="md-h2">
            {line.replace(/^## /, '')}
          </h2>
        )
      }
      // Bold text with **
      else if (line.includes('**')) {
        const parts = line.split('**')
        const formatted = parts.map((part, i) => 
          i % 2 === 1 ? <strong key={i}>{part}</strong> : part
        )
        elements.push(
          <p key={key++} className="md-paragraph">
            {formatted}
          </p>
        )
      }
      // Bullet points
      else if (line.startsWith('• ')) {
        elements.push(
          <li key={key++} className="md-list-item">
            {line.replace(/^• /, '')}
          </li>
        )
      }
      // Empty lines
      else if (line.trim() === '') {
        elements.push(<div key={key++} className="md-spacer"></div>)
      }
      // Regular paragraphs
      else {
        elements.push(
          <p key={key++} className="md-paragraph">
            {line}
          </p>
        )
      }
    })

    return <div className="markdown-content">{elements}</div>
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setUploadedFile(file)
    }
  }

  const handleAnalyze = async () => {
    if (!uploadedFile) {
      setResponse('Please upload a file to analyze.')
      return
    }

    setIsLoading(true)
    setResponse('')

    // Simulate API delay
    setTimeout(async () => {
      try {
        // Use import.meta.env.BASE_URL to get the correct base path
        const basePath = import.meta.env.BASE_URL
        const responsesData = await fetch(`${basePath}responses.json`).then(res => res.json())
        const fileName = uploadedFile.name
        const mockResponse = responsesData[fileName] || 'File not recognized — please upload a supported document.'
        
        setResponse(mockResponse)
      } catch (error) {
        setResponse('Error loading response data.')
      }
      setIsLoading(false)
    }, 2000)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) {
      setUploadedFile(file)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  return (
    <div className="app-container">
      <div className="card">
        <header className="header">
          <div className="logo">
            <div className="logo-icon">🏛️</div>
            <span className="logo-text">Jing Admin</span>
          </div>
        </header>

        <div className="content">
          <div className="input-section">
            <label htmlFor="message-input">Your Message</label>
            <textarea
              id="message-input"
              className="message-input"
              placeholder="Enter your analysis request..."
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              rows={1}
            />
          </div>

          <div className="upload-section">
            <label>Upload Document</label>
            <div
              className="upload-area"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <input
                type="file"
                id="file-input"
                className="file-input"
                accept=".pdf,.docx,.xlsx"
                onChange={handleFileChange}
              />
              <label htmlFor="file-input" className="upload-label">
                <div className="upload-icon">📁</div>
                <p className="upload-text">
                  {uploadedFile ? uploadedFile.name : 'Drop file here or click to browse'}
                </p>
                <p className="upload-hint">Accepts PDF, DOCX, XLSX</p>
              </label>
            </div>
          </div>

          <button
            className="analyze-button"
            onClick={handleAnalyze}
            disabled={isLoading}
          >
            {isLoading ? 'Analyzing...' : 'Analyze'}
          </button>

          {(isLoading || response) && (
            <div className="">
              {isLoading ? (
                <div className="loading-spinner"></div>
              ) : (
                <div className="response-content">
                  <div className="ai-response">
                    {renderMarkdown(displayedResponse)}
                    {isStreaming && <span className="typing-cursor">▋</span>}
                    <div ref={responseEndRef} />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
