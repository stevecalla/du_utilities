const articles = document.querySelectorAll('.container');
const select = document.querySelector('select');

function updateDisplay() {
  articles.forEach((article) => {
    article.style.display = select.value;

    if (select.value === "remove-display") {
      console.log('yes')
      article.removeAttribute("style");
    };

  });
}

select.addEventListener('change', updateDisplay);

updateDisplay();