/*---   carousel   ---*/

const carouselBtnLeft = document.getElementById("leftBtn");
const carouselBtnRight = document.getElementById("rightBtn");
const carousel = document.getElementById("carousel");
const carouselContainer = document.querySelector(".carousel-wrapper");
const carouselControlItem = document.querySelectorAll(
  ".carousel-control-item-active"
);
let carouselNumber = 1;
let click = false;
let pause = false;

const coffee = [
  {
    name: "S’mores Frappuccino",
    description:
      "This new drink takes an espresso and mixes it with brown sugar and cinnamon before being topped with oat milk.",
    price: "$5.50",
    img: "../../assets/svg/coffee-slider-1.png",
  },
  {
    name: "Caramel Macchiato",
    description:
      "Fragrant and unique classic espresso with rich caramel-peanut syrup, with cream under whipped thick foam.",
    price: "$5.00",
    img: "../../assets/svg/coffee-slider-2.png",
  },
  {
    name: "Ice coffee",
    description:
      "A popular summer drink that tones and invigorates. Prepared from coffee, milk and ice.",
    price: "$4.50",
    img: "../../assets/svg/coffee-slider-3.png",
  },
];

window.addEventListener("load", () => {
  const card = createCard(carouselNumber);
  carousel.appendChild(card);
  progress();
});

function createCard(n) {
  const card = document.createElement("div");
  card.classList.add("main-favorite-card");
  let img = document.createElement("img");
  let name = document.createElement("p");
  let descr = document.createElement("p");
  let price = document.createElement("p");
  img.setAttribute("src", coffee[n - 1].img);
  img.setAttribute("alt", "img");
  img.setAttribute("draggable", "false");
  img.classList.add("main-favorite-img");
  name.classList.add("main-favorite-card-name");
  descr.classList.add("main-favorite-card-descr");
  price.classList.add("main-favorite-card-name");
  name.innerText = coffee[n - 1].name;
  descr.innerText = coffee[n - 1].description;
  price.innerText = coffee[n - 1].price;
  card.appendChild(img);
  card.appendChild(name);
  card.appendChild(descr);
  card.appendChild(price);
  return card;
}

function moveLeft() {
  click = true;
  carouselBtnLeft.removeEventListener("click", moveLeft);
  carouselBtnRight.removeEventListener("click", moveRight);
  carousel.removeEventListener("mousedown", mouseDown);
  carousel.removeEventListener("touchstart", touchDown);
  carouselContainer.removeEventListener("mouseup", mouseUp);
  carouselContainer.removeEventListener("touchend", touchUp);
  if (carouselNumber === 1) {
    carouselNumber = 3;
  } else {
    carouselNumber = carouselNumber - 1;
  }
  const card = createCard(carouselNumber);
  carousel.prepend(card);
  carousel.classList.add("left");
}

function moveRight() {
  click = true;
  carouselBtnLeft.removeEventListener("click", moveLeft);
  carouselBtnRight.removeEventListener("click", moveRight);
  carousel.removeEventListener("mousedown", mouseDown);
  carousel.removeEventListener("touchstart", touchDown);
  carouselContainer.removeEventListener("mouseup", mouseUp);
  carouselContainer.removeEventListener("touchend", touchUp);
  if (carouselNumber === 3) {
    carouselNumber = 1;
  } else {
    carouselNumber = carouselNumber + 1;
  }
  const card = createCard(carouselNumber);
  carousel.appendChild(card);
  carousel.classList.add("right");
}

carousel.addEventListener("animationend", (animationEvent) => {
  if (
    animationEvent.animationName === "left" ||
    animationEvent.animationName === "left768"
  ) {
    carousel.removeChild(carousel.lastChild);
  } else if (
    animationEvent.animationName === "right" ||
    animationEvent.animationName === "right768" ||
    animationEvent.animationName === "right320"
  ) {
    carousel.removeChild(carousel.firstChild);
  }
  carousel.classList.remove("left");
  carousel.classList.remove("right");
  carouselBtnLeft.addEventListener("click", moveLeft);
  carouselBtnRight.addEventListener("click", moveRight);
  carousel.addEventListener("mousedown", mouseDown);
  carousel.addEventListener("touchstart", touchDown);
  carouselContainer.addEventListener("mouseup", mouseUp);
  carouselContainer.addEventListener("touchend", touchUp);
  progress();
});

carouselBtnLeft.addEventListener("click", moveLeft);
carouselBtnRight.addEventListener("click", moveRight);

function getActiveControl() {
  let activeItem;
  carouselControlItem.forEach((item) => {
    if (
      +item.getAttribute("id").split("_").splice(1, 2).join() === carouselNumber
    ) {
      activeItem = item;
    }
  });
  return activeItem;
}
function progress() {
  const item = getActiveControl();
  let length = 0;
  let timer = setInterval(() => {
    if (length < 100 && !click) {
      if (!pause) length++;
      item.style.width = `${Math.floor(length)}%`;
    } else {
      clearInterval(timer);
      item.style.width = 0;
      if (!click) {
        moveRight();
      }
      click = false;
      return false;
    }
  }, 50);
}
carousel.addEventListener("mouseenter", () => {
  pause = true;
});
carousel.addEventListener("mouseleave", () => {
  pause = false;
});

/*---   burger   ---*/

const burger = document.getElementById("burger");
const nav = document.querySelector(".headerLinks");
const links = document.querySelectorAll(".nav-li");
const burgerLineBottom = document.querySelector(".burger-line-bottom");
const burgerLineTop = document.querySelector(".burger-line-top");
const menuIcon = document.querySelector(".headerMenu");
const body = document.querySelector("body");

burger.addEventListener("click", () => {
  nav.classList.toggle("open");
  body.classList.toggle("scroll");
  burgerLineBottom.classList.toggle("burger-line-bottom-open");
  burgerLineTop.classList.toggle("burger-line-top-open");
  menuIcon.classList.toggle("openMenuIcon");
});

links.forEach((el) =>
  el.addEventListener("click", () => {
    nav.classList.remove("open");
    body.classList.remove("scroll");
    burgerLineBottom.classList.remove("burger-line-bottom-open");
    burgerLineTop.classList.remove("burger-line-top-open");
    menuIcon.classList.remove("openMenuIcon");
  })
);

nav.addEventListener("click", () => {
  nav.classList.remove("open");
  body.classList.remove("scroll");
  burgerLineBottom.classList.remove("burger-line-bottom-open");
  burgerLineTop.classList.remove("burger-line-top-open");
  menuIcon.classList.remove("openMenuIcon");
});

window.addEventListener("resize", () => {
  nav.classList.remove("open");
  body.classList.remove("scroll");
  burgerLineBottom.classList.remove("burger-line-bottom-open");
  burgerLineTop.classList.remove("burger-line-top-open");
  menuIcon.classList.remove("openMenuIcon");
});

/*---   drag carousel   ---*/

let outerContainer = carouselContainer.getBoundingClientRect();
let active = false;
let startX = 0;
let endX = 0;

carousel.addEventListener("mousedown", mouseDown);
carousel.addEventListener("touchstart", touchDown);
carouselContainer.addEventListener("mouseup", mouseUp);
carouselContainer.addEventListener("touchend", touchUp);

function mouseDown(e) {
  startX = e.clientX;
}

function touchDown(e) {
  e.preventDefault();
  startX = e.touches[0].clientX - outerContainer.left - carousel.offsetLeft;
  pause = true;
}

function mouseUp(e) {
  endX = e.clientX;
  if (startX > endX && startX - endX >= 50) {
    moveRight();
  } else if (startX < endX && endX - startX >= 50) {
    moveLeft();
  }
  carousel.removeEventListener("mousedown", mouseDown);
  carousel.removeEventListener("touchstart", touchDown);
  carouselContainer.removeEventListener("mouseup", mouseUp);
  carouselContainer.removeEventListener("touchend", touchUp);
}

function touchUp(e) {
  pause = false;
  endX =
    e.changedTouches[0].clientX - outerContainer.left - carousel.offsetLeft;
  if (startX > endX && startX - endX >= 50) {
    carousel.removeEventListener("mousedown", mouseDown);
    carousel.removeEventListener("touchstart", touchDown);
    carouselContainer.removeEventListener("mouseup", mouseUp);
    carouselContainer.removeEventListener("touchend", touchUp);
    moveRight();
  } else if (startX < endX && endX - startX >= 50) {
    carousel.removeEventListener("mousedown", mouseDown);
    carousel.removeEventListener("touchstart", touchDown);
    carouselContainer.removeEventListener("mouseup", mouseUp);
    carouselContainer.removeEventListener("touchend", touchUp);
    moveLeft();
  }
}
