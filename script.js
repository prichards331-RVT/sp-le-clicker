const title = document.getElementById("Mamba");
const car = document.getElementById("car");
const carUpgradeButton = document.getElementById("name");
const engineButton = document.getElementById("engineButton");
const garageButton = document.getElementById("garageButton");
const nitroButton = document.getElementById("nitroButton");
const resetButton = document.getElementById("resetButton");

const moneyText = document.getElementById("moneyText");
const bonusText = document.getElementById("bonusText");
const autoText = document.getElementById("autoText");
const levelText = document.getElementById("levelText");
const carNameText = document.getElementById("carName");
const message = document.getElementById("message");
const missionText = document.getElementById("missionText");

let score = 0;
let bonus = 10;
let autoIncome = 0;

let upgradeCost = 1000;
let engineCost = 500;
let garageCost = 1500;
let nitroCost = 2000;

let carLevel = 0;
let clicks = 0;
let nitroActive = false;
let missionDone = false;

const cars = [
  {
    name: "Lada",
    image: "https://pngimg.com/uploads/lada/lada_PNG149.png"
  },
  {
    name: "BMW",
    image: "https://www.freepnglogos.com/uploads/bmw-png/black-bmw-xdrive-car-png-image-pngpix-33.png"
  },
  {
    name: "Porsche",
    image: "https://png.pngtree.com/png-clipart/20240514/original/pngtree-car-isolated-on-white-background-porsche-911-png-image_15091144.png"
  },
  {
    name: "Maserati",
    image: "https://www.pngall.com/wp-content/uploads/2/Maserati-Transparent.png"
  },
  {
    name: "Super car",
    image: "https://www.freeiconspng.com/uploads/bugatti-car-png-3.png"
  }
];

function updateScreen() {
  moneyText.innerHTML = Math.floor(score) + " €";
  bonusText.innerHTML = bonus + " €";
  autoText.innerHTML = autoIncome + " €/s";
  levelText.innerHTML = carLevel + 1;

  carUpgradeButton.innerHTML = "Car upgrade: " + upgradeCost + " €";
  engineButton.innerHTML = "Engine upgrade: " + engineCost + " €";
  garageButton.innerHTML = "Garage: " + garageCost + " €";

  if (nitroActive) {
    nitroButton.innerHTML = "Nitro is active!";
  } else {
    nitroButton.innerHTML = "Nitro x3: " + nitroCost + " €";
  }

  carNameText.innerHTML = cars[carLevel].name;
  car.src = cars[carLevel].image;

  carUpgradeButton.disabled = score < upgradeCost || carLevel >= cars.length - 1;
  engineButton.disabled = score < engineCost;
  garageButton.disabled = score < garageCost;
  nitroButton.disabled = score < nitroCost || nitroActive;

  if (carLevel >= cars.length - 1) {
    carUpgradeButton.innerHTML = "Max car level";
  }

  checkMission();
}

car.addEventListener("click", () => {
  clicks++;

  if (nitroActive) {
    score += bonus * 3;
    message.innerHTML = "+ " + bonus * 3 + " € Nitro!";
  } else {
    score += bonus;
    message.innerHTML = "+ " + bonus + " €";
  }

  title.style.color = "lime";

  if (clicks % 25 === 0) {
    randomEvent();
  }

  updateScreen();
});

carUpgradeButton.addEventListener("click", () => {
  if (score >= upgradeCost && carLevel < cars.length - 1) {
    score -= upgradeCost;
    carLevel++;
    bonus += 20;
    upgradeCost *= 2;

    message.innerHTML = "Tu nopirki jaunu mašīnu!";
    updateScreen();
  }
});

engineButton.addEventListener("click", () => {
  if (score >= engineCost) {
    score -= engineCost;
    bonus += 15;
    engineCost = Math.floor(engineCost * 1.8);

    message.innerHTML = "Motors uzlabots! Tagad klikšķis dod vairāk.";
    updateScreen();
  }
});

garageButton.addEventListener("click", () => {
  if (score >= garageCost) {
    score -= garageCost;
    autoIncome += 25;
    garageCost = Math.floor(garageCost * 2);

    message.innerHTML = "Garāža nopirkta! Tagad nauda nāk automātiski.";
    updateScreen();
  }
});

nitroButton.addEventListener("click", () => {
  if (score >= nitroCost && !nitroActive) {
    score -= nitroCost;
    nitroActive = true;
    car.classList.add("nitro");

    message.innerHTML = "Nitro ieslēgts uz 10 sekundēm!";

    setTimeout(() => {
      nitroActive = false;
      car.classList.remove("nitro");
      nitroCost = Math.floor(nitroCost * 2);
      message.innerHTML = "Nitro beidzās.";
      updateScreen();
    }, 10000);

    updateScreen();
  }
});

function randomEvent() {
  const eventNumber = Math.floor(Math.random() * 3);

  if (eventNumber === 0) {
    score += 500;
    message.innerHTML = "Sponsors tev iedeva +500 €!";
  } else if (eventNumber === 1) {
    score = Math.max(0, score - 300);
    message.innerHTML = "Policija uzlika sodu -300 €!";
  } else {
    bonus += 10;
    message.innerHTML = "Mehāniķis uzlaboja mašīnu! +10 € par klikšķi.";
  }
}

function checkMission() {
  if (score >= 3000 && !missionDone) {
    score += 1000;
    bonus += 20;
    missionDone = true;
    missionText.innerHTML = "Misija izpildīta! Tu saņēmi +1000 € un +20 € par klikšķi.";
  }
}

setInterval(() => {
  score += autoIncome;
  updateScreen();
}, 1000);

resetButton.addEventListener("click", () => {
  score = 0;
  bonus = 10;
  autoIncome = 0;

  upgradeCost = 1000;
  engineCost = 500;
  garageCost = 1500;
  nitroCost = 2000;

  carLevel = 0;
  clicks = 0;
  nitroActive = false;
  missionDone = false;

  title.style.color = "white";
  message.innerHTML = "Spēle sākta no jauna!";
  missionText.innerHTML = "Sakrāj 3000 €, lai iegūtu bonusu.";

  updateScreen();
});

updateScreen();
