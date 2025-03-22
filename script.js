if (
  !window.location.hostname.includes("e-bebek.com") ||
  !window.location.pathname.startsWith("/")
) {
  // Sadece e-bebek ana sayfasında çalışacak şekilde kontrol ediyoruz.
  console.log("Bu script sadece e-bebek ana sayfasında çalışır.");
  throw new Error("Geçersiz sayfa");
}

const style = document.createElement("style");
style.innerHTML = `
    .banner__titles {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #fef6eb;
      padding: 25px 67px;
      border-top-left-radius: 35px;
      border-top-right-radius: 35px;
      font-family: 'Quicksand', sans-serif;
      font-weight: 700;
    }
  
    .title-primary {
      font-size: 1.75rem;
      line-height: 2.25rem;
      color: #ff7d00;
      font-weight: 700;
    }
  
    .carousel-wrapper {
      display: flex;
      gap: 20px;
      padding: 20px;
      overflow-x: auto;
      scroll-behavior: smooth;
    }
  
    .product-card {
      min-width: 200px;
      background-color: #fff;
      border: 1px solid #ededed;
      border-radius: 10px;
      padding: 12px;
      font-family: 'Poppins', cursive;
      font-size: 12px;
      color: #7d7d7d;
      margin: 0 0 20px 3px;
      text-align: center;
    }
  
    .product-title {
      font-weight: bold;
      margin: 8px 0;
      color: #222;
    }
  
    .product-price {
      color: green;
      font-weight: bold;
    }
  `;
document.head.appendChild(style);


const wrapper = document.createElement("div");

const headingDiv = document.createElement("div");
headingDiv.className = "banner__titles";

const heading = document.createElement("h2");
heading.className = "title-primary";
heading.textContent = "Beğenebileceğinizi düşündüklerimiz";

headingDiv.appendChild(heading);


const carouselWrapper = document.createElement("div");
carouselWrapper.className = "carousel-wrapper";

// Dummy ürün kartı ekliyoruz deneme amaçlı
const dummyCard = document.createElement("div");
dummyCard.className = "product-card";

const img = document.createElement("img");
img.src = "";
img.alt = "Dummy Ürün";
img.style.width = "100%";

const title = document.createElement("p");
title.className = "product-title";
title.textContent = "Dummy Ürün Başlığı";

const price = document.createElement("p");
price.className = "product-price";
price.textContent = "199,99 TL";

dummyCard.append(img, title, price);
carouselWrapper.appendChild(dummyCard);


wrapper.appendChild(headingDiv);
wrapper.appendChild(carouselWrapper);

const section2A = document.querySelector('cx-page-slot[position="Section2A"]');

if (section2A) {
  section2A.insertBefore(wrapper, section2A.firstChild);
  console.log("Carousel doğru şekilde eklendi.");
} else {
  console.warn("Carousel eklenemedi.");
}
