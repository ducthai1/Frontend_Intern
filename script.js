// After 2.8s animation end
let loader = document.getElementById("animation-loading");

setTimeout(() => {
  loader.remove();
}, 2800);
window.onload = function (setTimeout) {};
// --------------------------- Notification ---------------------------------
// Toast function
function toast({ title = "", message = "", type = "info", duration = 3000 }) {
  const main = document.getElementById("toast");
  if (main) {
    const toast = document.createElement("div");

    // Auto remove toast
    const autoRemoveId = setTimeout(function () {
      main.removeChild(toast);
    }, duration + 1000);

    // Remove toast when clicked
    toast.onclick = function (e) {
      if (e.target.closest(".toast__close")) {
        main.removeChild(toast);
        clearTimeout(autoRemoveId);
      }
    };

    const icons = {
      success: "fas fa-check-circle",
    };
    const icon = icons[type];
    const delay = (duration / 1000).toFixed(2);

    toast.classList.add("toast", `toast--${type}`);
    toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;

    toast.innerHTML = `
                      <div class="toast__icon">
                          <i class="${icon}"></i>
                      </div>
                      <div class="toast__body">
                          <h3 class="toast__title">${title}</h3>
                          <p class="toast__msg">${message}</p>
                      </div>
                      <div class="toast__close">
                          <i class="fas fa-times"></i>
                      </div>
                  `;
    main.appendChild(toast);
  }
}

function showSuccessToast() {
  toast({
    title: "Successed!",
    message: "You have just successfully clicked.",
    type: "success",
    duration: 5000,
  });
}

// --------------------------------- Handle chat box -----------------------------------

//Khai báo, Lấy các phần tử cần sử dụng
var messageBox = document.querySelector(".message-box");
var chatBox = document.getElementById("chatBox");

// Hàm xử lý khi nhấp vào lớp "message-box"
function toggleChat() {
  if (chatBox.style.display === "block") {
    closeChat();
  } else {
    openChat();
  }
}

// Hàm xử lý khi nhấp vào bất kỳ nơi nào ngoài khung chat
function handleClickOutside(event) {
  if (!chatBox.contains(event.target) && !messageBox.contains(event.target)) {
    closeChat();
  }
}

// Hàm mở khung chat
function openChat() {
  chatBox.style.display = "block";
  document.addEventListener("click", handleClickOutside);
}

// Hàm đóng khung chat
function closeChat() {
  chatBox.style.display = "none";
  document.removeEventListener("click", handleClickOutside);
}

function sendMessage() {
  var messageInput = document.getElementById("chatInput");
  var messageText = messageInput.value;

  if (messageText.trim() !== "") {
    var messageElement = document.createElement("div");
    messageElement.textContent = messageText;
    document.querySelector(".chat-body").appendChild(messageElement);
    messageInput.value = "";
  }
}

// Gắn sự kiện click cho lớp "message-box"
messageBox.addEventListener("click", toggleChat);

document
  .getElementById("chatInput")
  // Ở đây dùng keydown sẽ bị gửi tn 2 lần
  .addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Ngăn chặn hành vi mặc định khi nhấn Enter trong input (thường là gửi form)

      sendMessage(); // Gọi hàm gửi tin nhắn
    }
  });
