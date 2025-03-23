(() => {
  // Sayfa kontrolü
  const currentHostname = window.location.hostname;
  const currentPath = window.location.pathname;

  if (
    !(
      currentHostname.includes("e-bebek.com") &&
      (currentPath === "/" || currentPath === "/index.html")
    )
  ) {
    console.log(
      "wrong page - Bu script sadece e-bebek.com ana sayfasında çalışır"
    );
    return;
  }

  let products = localStorage.getItem("carousel_products");
  let favoriteProducts =
    JSON.parse(localStorage.getItem("favorite_products")) || [];

  // Stil tanımlamaları
  const styles = `
    .eb-recommended-carousel {
      margin: 30px 0;
      font-family: Quicksand-Medium, sans-serif;
    }
    #eb-custom-carousel .container {
      width: 100%;
      padding-right: 25px;
      padding-left: 25px;
      margin-right: auto;
      margin-top: 100px;
      margin-left: auto;
      min-width: 0!important;
      --cx-color-primary: #007bff;
      --cx-spinner-primary-color: #007bff;
      --cx-spinner-secondary-color: #f8f9fa;
      position: relative;
    }
    
    /* Mobil cihazlar için temel stiller */
    #eb-custom-carousel .owl-carousel.owl-drag .owl-item {
      margin-top: 20px;
      margin-right: 20px;
      touch-action: pan-y;
      position: relative;
      min-height: 1px;
      float: left;
      -webkit-backface-visibility: hidden;
    }
    
    #eb-custom-carousel .owl-item {
      flex: 0 0 auto;
      margin-right: 20px;
    }
    
    #eb-custom-carousel .product-item {
      z-index: 1;
      display: block;
      width: 100%;
      margin: 20px 0 20px 3px;
      padding: 5px;
      border: 1px solid #ededed;
      border-radius: 10px;
      position: relative;
      background-color: #fff;
    }
    
    /* Ekran boyutlarına göre sadece değişen özellikler */
    @media (max-width: 767px) {
      #eb-custom-carousel .container { max-width: 100%; }
      #eb-custom-carousel .owl-carousel.owl-drag .owl-item { width: 245px; }
      #eb-custom-carousel .owl-item { flex: 0 0 245px; }
    }
    
    @media (min-width: 768px) and (max-width: 991px) {
      #eb-custom-carousel .container { max-width: 720px; }
      #eb-custom-carousel .owl-carousel.owl-drag .owl-item { width: 335px; }
      #eb-custom-carousel .owl-item { flex: 0 0 335px; }
    }
    
    @media (min-width: 992px) and (max-width: 1279px) {
      #eb-custom-carousel .container { max-width: 960px; }
      #eb-custom-carousel .owl-carousel.owl-drag .owl-item { width: 296.66px; }
      #eb-custom-carousel .owl-item { flex: 0 0 296.66px; }
    }
    
    @media (min-width: 1280px) and (max-width: 1479px) {
      #eb-custom-carousel .container { max-width: 1180px; }
      #eb-custom-carousel .owl-carousel.owl-drag .owl-item { width: 272.5px; }
      #eb-custom-carousel .owl-item { flex: 0 0 272.5px; }
    }
    
    @media (min-width: 1480px) and (max-width: 1579px) {
      #eb-custom-carousel .container { max-width: 1296px; }
      #eb-custom-carousel .owl-carousel.owl-drag .owl-item { width: 237.2px; }
      #eb-custom-carousel .owl-item { flex: 0 0 237.2px; }
    }
    
    @media (min-width: 1580px) and (max-width: 1679px) {
      #eb-custom-carousel .container { max-width: 1320px; }
      #eb-custom-carousel .owl-carousel.owl-drag .owl-item { width: 237.2px; }
      #eb-custom-carousel .owl-item { flex: 0 0 237.2px; }
    }
    
    @media (min-width: 1680px) {
      #eb-custom-carousel .container {
        max-width: 1320px;
        padding-right: 15px;
        padding-left: 15px;
      }
      #eb-custom-carousel .owl-carousel.owl-drag .owl-item { width: 242px !important; }
      #eb-custom-carousel .owl-item { flex: 0 0 242px !important; }
      #eb-custom-carousel .product-item {
        margin: 20px 10px 20px 10px;
        padding: 10px;
      }
    }
    
    /* Temel stiller */
    #eb-custom-carousel .banner { position: relative; }
    #eb-custom-carousel .banner__titles {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #fef6eb;
      padding: 25px 67px;
      border-top-left-radius: 35px;
      border-top-right-radius: 35px;
      font-family: Quicksand-Bold;
      font-weight: 700;
    }
    #eb-custom-carousel .title-primary {
      font-family: Quicksand-Bold;
      font-size: 3rem;
      font-weight: 700;
      line-height: 1.11;
      color: #f28e00;
      margin: 0;
    }
    #eb-custom-carousel .banner__wrapper {
      position: relative;
      overflow: visible;
      box-shadow: 15px 15px 30px 0 #ebebeb80;
      background-color: #fff;
      border-bottom-left-radius: 35px;
      border-bottom-right-radius: 35px;
      padding: 0 15px;
      margin: 0 5px 30px;
    }
    #eb-custom-carousel .owl-carousel {
      display: flex;
      transition: transform 0.5s ease;
    }
    
    #eb-custom-carousel .product-item-anchor {
      text-decoration: none;
      color: unset;
      background: unset;
      display: block;
    }
    #eb-custom-carousel .product-item__img {
      position: relative;
      display: block;
      width: 100%;
      background-color: #fff;
      margin-bottom: 65px;
      text-align: center;
    }
    #eb-custom-carousel .product-item__img img {
      display: inline-block;
      max-width: 100%;
      max-height: 100%;
    }
    #eb-custom-carousel .banner img {
      max-width: 100% !important;
      width: auto;
      height: 203px;
      object-fit: contain;
    }
    #eb-custom-carousel .product-item__multiple-badge {
      height: 100%;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      position: absolute;
      font-size: 1rem;
      z-index: 2;
      left: 13px;
      top: 5px;
      border-radius: 15px;
      line-height: 26px;
      font-weight: 500;
      color: #008cd4;
    }
    #eb-custom-carousel .product-item__multiple-badge img {
      width: 50px;
      height: auto;
    }
    #eb-custom-carousel .product-item-content {
      padding: 0 17px 17px;
      padding-bottom: 13px;
    }
    #eb-custom-carousel .product-item__brand {
      font-size: 1.2rem;
      height: 42px;
      overflow: hidden;
      margin-bottom: 10px;
      font-weight: 500;
      line-height: 1.2222222222;
    }
    #eb-custom-carousel .product-item-content .stars-wrapper {
      --cx-color-primary: #fed100;
      --cx-color-light: #d7d7d7;
      padding: 5px 0 15px;
    }
    #eb-custom-carousel .cx-icon.fa-star {
      display: inline-block;
      color: #e9e9e9;
      margin-right: 5px;
    }
    #eb-custom-carousel .product-item__price {
      position: relative;
      display: flex;
      justify-content: flex-end;
      flex-direction: column;
      height: 43px;
    }
    #eb-custom-carousel .product-item__old-price {
      font-size: 1.4rem;
      font-weight: 500;
      text-decoration: line-through;
    }
    #eb-custom-carousel .product-item__percent {
      color: #00a365;
      font-size: 18px;
      font-weight: 700;
      display: inline-flex;
      justify-content: center;
      margin-left: 10px;
    }
    #eb-custom-carousel .product-item__price .product-item__new-price.discount-product {
      color: #00a365;
    }
    #eb-custom-carousel .product-item__new-price {
      display: block;
      width: 100%;
      font-size: 2.2rem;
      font-weight: 600;
    }
    #eb-custom-carousel .btn.close-btn {
      width: 100%;
      padding: 15px 20px;
      border-radius: 37.5px;
      background-color: #fff7ec;
      color: #f28e00;
      font-family: Poppins, "cursive";
      font-size: 1.4rem;
      font-weight: 700;
      margin-top: 25px;
      border: none;
      cursor: pointer;
    }
    #eb-custom-carousel .heart {
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 10;
      width: 30px;
      height: 30px;
      cursor: pointer;
      background: #fff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
      border: none;
      padding: 0;
      overflow: hidden;
    }
    #eb-custom-carousel .heart-icon {
      width: 20px;
      height: 20px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: all 0.2s ease;
      color: #f28e00; /* Turuncu renk - e-bebek teması */
    }
    #eb-custom-carousel .hovered,
    #eb-custom-carousel .favorite {
      display: none;
      filter: hue-rotate(0deg); /* Mavi tonunu engellemek için */
    }
    #eb-custom-carousel .heart:hover .default {
      display: none;
    }
    #eb-custom-carousel .heart:hover .hovered {
      display: block;
      color: #f28e00; /* Turuncu renk */
    }
    #eb-custom-carousel .heart.is-favorite .default {
      display: none;
    }
    #eb-custom-carousel .heart.is-favorite .hovered {
      display: none;
    }
    #eb-custom-carousel .heart.is-favorite .favorite {
      display: block;
      color: #f28e00; /* Turuncu renk */
    }
    #eb-custom-carousel .swiper-prev, #eb-custom-carousel .swiper-next {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 9999;
      border: 1px solid #e0e0e0;
      cursor: pointer;
      display: flex !important;
      align-items: center;
      justify-content: center;
      background-color: #FEF6EB;
      box-shadow: 0 2px 5px rgba(0,0,0,0.12);
      transition: all 0.3s ease;
      opacity: 1;
    }
    #eb-custom-carousel .swiper-prev {
      left: -20px;
    }
    #eb-custom-carousel .swiper-next {
      right: -20px;
    }
    @media (min-width: 1200px) {
      #eb-custom-carousel .swiper-prev { left: -25px; }
      #eb-custom-carousel .swiper-next { right: -25px; }
    }
    #eb-custom-carousel .swiper-prev:after {
      content: "";
      width: 9px;
      height: 9px;
      border-left: 2px solid #f28e00;
      border-bottom: 2px solid #f28e00;
      transform: rotate(45deg);
      margin-left: 3px;
    }
    #eb-custom-carousel .swiper-next:after {
      content: "";
      width: 9px;
      height: 9px;
      border-right: 2px solid #f28e00;
      border-top: 2px solid #f28e00;
      transform: rotate(45deg);
      margin-right: 3px;
    }
    #eb-custom-carousel .swiper-prev:hover, #eb-custom-carousel .swiper-next:hover {
      background-color: #fff9f1;
      border-color: #f28e00;
    }
    #eb-custom-carousel .swiper-prev.disabled, #eb-custom-carousel .swiper-next.disabled {
      opacity: 0.5;
      cursor: default;
    }
    #eb-custom-carousel .product-item__special-internet {
      position: absolute;
      bottom: 10px;
      left: 10px;
      background-color: rgba(0,0,0,0.7);
      color: white;
      font-size: 10px;
      padding: 5px;
      border-radius: 3px;
    }
    #eb-custom-carousel .d-flex { display: flex; }
    #eb-custom-carousel .flex-column {
      display: flex;
      flex-direction: column;
    }
    #eb-custom-carousel .align-items-center { align-items: center; }
    #eb-custom-carousel .position-absolute { position: absolute; }
    #eb-custom-carousel .bottom-0 { bottom: 0; }
    #eb-custom-carousel .ml-2 { margin-left: 8px; }
    #eb-custom-carousel .mb-2 { margin-bottom: 8px; }
    #eb-custom-carousel .mb-3 { margin-bottom: 12px; }
    #eb-custom-carousel .btn.close-btn.disable {
      opacity: 0.7;
      cursor: not-allowed;
    }
  `;

  const styleElement = document.createElement("style");
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);

  function getScreenConfig() {
    let config = {
      itemsPerView: 1,
      itemWidth: 245,
      containerWidth: "100%",
    };

    if (window.innerWidth >= 1680) {
      config.itemsPerView = 5;
      config.itemWidth = 242;
      config.containerWidth = "1320px";
    } else if (window.innerWidth >= 1580) {
      config.itemsPerView = 5;
      config.itemWidth = 237.2;
      config.containerWidth = "1320px";
    } else if (window.innerWidth >= 1480) {
      config.itemsPerView = 5;
      config.itemWidth = 237.2;
      config.containerWidth = "1296px";
    } else if (window.innerWidth >= 1280) {
      config.itemsPerView = 4;
      config.itemWidth = 272.5;
      config.containerWidth = "1180px";
    } else if (window.innerWidth >= 992) {
      config.itemsPerView = 3;
      config.itemWidth = 296.66;
      config.containerWidth = "960px";
    } else if (window.innerWidth >= 768) {
      config.itemsPerView = 2;
      config.itemWidth = 335;
      config.containerWidth = "720px";
    }

    return config;
  }

  function updateOwlItemSizes() {
    const owlItems = document.querySelectorAll("#eb-custom-carousel .owl-item");
    if (owlItems.length === 0) return;

    const config = getScreenConfig();
    owlItems.forEach((item) => {
      item.style.width = `${config.itemWidth}px`;
      item.style.marginRight = "20px";
    });
  }

  window.onload = function () {
    setTimeout(updateOwlItemSizes, 500);
  };

  window.addEventListener("resize", updateOwlItemSizes);

  // Carousel elementlerini oluşturuyoruz
  const createCarousel = () => {
    const config = getScreenConfig();

    // Ana carousel container'ını oluşturuyoruz
    const carouselContainer = document.createElement("div");
    carouselContainer.id = "eb-custom-carousel";

    // HTML yapısı
    carouselContainer.innerHTML = `
      <div class="container">
        <eb-carousel-header class="ng-star-inserted">
          <div class="banner__titles">
            <h2 class="title-primary">Beğenebileceğinizi düşündüklerimiz</h2>
          </div>
        </eb-carousel-header>
        <div class="position-relative">
          <div class="banner__wrapper ins-preview-wrapper-10167 ng-star-inserted">
            <div>
              <owl-carousel-o class="product-list__best-products">
                <div class="owl-carousel owl-theme owl-loaded owl-responsive owl-drag">
                  <div class="owl-stage-outer ng-star-inserted">
                    <owl-stage>
                      <div>
                        <div class="owl-stage" style="width: 4388px; transform: translate3d(0px, 0px, 0px); transition: all;">
                          <!-- Ürünler burada dinamik olarak eklenecek -->
                        </div>
                      </div>
                    </owl-stage>
                  </div>
                </div>
              </owl-carousel-o>
            </div>
          </div>
          <div class="swiper-prev" aria-label="back"></div>
          <div class="swiper-next" aria-label="next"></div>
        </div>
      </div>
    `;

    // Section1 ve Section2A arasına ekleyeceğiz
    const section1 = document.querySelector(
      'cx-page-slot[position="Section1"]'
    );
    const section2A = document.querySelector(
      'cx-page-slot[position="Section2A"]'
    );

    if (section1 && section2A) {
      const parent = section1.parentNode;
      parent.insertBefore(carouselContainer, section2A);

      // Eğer ürünler daha önce yüklenmişse, render et
      if (products) {
        renderProducts(
          JSON.parse(products),
          carouselContainer.querySelector(".owl-stage")
        );
      } else {
        const loading = document.createElement("div");
        loading.textContent = "Ürünler yükleniyor...";
        loading.style.padding = "20px";
        carouselContainer.querySelector(".owl-stage").appendChild(loading);
      }

      // Butonlara ve carousel elementlerine erişim
      const owlStage = carouselContainer.querySelector(".owl-stage");
      const prevButton = carouselContainer.querySelector(".swiper-prev");
      const nextButton = carouselContainer.querySelector(".swiper-next");

      prevButton.style.display = "flex";
      nextButton.style.display = "flex";

      // LocalStorage'dan son konumu al veya 0'dan başla
      let currentIndex = parseInt(
        localStorage.getItem("carousel_current_index") || "0"
      );
      if (isNaN(currentIndex)) {
        currentIndex = 0;
        localStorage.setItem("carousel_current_index", "0");
      }

      // İlk yüklemede son konum varsa carousel'ı ona göre konumlandır
      if (currentIndex > 0 && products) {
        const productCount = JSON.parse(products).length;
        const maxIndex = Math.max(0, productCount - config.itemsPerView);

        // Geçerli bir index değeri mi kontrol et
        if (currentIndex > maxIndex) {
          currentIndex = maxIndex;
          localStorage.setItem(
            "carousel_current_index",
            currentIndex.toString()
          );
        }

        // Carousel'ı konumlandır
        setTimeout(() => {
          owlStage.style.transition = "none";
          const translateValue = currentIndex * (config.itemWidth + 20);
          owlStage.style.transform = `translate3d(-${translateValue}px, 0px, 0px)`;

          setTimeout(() => {
            owlStage.style.transition = "transform 0.3s ease";
          }, 50);
        }, 100);
      }

      function updateNavButtons() {
        if (!products) return;

        const productCount = JSON.parse(products).length;
        const maxIndex = Math.max(0, productCount - config.itemsPerView);

        if (currentIndex <= 0) {
          prevButton.classList.add("disabled");
          prevButton.style.opacity = "0.4";
          prevButton.style.cursor = "default";
          prevButton.style.pointerEvents = "none";
        } else {
          prevButton.classList.remove("disabled");
          prevButton.style.opacity = "1";
          prevButton.style.cursor = "pointer";
          prevButton.style.pointerEvents = "auto";
        }

        if (currentIndex >= maxIndex) {
          nextButton.classList.add("disabled");
          nextButton.style.opacity = "0.4";
          nextButton.style.cursor = "default";
          nextButton.style.pointerEvents = "none";
        } else {
          nextButton.classList.remove("disabled");
          nextButton.style.opacity = "1";
          nextButton.style.cursor = "pointer";
          nextButton.style.pointerEvents = "auto";
        }
      }

      prevButton.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (currentIndex > 0) {
          currentIndex--;

          owlStage.style.transition = "transform 0.3s ease";


          const translateValue = currentIndex * (config.itemWidth + 20);
          owlStage.style.transform = `translate3d(-${translateValue}px, 0px, 0px)`;

          // LocalStorage'a kaydet
          localStorage.setItem(
            "carousel_current_index",
            currentIndex.toString()
          );

          updateNavButtons();
        }
      });

      // Next buton işlevi
      nextButton.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (products) {
          const productCount = JSON.parse(products).length;
          const maxIndex = Math.max(0, productCount - config.itemsPerView);

          if (currentIndex < maxIndex) {
            currentIndex++;

            // Düzgün geçiş için
            owlStage.style.transition = "transform 0.3s ease";

            const translateValue = currentIndex * (config.itemWidth + 20);
            owlStage.style.transform = `translate3d(-${translateValue}px, 0px, 0px)`;

            // LocalStorage'a kaydetme işlemi
            localStorage.setItem(
              "carousel_current_index",
              currentIndex.toString()
            );

            updateNavButtons();
          }
        }
      });

      updateNavButtons();
    }
  };

  // Ürünleri render etme işlevi
  const renderProducts = (products, container) => {
    container.innerHTML = "";
    const config = getScreenConfig();

    products.forEach((product) => {
      const isFavorite = favoriteProducts.includes(product.id);

      // Owl item
      const owlItem = document.createElement("div");
      owlItem.className =
        "owl-item ng-tns-c125-3 ng-trigger ng-trigger-autoHeight active ng-star-inserted";
      owlItem.style.width = `${config.itemWidth}px`;
      owlItem.style.marginRight = "20px";

      // Item HTML yapısı
      owlItem.innerHTML = `
        <div class="ins-web-smart-recommender-box-item ng-star-inserted">
          <div event-collection="true" class="ins-product-box ins-element-link ins-add-to-cart-wrapper ins-sr-api" ins-product-id="${
            product.id
          }">
            <eb-carousel-product-item>
              <div class="product-item">
                <eb-generic-link class="product-item-anchor" event-collection="true">
                  <a class="product-item-anchor ng-star-inserted" href="${
                    product.url
                  }" target="_blank">
                    <figure class="product-item__img ng-star-inserted">
                      <div class="product-item__multiple-badge" style="z-index: 1;">
                        <span class="d-flex flex-column">
                          ${
                            Math.random() > 0.7
                              ? `<img alt="Popular" loading="lazy" src="assets/images/cok-satan.png" srcset="assets/images/cok-satan@2x.png 2x, assets/images/cok-satan@3x.png 3x" class="ng-star-inserted">`
                              : ""
                          }
                        </span>
                      </div>
                      <span class="d-flex flex-column align-items-start justify-content-end position-absolute bottom-0">
                        <eb-new-product-badge class="mb-3"><!----><!----></eb-new-product-badge>
                      </span>
                      <cx-media alt="${
                        product.name
                      }" format="product" id="lnkProduct${
        product.id
      }" class="is-initialized">
                        <img class="ng-star-inserted ls-is-cached lazyloaded" alt="${
                          product.name
                        }" data-src="${product.imageUrl}" src="${
        product.imageUrl
      }">
                      </cx-media>
                      ${
                        product.isSpecial
                          ? `<span class="product-item__special-internet ng-star-inserted">İNTERNETE ÖZEL ÜRÜN <i class="icon icon-interactive"></i></span>`
                          : ""
                      }
                      <div class="d-flex ml-4"><!----><!----></div>
                    </figure>
                    <div class="product-item-content ng-star-inserted">
                      <eb-generic-link class="product-item-anchor">
                        <a class="product-item-anchor ng-star-inserted" href="${
                          product.url
                        }" target="_blank">
                          <h2 class="product-item__brand ng-star-inserted">
                            <b> ${product.brand} - </b>
                            <span> ${product.name} </span>
                          </h2>
                          <div class="d-flex mb-2 stars-wrapper align-items-center ng-star-inserted">
                            <cx-star-rating disabled="true" style="--star-fill: ${
                              product.rating
                            };">
                              ${Array(5)
                                .fill()
                                .map((_, i) =>
                                  i < product.rating
                                    ? `<cx-icon class="star cx-icon fas fa-star ng-star-inserted"></cx-icon>`
                                    : `<cx-icon class="star cx-icon fas fa-star ng-star-inserted" style="opacity: 0.3;"></cx-icon>`
                                )
                                .join("")}
                            </cx-star-rating>
                            <p class="review-count ng-star-inserted">(${
                              product.reviewCount
                            })</p>
                          </div>
                        </a>
                      </eb-generic-link>
                      <div class="product-item__price">
                        ${
                          product.originalPrice &&
                          product.originalPrice !== product.price
                            ? `
                          <div class="d-flex align-items-center ng-star-inserted">
                            <span class="product-item__old-price ng-star-inserted">${product.originalPrice.toFixed(
                              2
                            )} TL</span>
                            <span class="product-item__percent carousel-product-price-percent ml-2 ng-star-inserted">
                              %${Math.round(
                                ((product.originalPrice - product.price) /
                                  product.originalPrice) *
                                  100
                              )} 
                              <i class="icon icon-decrease"></i>
                            </span>
                          </div>
                          <span class="product-item__new-price discount-product ng-star-inserted">${product.price.toFixed(
                            2
                          )} TL</span>
                        `
                            : `
                          <div class="d-flex align-items-center ng-star-inserted"><!----><!----></div>
                          <span class="product-item__new-price ng-star-inserted">${product.price.toFixed(
                            2
                          )} TL</span>
                        `
                        }
                      </div>
                    </div>
                    <div class="product-list-promo ng-star-inserted"><!----></div>
                  </a>
                </eb-generic-link>
                <eb-add-to-wish-list>
                  <div class="heart ${isFavorite ? "is-favorite" : ""}">
                    <img id="default-favorite" src="assets/svg/default-favorite.svg" alt="heart" class="heart-icon default">
                    <img src="assets/svg/default-hover-favorite.svg" alt="heart" class="heart-icon hovered">
                    ${
                      isFavorite
                        ? `<img src="assets/svg/favorite.svg" alt="heart" class="heart-icon favorite">`
                        : ""
                    }
                  </div>
                </eb-add-to-wish-list>
                <div class="product-item-content">
                  <div class="product-item__price">
                    <div class="ins-add-to-cart-wrapper" ins-product-id="${
                      product.id
                    }">
                      <eb-add-to-cart buttonclass="close-btn">
                        <form novalidate="" class="ng-untouched ng-pristine ng-valid ng-star-inserted">
                          <button id="addToCartBtn" type="submit" class="btn close-btn disable ng-star-inserted">
                            Sepete Ekle
                          </button>
                        </form>
                      </eb-add-to-cart>
                    </div>
                  </div>
                </div>
              </div>
            </eb-carousel-product-item>
          </div>
        </div>
      `;

      // Kalp butonu
      const heart = owlItem.querySelector(".heart");
      heart.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Logine yönlendirme
        window.location.href = "https://www.e-bebek.com/login";
      });

      container.appendChild(owlItem);
    });
  };

  // API'den ürünleri al
  const fetchProducts = async (url) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`API yanıtı başarısız: ${response.status}`);
      }

      const data = await response.json();

      // Ürün verilerini işle
      const processedProducts = processProductData(data);

      // Yerel depolamaya kaydetme işlemi
      localStorage.setItem(
        "carousel_products",
        JSON.stringify(processedProducts)
      );

      return processedProducts;
    } catch (error) {
      console.error("Ürünler alınırken hata oluştu:", error);
      return null;
    }
  };

  // Ürün verilerini işle
  const processProductData = (data) => {
    return data.map((item) => ({
      id: item.id,
      name: item.name,
      brand: item.brand,
      price: item.price,
      originalPrice: item.original_price,
      imageUrl: item.img,
      url: item.url,
      rating: Math.floor(Math.random() * 2) + 4, // Örnek değer (4 veya 5)
      reviewCount: Math.floor(Math.random() * 100) + 1, // Örnek değer (1-100 arası)
      isSpecial: Math.random() > 0.25, // %25 ihtimalle internete özel
      badges: [],
    }));
  };

  // Carousel'ı oluştur
  createCarousel();

  // API URL'si
  const apiUrl =
    "https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json";

  // API'den ürünleri al ve carousel'ı güncelle
  if (!products) {
    fetchProducts(apiUrl).then((fetchedProducts) => {
      if (fetchedProducts) {
        products = JSON.stringify(fetchedProducts);
        const owlStage = document.querySelector(
          "#eb-custom-carousel .owl-stage"
        );
        if (owlStage) {
          renderProducts(fetchedProducts, owlStage);
        }
      }
    });
  } else {
    const owlStage = document.querySelector("#eb-custom-carousel .owl-stage");
    if (owlStage) {
      renderProducts(JSON.parse(products), owlStage);
    }
  }
})();
