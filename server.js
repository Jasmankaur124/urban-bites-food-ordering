const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Save order
app.post("/order", (req, res) => {
  const order = req.body;
  const data = JSON.parse(fs.readFileSync("orders.json", "utf8"));
  data.push(order);
  fs.writeFileSync("orders.json", JSON.stringify(data, null, 2));
  res.send({ message: "Order received successfully!" });
});

// View all orders (optional)
app.get("/orders", (req, res) => {
  const data = JSON.parse(fs.readFileSync("orders.json", "utf8"));
  res.json(data);
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));









function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.toLowerCase();
  const chat = document.getElementById("chatMessages");

  if(message === "") return;

  chat.innerHTML += `<p class="user">${message}</p>`;

  let response = "";

  if(message.includes("happy")) {
    response = "You seem happy! Try our Brownie with Ice Cream 🍫";
  }
  else if(message.includes("sad")) {
    response = "Cheer up! Chocolate Shake always helps 🍫🥤";
  }
  else if(message.includes("hungry")) {
    response = "You should try our Peppy Paneer Pizza 🍕";
  }
  else if(message.includes("tired")) {
    response = "You need energy! Strawberry Shake is perfect 🍓";
  }
  else {
    response = "Hmm 🤔 I suggest Margherita Pizza or Pasta!";
  }

  chat.innerHTML += `<p class="bot">${response}</p>`;
  chat.scrollTop = chat.scrollHeight;

  input.value = "";
}























<script>
  const toggle = document.getElementById("darkToggle");

  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });
</script>
document.querySelectorAll(".add-cart").forEach(btn => {
  btn.addEventListener("click", () => {
    alert("Item added to cart 🛒");
  });
});