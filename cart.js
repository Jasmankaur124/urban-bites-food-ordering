function loadCart() {
  const container = document.getElementById("cartItems");
  const totalElement = document.getElementById("total");
  const paymentSection = document.getElementById("paymentSection");
  const proceedBtn = document.querySelector(".cart-summary .order-btn");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = `
      <p style="text-align:center; font-size:18px; color:#777;">
        Your cart is empty 😢
      </p>
    `;

    totalElement.innerText = 0;

    if (paymentSection) {
      paymentSection.style.display = "none";
    }

    if (proceedBtn) {
      proceedBtn.disabled = true;
      proceedBtn.style.opacity = "0.5";
      proceedBtn.style.cursor = "not-allowed";
    }

    return;
  }

  if (proceedBtn) {
    proceedBtn.disabled = false;
    proceedBtn.style.opacity = "1";
    proceedBtn.style.cursor = "pointer";
  }

  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    container.innerHTML += `
      <div class="cart-item">
        <div>
          <h3>${item.name}</h3>
          <p>₹${item.price} × ${item.quantity}</p>
        </div>

        <div class="cart-controls">
          <button onclick="changeQty(${index}, -1)">➖</button>
          <span>${item.quantity}</span>
          <button onclick="changeQty(${index}, 1)">➕</button>
        </div>

        <button onclick="removeItem(${index})">❌</button>
      </div>
    `;
  });

  totalElement.innerText = total;
}

function changeQty(index, change) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (!cart[index]) return;

  cart[index].quantity += change;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.splice(index, 1);

  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function clearCart() {
  const confirmClear = confirm("Are you sure you want to clear the cart?");

  if (confirmClear) {
    localStorage.removeItem("cart");
    loadCart();
  }
}

function showPayment() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    alert("Your cart is empty 😢");
    return;
  }

  const paymentSection = document.getElementById("paymentSection");
  paymentSection.style.display = "block";

  paymentSection.scrollIntoView({
    behavior: "smooth"
  });
}

function placeOrder() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    alert("Cart is empty 😢");
    return;
  }

  const selectedPayment = document.querySelector('input[name="pay"]:checked').value;

  if (selectedPayment === "upi") {
    const upiId = document.getElementById("upiInput").value.trim();

    if (upiId === "") {
      alert("Please enter UPI ID");
      return;
    }
  }

  localStorage.removeItem("cart");

showCustomPopup("Your order has been placed successfully!");

}

// PAYMENT METHOD TOGGLE

function showCustomPopup(message) {
  document.getElementById("popupMessage").innerText = message;
  document.getElementById("customPopup").style.display = "flex";
}

function closePopup() {
  document.getElementById("customPopup").style.display = "none";
  window.location.href = "success.html";
}


document.addEventListener("DOMContentLoaded", function () {
  loadCart();

  const paymentOptions = document.querySelectorAll('input[name="pay"]');

  paymentOptions.forEach(option => {
    option.addEventListener("change", function () {
      const upiBox = document.getElementById("upiBox");
      const cardBox = document.getElementById("cardBox");

      if (this.value === "upi") {
        upiBox.style.display = "block";
        cardBox.style.display = "none";
      } else {
        upiBox.style.display = "none";
        cardBox.style.display = "block";
      }
    });
  });
});



