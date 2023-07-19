//Button
const btn = document.getElementById('btn');
//Inputs (for the values)
const day = document.getElementById('day');
const month = document.getElementById('month');
const year = document.getElementById('year');
//Spans for the result
const dayTxt = document.getElementById('days-txt');
const yearTxt = document.getElementById('years-txt');
const monthTxt = document.getElementById('months-txt');
//Error messages under inputs
const errorMsg = document.querySelectorAll("#error-message");
//Inputs(for error handling)
const inputs = [day, month, year];
//Labels
const labels = document.querySelectorAll('#label');

let inputIndex = [1, 2, 3];
let goodInputs = [];
let placeOfEmptyInput = [];



const longMonths = ["01", "03", "05", "07", "08", "10", "12"]

btn.addEventListener('click', () => {
    if (formValidation(inputs[0].value, inputs[1].value, inputs[2].value)) {
        ageCalculation(inputs[0].value, inputs[1].value, inputs[2].value)
    }
})
function ageCalculation(day, month, year) {

    var today = new Date();
    var birthDate = new Date(month + "/" + day + "/" + year);

    var years;
    if (today.getMonth() > birthDate.getMonth() || (today.getMonth() == birthDate.getMonth() && today.getDate() >= birthDate.getDate())) {
        years = today.getFullYear() - birthDate.getFullYear();
    }
    else {
        years = today.getFullYear() - birthDate.getFullYear() - 1;
    }

    var months;
    if (today.getDate() >= birthDate.getDate()) {
        months = today.getMonth() - birthDate.getMonth();
    }
    else if (today.getDate() < birthDate.getDate()) {
        months = today.getMonth() - birthDate.getMonth() - 1;
    }
    months = months < 0 ? months + 12 : months;


    var days;
    var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (today.getDate() >= birthDate.getDate()) {
        days = today.getDate() - birthDate.getDate();
    } else {
        days = today.getDate() - birthDate.getDate() + monthDays[birthDate.getMonth()];
    }
    dayTxt.innerHTML = days;
    monthTxt.innerHTML = months;
    yearTxt.innerHTML = years;

}
function formValidation(day, month, year) {

    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value == "") {
            placeOfEmptyInput.push(i);
        }
    }
    if (placeOfEmptyInput.length != 0) {
        console.log(placeOfEmptyInput)
        placeOfEmptyInput.forEach(index => {
            errorInputsOne(index, "This field is required");

        });
        placeOfEmptyInput = [];
        return false;
    } else {
        for (let i = 0; i < inputs.length; i++) {
            inputsValid(i);
        }
    }

    if (isWrongInputs().length != 0) {
        isWrongInputs().forEach(i => {
            inputsValid(i);
            switch (i) {
                case 0:
                    errorInputsOne(0, "Must be a valid day")
                    break;

                case 1:
                    errorInputsOne(1, "Must be a valid month")
                    break;
                case 2:
                    if (year > new Date().getFullYear()) {
                        errorInputsOne(2, "Must be in the past")
                    } else {
                        errorInputsOne(2, "Must be a above 1900")
                    }
                    break;
            }

        })
        return false;
    }


    if (!longMonths.includes(month.toString()) && day == 31) {
        errorInputsAll("Must be a valid date");
        return false;
    } else if (month.toString() === "02" && day >= 29) {
        if (year % 4 === 0 && day == 29) {
            for (let i = 0; i < inputs.length; i++) {
                inputsValid(i)
            }
        } else {
            errorInputsAll("Must be a valid date");
            return false;
        }
    }
    else {
        for (let i = 0; i < inputs.length; i++) {
            inputsValid(i)
        }

    }
    return true;
}

function errorInputsOne(i, errorTxt) {
    inputs[i].classList.remove('input');
    inputs[i].classList.add('input-error');
    labels[i].classList.remove("label");
    labels[i].classList.add("label-error");

    errorMsg[i].classList.remove('none');
    errorMsg[i].classList.add("error-text");
    errorMsg[i].innerHTML = errorTxt;

}
function errorInputsAll(errorTxt) {
    inputs.forEach(input => {
        input.classList.remove('input');
        input.classList.add('input-error')
    });
    labels.forEach(label => {
        label.classList.remove("label");
        label.classList.add("label-error")
    })
    errorMsg[0].classList.remove('none');
    errorMsg[0].classList.add("error-text");
    errorMsg[0].innerHTML = errorTxt;
}

function inputsValid(i) {
    inputs[i].classList.remove('input-error');
    inputs[i].classList.add('input');
    labels[i].classList.remove("label-error");
    labels[i].classList.add("label");
    errorMsg[i].classList.remove('error-text');
    errorMsg[i].classList.add("none");
}

function isWrongInputs() {
    let wrongInputs = []

    if (inputs[0].value > 31 || inputs[0].value < 0) {
        console.log(day > 31 || day < 0)
        wrongInputs.push(0)
    }
    if (inputs[1].value > 12 || inputs[1].value < 1) {
        wrongInputs.push(1)
    }
    if (inputs[2].value < 1920 || inputs[0].value > new Date().getFullYear()) {
        wrongInputs.push(2)
    }
    return wrongInputs;
}