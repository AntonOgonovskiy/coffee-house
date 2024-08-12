import cardList from "../../assets/cardList.js";

const menuContainer = document.querySelector(".menu-cards");
const coffeeBtn = document.getElementById("coffee");
const teaBtn = document.getElementById("tea");
const dessertBtn = document.getElementById("dessert");
const btns = document.querySelectorAll(".menu-button-wrapper");
const menuUpd = document.querySelector(".menu-upd");

window.addEventListener("load", showCards);

function createCard(item) {
  const card = document.createElement("div");
  const container = document.createElement("div");
  const text = document.createElement("div");
  card.classList.add("menu-card");
  container.classList.add("menu-card-container");
  text.classList.add("menu-card-text");
  let img = document.createElement("img");
  let name = document.createElement("p");
  let descr = document.createElement("p");
  let price = document.createElement("p");
  img.setAttribute("src", item.img);
  img.setAttribute("alt", "img");
  img.classList.add("menu-card-img");
  name.classList.add("menu-card-header");
  descr.classList.add("menu-card-descr");
  price.classList.add("menu-card-price");
  name.innerText = item.name;
  descr.innerText = item.description;
  price.innerText = item.price;
  container.appendChild(img);
  text.appendChild(name);
  text.appendChild(descr);
  text.appendChild(price);
  card.appendChild(container);
  card.appendChild(text);
  card.setAttribute("id", item.name);
  return card;
}

let typeOfProduct = {
  value: "coffee",

  get type() {
    return this.value;
  },

  set type(value) {
    this.value = value;
  },
};

function showCards() {
  const type = typeOfProduct.type;
  let itemsList = cardList.filter((item) => item.category === type);
  if (window.innerWidth <= 768 && itemsList.length > 4) {
    itemsList = itemsList.slice(0, 4);
    itemsList.forEach((item) => {
      const card = createCard(item);
      menuContainer.appendChild(card);
    });
    menuUpd.classList.remove("hide");
  } else {
    itemsList.forEach((item) => {
      const card = createCard(item);
      menuContainer.appendChild(card);
    });
    menuUpd.classList.add("hide");
  }
  makeBtnInactive();
}

function updItemList() {
  const type = typeOfProduct.type;
  const existCards = [];
  menuContainer.childNodes.forEach((item) => existCards.push(item.id));
  let itemsList = cardList.filter(
    (item) => item.category === type && !existCards.includes(item.name)
  );
  itemsList.forEach((item) => {
    const card = createCard(item);
    menuContainer.appendChild(card);
  });
  menuUpd.classList.add("hide");
}

function makeBtnInactive() {
  makeBtnActive();
  const btn = document.getElementById(typeOfProduct.type);
  btn.classList.add("menu-button-wrapper-inactive");
  let classList = "classList" in btn;
  for (let i = 0; i < btn.children.length; i++) {
    let child = btn.children[i];
    if (child.tagName == "IMG") {
      child.classList.add("menu-button-img-inactive");
    } else {
      child.classList.add("menu-button-inactive");
    }
  }
}

function makeBtnActive() {
  btns.forEach((btn) => {
    btn.classList.remove("menu-button-wrapper-inactive");
    let classList = "classList" in btn;
    for (let i = 0; i < btn.children.length; i++) {
      let child = btn.children[i];
      if (child.tagName == "IMG") {
        child.classList.remove("menu-button-img-inactive");
      } else {
        child.classList.remove("menu-button-inactive");
      }
    }
  });
}

function resizeUpdItemList() {
  const type = typeOfProduct.type;
  const existCards = [];
  menuContainer.childNodes.forEach((item) => existCards.push(item.id));
  if (window.innerWidth > 768) {
    let itemsList = cardList.filter(
      (item) => item.category === type && !existCards.includes(item.name)
    );
    itemsList.forEach((item) => {
      const card = createCard(item);
      menuContainer.appendChild(card);
    });
    menuUpd.classList.add("hide");
  } else if (window.innerWidth <= 768 && existCards.length > 4) {
    for (let i = existCards.length; i > 4; i--) {
      menuContainer.lastChild.remove();
    }
    menuUpd.classList.remove("hide");
  }
}
function debounce(func) {
  var timer;
  return function (event) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(func, 100, event);
  };
}

coffeeBtn.addEventListener("click", (e) => {
  typeOfProduct.type = "coffee";
  menuContainer.innerHTML = "";
  showCards();
});
teaBtn.addEventListener("click", () => {
  typeOfProduct.type = "tea";
  menuContainer.innerHTML = "";
  showCards();
});
dessertBtn.addEventListener("click", () => {
  typeOfProduct.type = "dessert";
  menuContainer.innerHTML = "";
  showCards();
});
menuUpd.addEventListener("click", updItemList);
window.addEventListener("resize", debounce(resizeUpdItemList));

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
  if (nav.classList.contains("open")) {
    nav.classList.remove("open");
    body.classList.remove("scroll");
    burgerLineBottom.classList.remove("burger-line-bottom-open");
    burgerLineTop.classList.remove("burger-line-top-open");
    menuIcon.classList.remove("openMenuIcon");
  }
});

/*---   popup   ---*/

const card = document.querySelectorAll(".menu-card");
const popup = document.querySelector(".popup");
const popupContent = document.querySelector(".popup-content");
const popImg = document.querySelector(".popup-img");
const popTitle = document.querySelector(".popup-title");
const popText = document.querySelector(".popup-text");
const sizeS = document.getElementById("size_s");
const sizeM = document.getElementById("size_m");
const sizeL = document.getElementById("size_l");
const addit1 = document.getElementById("addit_1");
const addit2 = document.getElementById("addit_2");
const addit3 = document.getElementById("addit_3");
const price = document.getElementById("price");
const popClose = document.querySelector(".popup-close");
const popBody = document.querySelector(".popup-body");

function openPopup(event) {
  let target = event.target.closest(".menu-card");
  let data;
  if (target?.id) {
    data = cardList.filter((item) => item.name === target.id)[0];
    popup.classList.add("pop-visibility");
    popupContent.classList.add("pop-open");
    body.classList.add("scroll");
  }
  createPopup(data);
}

function createPopup(data) {
  popImg?.setAttribute("src", data.img);
  popTitle.innerText = data.name;
  popText.innerText = data.description;
  sizeS.innerText = data.sizes.s.size;
  const sWrapper = sizeS.closest(".menu-button-wrapper");
  sWrapper.classList.add("menu-button-wrapper-inactive");
  for (let i = 0; i < sWrapper.children.length; i++) {
    let child = sWrapper.children[i];
    if (child.classList.contains("menu-button-img")) {
      child.classList.add("menu-button-img-inactive");
    } else {
      child.classList.add("menu-button-inactive");
    }
  }
  sizeM.innerText = data.sizes.m.size;
  sizeL.innerText = data.sizes.l.size;
  addit1.innerText = data.additives[0].name;
  addit2.innerText = data.additives[1].name;
  addit3.innerText = data.additives[2].name;
  price.innerText = `$${data.price}`;
}

function closePopup(e) {
  if (
    e.target.closest(".popup-content") !== popupContent ||
    e.target === popClose
  ) {
    popup.classList.remove("pop-visibility");
    popupContent.classList.remove("pop-open");
    body.classList.remove("scroll");
    popImg.setAttribute("src", "");
    popTitle.innerText = "";
    popText.innerText = "";
    sizeS.innerText = "";
    sizeM.innerText = "";
    sizeL.innerText = "";
    addit1.innerText = "";
    addit2.innerText = "";
    addit3.innerText = "";
    price.innerText = "";
    const currentBtnWrapper = document
      .querySelector(".popup-content")
      .querySelectorAll(".menu-button-wrapper-inactive");
    const currentBtnImg = document
      .querySelector(".popup-content")
      .querySelectorAll(".menu-button-img-inactive");
    const currentBtn = document
      .querySelector(".popup-content")
      .querySelectorAll(".menu-button-inactive");
    try {
      currentBtnWrapper.forEach((item) => {
        item.classList.remove("menu-button-wrapper-inactive");
      });
      currentBtnImg.forEach((item) => {
        item.classList.remove("menu-button-img-inactive");
      });
      currentBtn.forEach((item) => {
        item.classList.remove("menu-button-inactive");
      });
    } catch (e) {}
  }
}

function changeSize(e) {
  const attr = e.target.closest(".menu-button-wrapper").getAttribute("id");
  if (attr === "btn_size_s" || attr === "btn_size_m" || attr === "btn_size_l") {
    const popName = e.target
      .closest(".popup-content")
      .querySelector(".popup-title").innerText;
    const popItem = cardList.filter((item) => item.name === popName)[0];
    let currentPrice = price.innerText.slice(1);
    const currentAllowanceSize = e.target
      .closest(".popup-content")
      .querySelector(".menu-button-wrapper-inactive").id;
    const currentAllowance =
      popItem.sizes[currentAllowanceSize[currentAllowanceSize.length - 1]][
        "add-price"
      ];
    const nextAllowance = popItem.sizes[attr[attr.length - 1]]["add-price"];
    currentPrice = (
      +currentPrice -
      +currentAllowance +
      +nextAllowance
    ).toString();
    if (currentPrice.length < 2) {
      currentPrice = `$${currentPrice}.00`;
    } else {
      currentPrice = `$${currentPrice}0`;
    }
    price.innerText = currentPrice;
    changeInactiveStyle(e);
  }
}

function addAddictives(e) {
  const attr = e.target.closest(".menu-button-wrapper").getAttribute("id");
  if (
    attr === "btn_addit_0" ||
    attr === "btn_addit_1" ||
    attr === "btn_addit_2"
  ) {
    let currentPrice = price.innerText.slice(1);
    if (
      !e.target
        .closest(".menu-button-wrapper")
        .classList.contains("menu-button-wrapper-inactive")
    ) {
      e.target
        .closest(".menu-button-wrapper")
        .classList.add("menu-button-wrapper-inactive");
      e.target
        .closest(".menu-button-wrapper")
        .querySelector(".menu-button-img")
        .classList.add("menu-button-img-inactive");
      e.target
        .closest(".menu-button-wrapper")
        .querySelector(".menu-button")
        .classList.add("menu-button-inactive");
      currentPrice = (+currentPrice + 0.5).toString();
      if (currentPrice.length < 2) {
        currentPrice = `$${currentPrice}.00`;
      } else {
        currentPrice = `$${currentPrice}0`;
      }
      price.innerText = currentPrice;
    } else if (
      e.target
        .closest(".menu-button-wrapper")
        .classList.contains("menu-button-wrapper-inactive")
    ) {
      e.target
        .closest(".menu-button-wrapper")
        .classList.remove("menu-button-wrapper-inactive");
      e.target
        .closest(".menu-button-wrapper")
        .querySelector(".menu-button-img")
        .classList.remove("menu-button-img-inactive");
      e.target
        .closest(".menu-button-wrapper")
        .querySelector(".menu-button")
        .classList.remove("menu-button-inactive");
      currentPrice = (+currentPrice - 0.5).toString();
      if (currentPrice.length < 2) {
        currentPrice = `$${currentPrice}.00`;
      } else {
        currentPrice = `$${currentPrice}0`;
      }
      price.innerText = currentPrice;
    }
  }
}

function changeInactiveStyle(e) {
  const currentBtnWrapper = e.target
    .closest(".popup-content")
    .querySelector(".menu-button-wrapper-inactive");
  const currentBtnImg = e.target
    .closest(".popup-content")
    .querySelector(".menu-button-img-inactive");
  const currentBtn = e.target
    .closest(".popup-content")
    .querySelector(".menu-button-inactive");
  const nextBtnWrapper = e.target.closest(".menu-button-wrapper");
  const nextBtnImg = nextBtnWrapper.querySelector(".menu-button-img");
  const nextBtn = nextBtnWrapper.querySelector(".menu-button");
  currentBtnWrapper.classList.remove("menu-button-wrapper-inactive");
  currentBtnImg.classList.remove("menu-button-img-inactive");
  currentBtn.classList.remove("menu-button-inactive");
  nextBtnWrapper.classList.add("menu-button-wrapper-inactive");
  nextBtnImg.classList.add("menu-button-img-inactive");
  nextBtn.classList.add("menu-button-inactive");
}

menuContainer.addEventListener("click", openPopup);
popClose.addEventListener("click", closePopup);
popBody.addEventListener("click", closePopup);
btns.forEach((item) => {
  item.addEventListener("click", changeSize);
  item.addEventListener("click", addAddictives);
});
