import { useState } from 'react'
import CodeDisplay from './components/CodeDisplay'
import MessagesDisplay from './components/MessagesDisplay'
import axios from 'axios'

function App() {

  const [value, setValue] = useState('')
  const [chat, setChat] = useState([])

  const getQuery = async () => {
    try {
      const message = JSON.stringify({
        message: value
      })

      const response = await axios.post('http://localhost:5000/completions', message, {
        headers: { "Content-Type": "application/json" },
      })
      // const data = await response.json()

      console.log(response)

      const userMessage = {
        role: 'user',
        content: value
      }

      setChat(oldChat => [...oldChat, response.data, userMessage])

    } catch (error) {
      console.log(error)
    }
  }

  const filteredMessages = chat.filter(message => message.role === 'user')
  const latestCode = chat.filter(message => message.role === 'assistant').pop()

  const clearChat = () => {
    setValue('')
    setChat([])
  }

  return (
    <div className="app">
      <MessagesDisplay userMessages={filteredMessages} />
      <input value={value} onChange={e => setValue(e.target.value)} />
      <CodeDisplay text={latestCode && latestCode.content} />
      <div className='button-container'>
        <button id='get-query' onClick={getQuery}>Get Query!</button>
        <button id='clear-chat' onClick={clearChat}>Clear Chat</button>
      </div>

    </div>
  );
}

export default App;
