const profileButton = document.querySelector("#profileButton");
const authDialog = document.createElement("dialog");

authDialog.className = "auth-dialog";
authDialog.id = "authDialog";
authDialog.setAttribute("aria-labelledby", "authTitle");
authDialog.innerHTML = `
  <button class="auth-close" type="button" aria-label="Close sign-in dialog">&times;</button>
  <div class="auth-brand-mark" aria-hidden="true">M</div>
  <h2 id="authTitle">Create an account</h2>
  <p class="auth-description" id="authDescription">Save your learning progress and pick up where you left off.</p>
  <form class="auth-form" id="authForm">
    <label class="auth-field" id="nameField">
      <span>Your name</span>
      <input id="authName" name="name" type="text" autocomplete="name" required>
    </label>
    <label class="auth-field">
      <span>Email address</span>
      <input id="authEmail" name="email" type="email" autocomplete="email" placeholder="you@example.com" required>
    </label>
    <label class="auth-field" id="passwordField" hidden>
      <span>Password</span>
      <input id="authPassword" name="password" type="password" autocomplete="new-password" minlength="8">
    </label>
    <button class="auth-submit" type="submit">Continue</button>
  </form>
  <div class="auth-divider">or continue with</div>
  <div class="auth-providers">
    <button class="auth-provider" type="button" data-provider="Google">
      <svg class="provider-mark" aria-hidden="true" viewBox="0 0 48 48">
        <path fill="#4285F4" d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.5 9.5 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.9 6.1-15Z"/>
        <path fill="#34A853" d="M24 44c5.5 0 10.1-1.8 13.5-4.8l-6.6-5.1c-1.8 1.2-4.1 2-6.9 2-5.3 0-9.8-3.6-11.4-8.5H5.8v5.3A20 20 0 0 0 24 44Z"/>
        <path fill="#FBBC05" d="M12.6 27.6a12 12 0 0 1 0-7.2v-5.3H5.8a20 20 0 0 0 0 17.8l6.8-5.3Z"/>
        <path fill="#EA4335" d="M24 11.9c3 0 5.7 1 7.8 3.1l5.9-5.9C34.1 5.8 29.5 4 24 4A20 20 0 0 0 5.8 15.1l6.8 5.3c1.6-4.9 6.1-8.5 11.4-8.5Z"/>
      </svg>
      <span>Google</span>
    </button>
    <button class="auth-provider" type="button" data-provider="Apple">
      <svg class="provider-mark provider-mark-apple" aria-hidden="true" viewBox="0 0 24 24">
        <path d="M16.37 12.53c.02 2.14 1.88 2.85 1.9 2.86-.02.05-.3 1.03-.98 2.04-.59.87-1.2 1.73-2.16 1.75-.94.02-1.24-.56-2.32-.56-1.08 0-1.42.54-2.31.58-.93.04-1.64-.94-2.24-1.81-1.22-1.76-2.15-4.97-.9-7.14a3.47 3.47 0 0 1 2.92-1.77c.91-.02 1.77.62 2.33.62.55 0 1.59-.77 2.68-.66.46.02 1.76.19 2.59 1.42-.07.04-1.55.9-1.53 2.67ZM14.61 6.98a3.42 3.42 0 0 0 .78-2.45 3.47 3.47 0 0 0-2.24 1.18 3.23 3.23 0 0 0-.8 2.36 2.88 2.88 0 0 0 2.26-1.09Z"/>
      </svg>
      <span>Apple</span>
    </button>
    <button class="auth-provider" type="button" data-provider="Microsoft">
      <svg class="provider-mark provider-mark-microsoft" aria-hidden="true" viewBox="0 0 24 24">
        <path fill="#F25022" d="M2 2h9.5v9.5H2z"/>
        <path fill="#7FBA00" d="M12.5 2H22v9.5h-9.5z"/>
        <path fill="#00A4EF" d="M2 12.5h9.5V22H2z"/>
        <path fill="#FFB900" d="M12.5 12.5H22V22h-9.5z"/>
      </svg>
      <span>Microsoft</span>
    </button>
  </div>
  <p class="auth-notice" id="authNotice" role="status" aria-live="polite"></p>
  <p class="auth-switch"><span id="authSwitchPrompt">Already have an account?</span> <button id="authSwitchButton" type="button">Log in</button></p>
  <p class="auth-legal">Preview only. Authentication is not connected; nothing you enter is sent or saved.</p>
`;
document.body.append(authDialog);

const authTitle = authDialog.querySelector("#authTitle");
const authDescription = authDialog.querySelector("#authDescription");
const authForm = authDialog.querySelector("#authForm");
const authEmail = authDialog.querySelector("#authEmail");
const nameField = authDialog.querySelector("#nameField");
const nameInput = authDialog.querySelector("#authName");
const passwordField = authDialog.querySelector("#passwordField");
const passwordInput = authDialog.querySelector("#authPassword");
const submitButton = authDialog.querySelector(".auth-submit");
const notice = authDialog.querySelector("#authNotice");
const switchPrompt = authDialog.querySelector("#authSwitchPrompt");
const switchButton = authDialog.querySelector("#authSwitchButton");
let authMode = "signup";
let authStep = "email";

function setAuthMode(mode) {
  authMode = mode;
  authStep = mode === "signup" ? "credentials" : "email";
  authForm.reset();
  nameField.hidden = mode !== "signup";
  passwordField.hidden = mode !== "signup";
  nameInput.required = mode === "signup";
  passwordInput.required = mode === "signup";
  passwordInput.minLength = mode === "signup" ? 8 : 1;
  passwordInput.autocomplete = mode === "signup" ? "new-password" : "current-password";
  authTitle.textContent = mode === "signup" ? "Create an account" : "Welcome back";
  authDescription.textContent = mode === "signup"
    ? "Save your learning progress and pick up where you left off."
    : "Enter your email to continue to your account.";
  submitButton.textContent = "Continue";
  switchPrompt.textContent = mode === "signup" ? "Already have an account?" : "New to Morning's Courses?";
  switchButton.textContent = mode === "signup" ? "Log in" : "Sign up";
  authDialog.querySelector(".auth-close").setAttribute(
    "aria-label",
    mode === "signup" ? "Close sign-up dialog" : "Close log-in dialog"
  );
  notice.textContent = "";
}

profileButton.addEventListener("click", () => {
  setAuthMode("signup");
  authDialog.showModal();
});
authDialog.querySelector(".auth-close").addEventListener("click", () => authDialog.close());
switchButton.addEventListener("click", () => {
  setAuthMode(authMode === "signup" ? "login" : "signup");
  authEmail.focus();
});
authDialog.querySelectorAll("[data-provider]").forEach(button => {
  button.addEventListener("click", () => {
    notice.textContent = `${button.dataset.provider} sign-in isn't connected yet. No information was sent.`;
  });
});
authForm.addEventListener("submit", event => {
  event.preventDefault();
  notice.textContent = "";

  if (authStep === "email") {
    authStep = "credentials";
    authDescription.textContent = authMode === "signup"
      ? "Choose a name and password for your new account."
      : "Enter your password to continue.";
    passwordField.hidden = false;
    passwordInput.required = true;
    submitButton.textContent = "Log in";
    passwordInput.focus();
    return;
  }

  notice.textContent = authMode === "signup"
    ? "Account creation isn't connected yet. No information was sent or saved."
    : "Log in isn't connected yet. No information was sent or saved.";
});
authDialog.addEventListener("click", event => {
  if (event.target === authDialog) authDialog.close();
});
