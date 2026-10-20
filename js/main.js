/**
 * BỘ ĐIỀU KHIỂN TƯƠNG TÁC CHÍNH - YẾN SÀO BẢO LINH
 * Quản lý: Lọc sản phẩm, Giỏ hàng, Modal chi tiết, Video Player, Lightbox, Bộ tính liều lượng
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ==========================================
  // 1. STATE & STORAGE
  // ==========================================
  let cart = JSON.parse(localStorage.getItem('baolinh_cart') || '[]');
  const activeWeights = {}; // Lưu lựa chọn trọng lượng (50g/100g) theo từng productId

  // ==========================================
  // 2. RENDER SẢN PHẨM & BỘ LỌC
  // ==========================================
  const productsContainer = document.getElementById('productsGrid');
  const filterButtons = document.querySelectorAll('.filter-btn');

  function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  }

  function renderProducts(filterCategory = 'all') {
    if (!productsContainer || !PRODUCTS_DATA) return;

    const filtered = filterCategory === 'all'
      ? PRODUCTS_DATA
      : PRODUCTS_DATA.filter(p => p.category === filterCategory);

    productsContainer.innerHTML = filtered.map(product => {
      const selectedWeight = activeWeights[product.id] || '100g';
      const currentPrice = selectedWeight === '50g' ? product.price50g : product.price100g;

      return `
        <article class="product-card" data-category="${product.category}" data-id="${product.id}">
          <div class="product-media">
            <img src="${encodeURI(product.image)}" alt="${product.title}" loading="lazy">
            <span class="product-badge">${product.badge}</span>
            <button class="product-quick-view" onclick="openProductDetail('${product.id}')" title="Xem chi tiết">
              🔍
            </button>
          </div>
          <div class="product-body">
            <span class="product-category">${product.categoryName}</span>
            <h3 class="product-title">${product.title}</h3>
            <p class="product-summary">${product.summary}</p>
            
            <div class="product-weight-selector">
              <button type="button" class="weight-btn ${selectedWeight === '50g' ? 'active' : ''}" 
                onclick="changeProductWeight('${product.id}', '50g')">
                50 Gram
              </button>
              <button type="button" class="weight-btn ${selectedWeight === '100g' ? 'active' : ''}" 
                onclick="changeProductWeight('${product.id}', '100g')">
                100 Gram (Khuyên dùng)
              </button>
            </div>

            <div class="product-price-row">
              <div>
                <span class="price-main">${formatCurrency(currentPrice)}</span>
              </div>
              <span class="price-unit">Hộp ${selectedWeight}</span>
            </div>

            <div class="product-actions">
              <button class="btn-add-cart" onclick="addToCart('${product.id}')">
                <span>🛒</span> Thêm Giỏ Hàng
              </button>
              <button class="btn-consult-now" onclick="window.askBaoLinh('Tư vấn giá và quy cách sản phẩm: ${product.title}')" title="Hỏi tư vấn">
                💬 Tư Vấn
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  window.changeProductWeight = function (productId, weight) {
    activeWeights[productId] = weight;
    const currentActiveFilter = document.querySelector('.filter-btn.active')?.getAttribute('data-filter') || 'all';
    renderProducts(currentActiveFilter);
  };

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-filter');
      renderProducts(cat);
    });
  });

  // ==========================================
  // 3. RENDER VIDEO VÀ THƯ VIỆN HÌNH ẢNH
  // ==========================================
  const videoGrid = document.getElementById('videoGrid');
  if (videoGrid && typeof VIDEO_ITEMS !== 'undefined') {
    videoGrid.innerHTML = VIDEO_ITEMS.map((vid, idx) => `
      <div class="video-card">
        <div class="video-wrapper" onclick="openVideoPlayer('${vid.src}', '${vid.title}')">
          <video preload="metadata" muted>
            <source src="${encodeURI(vid.src)}" type="video/mp4">
          </video>
          <div class="video-play-overlay">
            <div class="play-circle">▶</div>
          </div>
        </div>
        <div class="video-info">
          <span class="video-badge">${vid.badge}</span>
          <h3>${vid.title}</h3>
          <p>${vid.desc}</p>
        </div>
      </div>
    `).join('');
  }

  const galleryGrid = document.getElementById('galleryGrid');
  if (galleryGrid && typeof GALLERY_ITEMS !== 'undefined') {
    galleryGrid.innerHTML = GALLERY_ITEMS.map((item, idx) => `
      <div class="gallery-item" onclick="openLightbox(${idx})">
        <img src="${encodeURI(item.src)}" alt="${item.title}" loading="lazy">
        <div class="gallery-overlay">
          <span class="gallery-tag">${item.tag}</span>
          <h4 class="gallery-title">${item.title}</h4>
          <p class="gallery-caption">${item.caption}</p>
        </div>
      </div>
    `).join('');
  }

  // ==========================================
  // 4. GIỎ HÀNG (SHOPPING CART DRAWER)
  // ==========================================
  const cartDrawer = document.getElementById('cartDrawer');
  const cartOverlay = document.getElementById('cartOverlay');
  const cartCountEl = document.getElementById('cartCount');
  const cartItemsContainer = document.getElementById('cartItems');
  const cartTotalPriceEl = document.getElementById('cartTotalPrice');

  function saveCart() {
    localStorage.setItem('baolinh_cart', JSON.stringify(cart));
    updateCartUI();
  }

  function updateCartUI() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCountEl) cartCountEl.textContent = totalCount;

    if (!cartItemsContainer || !cartTotalPriceEl) return;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="cart-empty-state">
          <div style="font-size: 3rem; margin-bottom: 12px;">🧺</div>
          <p>Giỏ hàng của Quý khách đang trống</p>
          <button class="btn-hero-primary" style="margin-top: 16px; font-size: 0.88rem; padding: 10px 20px;" 
            onclick="toggleCart(false)">Tiếp tục xem sản phẩm</button>
        </div>
      `;
      cartTotalPriceEl.textContent = formatCurrency(0);
      return;
    }

    let totalPrice = 0;
    cartItemsContainer.innerHTML = cart.map((item, idx) => {
      const lineTotal = item.price * item.quantity;
      totalPrice += lineTotal;
      return `
        <div class="cart-item">
          <img src="${encodeURI(item.image)}" alt="${item.title}" class="cart-item-img">
          <div class="cart-item-info">
            <h4 class="cart-item-title">${item.title}</h4>
            <div class="cart-item-weight">Quy cách: Hộp ${item.weight}</div>
            <div class="cart-item-price">${formatCurrency(item.price)}</div>
            <div class="cart-item-qty">
              <button class="qty-btn" onclick="updateItemQuantity(${idx}, -1)">-</button>
              <span style="font-weight: 700; font-size: 0.9rem;">${item.quantity}</span>
              <button class="qty-btn" onclick="updateItemQuantity(${idx}, 1)">+</button>
              <button class="qty-btn" style="margin-left: auto; color: #e11d48; border-color: #fecdd3;" 
                onclick="removeItemFromCart(${idx})" title="Xóa">✕</button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    cartTotalPriceEl.textContent = formatCurrency(totalPrice);
  }

  window.addToCart = function (productId) {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if (!product) return;

    const selectedWeight = activeWeights[productId] || '100g';
    const price = selectedWeight === '50g' ? product.price50g : product.price100g;

    const existingIndex = cart.findIndex(i => i.id === productId && i.weight === selectedWeight);
    if (existingIndex > -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({
        id: product.id,
        title: product.title,
        weight: selectedWeight,
        price: price,
        image: product.image,
        quantity: 1
      });
    }

    saveCart();
    toggleCart(true);
    showToast(`Đã thêm ${product.title} (${selectedWeight}) vào giỏ!`);
  };

  window.updateItemQuantity = function (index, change) {
    if (!cart[index]) return;
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
    saveCart();
  };

  window.removeItemFromCart = function (index) {
    if (!cart[index]) return;
    cart.splice(index, 1);
    saveCart();
    showToast('Đã xóa sản phẩm khỏi giỏ hàng');
  };

  window.toggleCart = function (open) {
    if (!cartDrawer || !cartOverlay) return;
    const isOpen = open !== undefined ? open : !cartDrawer.classList.contains('open');
    cartDrawer.classList.toggle('open', isOpen);
    cartOverlay.classList.toggle('active', isOpen);
  };

  window.checkoutViaZaloOrPhone = function () {
    if (cart.length === 0) {
      alert('Giỏ hàng chưa có sản phẩm nào!');
      return;
    }

    let message = `Xin chào Yến Sào Bảo Linh, tôi muốn đặt mua đơn hàng:\n`;
    let total = 0;
    cart.forEach((item, i) => {
      message += `${i + 1}. ${item.title} (Hộp ${item.weight}) x ${item.quantity} = ${formatCurrency(item.price * item.quantity)}\n`;
      total += item.price * item.quantity;
    });
    message += `Tổng tiền: ${formatCurrency(total)}\nNhờ Bảo Linh tư vấn và giao hàng giúp tôi theo địa chỉ: ...`;

    const encodedMsg = encodeURIComponent(message);
    const zaloUrl = `https://zalo.me/0974002626?text=${encodedMsg}`;
    window.open(zaloUrl, '_blank');
  };

  // ==========================================
  // 5. PRODUCT QUICK VIEW MODAL
  // ==========================================
  const productModalBackdrop = document.getElementById('productModal');
  const productModalContent = document.getElementById('productModalContent');

  window.openProductDetail = function (productId) {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if (!product || !productModalBackdrop || !productModalContent) return;

    const specsHtml = Object.entries(product.specifications || {}).map(([key, val]) => `
      <div style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px dotted #e5e5e5; font-size: 0.88rem;">
        <span style="color: #666; font-weight: 600;">${key}:</span>
        <span style="color: #1f1b1b; font-weight: 700; text-align: right;">${val}</span>
      </div>
    `).join('');

    const giftsHtml = (product.gifts || []).map(g => `
      <li style="display: flex; align-items: center; gap: 8px; font-size: 0.88rem; color: #9e0b0f; margin-bottom: 4px;">
        <span>🎁</span> <span>${g}</span>
      </li>
    `).join('');

    productModalContent.innerHTML = `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 28px; padding: 28px;" class="modal-product-grid">
        <div>
          <img src="${encodeURI(product.image)}" id="modalMainImg" alt="${product.title}" 
            style="width: 100%; height: 320px; object-fit: cover; border-radius: 12px; border: 2px solid #d4af37;">
          <div style="display: flex; gap: 8px; margin-top: 12px;">
            ${(product.gallery || [product.image]).map(img => `
              <img src="${encodeURI(img)}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 6px; cursor: pointer; border: 1px solid #ddd;" 
                onclick="document.getElementById('modalMainImg').src='${encodeURI(img)}'">
            `).join('')}
          </div>
        </div>
        <div>
          <span style="background: #fff0f1; color: #9e0b0f; padding: 4px 10px; border-radius: 12px; font-size: 0.75rem; font-weight: 700;">${product.categoryName}</span>
          <h2 style="font-size: 1.6rem; color: #660306; margin: 8px 0;">${product.title}</h2>
          <div style="font-size: 1.3rem; color: #9e0b0f; font-weight: 800; margin-bottom: 14px;">
            50g: ${formatCurrency(product.price50g)} &nbsp;|&nbsp; 100g: ${formatCurrency(product.price100g)}
          </div>
          <p style="font-size: 0.9rem; color: #555; line-height: 1.6; margin-bottom: 16px;">${product.description}</p>
          
          <div style="background: #faf7f2; padding: 14px; border-radius: 8px; margin-bottom: 16px;">
            <h4 style="font-size: 0.95rem; color: #9e0b0f; margin-bottom: 8px;">Thông số tổ yến:</h4>
            ${specsHtml}
          </div>

          <div style="margin-bottom: 20px;">
            <h4 style="font-size: 0.95rem; color: #9e0b0f; margin-bottom: 6px;">Quà tặng kèm theo:</h4>
            <ul style="padding-left: 0;">${giftsHtml}</ul>
          </div>

          <div style="display: flex; gap: 12px;">
            <button class="btn-hero-primary" style="flex: 1; padding: 12px;" onclick="addToCart('${product.id}'); closeProductDetail();">
              🛒 Thêm Giỏ Hàng
            </button>
            <button class="btn-cta-gold" style="flex: 1; padding: 12px; justify-content: center;" 
              onclick="window.askBaoLinh('Tư vấn đặt mua sản phẩm: ${product.title}'); closeProductDetail();">
              💬 Tư Vấn Ngay
            </button>
          </div>
        </div>
      </div>
    `;

    productModalBackdrop.classList.add('active');
  };

  window.closeProductDetail = function () {
    if (productModalBackdrop) productModalBackdrop.classList.remove('active');
  };

  // ==========================================
  // 6. VIDEO MODAL PLAYER
  // ==========================================
  const videoModal = document.getElementById('videoModal');
  const videoPlayerContainer = document.getElementById('videoPlayerContainer');

  window.openVideoPlayer = function (src, title) {
    if (!videoModal || !videoPlayerContainer) return;
    videoPlayerContainer.innerHTML = `
      <div style="padding: 16px; background: #1a1818; color: #fff; border-top-left-radius: 16px; border-top-right-radius: 16px;">
        <h3 style="color: #d4af37; font-size: 1.15rem; margin: 0;">${title}</h3>
      </div>
      <div style="position: relative; padding-bottom: 56.25%; height: 0; background: #000;">
        <video controls autoplay style="position: absolute; top:0; left: 0; width: 100%; height: 100%; object-fit: contain;">
          <source src="${encodeURI(src)}" type="video/mp4">
          Trình duyệt không hỗ trợ phát video.
        </video>
      </div>
    `;
    videoModal.classList.add('active');
  };

  window.closeVideoPlayer = function () {
    if (!videoModal || !videoPlayerContainer) return;
    videoPlayerContainer.innerHTML = '';
    videoModal.classList.remove('active');
  };

  // ==========================================
  // 7. LIGHTBOX XEM HÌNH ẢNH TOÀN MÀN HÌNH
  // ==========================================
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  let currentLightboxIndex = 0;

  window.openLightbox = function (idx) {
    if (!GALLERY_ITEMS || !GALLERY_ITEMS[idx]) return;
    currentLightboxIndex = idx;
    updateLightboxUI();
    lightboxModal.classList.add('active');
  };

  function updateLightboxUI() {
    const item = GALLERY_ITEMS[currentLightboxIndex];
    if (!item) return;
    lightboxImg.src = encodeURI(item.src);
    lightboxCaption.innerHTML = `
      <strong style="color: #d4af37; font-size: 1.1rem; display: block;">${item.title}</strong>
      <span style="font-size: 0.9rem; color: #eee;">${item.caption}</span>
      <div style="font-size: 0.8rem; color: #aaa; margin-top: 4px;">(${currentLightboxIndex + 1} / ${GALLERY_ITEMS.length})</div>
    `;
  }

  window.closeLightbox = function () {
    if (lightboxModal) lightboxModal.classList.remove('active');
  };

  window.nextLightbox = function () {
    currentLightboxIndex = (currentLightboxIndex + 1) % GALLERY_ITEMS.length;
    updateLightboxUI();
  };

  window.prevLightbox = function () {
    currentLightboxIndex = (currentLightboxIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
    updateLightboxUI();
  };

  // ==========================================
  // 8. BỘ TÍNH TOÁN LIỀU LƯỢNG YẾN
  // ==========================================
  const dosageSelect = document.getElementById('dosageUserType');
  const dosageWeeksSelect = document.getElementById('dosageWeeks');
  const dosageResultContainer = document.getElementById('dosageResult');

  function calculateDosage() {
    if (!dosageSelect || !dosageWeeksSelect || !dosageResultContainer) return;

    const userType = dosageSelect.value;
    const weeks = parseInt(dosageWeeksSelect.value, 10) || 4;

    let gramsPerTime = 3;
    let timesPerWeek = 3;
    let note = '';
    let recommendProduct = 'Tổ Yến Tinh Chế Thượng Hạng Bảo Linh';

    switch (userType) {
      case 'adult':
        gramsPerTime = 4;
        timesPerWeek = 3;
        note = 'Dùng cách ngày lúc bụng rỗng vào buổi sáng hoặc tối trước khi ngủ giúp tái tạo năng lượng, tăng đề kháng, giảm căng thẳng.';
        recommendProduct = 'Tổ Yến Tinh Chế Thượng Hạng 100g';
        break;
      case 'elderly':
        gramsPerTime = 3;
        timesPerWeek = 3.5; // cách ngày
        note = 'Bồi bổ khí huyết, ổn định huyết áp, ngủ sâu giấc và phục hồi sức khỏe nhanh sau bệnh.';
        recommendProduct = 'Chân Tổ Yến Tinh Chế Giòn Sợi 100g hoặc Yến Rút Lông';
        break;
      case 'child-small':
        gramsPerTime = 1.5;
        timesPerWeek = 2;
        note = 'Trẻ 1 - 3 tuổi: Bổ sung acid sialic và canxi giúp tiêu hóa tốt, tăng cân đều đặn và phòng ốm vặt.';
        recommendProduct = 'Tổ Yến Tinh Chế Cánh Sen 50g';
        break;
      case 'child-big':
        gramsPerTime = 2.5;
        timesPerWeek = 2.5;
        note = 'Trẻ 4 - 10 tuổi: Tăng cường trí nhớ, bổ sung dưỡng chất cho giai đoạn học tập phát triển thể chất.';
        recommendProduct = 'Tổ Yến Tinh Chế Thượng Hạng 50g hoặc 100g';
        break;
      case 'pregnant':
        gramsPerTime = 3;
        timesPerWeek = 3;
        note = 'Phụ nữ mang thai từ tháng thứ 4: Giảm ốm nghén, ngăn rạn da, tăng cường miễn dịch cho mẹ và thai nhi.';
        recommendProduct = 'Hộp Quà Biếu Cao Cấp Hoàng Gia Bảo Linh 100g';
        break;
      default:
        gramsPerTime = 3;
        timesPerWeek = 3;
        note = 'Dùng đều đặn mỗi tuần để duy trì nét thanh xuân và bảo vệ sức khỏe cả gia đình.';
    }

    const totalGrams = Math.round(gramsPerTime * timesPerWeek * weeks);
    const recommendedBoxes = totalGrams > 50 ? `${Math.ceil(totalGrams / 100)} Hộp 100g` : `1 Hộp 50g`;

    dosageResultContainer.innerHTML = `
      <h4>✦ KẾT QUẢ TÍNH TOÁN KHUYẾN NGHỊ</h4>
      <p style="margin-bottom: 8px;">
        • Liều lượng đề xuất: <strong>${gramsPerTime}g khô / lần</strong> (${timesPerWeek} lần/tuần).<br>
        • Tổng lượng yến cần cho liệu trình ${weeks} tuần: <strong>~${totalGrams} Gram</strong> (Khoảng ${recommendedBoxes}).<br>
        • Gợi ý sản phẩm phù hợp nhất: <strong style="color: #9e0b0f;">${recommendProduct}</strong>.
      </p>
      <div style="font-size: 0.85rem; color: #555; background: #fff; padding: 10px; border-radius: 6px; border: 1px solid #ebd9c2;">
        💡 <em>${note}</em>
      </div>
      <div style="margin-top: 14px;">
        <button class="btn-cta-gold" style="font-size: 0.85rem; padding: 8px 18px;" 
          onclick="window.askBaoLinh('Tôi cần tư vấn liệu trình ${totalGrams}g yến cho ${dosageSelect.options[dosageSelect.selectedIndex].text}')">
          Hỏi Đặt Liệu Trình Này
        </button>
      </div>
    `;
  }

  if (dosageSelect && dosageWeeksSelect) {
    dosageSelect.addEventListener('change', calculateDosage);
    dosageWeeksSelect.addEventListener('change', calculateDosage);
    calculateDosage(); // Tính mặc định ban đầu
  }

  // ==========================================
  // 9. MOBILE MENU & SMOOTH SCROLLING
  // ==========================================
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      mobileMenuBtn.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileMenuBtn.textContent = '☰';
      });
    });
  }

  // ==========================================
  // 10. TOAST NOTIFICATION
  // ==========================================
  function showToast(msg) {
    let toast = document.getElementById('toastNotice');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toastNotice';
      toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: #1f1b1b;
        color: #fff;
        padding: 12px 24px;
        border-radius: 999px;
        font-size: 0.92rem;
        font-weight: 600;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 10005;
        border: 1.5px solid #d4af37;
        opacity: 0;
        transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        pointer-events: none;
      `;
      document.body.appendChild(toast);
    }

    toast.textContent = msg;
    toast.style.transform = 'translateX(-50%) translateY(0)';
    toast.style.opacity = '1';

    setTimeout(() => {
      toast.style.transform = 'translateX(-50%) translateY(100px)';
      toast.style.opacity = '0';
    }, 2800);
  }

  // Khởi tạo
  renderProducts();
  updateCartUI();
});
