function loadNavbar() {
  const currentPage = window.location.pathname.split("/").pop();

  const activeMap = {
    "index.html": "home",
    "shop.html": "shop",
    "blog.html": "blog",
    "about.html": "about",
    "contact.html": "contact",
    "try-on.html": "tryon",
    "community.html": "community",
    "promotions.html": "promotions",
    "login.html": "login"
  };

  const activePage = activeMap[currentPage];

  const navbarHTML = `
    <div>
      <ul id="navbar">

        <li>
          <a ${activePage === 'home' ? 'class="active"' : ''} href="index.html" title="Home">
            Home
          </a>
        </li>

        <li>
          <a ${activePage === 'shop' ? 'class="active"' : ''} href="shop.html" title="Shop">
            Shop
          </a>
        </li>

        <li>
          <a ${activePage === 'blog' ? 'class="active"' : ''} href="blog.html" title="Blog">
            Blog
          </a>
        </li>

        <li>
          <a ${activePage === 'about' ? 'class="active"' : ''} href="about.html" title="About">
            About
          </a>
        </li>

        <li>
          <a ${activePage === 'tryon' ? 'class="active"' : ''} href="try-on.html" title="Try-On">
            Try-On
          </a>
        </li>

        <li>
          <a ${activePage === 'community' ? 'class="active"' : ''} href="community.html" title="Community">
            Community
          </a>
        </li>

        <li>
          <a ${activePage === 'promotions' ? 'class="active"' : ''} href="promotions.html" title="Promotions">
            Promotions
          </a>
        </li>

        <!-- Contact Icon -->
        <li class="nav-icon">
          <a href="contact.html" title="Contact Us" aria-label="Contact">
            <i class="ri-customer-service-2-line"></i>
          </a>
        </li>

        <!-- Login Icon -->
        <li class="nav-icon">
          <a ${activePage === 'login' ? 'class="active"' : ''} href="login.html" title="Sign In" aria-label="Login">
            <i class="ri-user-3-line"></i>
          </a>
        </li>

        <!-- Cart Icon -->
        <li class="nav-icon">
          <a href="cart.html" id="lg-bag" title="View Cart" aria-label="Cart">
            <i class="ri-shopping-bag-4-line"></i>
          </a>
        </li>

        <!-- Theme Toggle -->
        <li class="nav-icon">
          <button
            class="theme-toggle"
            id="themeToggle"
            aria-label="Toggle dark mode"
          >
            <i class="ri-moon-line" id="themeIcon"></i>
          </button>
        </li>

        <!-- Close Button -->
        <li>
          <a href="#" id="close" aria-label="Close menu">
            <i class="fa-solid fa-xmark"></i>
          </a>
        </li>

      </ul>
    </div>
  `;

  const container = document.getElementById("navbar-container");

  if (container) {
    container.innerHTML = navbarHTML;
  } else {
    console.error("navbar-container not found!");
    return;
  }

  initDarkMode();
  initMobileNavbar();
}

function initMobileNavbar() {
  const bar = document.getElementById("bar");
  const close = document.getElementById("close");
  const navbar = document.getElementById("navbar");

  if (!bar || !navbar) return;

  function openMenu() {
    navbar.classList.add("active");
    bar.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    navbar.classList.remove("active");
    bar.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  bar.addEventListener("click", openMenu);

  bar.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openMenu();
    }
  });

  if (close) {
    close.addEventListener("click", (e) => {
      e.preventDefault();
      closeMenu();
    });
  }

  document.addEventListener("click", (e) => {
    const clickedInsideNavbar = navbar.contains(e.target);
    const clickedBar = bar.contains(e.target);
    if (
      navbar.classList.contains("active") &&
      !clickedInsideNavbar &&
      !clickedBar
    ) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMenu();
    }
  });

  const navLinks = navbar.querySelectorAll("a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });
}

function initDarkMode() {
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");

  // FIX: CSS uses [data-theme="dark"] attribute, not .dark class
  const isDarkSaved = localStorage.getItem("theme") === "dark";

  if (isDarkSaved) {
    document.body.setAttribute("data-theme", "dark");
    if (themeIcon) {
      themeIcon.classList.replace("ri-moon-line", "ri-sun-line");
    }
  } else {
    document.body.removeAttribute("data-theme");
  }

  function handleToggle() {
    const isDark = document.body.getAttribute("data-theme") === "dark";

    if (isDark) {
      document.body.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
      if (themeIcon) {
        themeIcon.classList.replace("ri-sun-line", "ri-moon-line");
      }
    } else {
      document.body.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
      if (themeIcon) {
        themeIcon.classList.replace("ri-moon-line", "ri-sun-line");
      }
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", handleToggle);
  }
}
