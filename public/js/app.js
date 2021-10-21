console.log("Client side javascript file is loaded!!");

const weatherForm = document.querySelector("form");
const searchEle = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';
  const location = searchEle.value;
  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          console.log(`%c${data.error}`, "color: white; background: red;");
          messageOne.textContent = data.error;
        } else {
          messageOne.textContent = data.location;
          messageTwo.textContent = data.forecast;
        }
      });
    }
  );
});




// REF

// fetch('https://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) =>{
//         console.log(data);
//     });
// });
