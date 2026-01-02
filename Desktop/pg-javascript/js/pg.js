
let age = 21;
let Pratik = true;

if (age >= 21) {
  if (Pratik) {
    console.log("You are eligible to apply.");
  } else {
    console.log("You are not eligible to apply");
  }
}

let enteredPassword = "12345";
let correctPassword = "12345";

if (enteredPassword === correctPassword) {
  console.log("Login successful!");
} else {
  console.log("Invalid password.");
}

let price = 50;
let quantity = 3;
let discount = 20;

let total = (price * quantity) - discount;

console.log("Total Price:", total);  // 130

let x = 10;

x += 5;   // x = x + 5
console.log("After += :", x);  // 15

x -= 3;   // x = x - 3
console.log("After -= :", x);  // 12

x *= 2;   // x = x * 2
console.log("After *= :", x);  // 24

x /= 4;   // x = x / 4
console.log("After /= :", x);  // 6

x %= 5;   // x = x % 5
console.log("After %= :", x);  // 1

x **= 3;  // x = x ** 3
console.log("After **= :", x); // 1 (since 1³ = 1)
