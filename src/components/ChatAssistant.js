import React, { useState } from "react";
import "./ChatAssistant.css";

function ChatAssistant(){

const [open,setOpen] = useState(false);

return(

<div>

{/* Floating Button */}

<div
className="chat-button"
onClick={()=>setOpen(!open)}
>
💬
</div>

{/* Chat Window */}

{open && (

<div className="chat-window">

<div className="chat-header">

<span>EcoSort AI ♻</span>

<button onClick={()=>setOpen(false)}>
✖
</button>

</div>

<div className="chat-body">

<p className="bot-message">
Hello 👋 I'm EcoSort AI.  
Ask me anything about e-waste recycling.
</p>

</div>

<div className="chat-input">

<input
placeholder="Type your message..."
/>

<button>Send</button>

</div>

</div>

)}

</div>

)

}

export default ChatAssistant;