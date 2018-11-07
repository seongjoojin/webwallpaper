const clock = document.querySelector(".js-clock .clock__text");
var viewClockMode = "Hangul";

function getTimeHangul(hours, minutes, seconds) {
  const now = new Date();
  let time;
  switch (parseInt(now.getHours() / 12)) {
    case 0:
      time = " 오 전";
      break;
    case 1:
      time = " 오 후";
  }

  switch (now.getHours() % 12) {
    case 0:
      time += " 영";
      break;
    case 1:
      time += " 한";
      break;
    case 2:
      time += " 두";
      break;
    case 3:
      time += " 세";
      break;
    case 4:
      time += " 네";
      break;
    case 5:
      time += " 다 섯";
      break;
    case 6:
      time += " 여 섯";
      break;
    case 7:
      time += " 일 곱";
      break;
    case 8:
      time += " 여 덟";
      break;
    case 9:
      time += " 아 홉";
      break;
    case 10:
      time += " 열";
      break;
    case 11:
      time += " 열 한";
      break;
    case 12:
      time += " 열 두";
      break;
  }

  time += " 시<br>";

  switch (parseInt(now.getMinutes() / 10)) {
    case 1:
      time += " 십";
      break;
    case 2:
      time += " 이 십";
      break;
    case 3:
      time += " 삼 십";
      break;
    case 4:
      time += " 사 십";
      break;
    case 5:
      time += " 오 십";
      break;
    case 6:
      time += " 육 십";
  }

  switch (now.getMinutes() % 10) {
    case 1:
      time += " 일";
      break;
    case 2:
      time += " 이";
      break;
    case 3:
      time += " 삼";
      break;
    case 4:
      time += " 사";
      break;
    case 5:
      time += " 오";
      break;
    case 6:
      time += " 육";
      break;
    case 7:
      time += " 칠";
      break;
    case 8:
      time += " 팔";
      break;
    case 9:
      time += " 구";
  }

  if (now.getMinutes() != 0) {
    time += " 분<br>";
  }

  switch (parseInt(now.getSeconds() / 10)) {
    case 1:
      time += " 십";
      break;
    case 2:
      time += " 이 십";
      break;
    case 3:
      time += " 삼 십";
      break;
    case 4:
      time += " 사 십";
      break;
    case 5:
      time += " 오 십";
      break;
    case 6:
      time += " 육 십";
  }

  switch (now.getSeconds() % 10) {
    case 1:
      time += " 일";
      break;
    case 2:
      time += " 이";
      break;
    case 3:
      time += " 삼";
      break;
    case 4:
      time += " 사";
      break;
    case 5:
      time += " 오";
      break;
    case 6:
      time += " 육";
      break;
    case 7:
      time += " 칠";
      break;
    case 8:
      time += " 팔";
      break;
    case 9:
      time += " 구";
  }

  if (now.getSeconds() != 0) {
    time += " 초";
  }
  clock.innerHTML = time;
  return;
}

function getTimeNumber() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const time = `
    ${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}
  `;
  clock.innerHTML = time;
  return;
}

function getTime() {
  if (viewClockMode == "Number") {
    getTimeNumber();
  } else {
    getTimeHangul();
  }
}

function init() {
  getTime();
  setInterval(getTime, 1000);
  return;
}

clock.addEventListener("click", function() {
  if (viewClockMode == "Number") {
    viewClockMode = "Hangul";
  } else {
    viewClockMode = "Number";
  }
  this.classList.toggle("clock__hangul");
  getTime();
});

init();
