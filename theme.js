const themeToggle = document.querySelector(".theme-toggle");
const lightThemeIcon = themeToggle.querySelector(".theme-icon-light");
const darkThemeIcon = themeToggle.querySelector(".theme-icon-dark");
const themeStorageKey = "morning-courses-theme";

function applyTheme(theme, savePreference = true) {
  const isDark = theme === "dark";
  document.body.classList.toggle("dark-theme", isDark);
  themeToggle.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} theme`);
  themeToggle.title = `Switch to ${isDark ? "light" : "dark"} theme`;
  lightThemeIcon.toggleAttribute("hidden", !isDark);
  darkThemeIcon.toggleAttribute("hidden", isDark);

  if (savePreference) {
    try {
      localStorage.setItem(themeStorageKey, isDark ? "dark" : "light");
    } catch (error) {
      console.warn("Could not save the theme preference.", error);
    }
  }
}

let savedTheme = "light";
try {
  savedTheme = localStorage.getItem(themeStorageKey) || "light";
} catch (error) {
  console.warn("Could not read the saved theme preference.", error);
}

applyTheme(savedTheme === "light" ? "light" : "dark", false);
themeToggle.addEventListener("click", () => {
  applyTheme(document.body.classList.contains("dark-theme") ? "light" : "dark");
});
