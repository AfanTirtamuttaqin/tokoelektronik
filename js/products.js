const PRODUCTS = [
  {
    id: 1,
    name: "ASUS Vivobook 15",
    category: "laptop",
    price: 8499000,
    oldPrice: 9999000,
    discount: 15,
    image: "img/asus.jpg",
    rating: 5,
    stock: 12,
    description:
      "Laptop modern untuk pekerjaan, kuliah, dan kebutuhan produktivitas harian.",
  },
  {
    id: 2,
    name: "Samsung Galaxy A55",
    category: "smartphone",
    price: 5399000,
    oldPrice: 5999000,
    discount: 10,
    image: "img/samsung.jpg",
    rating: 5,
    stock: 20,
    description:
      "Smartphone dengan layar nyaman dan performa untuk aktivitas harian.",
  },
  {
    id: 3,
    name: "Sony WH-1000XM5",
    category: "audio",
    price: 4799000,
    oldPrice: 5999000,
    discount: 20,
    image: "img/sony wh.avif",
    rating: 5,
    stock: 8,
    description:
      "Headphone wireless dengan audio premium dan noise cancelling.",
  },
  {
    id: 4,
    name: "Apple Watch Series 9",
    category: "smartwatch",
    price: 6199000,
    oldPrice: 6999000,
    discount: 12,
    image: "img/apple.jpg",
    rating: 5,
    stock: 7,
    description:
      "Smartwatch modern untuk aktivitas, notifikasi, dan kebugaran.",
  },
  {
    id: 5,
    name: "Canon EOS R50",
    category: "camera",
    price: 10999000,
    oldPrice: 11999000,
    discount: 8,
    image: "img/cannon.webp",
    rating: 5,
    stock: 5,
    description:
      "Kamera mirrorless ringkas untuk foto dan video berkualitas tinggi.",
  },
  {
    id: 6,
    name: "Lenovo IdeaPad Slim 3",
    category: "laptop",
    price: 7299000,
    oldPrice: 8899000,
    discount: 18,
    image: "img/lenovo.jpg",
    rating: 4,
    stock: 10,
    description:
      "Laptop tipis dan praktis untuk belajar serta pekerjaan sehari-hari.",
  },
  {
    id: 7,
    name: "Xiaomi Redmi Note 14",
    category: "smartphone",
    price: 3299000,
    oldPrice: 3699000,
    discount: 10,
    image: "img/xiomi.webp",
    rating: 4,
    stock: 15,
    description:
      "Smartphone dengan layar luas, baterai tahan lama, dan performa responsif.",
  },
  {
    id: 8,
    name: "JBL Tune 770NC",
    category: "audio",
    price: 1299000,
    oldPrice: 1599000,
    discount: 19,
    image: "img/jbl.webp",
    rating: 5,
    stock: 18,
    description:
      "Headphone nyaman dengan koneksi wireless dan noise cancelling.",
  },
  {
    id: 9,
    name: "Amazfit Active",
    category: "smartwatch",
    price: 1799000,
    oldPrice: 2199000,
    discount: 18,
    image: "img/amazit.jpg",
    rating: 4,
    stock: 9,
    description: "Smartwatch ringan untuk olahraga dan aktivitas harian.",
  },
];

// FORMAT HARGA
function rupiah(n) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);
}

// LOCAL STORAGE - KERANJANG
function getCart() {
  return JSON.parse(
    localStorage.getItem("electroCart") || "[]"
);

}
function setCart(c) {
  localStorage.setItem(
    "electroCart", JSON.stringify(c));
  updateCartCount();
}

// JUMLAH ITEM DI ICON KERANJANG
function updateCartCount() {
  document.querySelectorAll(".cart-count")
    .forEach(
      (el) => (el.textContent = getCart().reduce((s, x) => s + x.qty, 0)),
    );
}

// TAMBAH PRODUK KE KERANJANG
function addToCart(id) {
  const p = PRODUCTS.find((x) => x.id === id),
    c = getCart(),
    item = c.find((x) => x.id === id);
  if (item) item.qty++;
  else c.push({ id: p.id, qty: 1 });
  setCart(c);
  toast(`${p.name} ditambahkan ke keranjang`);
}
function toast(msg) {
  let t = document.querySelector(".toast");
  if (!t) {
    t = document.createElement("div");
    t.className = "toast";
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2200);
}
// ======================================================
// CARD PRODUK
// ======================================================

function productCard(product) {
  const stars =
    "★".repeat(product.rating) +
    "☆".repeat(5 - product.rating);

  return `
    <article class="product-card">
      <div class="product-image">
        <img
          src="${product.image}"
          alt="${product.name}">
        <span class="discount">
          -${product.discount}%
        </span>
      </div>
      <div class="product-content">
        <span class="product-category">
          ${product.category}
        </span>
        <h3>
          ${product.name}
        </h3>
        <div class="rating">
          ${stars}
          <small>
            (${product.stock})
          </small>
        </div>
        <div class="price">
          <strong>
            ${rupiah(product.price)}
          </strong>

          <del>
            ${rupiah(product.oldPrice)}
          </del>
        </div>

        <div class="product-actions">

          <a
            class="detail-btn"
            href="product-detail.html?id=${product.id}" >
            Detail
          </a>
          <button
            class="add-cart"
            onclick="addToCart(${product.id})">
            <i class="fa-solid fa-cart-plus"></i>
            Keranjang
          </button>
        </div>
      </div>

    </article>
  `;
}

// MENAMPILKAN SEMUA PRODUK
function renderProducts() {
  const box = document.querySelector("#product-list");
  if (!box) return;
  const q = (
    document.querySelector("#product-search")?.value || ""
  ).toLowerCase();
  const cat =
    document.querySelector("#category-filter")?.value ||
    new URLSearchParams(location.search).get("category") ||
    "all";
  const sort = document.querySelector("#sort-filter")?.value || "default";
  let arr = PRODUCTS.filter(
    (p) =>
      (cat === "all" || p.category === cat) && p.name.toLowerCase().includes(q),
  );
  if (sort === "low") arr.sort((a, b) => a.price - b.price);
  if (sort === "high") arr.sort((a, b) => b.price - a.price);
  box.innerHTML = arr.length
    ? arr.map(productCard).join("")
    : `<div class="empty">Produk tidak ditemukan.</div>`;
}

// PRODUK UNGGULAN DI HOME
function renderFeatured() {
  const b = document.querySelector("#featured-products");
  if (b) b.innerHTML = PRODUCTS.slice(0, 6).map(productCard).join("");
}

// DETAIL PRODUK
function renderDetail() {
  const b = document.querySelector("#detail");
  if (!b) return;
  const id = Number(new URLSearchParams(location.search).get("id")),
    p = PRODUCTS.find((x) => x.id === id);
  if (!p) {
    b.innerHTML = "<h2>Produk tidak ditemukan.</h2>";
    return;
  }
  b.innerHTML = `<div class="detail-image"><img src="${p.image}" alt="${p.name}"></div><div class="detail-info"><span class="product-category">${p.category}</span><h1>${p.name}</h1><div class="rating">${"★".repeat(p.rating)}${"☆".repeat(5 - p.rating)}</div><p>${p.description}</p><div class="detail-price">${rupiah(p.price)} <del>${rupiah(p.oldPrice)}</del></div><p class="stock">Stok tersedia: ${p.stock}</p><button class="btn" onclick="addToCart(${p.id})">Tambah ke Keranjang</button></div>`;
}

// MENAMPILKAN KERANJANGMENAMPILKAN KERANJANG
function renderCartPage() {
  const b = document.querySelector("#cart-items");
  if (!b) return;
  const c = getCart();
  let total = 0;

// Jika keranjang kosong
  if (!c.length) {
    b.innerHTML =
      '<div class="empty-cart-box"><i class="fa-solid fa-cart-shopping"></i><h2>Keranjang kosong</h2><p>Yuk pilih produk favoritmu.</p><a class="btn" href="products.html">Belanja Sekarang</a></div>';
  } else {
    b.innerHTML = c
      .map((item) => {
        const p = PRODUCTS.find((x) => x.id === item.id);
        total += p.price * item.qty;
        return `<div class="cart-row"><img src="${p.image}" alt="${p.name}"><div><h3>${p.name}</h3><p>${rupiah(p.price)}</p><div class="quantity"><button onclick="changeQty(${p.id},-1)">−</button><span>${item.qty}</span><button onclick="changeQty(${p.id},1)">+</button></div></div><button class="remove" onclick="removeCart(${p.id})"><i class="fa-solid fa-trash"></i></button></div>`;
      })
      .join("");
  }

//  Update total
  const t = document.querySelector("#cart-total"),
    g = document.querySelector("#grand-total");
  if (t) t.textContent = rupiah(total);
  if (g) g.textContent = rupiah(total);
  updateCartCount();
}

// UBAH JUMLAH PRODUK
function changeQty(id, d) {
  let c = getCart(),
    x = c.find((i) => i.id === id);
  if (x) x.qty += d;
  c = c.filter((i) => i.qty > 0);
  setCart(c);
  renderCartPage();
}

// HAPUS PRODUK DARI KERANJANG
function removeCart(id) {
  setCart(getCart().filter((x) => x.id !== id));
  renderCartPage();
}
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderFeatured();
  renderProducts();
  renderDetail();
  renderCartPage();
  document
    .querySelectorAll("#product-search,#category-filter,#sort-filter")
    .forEach((x) => x.addEventListener("input", renderProducts));
  const menu = document.querySelector("#menu-btn"),
    nav = document.querySelector(".navbar-nav");
  if (menu) menu.onclick = () => nav.classList.toggle("active");
  const sb = document.querySelector("#search-btn"),
    s = document.querySelector(".search-box"),
    cs = document.querySelector("#close-search");
  if (sb) sb.onclick = () => s.classList.toggle("active");
  if (cs) cs.onclick = () => s.classList.remove("active");

//   FORM KONTAK
  const cf = document.querySelector("#contact-form");
  if (cf)
    cf.onsubmit = (e) => {
      e.preventDefault();
      toast("Pesan berhasil dikirim!");
      cf.reset();
    };

// CHECKOUT
  const co = document.querySelector("#checkout-btn");
  if (co)
    co.onclick = () => {
      if (!getCart().length) return toast("Keranjang masih kosong");
      alert("Checkout berhasil!");
    };
});
