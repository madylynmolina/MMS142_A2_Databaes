const ORDER_EMAIL = "orders@examplewebsite142.com";
 
const sizeButtons = document.querySelectorAll("[data-size]");
const qtyInput = document.getElementById("qty");
 
const clamp = n => Math.min(99, Math.max(1, Math.floor(n) || 1));
const getSelectedSize = () =>
  document.querySelector('[data-size][aria-pressed="true"]')?.dataset.size ?? "";
 
// Size selection
sizeButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    sizeButtons.forEach(b => b.setAttribute("aria-pressed", String(b === btn)));
  });
});
 
// Quantity stepper
document.getElementById("minus").addEventListener("click", () => qtyInput.value = clamp(+qtyInput.value - 1));
document.getElementById("plus").addEventListener("click", () => qtyInput.value = clamp(+qtyInput.value + 1));
qtyInput.addEventListener("change", () => qtyInput.value = clamp(+qtyInput.value));
 
// Order Now
document.getElementById("orderBtn").addEventListener("click", () => {
  const name = document.getElementById("productName").textContent.trim();
  const price = Number(document.getElementById("productPrice").textContent);
  const size = getSelectedSize();
  const qty = clamp(+qtyInput.value);
 
  const subject = `Order: ${name}`;
  const body = [
    "Hello, I would like to order:",
    "",
    `Item: ${name}`,
    `Size: ${size}`,
    `Quantity: ${qty}`,
    `Price each: PHP${price}`,
    `Total: PHP${price * qty}`,
    "",
    "Name:",
    "Delivery address:",
    "Contact number:",
    "",
    "Thank you!"
  ].join("\r\n");
 
  window.location.href =
    `mailto:${ORDER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
