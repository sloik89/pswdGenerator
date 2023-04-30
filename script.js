const bars = document.querySelectorAll(".bars");
const sliderValue = document.getElementById("sliderValue");
const checkboxes = document.querySelectorAll("input[type=checkbox]");
const slider = document.getElementById("slider");
const rangeInputs = document.getElementById('input[type="range"]');
const generateBtn = document.getElementById("generateBtn");
const copyIcon = document.getElementById("copyIcon");
const fieldText = document.querySelector(".fieldText");
const pswdMessage = document.getElementById("levelTxt");
sliderValue.innerText = slider.value;
// Default checkboxes is empty
checkboxes.forEach((elem) => {
  if (!elem.checked) {
    const icon = elem.nextElementSibling.querySelector("img");
    icon.style.display = "none";
  }
});
// set color on 2 bars
bars.forEach((elem, id) => {
  if (id < 2) {
    elem.classList.add("toWeak");
  }
});

slider.addEventListener("change", (e) => {
  const rangeValue = Number(e.target.value);
  sliderValue.innerText = rangeValue;

  const min = Number(e.target.min);
  const max = Number(e.target.max);
  // handle the fill up range
  slider.style.backgroundSize =
    ((rangeValue - min) * 100) / (max - min) + "% 100%";
  handleTheRange(rangeValue);
});
// display custom checkboxes on click
checkboxes.forEach((elem) => {
  elem.addEventListener("click", (e) => {
    const icon = elem.nextElementSibling.querySelector("img");

    if (e.target.checked) {
      icon.style.display = "block";
    } else {
      icon.style.display = "none";
    }
  });
});

generateBtn.addEventListener("click", (e) => {
  lengthPswd = Number(slider.value);
  const checkbox = [...document.querySelectorAll("input[type='checkbox']")];

  const options = checkbox.reduce((acc, elem) => {
    if (elem.checked) {
      acc.push(elem.name);
    }
    return acc;
  }, []);
  if (options.length === 0) {
    document.querySelector(".alert").style.display = "block";
    setTimeout(() => {
      document.querySelector(".alert").style.display = "none";
    }, 2000);
    return;
  }

  const numbers = "01234567890";
  const letters = "ABCDEFGHIJKLMNOPRSTUWXZQ";
  const minLetters = "abcdefghijklmnoperstuwyqzxv";
  const symbols = "`!@#$%^&*()_+<>?/|";
  let chars = "";
  if (options.includes("includeUppercase")) {
    chars += letters;
  }
  if (options.includes("includeLowercase")) {
    chars += minLetters;
  }
  if (options.includes("includeNumbers")) {
    chars += numbers;
  }
  if (options.includes("includeSymbols")) {
    chars += symbols;
  }
  let password = "";

  const array = new Uint32Array(lengthPswd);
  window.crypto.getRandomValues(array);

  for (let i = 0; i < lengthPswd; i++) {
    password += chars[array[i] % chars.length];
  }
  fieldText.innerText = password;
});
// copy to clipboard
copyIcon.addEventListener("click", (e) => {
  navigator.clipboard.writeText(fieldText.innerText);
  document.getElementById("copyMsg").style.display = "block";
  setTimeout(() => {
    document.getElementById("copyMsg").style.display = "none";
  }, 2000);
});

const handleTheRange = (range) => {
  if (range < 7) {
    pswdMessage.innerText = "to weak!";
    bars.forEach((elem, idx) => {
      if (idx === 0) {
        elem.classList.remove("toWeak", "weak", "medium", "strong");
        elem.classList.add("toWeak");
      } else {
        elem.classList.remove("toWeak", "weak", "medium", "strong");
      }
    });
  }
  if (range > 7 && range <= 9) {
    pswdMessage.innerText = "weak";
    bars.forEach((elem, idx) => {
      if (idx < 2) {
        elem.classList.remove("toWeak", "weak", "medium", "strong");
        elem.classList.add("toWeak");
      } else {
        elem.classList.remove("toWeak", "weak", "medium", "strong");
      }
    });
  }
  if (range > 9 && range < 12) {
    pswdMessage.innerText = "medium";
    bars.forEach((elem, idx) => {
      if (idx < 3) {
        elem.classList.remove("toWeak", "weak", "medium", "strong");
        elem.classList.add("medium");
      } else {
        elem.classList.remove("toWeak", "weak", "medium", "strong");
      }
    });
  }
  if (range >= 12) {
    pswdMessage.innerText = "strong";
    bars.forEach((elem, idx) => {
      elem.classList.remove("toWeak", "weak", "medium", "strong");
      elem.classList.add("strong");
    });
  }
};
