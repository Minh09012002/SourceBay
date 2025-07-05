
  window.addEventListener('DOMContentLoaded', () => {
  const slidesContainer = document.getElementById('slidesContainer');
  if (!slidesContainer) return;

  const slides = slidesContainer.children;
  const totalSlides = slides.length;
  let currentIndex = 0;

  function updateSlider() {
    const offset = -currentIndex * 100;
    slidesContainer.style.transform = `translateX(${offset}%)`;
    slidesContainer.setAttribute('aria-label', `Slide ${currentIndex + 1} of ${totalSlides}`);
  }

  function nextSlide() {
    currentIndex++;
  if (currentIndex >= totalSlides) {
    // Đã đến slide cuối → reset về slide 0
    slidesContainer.style.transition = 'none';
    slidesContainer.style.transform = `translateX(0%)`;
    currentIndex = 0;

    // Force browser repaint
    void slidesContainer.offsetWidth;

    slidesContainer.style.transition = 'transform 0.5s ease-in-out';
  } else {
    updateSlider();
  }
  }

  function prevSlide() {
    currentIndex--;
    if (currentIndex < 0) currentIndex = totalSlides - 1;
    updateSlider();
  }

  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');
  if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    [nextBtn, prevBtn].forEach(button => {
      button.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
          e.preventDefault();
          button.click();
        }
      });
    });
  }

  let autoSlideInterval;

  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 2000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  const slider = document.querySelector('.slider');
  if (slider) {
    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', startAutoSlide);
  }

  updateSlider();
  startAutoSlide();
});

// Phân trang
 const totalPages = 30;
  const windowSize = 8; // tổng số nút hiển thị
  const fixedPages = [1, 2, 3];
  const slidingWindowSize = windowSize - fixedPages.length;
  let slidingStartPage = 4;
  let currentPage = 1;

  function renderPagination() {
    const container = document.querySelector(".pagination");
    container.innerHTML = "";

    // Render fixed pages (1,2,3)
    fixedPages.forEach((p) => {
      const btn = createButton(p);
      container.appendChild(btn);
    });

    // Nếu slidingStartPage > 4 thì render dấu ...
    if (slidingStartPage > 4) {
      const dots = document.createElement("span");
      dots.textContent = "...";
      dots.classList.add("dots");
      container.appendChild(dots);
    }

    // Render sliding pages
    let endSlidingPage = slidingStartPage + slidingWindowSize - 1;
    if (endSlidingPage > totalPages) {
      endSlidingPage = totalPages;
    }

    for (let i = slidingStartPage; i <= endSlidingPage; i++) {
      const btn = createButton(i);
      container.appendChild(btn);
    }

    // Nếu còn trang ở sau thì render dấu ... và trang cuối
    if (endSlidingPage < totalPages) {
      const dotsEnd = document.createElement("span");
      dotsEnd.textContent = "...";
      dotsEnd.classList.add("dots");
      container.appendChild(dotsEnd);

      const lastBtn = createButton(totalPages);
      container.appendChild(lastBtn);
    }

      // Nút >>
      if (currentPage < totalPages) {
        const nextBtn = document.createElement("button");
        nextBtn.innerHTML = '<i class="fa-solid fa-angles-right"></i>';
        nextBtn.addEventListener("click", () => {
          currentPage += 1;
          if (currentPage <= 3) {
            slidingStartPage = 4;
          } else {
            let newStart = currentPage - Math.floor(slidingWindowSize / 2);
            if (newStart < 4) newStart = 4;
            if (newStart > totalPages - slidingWindowSize + 1) {
              newStart = totalPages - slidingWindowSize + 1;
            }
            slidingStartPage = newStart;
          }
          renderPagination();
        });
        container.appendChild(nextBtn);
      }



    // Nút Trang Cuối
    const lastPageBtn = document.createElement("button");
    lastPageBtn.textContent = "Trang Cuối";
    lastPageBtn.addEventListener("click", () => {
      slidingStartPage = totalPages - slidingWindowSize + 1;
      if (slidingStartPage < 4) slidingStartPage = 4;
      currentPage = totalPages;
      renderPagination();
    });
    container.appendChild(lastPageBtn);
  }

  function createButton(pageNum) {
    const btn = document.createElement("button");
    btn.textContent = pageNum;
    if (pageNum === currentPage) btn.classList.add("active");
    btn.addEventListener("click", () => {
      currentPage = pageNum;

      if (pageNum <= 3) {
        // Nếu bấm 1,2,3 → sliding window reset về đầu
        slidingStartPage = 4;
      } else {
        // Xác định sliding window để bao quanh currentPage
        let newStart = pageNum - Math.floor(slidingWindowSize / 2);
        if (newStart < 4) newStart = 4;
        if (newStart > totalPages - slidingWindowSize + 1) {
          newStart = totalPages - slidingWindowSize + 1;
        }
        slidingStartPage = newStart;
      }

      renderPagination();
    });
    return btn;
  }

  renderPagination();

  // animation sản phẩm lươt dưới lên 
  const cards = document.querySelectorAll('.card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  cards.forEach(card => {
    observer.observe(card);
  });

  // nút cuộn trang
  const mybutton = document.getElementById("scrollToTopBtn");

      window.onscroll = function () {
        scrollFunction();
      };

      function scrollFunction() {
        if (
          document.body.scrollTop > 100 ||
          document.documentElement.scrollTop > 100
        ) {
          mybutton.style.display = "block";
        } else {
          mybutton.style.display = "none";
        }
      }

      mybutton.addEventListener("click", function () {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });


// Ẩn hiện menu
  const menuBtn = document.getElementById('menu-btn');
  const search = document.querySelector(".search-bar")
  const actionsmoney = document.querySelector(".header-actions")
    const menu = document.getElementById('menu');

    menuBtn.addEventListener('click', function () {
      menu.classList.toggle('show');
      search.classList.toggle('show');
      actionsmoney.classList.toggle('show');
    });