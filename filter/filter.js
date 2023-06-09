const data = [
  {
    id: 1,
    name: "Кофе растворимый Bushido Original, стеклянная банка, 100 г",
    img: "https://avatars.mds.yandex.net/get-mpic/4902598/img_id3380520081887581675.jpeg/600x800",
    price: 335,
    cat: "Растворимый",
  },
  {
    id: 11,
    name: "Кофе в зернах Fresco Arabica Blend, 1 кг",
    img: "https://avatars.mds.yandex.net/get-mpic/5323357/img_id2638679866852579182.jpeg/600x800",
    price: 616,
    cat: "В зёрнах",
  },
  {
    id: 2,
    name: "Кофе растворимый Nescafe Gold сублимированный с добавлением молотого, пакет, 320 г",
    img: "https://avatars.mds.yandex.net/get-mpic/4120716/img_id4199235586624124531.jpeg/600x800",
    price: 357,
    cat: "Растворимый",
  },
  {
    id: 3,
    name: "Кофе молотый Lavazza Crema e Gusto Classico, вакуумная упаковка, 250 г, вакуумная Superocean Heritage",
    img: "https://m.media-amazon.com/images/I/61hGDiWBU8L._AC_UY879_.jpg",
    price: 288,
    cat: "Молотый",
  },
  {
    id: 4,
    name: "Кофе в капсулах Nescafe Dolce Gusto Каппучино 16 кап , 1 уп.",
    img: "https://avatars.mds.yandex.net/get-mpic/4012462/img_id6564235945466849231.jpeg/600x800",
    price: 516,
    cat: "В капсулах",
  },
  {
    id: 5,
    name: "Кофе в зернах Senzaro Turino 1000 г, 100% арабика свежей обжарки",
    img: "https://avatars.mds.yandex.net/get-mpic/4490717/img_id6928901970289948191.jpeg/600x800",
    price: 996,
    cat: "В зёрнах",
  },
];

const productsContainer = document.querySelector(".products");
const searchInput = document.querySelector(".search");
const categoriesContainer = document.querySelector(".cats");
const priceRange = document.querySelector(".priceRange");
const priceValue = document.querySelector(".priceValue");

const displayProducts = (filteredProducts) => {
  productsContainer.innerHTML = filteredProducts.map((product) =>
    `
    <div class="product">
    <img src="${product.img}" alt="${product.name}" />
    <span class="name">${product.name}</span>
    <span class="priceText">${product.price}р</span>
    </div>
    `
  ).join('');
}
displayProducts(data);

searchInput.addEventListener('keyup', (e) => {
  const value = e.target.value.toLowerCase();

  if (value) {
    displayProducts(data.filter(item => item.name.toLowerCase().indexOf(value) !== -1))

  } else {
    displayProducts(data);
  }
});

const setCategories = () => {
  const allCats = data.map(item => item.cat)
  const categories = [ "Все", ...allCats.filter((item, index) => {
    return allCats.indexOf(item) === index;
  }) ];
  categoriesContainer.innerHTML = categories.map(cat =>
    `
    <span class="cat">${cat}</span>
    `
  ).join('');


  categoriesContainer.addEventListener('click', (e) => {
    const selectedCategory = e.target.textContent;

    selectedCategory === "Все" ? displayProducts(data) : displayProducts(data.filter(item => item.cat === selectedCategory))
  })
}

const setPrices = () => {
  const priceList = data.map(item => item.price);
  const minPrice = Math.min(...priceList);
  const maxPrice = Math.max(...priceList);

  priceRange.min = minPrice;
  priceRange.max = maxPrice;
  priceRange.value = minPrice;
  priceValue.textContent = minPrice + "Р";

  priceRange.addEventListener("input", (e) => {
    priceValue.textContent = e.target.value + "Р";
    displayProducts(data.filter(item => item.price <= e.target.value));
  })
}

setCategories();
setPrices();