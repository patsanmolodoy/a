import Popup from "./popup.js";

let money = 0;
let napkins = 0;
const btnPlus = document.querySelector(".plus");
const btnMinus = document.querySelector(".minus");
const moneyText = document.querySelector(".money");
const napkinsText = document.querySelector(".napkins");
const theme = document.querySelector(".theme");
const themeIcon = document.querySelector(".icon");
const popupAuth = document.querySelector("#auth");
const popupForm = popupAuth.querySelector(".form");
const popupInput = popupForm.querySelector(".input");
const popupWelcome = document.querySelector("#welcome");
const popupName = document.querySelector(".popup-name");
const localMoney = JSON.parse(localStorage.getItem("money"));
const localNapkins = JSON.parse(localStorage.getItem("napkins"));
const localTheme = JSON.parse(localStorage.getItem("isDark"));
const localIsAuth = JSON.parse(localStorage.getItem("isAuth"));
const localName = JSON.parse(localStorage.getItem("name"));
const authPopup = new Popup(popupAuth);
const welcomePopup = new Popup(popupWelcome);

let isDark = false;

const enhancement = () => {
  const m = (money += 50);
  const n = (napkins += 1);
  localStorage.setItem("money", JSON.stringify(m));
  localStorage.setItem("napkins", JSON.stringify(n));
  moneyText.style.transform = "translateY(-40px)";
  napkinsText.style.transform = "translateY(-40px)";
  setTimeout(() => {
    moneyText.textContent = m;
    napkinsText.textContent = n;
  }, 150);
  setTimeout(() => {
    moneyText.style.transform = "translateY(0)";
    napkinsText.style.transform = "translateY(0)";
  }, 400);
  btnPlus.disabled = true;
  btnMinus.disabled = true;
  setTimeout(() => {
    btnPlus.disabled = false;
    btnMinus.disabled = false;
  }, 500);
};

const decrease = () => {
  const m = (money -= 50);
  const n = (napkins -= 1);
  if (m > 0 && n > 0) {
    moneyText.textContent = m;
    napkinsText.textContent = n;
    localStorage.setItem("napkins", JSON.stringify(n));
    moneyText.style.transform = "translateY(40px)";
    napkinsText.style.transform = "translateY(40px)";
    setTimeout(() => {
      moneyText.textContent = m;
      napkinsText.textContent = n;
    }, 150);
    setTimeout(() => {
      moneyText.style.transform = "translateY(0)";
      napkinsText.style.transform = "translateY(0)";
    }, 400);
    btnPlus.disabled = true;
    btnMinus.disabled = true;
    setTimeout(() => {
      btnPlus.disabled = false;
      btnMinus.disabled = false;
    }, 500);
  }
};

btnPlus.addEventListener("click", enhancement);
btnMinus.addEventListener("click", decrease);

document.addEventListener("DOMContentLoaded", () => {
  money = localMoney ? localMoney : 0;
  napkins = localNapkins ? localNapkins : 0;
  moneyText.textContent = money;
  napkinsText.textContent = napkins;

  isDark = localTheme && localTheme;
  if (isDark) {
    document.body.classList.remove("theme_light");
    document.body.classList.add("theme_dark");
    themeIcon.textContent = "light_mode";
  } else {
    document.body.classList.remove("theme_dark");
    document.body.classList.add("theme_light");
    themeIcon.textContent = "dark_mode";
  }

  if (!localIsAuth) {
    authPopup.open();
  } else {
    welcomePopup.open();
    setTimeout(() => {
      welcomePopup.close();
    }, 1500);
  }

  popupName.textContent = localName ? localName : value;
});

theme.addEventListener("click", () => {
  isDark = !isDark;
  if (isDark) {
    document.body.classList.remove("theme_light");
    document.body.classList.add("theme_dark");
    localStorage.setItem("isDark", JSON.stringify(isDark));
    themeIcon.textContent = "light_mode";
  } else {
    document.body.classList.remove("theme_dark");
    document.body.classList.add("theme_light");
    localStorage.setItem("isDark", JSON.stringify(isDark));
    themeIcon.textContent = "dark_mode";
  }
});

popupForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const value = popupInput.value;
  popupName.textContent = value;
  localStorage.setItem("isAuth", JSON.stringify(true));
  -localStorage.setItem("name", JSON.stringify(value));
  authPopup.close();
  welcomePopup.open();
  setTimeout(() => {
    welcomePopup.close();
  }, 1500);
});
