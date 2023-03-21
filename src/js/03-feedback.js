import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

function onPageReload() {
  if (localStorage.getItem(STORAGE_KEY)) {
    formEl.elements.email.value =
      JSON.parse(localStorage.getItem(STORAGE_KEY)).email || '';
    formEl.elements.message.value =
      JSON.parse(localStorage.getItem(STORAGE_KEY)).message || '';
  }
}

onPageReload();

formEl.addEventListener('submit', onFormSubmit);

formEl.addEventListener('input', throttle(onInputChange, 500));

const feedbackValues =
  JSON.parse(localStorage.getItem('feedback-form-state')) || {};

function onInputChange(e) {
  feedbackValues[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbackValues));
}

function onFormSubmit(e) {
  e.preventDefault();
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  console.log(feedbackValues);
}
