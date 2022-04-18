/**
 * Julian Rogers
 * 113 159 172
 * jrogers10@myseneca.ca
 *
 * WEB222 Final Assessment, Winter 2022
 *
 * webpage.js
 */

window.addEventListener('DOMContentLoaded', pageSetUp);

// called to set up the page once the DOM content is loaded.
//
function pageSetUp() {
  // console.log('dom content loaded');

  currentDate();
  formHideWork();
  radioBtnsSetUp();
  validateForm();
}

// updates the current date to the appropriate elements.
//
function currentDate() {
  const dateNow = new Date(Date.now()); // current date.
  const day =
    dateNow.getDate() < 10
      ? (dateNow.getDate() + '').padStart(2, '0')
      : dateNow.getDate();

  const month =
    dateNow.getMonth() < 10
      ? (dateNow.getMonth() + 1 + '').padStart(2, '0')
      : dateNow.getMonth();

  const dateStr = `${dateNow.getFullYear()}-${month}-${day}`; // yyyy/mm/dd.

  const time = document.querySelectorAll('.curr-date'); //time elements node list.

  for (let i = 0; i < time.length; ++i) {
    time[i].setAttribute('datetime', dateStr);
    time[i].innerText = '';
    time[i].innerText = dateStr;
  }
}

// hides the 'work' <div> holding the pay rate and company website field.
//
function formHideWork() {
  const workDiv = document.querySelector('#work');
  workDiv.setAttribute('hidden', '');

  const payRate = document.querySelector('#pay-rate');
  payRate.removeAttribute('required');
}

// reveals the 'work' <div> holding the pay rate and company website field.
//
function formShowWork() {
  const workDiv = document.querySelector('#work');
  workDiv.removeAttribute('hidden');

  const payRate = document.querySelector('#pay-rate');
  payRate.setAttribute('required', '');
}

// adds the appropriate click events to the radio buttons to handle the 'work' <div>.
//
function radioBtnsSetUp() {
  const radioBtns = document.querySelectorAll('.radio-btn');

  for (let i = 0; i < radioBtns.length; ++i) {
    if (radioBtns[i].value === 'hiring') {
      radioBtns[i].addEventListener('click', function (event) {
        formShowWork();
        event.stopPropagation();
      });
    } else {
      radioBtns[i].addEventListener('click', function (event) {
        formHideWork();
        event.stopPropagation();
      });
    }
  }
}

// validates a canadian postal code.
// pattern="^[a-zA-Z]\d[a-zA-Z][ -]\d[a-zA-Z]\d$".
//
function validPostalCode(postalCode) {
  const regex = /^[a-zA-Z]\d[a-zA-Z][ -]\d[a-zA-Z]\d$/; // postal code pattern.
  try {
    new String(postalCode);
    return regex.test(postalCode);
  } catch (err) {
    console.error(err);
    return false;
  }
}

// validates entered pay rate.
//
function validPay(pay) {
  try {
    parseInt(pay);
    return pay >= 0; // allowed pay of $0 in case of a pro-bono request.
  } catch (err) {
    console.error(err);
    return false;
  }
}

// form validation; stop the submission of the form if there is any problem with
// the user's entered values (or lack thereof).
//
function validateForm() {
  const form = document.querySelector('#contact-form');

  form.onsubmit = function (event) {
    const workDiv = document
      .querySelector('#contact-form')
      .getAttribute('hidden'); // to check if the pay field is hidden.

    // console.log(workDiv);

    if (!form.checkValidity()) {
      form.classList.add('was-validated');

      event.preventDefault();
      return false;
    }

    if (!validPostalCode(form.postcode.value)) {
      form.postcode.setCustomValidity('Enter a valid Canadian postal code.');
      form.classList.add('was-validated');

      form.postcode.oninput = function () {
        if (!validPostalCode(form.postcode.value)) {
          form.postcode.setCustomValidity(
            'Enter a valid Canadian postal code.'
          );
        } else {
          form.postcode.setCustomValidity('');
          form.postcode.oninput = null;
        }
      };

      event.preventDefault();
      // return false;
    }

    if (!workDiv && !validPay(form.pay.value)) {
      form.pay.setCustomValidity('$0 or greater.');
      form.classList.add('was-validated');

      form.pay.oninput = function () {
        if (!validPay(form.pay.value)) {
          form.pay.setCustomValidity('$0 or greater.');
        } else {
          form.pay.setCustomValidity('');
          form.pay.oninput = null;
        }
      };

      event.preventDefault();
      // return false;
    }

    // return true;
  };
}
