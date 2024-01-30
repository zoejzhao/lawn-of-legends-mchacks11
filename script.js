btn.addEventListener("click", startButtonClick);
function startButtonClick() {
  window.location.href = 'pick.html';
}

btn.addEventListener("click", mowerButtonClick);
function mowerButtonClick() {
  window.location.href = 'game.html';
}


btn.addEventListener("click", mowerButtonClickred);
function mowerButtonClickred() {
  window.location.href = 'game.html';
  localStorage.colour = "red";
}

btn.addEventListener("click", mowerButtonClickblue);
function mowerButtonClickblue() {
  window.location.href = 'game.html';
  localStorage.colour = "blue";
}
