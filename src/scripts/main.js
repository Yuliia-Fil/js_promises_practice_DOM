'use strict';

const firstPromise = new Promise((resolve, reject) => {
  let notClicked = true;

  setTimeout(() => {
    if (notClicked) {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('First promise was rejected');
    }
  }, 3000);

  document.addEventListener('click', () => {
    notClicked = false;
    resolve('First promise was resolved');
  });
});

const secondPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('click', () => {
    leftClick = true;

    if (leftClick || rightClick) {
      resolve('Second promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClick = true;

    if (leftClick || rightClick) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('click', () => {
    leftClick = true;

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClick = true;

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

function successHandler(successMessage) {
  const body = document.querySelector('body');
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add('success');
  div.textContent = successMessage;
  body.append(div);
}

function errorHandler(errorMessage) {
  const body = document.querySelector('body');
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add('error');
  div.textContent = errorMessage;
  body.append(div);
}

[firstPromise, secondPromise, thirdPromise].forEach((pr) => {
  pr.then(successHandler).catch(errorHandler);
});
