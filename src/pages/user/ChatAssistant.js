import React, { useState, useRef, useEffect } from "react";
import "./ChatAssistant.css";
import { askEcoSortAI } from "../../services/chatbotService";

function ChatAssistant(){

const [open,setOpen] = useState(false);

const [messages,setMessages] = useState([
{
sender:"bot",
text:"Hello 👋 I'm EcoSort AI. Ask me anything about e-waste recycling."
}
]);

const [input,setInput] = useState("");
const [typing,setTyping] = useState(false);

const chatEndRef = useRef(null);

/* AUTO SCROLL */
useEffect(()=>{
chatEndRef.current?.scrollIntoView({behavior:"smooth"});
},[messages,typing]);

/* SUGGESTIONS */
const suggestions = [
"♻ What is e-waste?",
"📦 How to schedule pickup?",
"🏆 How do EcoPoints work?",
"🌍 Why recycle electronics?"
];

/* HANDLE SUGGESTION */
const handleSuggestion = (question)=>{
setInput(question);
};

/* VOICE INPUT (SAFE) */
const startVoice = ()=>{

if(!window.webkitSpeechRecognition){
alert("Voice not supported on this device");
return;
}

const recognition = new window.webkitSpeechRecognition();
recognition.lang="en-US";

recognition.onresult = (event)=>{
setInput(event.results[0][0].transcript);
};

recognition.start();
};

/* SEND MESSAGE */
const handleSend = async ()=>{

if(!input.trim()) return;

const userText = input;

/* USER MESSAGE */
const userMessage = {
sender:"user",
text:userText
};

setMessages(prev => [...prev,userMessage]);
setInput("");
setTyping(true);

try{

const reply = await askEcoSortAI(userText);

const botMessage = {
sender:"bot",
text:reply || "I couldn't understand that. Try again."
};

setMessages(prev => [...prev,botMessage]);

}catch(err){

setMessages(prev => [
...prev,
{
sender:"bot",
text:"⚠ Server not reachable. Please try again later."
}
]);

}

setTyping(false);

};

return(

<div>

{/* FLOAT BUTTON */}
<div
className="chat-button"
onClick={()=>setOpen(!open)}
>
💬
</div>

{/* CHAT WINDOW */}
{open && (

<div className="chat-window">

{/* HEADER */}
<div className="chat-header">

<span>EcoSort AI ♻</span>

<button
className="close-btn"
onClick={()=>setOpen(false)}
>
✕
</button>

</div>

{/* BODY */}
<div className="chat-body">

{/* SUGGESTIONS */}
<div className="suggestions">

{suggestions.map((q,index)=>(

<button
key={index}
onClick={()=>handleSuggestion(q)}
>
{q}
</button>

))}

</div>

{/* MESSAGES */}
{messages.map((msg,index)=>(

<div key={index} className="message-row">

<span className="avatar">
{msg.sender === "bot" ? "🤖" : "👤"}
</span>

<p className={msg.sender === "bot" ? "bot-message" : "user-message"}>
{msg.text}
</p>

</div>

))}

{/* TYPING */}
{typing && (
<div className="message-row">
<span className="avatar">🤖</span>
<p className="bot-message">Typing...</p>
</div>
)}

<div ref={chatEndRef}></div>

</div>

{/* INPUT */}
<div className="chat-input">

<input
placeholder="Type your message..."
value={input}
onChange={(e)=>setInput(e.target.value)}
onKeyDown={(e)=>e.key==="Enter" && handleSend()}
/>

<button onClick={startVoice}>🎤</button>

<button onClick={handleSend}>Send</button>

</div>

</div>

)}

</div>

);

}

export default ChatAssistant;