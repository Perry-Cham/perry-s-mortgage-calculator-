const form = document.querySelector("form");
const figures = document.querySelectorAll(".number")
const clearbtn = document.querySelector(".clear-btn")
let TotalRepayment;
let installment;
const installmentDisp = document.querySelector(".repayment")
const totalDisp = document.querySelector(".total")
const results = document.querySelectorAll(".results")
const initial = document.querySelectorAll(".initial")
const radioBtn = document.querySelectorAll(".radio")
const errorDisplay = document.querySelector(".error")



form.addEventListener("submit", (e) => {
  e.preventDefault();
  clearbtn.addEventListener("click", () => clear())

  figures.forEach((input) => {
    input.addEventListener("input", () => {
      cleanUp(input)
    })
  })

  main();
})

function main() {

  //Validate the input fields
  if (validate(figures[0], !figures[0].value, "This field is requires", document.querySelector(".error.one"))) return;
  if (validate(figures[1], !figures[1].value, "This field is required",
    document.querySelector(".error.two"))) return;
  if (validate(figures[2], !figures[2].value, "This field is required",
    document.querySelector(".error.three"))) return;


  const principal = figures[0].value
  let interest = figures[2].value
  let period = figures[1].value


  //Calculate interest and Convert Period
  let monthlyInterest = (interest / 100) / 12;
  let periodInMonths = period * 12;

  calculate(principal, monthlyInterest, periodInMonths);



  if (installment > 0) {
    for (let i = 0; i < initial.length; i++) {
      initial[i].classList.remove("show")
    }
    results[0].classList.add("show")
    results[1].classList.add("show")
    installment = format(installment)
    installmentDisp.innerHTML = '£' + installment;

    TotalRepayment = format(TotalRepayment)
    totalDisp.innerHTML = '£' + TotalRepayment;
  }
}

function calculate(principal, interest, period) {
  let numerator = interest * ((1 + interest) ** period)
  let denominator = ((1 + interest) ** period) - 1;
  installment = principal * (numerator / denominator);

  TotalRepayment = installment * period;
  installment = installment.toFixed(2)
  TotalRepayment = TotalRepayment.toFixed(2)
}

function format(string) {
  return Intl.NumberFormat().format(string);
}

function validate(element, condition, message, errorTag) {
  if (condition) {
    element.classList.add("e-m", "input-error")
    element.parentNode.querySelector(".form-p").classList.add("error-p")
    console.log(element.parentNode);
    errorTag.classList.add("show")
    errorTag.innerHTML = message;
    return true
  } else return false;
}

function cleanUp(child) {
  console.log(child);
  child.classList.remove("e-m", "input-error")
  child.parentNode.querySelector(".form-p").classList.remove("error-p")
  child.parentNode.querySelector(".error").classList.remove("show")
}

function clear() {

  figures.forEach((input) => {
    cleanUp(input)
    input.value = "";
  })
  results.forEach((child) => {
    child.classList.remove("show")
  })
  initial.forEach((child) => {
    child.classList.add("show")
  })
}