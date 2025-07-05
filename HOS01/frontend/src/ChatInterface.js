// import React, { useState } from 'react';

// function ChatInterface() {
//   const [inputText, setInputText] = useState('');
//   const [result, setResult] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001/api/chat';

//   // Handle text input change
//   const handleTextChange = (e) => {
//     setInputText(e.target.value);
//   };

//   // Handle chat submission and stream the response
//   const handleSubmit = async () => {
//     if (inputText.trim()) {
//       setIsLoading(true);
//       setResult('');  // Clear previous result
  
//       try {
//         const response = await fetch(apiUrl, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ content: inputText }),
//         });
  
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
  
//         const reader = response.body.getReader();
//         const decoder = new TextDecoder();
  
//         // Stream the response in chunks
//         let done = false;
//         let accumulatedResult = '';  // For accumulating parsed response
  
//         while (!done) {
//           const { value, done: readerDone } = await reader.read();
//           done = readerDone;
//           const chunk = decoder.decode(value, { stream: true });
  
//           // Split by lines, in case multiple chunks are sent in one packet
//           const lines = chunk.split('\n');
//         // eslint-disable-next=line
//           lines.forEach((line) => {
//             if (line.startsWith('data:')) {
//               try {
//                 // Parse each SSE event data chunk
//                 const parsedData = JSON.parse(line.replace('data: ', ''));
                
//                 if (parsedData.response) {
//                   // Accumulate the parsed 'response' field
//                   accumulatedResult += parsedData.response;
//                   setResult(accumulatedResult);
//                 }
  
//                 // Check if the response is marked as 'done'
//                 if (parsedData.done) {
//                   setIsLoading(false);
//                 }
//               } catch (err) {
//                 console.error('Error parsing JSON chunk:', err);
//               }
//             }
//           });
//         }
  
//       } catch (error) {
//         console.error('Error during streaming:', error);
//         setIsLoading(false);
//       }
//     }
//   };  

//   return (
//     <div>
//       <h1>Chat with Gemma 2:2b</h1>

//       <div>
//         <textarea
//           value={inputText}
//           onChange={handleTextChange}
//           placeholder="Type your message here..."
//           rows="5"
//           cols="50"
//         />
//       </div>

//       <button onClick={handleSubmit} disabled={isLoading}>
//         {isLoading ? 'Waiting for response...' : 'Send'}
//       </button>

//       <div>
//         <h2>Response:</h2>
//         <p>{result}</p>
//       </div>
//     </div>
//   );
// }

// export default ChatInterface;


import React, { useState } from 'react';

function ChatInterface() {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001/api/chat';
  console.log("API URL being used:", apiUrl);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    setResult('');
    setIsLoading(true);

    const eventSource = new EventSource(apiUrl);

    eventSource.onmessage = (event) => {
      if (event.data === '[DONE]') {
        eventSource.close();
        setIsLoading(false);
        return;
      }

      try {
        const parsed = JSON.parse(event.data);
        if (parsed.response) {
          setResult((prev) => prev + parsed.response);
        }
      } catch (err) {
        console.error("Error parsing SSE data:", err);
      }
    };

    eventSource.onerror = (err) => {
      console.error("EventSource error:", err);
      eventSource.close();
      setIsLoading(false);
    };

    // Trigger backend stream via POST
    try {
      await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: inputText })
      });
    } catch (err) {
      console.error("POST failed:", err);
      setIsLoading(false);
    }

    setInputText('');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', fontFamily: 'Arial' }}>
      <h1>Chat with Gemma 2:2b</h1>
      <textarea
        rows={4}
        style={{ width: '100%', padding: '0.5rem' }}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Type your message here..."
      />
      <button
        onClick={handleSend}
        disabled={isLoading}
        style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}
      >
        {isLoading ? 'Waiting...' : 'Send'}
      </button>

      <h2 style={{ marginTop: '2rem' }}>Response:</h2>
      <div style={{ backgroundColor: '#f4f4f4', padding: '1rem', borderRadius: '5px', whiteSpace: 'pre-wrap' }}>
        {result}
      </div>
    </div>
  );
}

export default ChatInterface;