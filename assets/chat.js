const typingForm = document.querySelector(".typing-form");
const chatList = document.querySelector(".chat-list");

let userMessage = null;


const API_KEY = "AIzaSyDnYHkd4v28-p6umbXPFO4u5_XA7KZASc4";
const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`

// Cria e retorna a mensagem
const createMessageElement = (content, ...classes) => {
    const div = document.createElement("div");
    div.classList.add("message", ...classes);
    div.innerHTML = content;
    return div;
}

const  generateAPIReponse = async () => {
    try {
        const reponse = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify ({
                contents: [{
                    role:  "user", 
                    parts: [{ text:  userMessage }]

                }]
            })
        });

        const_data = await response.json();

        console.log(data)
    } catch (error) {
        console.error(error);
    }
}

// Animação de loading
const showLoadingAnimation = () => {
    const html = `<div class="message-content">
    <img src="robot.png" class="avatar" alt="Bot">
    <p class="text"></p>
    <div class="loading-indicator">
        <div class="loading-bar"></div>
        <div class="loading-bar"></div>
        <div class="loading-bar"></div>
    </div>
    <div class="loading-bar"></div>
</div>
<span class="icon material-symbols-rounded">content_copy</span>`;

    const incomingMessageDiv = createMessageElement(html, "incoming", "loading");
    chatList.appendChild(incomingMessageDiv);

    generateAPIReponse();
}

const handleOutgoingChat = () => {
    userMessage = typingForm.querySelector(".typing-input").value.trim();
    if (!userMessage) return;

    const html = `<div class="message-content">
    <img src="user.png" class="avatar" alt="Imagem do usuario">
    <p class="text"></p>
</div>`;

    const outgoingMessageDiv = createMessageElement(html, "outgoing");
    outgoingMessageDiv.querySelector(".text").innerText = userMessage;
    chatList.appendChild(outgoingMessageDiv);

    typingForm.reset();
    setTimeout(showLoadingAnimation, 500);
}

typingForm.addEventListener("submit", (e) => {
    e.preventDefault();

    handleOutgoingChat();
})