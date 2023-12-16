const container = document.querySelector(".container");
const title = document.querySelector(".content");
const explore = document.querySelector(".explore");

container.addEventListener("mousemove", (e) => {
  let xAxis = (window.innerWidth / 2 - e.pageX) / 100;
  let yAxis = (window.innerHeight / 2 - e.pageY) / 100;
  container.style.transform = `rotateY(${yAxis}deg) rotateX(${xAxis}deg)`;
});

container.addEventListener("mouseenter", (e) => {
  container.style.transition = "all 0.1s ease";

  //popout
  title.style.transform = "translateZ(100px)";
});

container.addEventListener("mouseleave", (e) => {
  container.style.transition = "all 0.5s ease";
  container.style.transform = `rotateY(0deg) rotateX(0deg)`;
  //popback
  title.style.transform = "translateZ(0px)";
});

explore.addEventListener("click", () => {
  window.location.href = "http://127.0.0.1:5500/src/Pages/Home.html";
});

let heading = document.querySelector(".heading");
let btn = document.querySelector(".btn-grp");
heading.addEventListener("mouseover", () => {
  btn.classList.add("active");
});
heading.addEventListener("mouseenter", () => {
  btn.classList.add("active");
});
heading.addEventListener("click", () => {
  btn.classList.add("active");
});

heading.addEventListener("mouseleave", () => {
  setTimeout(() => {
    btn.classList.remove("active");
  }, 3000);

  setTimeout(() => {
    console.log("dawd");
  }, 3000);
});
