import "./index.scss";

const button = document.querySelector(".lines");

button.addEventListener("click", () => {
  button.classList.add("animate");
  button.classList.toggle("active");
});
