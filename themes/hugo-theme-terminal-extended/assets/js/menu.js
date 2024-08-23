const container = document.querySelector(".container");
const allMenus = document.querySelectorAll(".menu");

// Hide menus on body click
document.body.addEventListener("click", () => {
  allMenus.forEach(menu => {
    if (menu.classList.contains("open")) {
      menu.classList.remove("open");
    }
  });
});

// Reset menus on resize
window.addEventListener("resize", () => {
  allMenus.forEach(menu => {
    menu.classList.remove("open");
  });
});

// Handle desktop menu
allMenus.forEach(menu => {
  const trigger = menu.querySelector(".menu__trigger");
  const dropdown = menu.querySelector(".menu__dropdown");

  trigger.addEventListener("click", e => {
    e.stopPropagation();

    if (menu.classList.contains("open")) {
      menu.classList.remove("open");
    } else {
      // Close all menus...
      allMenus.forEach(m => m.classList.remove("open"));
      // ...before opening the current one
      menu.classList.add("open");
    }

    if (dropdown.getBoundingClientRect().right > container.getBoundingClientRect().right) {
      dropdown.style.left = "auto";
      dropdown.style.right = 0;
    }
  });

  dropdown.addEventListener("click", e => e.stopPropagation());
});

// Animation menu
document.addEventListener('DOMContentLoaded', function () {
  var menuTrigger = document.querySelector('.menu__trigger');
  var dropdownMenu = document.querySelector('.menu__dropdown');

  menuTrigger.addEventListener('click', function () {
    if (dropdownMenu.classList.contains('window-open')) {
      // If the menu is already open, apply the closing animation
      dropdownMenu.classList.remove('window-open');
      dropdownMenu.classList.add('window-close');

      // Wait for the closing animation to finish before completely hiding the menu
      dropdownMenu.addEventListener('animationend', function onClose() {
        dropdownMenu.style.display = 'none'; // Completely hide the menu after closing
        dropdownMenu.style.maxHeight = '0'; // Make sure max-height is 0
        dropdownMenu.style.opacity = '0'; // Make sure the opacity is 0
        dropdownMenu.classList.remove('window-close');
        dropdownMenu.removeEventListener('animationend', onClose);
      });
    } else {
      // If the menu is closed, show the contents and apply the opening animation
      dropdownMenu.style.display = 'block';
      dropdownMenu.style.maxHeight = '500px'; // Must be equal to the value in max-height CSS
      dropdownMenu.style.opacity = '1';
      dropdownMenu.classList.add('window-open');

      // Remove display:none and apply opening animation
      dropdownMenu.classList.remove('window-close');
    }
  });
});
