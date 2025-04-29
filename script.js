'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const themeToggleButton = document.getElementById('theme-toggle');

  function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    themeToggleButton.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
  }

  themeToggleButton.addEventListener('click', toggleTheme);

  const buttons = document.querySelectorAll('.product-controls button');
  const products = document.querySelectorAll('.product-item');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-product');

      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      products.forEach(product => product.classList.add('hidden'));
      document.getElementById(targetId).classList.remove('hidden');
    });
  });

  document.getElementById('guessButton').addEventListener('click', function () {
    const userGuess = parseInt(document.getElementById('userGuess').value);
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    const resultText = document.getElementById('resultText');
    const gameResults = document.getElementById('gameResults');
    const userGuessDisplay = document.getElementById('userGuessDisplay');
    const winningNumberDisplay = document.getElementById('winningNumberDisplay');

    if (isNaN(userGuess) || userGuess < 1 || userGuess > 10) {
      resultText.textContent = '⛔ Please enter a valid number between 1 and 10.';
      resultText.style.color = 'red';
      gameResults.classList.remove('hidden');
      userGuessDisplay.textContent = '-';
      winningNumberDisplay.textContent = '-';
      return;
    }

    resultText.textContent = userGuess === randomNumber ? '🎉 YOU WIN!!' : '❌ Try Again!';
    resultText.style.color = userGuess === randomNumber ? 'green' : 'gray';

    userGuessDisplay.textContent = userGuess;
    winningNumberDisplay.textContent = randomNumber;
    gameResults.classList.remove('hidden');
  });

  document.getElementById('contact').addEventListener('submit', function (e) {
    e.preventDefault();

    ['nameError', 'methodError', 'emailError', 'phoneError', 'commentsError'].forEach(id => {
      document.getElementById(id).textContent = '';
    });

    const fullName = document.getElementById('fullName').value.trim();
    const contactMethod = document.querySelector('input[name="contactMethod"]:checked');
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const comments = document.getElementById('comments').value.trim();

    let valid = true;

    const nameRegex = /^[a-zA-Z\s]{2,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10,15}$/;

    if (!nameRegex.test(fullName)) {
      document.getElementById('nameError').textContent = 'Please enter a valid name.';
      valid = false;
    }

    if (!contactMethod) {
      document.getElementById('methodError').textContent = 'Please select a contact method.';
      valid = false;
    }

    if (contactMethod?.value === 'email' && !emailRegex.test(email)) {
      document.getElementById('emailError').textContent = 'Please enter a valid email.';
      valid = false;
    }

    if (contactMethod?.value === 'phone' && !phoneRegex.test(phone)) {
      document.getElementById('phoneError').textContent = 'Please enter a valid phone number (10-15 digits).';
      valid = false;
    }

    if (!comments) {
      document.getElementById('commentsError').textContent = 'Please enter your comments.';
      valid = false;
    }

    if (valid) {
      const user = {
        fullName,
        contactMethod: contactMethod.value,
        email: email || 'N/A',
        phone: phone || 'N/A',
        comments
      };

      document.getElementById('result').innerHTML = `
        <h3>Thank you for your submission!</h3>
        <p><strong>Name:</strong> ${user.fullName}</p>
        <p><strong>Preferred Contact Method:</strong> ${user.contactMethod}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Phone:</strong> ${user.phone}</p>
        <p><strong>Comments:</strong> ${user.comments}</p>
      `;

      document.getElementById('contact').reset();
    }
  });
});
