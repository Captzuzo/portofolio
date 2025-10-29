document.addEventListener("DOMContentLoaded", () => {
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  if (!themeToggleBtn) {
    console.error("⚠️ Tombol theme-toggle-btn tidak ditemukan!");
    return;
  }

  // Baca preferensi dari localStorage
  const currentTheme = localStorage.getItem("theme");
  if (
    currentTheme === "dark" ||
    (!currentTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.body.classList.add("dark-mode");
    themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
  }

  // Event toggle
  themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
      localStorage.setItem("theme", "dark");
    } else {
      themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
      localStorage.setItem("theme", "light");
    }
  });
});

//footer
// Script tahun otomatis
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("current-year").textContent =
    new Date().getFullYear();
});
