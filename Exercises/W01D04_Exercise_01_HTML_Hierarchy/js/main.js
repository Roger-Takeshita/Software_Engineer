let buttonElement = document.querySelector("button");
let inputElment = document.querySelector("input");
let ulElement = document.querySelector("ul");
// console.log(buttonElement);

function handleButtonClick (event) {
   const liElement = document.createElement("li")
   liElement.innerText = inputElment.value;
   ulElement.appendChild(liElement);
   inputElment.value = "";
   inputElment.focus();
}

// buttonElement.addEventListener("click", function(event) {
//    const liElement = document.createElement("li")
//    liElement.innerText = inputElment.value;
//    ulElement.appendChild(liElement);
//    inputElment.value = "";
//    inputElment.focus();
//    // console.log(event);    // cl the event that occured.
// });

buttonElement.addEventListener("click", handleButtonClick);
buttonElement.removeEventListener("click", function() {
   console.log("ADDED")
});

// document.querySelector("h3").addEventListener("click", function(event){
//    console.log("H3 Clicked");
//    event.stopPropagation();         // Stop event bubbling to parents
// });

// document.querySelector("body").addEventListener("click", function(event){
//    console.log(event);
//    console.log(this);
//    console.log("Body Clicked");
// });

ulElement.addEventListener("click", function(event){
   if (event.target.style.color === "red") {
      event.target.style.color = "black";
   } else {
      event.target.style.color = "red";
   }
});

setTimeout(() => {
   buttonElement.removeEventListener("click",handleButtonClick);
}, 10000);