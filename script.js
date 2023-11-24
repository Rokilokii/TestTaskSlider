window.onload = () => {
  setArea();
};
const rangeInput = document.querySelectorAll(".range-input input");
const priceInput = document.querySelectorAll(".price-input input");
const range = document.querySelector(".slider .progress");
let priceGap = 100;
const priceInputMin = document.querySelector(".price-input__min");
const priceInputMax = document.querySelector(".price-input__max");
const minVal = document.querySelector(".range-input__min");
const maxVal = document.querySelector(".range-input__max");
let sliderMaxValue = parseInt(maxVal.max);

let newSliderMaxValue = rangeInput[0].dataset.max;
sliderMaxValue = newSliderMaxValue;

priceInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minPrice = parseInt(priceInput[0].value),
      maxPrice = parseInt(priceInput[1].value);

    if (maxPrice - minPrice >= priceGap) {
      if (e.target.className === "price-input__min") {
        rangeInput[0].value = minPrice;
        range.style.left = (minPrice / rangeInput[0].max) * 100 + "%";
      } else {
        rangeInput[1].value = maxPrice;
        range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
        if (maxPrice >= rangeInput[1].max) {
          range.style.right = "0%";
        }
      }
    }
  });
});

function setArea() {
  priceInputMin.value = minVal.value;
  priceInputMax.value = maxVal.value;
  range.style.left = (minVal.value / sliderMaxValue) * 100 + "%";
  range.style.right = 100 - (maxVal.value / sliderMaxValue) * 100 + "%";
}

rangeInput.forEach((input) => {
  input.max = newSliderMaxValue;
  input.addEventListener("input", (e) => {
    let minVal = parseInt(rangeInput[0].value);
    let maxVal = parseInt(rangeInput[1].value);

    if (maxVal - minVal < priceGap) {
      if (e.target.className === "range-input__min") {
        rangeInput[0].value = maxVal - priceGap;
      } else {
        rangeInput[1].value = minVal + priceGap;
      }
    } else {
      setArea();
    }
  });
});
