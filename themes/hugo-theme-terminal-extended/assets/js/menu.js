const container = document.querySelector(".container");
const allMenus = document.querySelectorAll(".menu");

// Debounce function for animations, not for button clicks
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Hide all menus on body click
document.body.addEventListener("click", () => {
  allMenus.forEach(menu => {
    if (menu.classList.contains("open")) {
      closeMenu(menu);
    }
  });
});

// Reset menus on window resize
window.addEventListener("resize", () => {
  allMenus.forEach(menu => {
    closeMenu(menu); // Ensure all menus are closed on resize
  });
});

// Handle desktop menu interactions
allMenus.forEach(menu => {
  const trigger = menu.querySelector(".menu__trigger");
  const dropdown = menu.querySelector(".menu__dropdown");

  // Trigger click event
  trigger.addEventListener("click", function (e) {
    e.stopPropagation(); // Prevent click event from propagating

    if (menu.classList.contains("open")) {
      closeMenu(menu);
    } else {
      // Close all menus before opening the current one
      allMenus.forEach(m => closeMenu(m)); // Close all menus
      openMenu(menu, dropdown);
    }

    // Adjust dropdown position if it goes outside the container
    if (dropdown.getBoundingClientRect().right > container.getBoundingClientRect().right) {
      dropdown.style.left = "auto";
      dropdown.style.right = 0;
    }
  });

  dropdown.addEventListener("click", e => e.stopPropagation());
});

// Functions to handle menu open and close animations
function openMenu(menu, dropdown) {
  menu.classList.add('open');
  dropdown.style.display = 'block';
  dropdown.style.maxHeight = '500px'; // Match the CSS max-height
  dropdown.style.opacity = '1';
  dropdown.classList.add('window-open');
  dropdown.classList.remove('window-close');
}

function closeMenu(menu) {
  const dropdown = menu.querySelector(".menu__dropdown");
  if (dropdown.classList.contains('window-open')) {
    dropdown.classList.remove('window-open');
    dropdown.classList.add('window-close');

    // Wait for the closing animation to finish
    dropdown.addEventListener('animationend', function onClose() {
      dropdown.style.display = 'none';
      dropdown.style.maxHeight = '0';
      dropdown.style.opacity = '0';
      menu.classList.remove('open');
      dropdown.classList.remove('window-close');
      dropdown.removeEventListener('animationend', onClose);
    });
  }
}

// Automatically close menus when clicking outside
document.addEventListener('click', function (event) {
  allMenus.forEach(menu => {
    const menuTrigger = menu.querySelector(".menu__trigger");
    const dropdownMenu = menu.querySelector(".menu__dropdown");

    var isClickInside = menuTrigger.contains(event.target) || dropdownMenu.contains(event.target);

    // If the click is outside the menu, close it
    if (!isClickInside && menu.classList.contains("open")) {
      closeMenu(menu);
    }
  });
});
