for (let i = 0; i < 500; i++) {
  const el = document.querySelector(".number");
  const elValue = Number(el.getAttribute("data-value"));
  let counter = 0;

  setInterval(() => {
    if (counter !== elValue) {
      counter++;
      el.innerHTML = `${counter}%`;
    }
    if (counter === 100) {
      counter = 0;
      el.setAttribute("data-value", 0);
    }
  }, 80);
}
