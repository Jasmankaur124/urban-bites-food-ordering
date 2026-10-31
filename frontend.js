console.log("FINAL WORKING JS LOADED ✅");

document.addEventListener("DOMContentLoaded", function () {

  const chatBtn = document.getElementById("chatBtn");
  const chatBox = document.getElementById("chatbot");
  const closeBtn = document.getElementById("closeChat");

  if (chatBtn && chatBox) {
    chatBtn.addEventListener("click", function () {
      chatBox.style.display = "flex";
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", function () {
      chatBox.style.display = "none";
    });
  }

});

// ✅ ONLY ONE addToCart FUNCTION
function addToCart(name, price) {
  console.log("ADD CLICKED:", name, price); 

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let existing = cart.find(item => item.name === name);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  showToast(name + " added 🛒");
}

// CHAT FUNCTION
function sendMessage() {
  const input = document.getElementById("chatInput");
  const chatBody = document.getElementById("chatBody");

  const msg = input.value.trim();
  if (msg === "") return;

  const user = document.createElement("div");
  user.className = "user-msg";
  user.innerText = msg;
  chatBody.appendChild(user);

  let reply = "😋 Try Pizza, Pasta or Dessert!";

  if (msg.toLowerCase().includes("pizza")) {
    reply = "🍕 Try Peppy Paneer Pizza!";
  } 
  else if (msg.toLowerCase().includes("sweet")) {
    reply = "🍰 Brownie with Ice Cream!";
  } 
  else if (msg.toLowerCase().includes("drink")) {
    reply = "🥤 Chocolate Shake!";
  }

  const bot = document.createElement("div");
  bot.className = "bot-msg";
  bot.innerText = reply;

  setTimeout(() => {
    chatBody.appendChild(bot);
    chatBody.scrollTop = chatBody.scrollHeight;
  }, 400);

  input.value = "";
}

function selectOption(type) {
  const chatBody = document.getElementById("chatBody");

  chatBody.innerHTML = "";

  let reply = "";

  if (type === "sweet") reply = "🍰 Brownie best!";
  else if (type === "spicy") reply = "🌶 Peppy Paneer Pizza!";
  else if (type === "drink") reply = "🥤 Chocolate Shake!";

  const bot = document.createElement("div");
  bot.className = "bot-msg";
  bot.innerText = reply;

  chatBody.appendChild(bot);
}





function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2500);
}