document.addEventListener("DOMContentLoaded", () => {
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  if (!themeToggleBtn) {
    console.error("⚠️ Tombol #theme-toggle-btn tidak ditemukan!");
    return;
  }

  // Ambil preferensi user dari localStorage atau dari OS
  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const isDark = savedTheme === "dark" || (!savedTheme && systemPrefersDark);

  // Terapkan tema awal
  if (isDark) {
    document.body.classList.add("dark-mode");
    themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
  }

  // Saat tombol diklik
  themeToggleBtn.addEventListener("click", () => {
    const isNowDark = document.body.classList.toggle("dark-mode");
    themeToggleBtn.innerHTML = isNowDark
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
    localStorage.setItem("theme", isNowDark ? "dark" : "light");
  });
});

//footer
// Script tahun otomatis
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("current-year").textContent =
    new Date().getFullYear();
});
