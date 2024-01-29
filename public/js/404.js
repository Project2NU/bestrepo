console.log("Script Connected");



let display = document.getElementById("404header");
let text = "Ohh noooo-we're so sorry!!!- It looks like-our dog ate that page-Hmm...- Maybe try another book??!";
let words = text.split("-");
    
function countdown() {
        let timeLeft = 5;
        let timerId = setInterval(function () {
          timeLeft--;
          
          if (timeLeft === 0) {
            clearInterval(timerId);
            displayMessage();
          }
        }, 100);
      };

function displayMessage() {
        let wordCount = 0;
        let msgInterval = setInterval(function () {
          if (words[wordCount] === undefined) {
            clearInterval(msgInterval);
          } else {
            display.textContent = words[wordCount];
            wordCount++;
          }
        }, 1000);
      };
    

countdown()