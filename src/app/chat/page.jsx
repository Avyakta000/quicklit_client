"use client";
import { useEffect, useState } from 'react';
// import io from 'socket.io-client';
import axios from 'axios';

// const socket = io('http://localhost:4000'); // Adjust this URL based on your setup

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    // Fetch chat history from the server
    // const fetchChatHistory = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:4000/api/chat/messages', {
    //             withCredentials: true, // Important to send cookies with the request
    //         });
    //         console.log(response.data.messages,' messages fetching', response.data)
    //         setMessages(response.data.messages); // Set messages state to the fetched messages
    //     } catch (error) {
    //         console.error('Error fetching chat history:', error);
    //     }
    // };

    // useEffect(() => {
    //     fetchChatHistory(); // Fetch chat history on component mount

    //     // Listen for incoming messages
    //     socket.on('chat message', (msg) => {
    //         console.log("Received message:", msg);
    //         setMessages((prevMessages) => [...prevMessages, msg]);
    //     });

    //     return () => {
    //         socket.off('chat message'); // Cleanup listener
    //     };
    // }, []);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     if (input) {
    //         console.log("Sending message:", input);
    //         // Send the message to the server via WebSocket
    //         socket.emit('chat message', input);
            
    //         // Optionally, you can save the message to the database
    //         try {
    //             await axios.post('http://localhost:4000/api/chat/messages', {
    //                 content: input,
    //             }, {
    //                 withCredentials: true, // Important to send cookies with the request
    //             });
    //         } catch (error) {
    //             console.error('Error saving message:', error);
    //         }
    //         setInput('');
    //     }
    // };

    return (
        <div>
            {/* <h1>Chat Room</h1>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg.content} - {new Date(msg.timestamp).toLocaleString()}</li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                />
                <button type="submit">Send</button>
            </form> */}
        </div>
    );
};

export default Chat;




// "use client";
// import { useEffect, useState } from 'react';
// import io from 'socket.io-client';

// const socket = io('http://localhost:4000'); // Adjust this URL based on your setup

// const Chat = () => {
//     const [messages, setMessages] = useState([]);
//     const [input, setInput] = useState('');

//     useEffect(() => {
//         // Listen for messages
//         socket.on('chat message', (msg) => {
//             console.log("Received message:", msg);
//             setMessages((prevMessages) => [...prevMessages, msg]);
//         });

//         return () => {
//             socket.off('chat message'); // Cleanup listener
//         };
//     }, []);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (input) {
//             console.log("Sending message:", input);
//             socket.emit('chat message', input);
//             setInput('');
//         }
//     };

//     return (
//         <div>
//             <h1>Chat Room</h1>
//             <ul id="message-list" style={{ maxHeight: '400px', overflowY: 'scroll' }}>
//                 {messages.map((msg, index) => (
//                     <li key={index}>{msg}</li>
//                 ))}
//             </ul>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     value={input}
//                     onChange={(e) => setInput(e.target.value)}
//                     placeholder="Type a message..."
//                 />
//                 <button type="submit" disabled={!input}>Send</button>
//             </form>
//         </div>
//     );
// };

// export default Chat;
