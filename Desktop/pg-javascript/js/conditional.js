/* Get user a input a  number using prompt ("enter a number:"). Check if the number is even or odd. Display an alert with the result. */


let num = prompt("Enter a number:");

if (num % 2 === 0) {
    alert ("The number " + num + " is even.");
} else {
    alert ("The number " + num + " is odd.");

}