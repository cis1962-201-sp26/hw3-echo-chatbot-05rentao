var currentChat = { messages: [] };
/**
 * Simulates a bot response to a user message
 * @param {string} userMessage - The user's message
 * @returns {string} - The bot's response
 */
function simulateBotResponse(userMessage) {
    // Simulate bot response with a delay
    setTimeout(function () {
        var botReply = "You said: \"".concat(userMessage, "\"");
        sendMessage('Echo', botReply);
        renderMessages(currentChat.messages);
    }, 500);
}
/**
 * Sends a message in the current chat
 * @param {string} role - The role of the message sender ('User' or 'Echo')
 * @param {string} message - The message content
 */
function sendMessage(role, message) {
    var newMessage = { role: role, content: message };
    currentChat.messages.push(newMessage);
    localStorage.setItem("currentChat", JSON.stringify(currentChat));
}
/**
 * Renders the messages in the chat current selected
 * @param {{role: string, content: string}[]} messages - The messages to render
 */
function renderMessages(messages) {
    var container = document.getElementById('chat-history');
    if (container) {
        container.innerHTML = "";
        messages.forEach(function (_a) {
            var role = _a.role, content = _a.content;
            var newText = document.createElement('p');
            if (role === 'User') {
                newText.className = 'user-text';
            }
            else if (role === 'Echo') {
                newText.className = 'chat-text';
            }
            newText.textContent = content;
            container.appendChild(newText);
        });
        container.scrollTo({
            top: container.scrollHeight,
            behavior: 'smooth'
        });
    }
}
/**
 * Creates a new chat
 * @requirements
 * - If no chat exists, create a new chat object and stores it in local storage
 * - If a chat exits, delete the old chat object and creates a new one
 * - Always render the chat list and messages after creating a new chat
 */
function createNewChat() {
    currentChat = { messages: [] };
    localStorage.setItem('currentChat', JSON.stringify(currentChat));
    renderMessages(currentChat.messages);
}
/**
 * Initializes the app
 * @requirements
 * - Fetch the chat object from local storage
 * - Renders the chat messages from the saved chat
 * - If no chat exists, create a new chat
 */
function initializeApp() {
    var chat = localStorage.getItem("currentChat");
    currentChat = (chat) ? JSON.parse(chat) : { messages: [] };
    renderMessages(currentChat.messages);
}
var resetBtn = document.getElementById('reset');
if (resetBtn) {
    resetBtn.addEventListener('click', createNewChat);
}
var sendBtn = document.getElementById('send');
var messageInput = document.getElementById('message');
if (sendBtn && messageInput) {
    var sendUserMessage_1 = function () {
        if (messageInput.value === "") {
            return;
        }
        var userText = messageInput.value.trim();
        if (!userText)
            return;
        sendMessage("User", userText);
        renderMessages(currentChat.messages);
        messageInput.value = "";
        simulateBotResponse(userText);
    };
    sendBtn.addEventListener('click', sendUserMessage_1);
    messageInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendUserMessage_1();
        }
    });
}
// Initialize the app upon reload
initializeApp();
export {};
