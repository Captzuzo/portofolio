// assets/js/script.js
// Enhanced JavaScript with all features

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initThemeToggle();
  initMobileMenu();
  initTypingEffect();
  initDownloadSystem();
  initPublicationFeatures();
  initSkillAnimations();
  initScrollEffects();
  initParticles();
  updateCurrentYear();
  fetchGitHubProjects();
});

// Theme Toggle
function initThemeToggle() {
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  const themeIcon = themeToggleBtn.querySelector("i");

  // Load saved theme
  const savedTheme = localStorage.getItem("theme") || "light";
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeIcon.classList.replace("fa-moon", "fa-sun");
  }

  themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      themeIcon.classList.replace("fa-moon", "fa-sun");
      localStorage.setItem("theme", "dark");
    } else {
      themeIcon.classList.replace("fa-sun", "fa-moon");
      localStorage.setItem("theme", "light");
    }
  });
}

// Mobile Menu
function initMobileMenu() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });
}

// Typing Effect
function initTypingEffect() {
  const texts = ["Web Developer", "Komputer dan Jaringan"];
  const typingText = document.querySelector(".typing-text");
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      typingText.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingText.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true;
      setTimeout(type, 2000);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      setTimeout(type, 500);
    } else {
      setTimeout(type, isDeleting ? 100 : 150);
    }
  }

  type();
}

// assets/js/script.js - Perbaikan bagian download

// Download System
function initDownloadSystem() {
  const downloadBtn = document.getElementById("download-cv-btn");
  const downloadModal = document.getElementById("download-modal");
  const modalClose = document.getElementById("modal-close");
  const modalCancel = document.getElementById("modal-cancel");
  const modalConfirm = document.getElementById("modal-confirm");
  const progressSection = document.querySelector(".download-progress");
  const progressFill = document.querySelector(".progress-fill");
  const progressText = document.querySelector(".progress-text");

  // CV file path - PASTIKAN PATH INI BENAR
  const cvFilePath = "assets/pdf/cv-deni.pdf";

  // Initialize download counter
  let downloadCounter = parseInt(
    localStorage.getItem("downloadCount") || "128"
  );
  updateDownloadCount();

  // Open modal when download button is clicked
  downloadBtn.addEventListener("click", (e) => {
    e.preventDefault();
    downloadModal.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  // Close modal functions
  function closeModal() {
    downloadModal.classList.remove("active");
    document.body.style.overflow = "";
  }

  modalClose.addEventListener("click", closeModal);
  modalCancel.addEventListener("click", closeModal);

  // Close modal when clicking outside
  downloadModal.addEventListener("click", (e) => {
    if (e.target === downloadModal) {
      closeModal();
    }
  });

  // Confirm download
  modalConfirm.addEventListener("click", () => {
    closeModal();
    startDownloadProcess();
  });

  // Download process with animation
  function startDownloadProcess() {
    // Reset state
    downloadBtn.classList.remove("success");
    progressFill.style.width = "0%";
    progressText.textContent = "0%";

    // Show loading state
    downloadBtn.classList.add("loading");
    progressSection.classList.add("active");

    // Simulate download progress
    simulateDownloadProgress();
  }

  // Simulate download progress
  function simulateDownloadProgress() {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5; // 5-20% per step
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        completeDownload();
      }

      updateProgress(progress);
    }, 200);
  }

  // Update progress bar
  function updateProgress(progress) {
    progressFill.style.width = `${progress}%`;
    progressText.textContent = `${Math.round(progress)}%`;
  }

  // Complete download process
  function completeDownload() {
    // Show success state
    downloadBtn.classList.remove("loading");
    downloadBtn.classList.add("success");

    // Trigger actual download
    triggerActualDownload();

    // Update counter
    downloadCounter++;
    localStorage.setItem("downloadCount", downloadCounter.toString());
    updateDownloadCount();

    // Reset after 3 seconds
    setTimeout(() => {
      resetDownloadButton();
    }, 3000);
  }

  // Trigger actual file download - INI YANG PERLU DIPERBAIKI
  function triggerActualDownload() {
    try {
      // Method 1: Create temporary link (lebih reliable)
      const link = document.createElement("a");
      link.href = cvFilePath;
      link.download = "CV_Deni_Agus_Haryadi.pdf"; // Nama file saat didownload

      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log("Download triggered successfully");
    } catch (error) {
      console.error("Download error:", error);

      // Fallback: Open in new tab
      window.open(cvFilePath, "_blank");
    }
  }

  // Reset download button to initial state
  function resetDownloadButton() {
    downloadBtn.classList.remove("success");
    progressSection.classList.remove("active");
    progressFill.style.width = "0%";
    progressText.textContent = "0%";
  }

  // Update download count display
  function updateDownloadCount() {
    const countElement = document.getElementById("download-count");
    if (countElement) {
      countElement.textContent = `${downloadCounter} downloads`;
    }
  }

  // Check if file exists (for debugging)
  function checkFileExists() {
    fetch(cvFilePath, { method: "HEAD" })
      .then((response) => {
        if (response.ok) {
          console.log("CV file exists and is accessible");
        } else {
          console.warn("CV file might not exist or is not accessible");
        }
      })
      .catch((error) => {
        console.error("Error checking CV file:", error);
      });
  }

  // Initialize file check
  checkFileExists();
}

// Publication Features
function initPublicationFeatures() {
  const citeBtn = document.getElementById("cite-publication");
  const shareBtn = document.getElementById("share-publication");
  const publicationModal = document.getElementById("publication-modal");
  const modalClose = document.getElementById("publication-modal-close");
  const copyBtn = document.getElementById("copy-apa");

  citeBtn.addEventListener("click", () => {
    publicationModal.classList.add("active");
  });

  modalClose.addEventListener("click", () => {
    publicationModal.classList.remove("active");
  });

  copyBtn.addEventListener("click", async () => {
    const citation = document.getElementById("apa-citation").textContent;
    try {
      await navigator.clipboard.writeText(citation);
      copyBtn.innerHTML = '<i class="fas fa-check"></i> Tersalin!';
      setTimeout(() => {
        copyBtn.innerHTML = '<i class="fas fa-copy"></i> Salin Kutipan';
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  });

  shareBtn.addEventListener("click", async () => {
    const shareData = {
      title:
        "SISTEM INFORMASI MANAJEMEN PENGELOLAAN PRAKTEK KERJA LAPANGAN BERBASIS WEB GEOLOCATION",
      text: "Publikasi ilmiah oleh Deni Agus Haryadi",
      url: "https://doi.org/10.32672/jnkti.v8i1.8782",
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        alert("Link publikasi berhasil disalin!");
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  });
}

// Skill Animations
function initSkillAnimations() {
  const skillBars = document.querySelectorAll(".skill-progress");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const width = entry.target.getAttribute("data-width");
          entry.target.style.width = width + "%";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  skillBars.forEach((bar) => {
    observer.observe(bar);
  });
}

// Scroll Effects
function initScrollEffects() {
  const header = document.querySelector("header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.style.background = "var(--card-bg)";
      header.style.backdropFilter = "blur(10px)";
      header.style.boxShadow = "var(--shadow)";
    } else {
      header.style.background = "transparent";
      header.style.backdropFilter = "none";
      header.style.boxShadow = "none";
    }
  });
}

// Particles Animation
function initParticles() {
  const container = document.querySelector(".particles-container");
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    createParticle(container);
  }
}

function createParticle(container) {
  const particle = document.createElement("div");
  particle.className = "particle";

  const size = Math.random() * 4 + 1;
  const posX = Math.random() * 100;
  const posY = Math.random() * 100;
  const duration = Math.random() * 20 + 10;
  const delay = Math.random() * 5;

  particle.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    background: var(--primary-color);
    border-radius: 50%;
    left: ${posX}%;
    top: ${posY}%;
    opacity: ${Math.random() * 0.3 + 0.1};
    animation: floatParticle ${duration}s linear ${delay}s infinite;
  `;

  container.appendChild(particle);
}

// Add particle animation to CSS
const style = document.createElement("style");
style.textContent = `
  @keyframes floatParticle {
    0% {
      transform: translateY(0) translateX(0);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: translateY(-100vh) translateX(20px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Update Current Year
function updateCurrentYear() {
  const yearElement = document.getElementById("current-year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// GitHub Projects
async function fetchGitHubProjects() {
  const username = "Captzuzo";
  const apiUrl = `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`;

  try {
    const response = await fetch(apiUrl);
    const projects = await response.json();
    displayProjects(projects);
  } catch (error) {
    console.error("Error fetching GitHub projects:", error);
    showErrorState();
  }
}

function displayProjects(projects) {
  const container = document.getElementById("projects-container");

  // Remove skeletons
  container.innerHTML = "";

  projects.forEach((project) => {
    const projectCard = createProjectCard(project);
    container.appendChild(projectCard);
  });
}

function createProjectCard(project) {
  const card = document.createElement("div");
  card.className = "project-card";

  const language = project.language || "Other";
  const languageColor = getLanguageColor(language);

  card.innerHTML = `
    <div class="project-image" style="background: ${languageColor}">
      <i class="fab fa-github"></i>
    </div>
    <div class="project-content">
      <h3>${project.name}</h3>
      <p>${project.description || "No description available"}</p>
      <div class="project-tech">
        <span class="tech-tag">${language}</span>
      </div>
      <div class="project-links">
        <a href="${project.html_url}" target="_blank" class="project-link">
          <i class="fab fa-github"></i> Code
        </a>
        ${
          project.homepage
            ? `
          <a href="${project.homepage}" target="_blank" class="project-link">
            <i class="fas fa-external-link-alt"></i> Demo
          </a>
        `
            : ""
        }
      </div>
    </div>
  `;

  return card;
}

function getLanguageColor(language) {
  const colors = {
    JavaScript: "#f7df1e",
    TypeScript: "#3178c6",
    Python: "#3776ab",
    Java: "#ed8b00",
    PHP: "#777bb4",
    HTML: "#e34f26",
    CSS: "#1572b6",
    Vue: "#4fc08d",
    React: "#61dafb",
    Laravel: "#ff2d20",
    Other: "#6c757d",
  };

  return colors[language] || colors["Other"];
}

function showErrorState() {
  const container = document.getElementById("projects-container");
  container.innerHTML = `
    <div class="error-state">
      <i class="fas fa-exclamation-triangle"></i>
      <p>Unable to load projects from GitHub</p>
      <a href="https://github.com/Captzuzo" target="_blank" class="btn btn-primary">
        Visit GitHub Profile
      </a>
    </div>
  `;
}
