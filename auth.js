import {
  AuthError,
  MissingIdentityError,
  acceptInvite,
  getSettings,
  getUser,
  handleAuthCallback,
  login,
  logout,
  oauthLogin,
  onAuthChange,
  requestPasswordRecovery,
  signup,
  updateUser
} from "https://esm.sh/@netlify/identity@2.0.0";

const profileButton = document.querySelector("#profileButton");
const guestAvatar = profileButton.innerHTML;
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
    <label class="auth-field" id="emailField">
      <span>Email address</span>
      <input id="authEmail" name="email" type="email" autocomplete="email" placeholder="you@example.com" required>
    </label>
    <label class="auth-field" id="passwordField" hidden>
      <span>Password</span>
      <input id="authPassword" name="password" type="password" autocomplete="new-password" minlength="8">
    </label>
    <button class="auth-submit" type="submit">Continue</button>
    <button class="auth-link" id="forgotButton" type="button" hidden>Forgot your password?</button>
  </form>
  <div class="auth-account" id="authAccount" hidden>
    <p class="auth-account-email" id="accountEmail"></p>
    <button class="auth-submit auth-logout" id="logoutButton" type="button">Log out</button>
  </div>
  <div class="auth-oauth" id="authOauth" hidden>
    <div class="auth-divider">or continue with</div>
    <div class="auth-providers">
      <button class="auth-provider" type="button" data-provider="google" hidden>
        <svg class="provider-mark" aria-hidden="true" viewBox="0 0 48 48">
          <path fill="#4285F4" d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.5 9.5 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.9 6.1-15Z"/>
          <path fill="#34A853" d="M24 44c5.5 0 10.1-1.8 13.5-4.8l-6.6-5.1c-1.8 1.2-4.1 2-6.9 2-5.3 0-9.8-3.6-11.4-8.5H5.8v5.3A20 20 0 0 0 24 44Z"/>
          <path fill="#FBBC05" d="M12.6 27.6a12 12 0 0 1 0-7.2v-5.3H5.8a20 20 0 0 0 0 17.8l6.8-5.3Z"/>
          <path fill="#EA4335" d="M24 11.9c3 0 5.7 1 7.8 3.1l5.9-5.9C34.1 5.8 29.5 4 24 4A20 20 0 0 0 5.8 15.1l6.8 5.3c1.6-4.9 6.1-8.5 11.4-8.5Z"/>
        </svg>
        <span>Google</span>
      </button>
      <button class="auth-provider" type="button" data-provider="github" hidden>
        <svg class="provider-mark provider-mark-github" aria-hidden="true" viewBox="0 0 24 24">
          <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/>
        </svg>
        <span>GitHub</span>
      </button>
    </div>
  </div>
  <p class="auth-notice" id="authNotice" role="status" aria-live="polite"></p>
  <p class="auth-switch" id="authSwitch"><span id="authSwitchPrompt">Already have an account?</span> <button id="authSwitchButton" type="button">Log in</button></p>
`;
document.body.append(authDialog);

const authTitle = authDialog.querySelector("#authTitle");
const authDescription = authDialog.querySelector("#authDescription");
const authForm = authDialog.querySelector("#authForm");
const emailField = authDialog.querySelector("#emailField");
const authEmail = authDialog.querySelector("#authEmail");
const nameField = authDialog.querySelector("#nameField");
const nameInput = authDialog.querySelector("#authName");
const passwordField = authDialog.querySelector("#passwordField");
const passwordInput = authDialog.querySelector("#authPassword");
const submitButton = authDialog.querySelector(".auth-submit");
const forgotButton = authDialog.querySelector("#forgotButton");
const accountPanel = authDialog.querySelector("#authAccount");
const accountEmail = authDialog.querySelector("#accountEmail");
const logoutButton = authDialog.querySelector("#logoutButton");
const oauthPanel = authDialog.querySelector("#authOauth");
const providerButtons = authDialog.querySelectorAll("[data-provider]");
const notice = authDialog.querySelector("#authNotice");
const authSwitch = authDialog.querySelector("#authSwitch");
const switchPrompt = authDialog.querySelector("#authSwitchPrompt");
const switchButton = authDialog.querySelector("#authSwitchButton");

// Modes: signup, login, forgot, reset (after a recovery link), invite (after an invite link), account
let authMode = "signup";
let authStep = "email";
let currentUser = null;
let inviteToken = null;
let settings = null;

const modeText = {
  signup: ["Create an account", "Save your learning progress and pick up where you left off.", "Create account"],
  login: ["Welcome back", "Enter your email to continue to your account.", "Continue"],
  forgot: ["Reset your password", "Enter your email and we'll send you a link to choose a new password.", "Send reset link"],
  reset: ["Choose a new password", "Enter a new password for your account.", "Save password"],
  invite: ["Accept your invite", "Choose a password to finish setting up your account.", "Create account"]
};

function displayName(user) {
  return user.name || user.userMetadata?.full_name || user.email || "Learner";
}

function renderAvatar() {
  if (currentUser) {
    const initial = displayName(currentUser).trim().charAt(0).toUpperCase() || "M";
    profileButton.classList.add("is-signed-in");
    profileButton.textContent = initial;
    profileButton.setAttribute("aria-label", `Account: ${displayName(currentUser)}`);
  } else {
    profileButton.classList.remove("is-signed-in");
    profileButton.innerHTML = guestAvatar;
    profileButton.setAttribute("aria-label", "Sign up or log in");
  }
}

function showProviders(visible) {
  const enabled = [...providerButtons].filter(button => settings?.providers?.[button.dataset.provider]);
  providerButtons.forEach(button => { button.hidden = !enabled.includes(button); });
  oauthPanel.hidden = !visible || enabled.length === 0;
}

function setAuthMode(mode) {
  authMode = mode;
  authStep = mode === "login" ? "email" : "credentials";
  authForm.reset();
  notice.textContent = "";
  submitButton.disabled = false;

  if (mode === "account") {
    authForm.hidden = true;
    accountPanel.hidden = false;
    authSwitch.hidden = true;
    showProviders(false);
    authTitle.textContent = `Hi, ${displayName(currentUser)}`;
    authDescription.textContent = "You're signed in to Morning's Courses.";
    accountEmail.textContent = currentUser.email || "";
    authDialog.querySelector(".auth-close").setAttribute("aria-label", "Close account dialog");
    return;
  }

  const [title, description, submitLabel] = modeText[mode];
  const needsName = mode === "signup";
  const needsEmail = mode === "signup" || mode === "login" || mode === "forgot";
  const needsPassword = mode === "signup" || mode === "reset" || mode === "invite";
  const newPassword = mode !== "login";

  authForm.hidden = false;
  accountPanel.hidden = true;
  nameField.hidden = !needsName;
  nameInput.required = needsName;
  emailField.hidden = !needsEmail;
  authEmail.required = needsEmail;
  passwordField.hidden = !needsPassword;
  passwordInput.required = needsPassword;
  passwordInput.minLength = newPassword ? 8 : 1;
  passwordInput.autocomplete = newPassword ? "new-password" : "current-password";
  forgotButton.hidden = true;
  authTitle.textContent = title;
  authDescription.textContent = description;
  submitButton.textContent = submitLabel;

  const canSwitch = mode === "signup" || mode === "login" || mode === "forgot";
  authSwitch.hidden = !canSwitch || (mode !== "signup" && settings?.disableSignup);
  switchPrompt.textContent = mode === "signup" ? "Already have an account?" : "New to Morning's Courses?";
  switchButton.textContent = mode === "signup" ? "Log in" : "Sign up";
  showProviders(mode === "signup" || mode === "login");
  authDialog.querySelector(".auth-close").setAttribute(
    "aria-label",
    mode === "signup" ? "Close sign-up dialog" : "Close log-in dialog"
  );
}

function openDialog(mode) {
  setAuthMode(mode);
  if (!authDialog.open) authDialog.showModal();
}

function errorMessage(error) {
  if (error instanceof MissingIdentityError) {
    return "Accounts aren't available right now. Please try again later.";
  }
  if (error instanceof AuthError) {
    if (/not confirmed/i.test(error.message)) return "Please confirm your email first. Check your inbox for the link we sent.";
    switch (error.status) {
      case 400:
      case 401:
        return authMode === "login" ? "Invalid email or password." : error.message;
      case 403:
        return "Sign-ups are closed. Ask the site owner for an invite.";
      case 422:
        return /already/i.test(error.message)
          ? "An account with this email already exists. Try logging in instead."
          : "Please check your email and password (at least 8 characters).";
      case 429:
        return "Too many attempts. Please wait a moment and try again.";
      default:
        return error.message || "Something went wrong. Please try again.";
    }
  }
  return "Something went wrong. Please try again.";
}

async function submitAuth() {
  const email = authEmail.value.trim();
  const password = passwordInput.value;

  if (authMode === "signup") {
    const user = await signup(email, password, { full_name: nameInput.value.trim() });
    if (user.emailVerified || user.confirmedAt) {
      authDialog.close();
    } else {
      setAuthMode("login");
      notice.textContent = `We sent a confirmation link to ${email}. Open it to activate your account.`;
    }
    return;
  }

  if (authMode === "login") {
    await login(email, password);
    authDialog.close();
    return;
  }

  if (authMode === "forgot") {
    await requestPasswordRecovery(email);
    notice.textContent = `If an account exists for ${email}, a reset link is on its way.`;
    return;
  }

  if (authMode === "reset") {
    await updateUser({ password });
    currentUser = await getUser();
    renderAvatar();
    setAuthMode("account");
    notice.textContent = "Your password has been updated.";
    return;
  }

  if (authMode === "invite") {
    await acceptInvite(inviteToken, password);
    inviteToken = null;
    authDialog.close();
  }
}

profileButton.addEventListener("click", () => {
  openDialog(currentUser ? "account" : settings?.disableSignup ? "login" : "signup");
});
authDialog.querySelector(".auth-close").addEventListener("click", () => authDialog.close());
switchButton.addEventListener("click", () => {
  setAuthMode(authMode === "signup" ? "login" : "signup");
  (authMode === "signup" ? nameInput : authEmail).focus();
});
forgotButton.addEventListener("click", () => {
  setAuthMode("forgot");
  authEmail.focus();
});
providerButtons.forEach(button => {
  button.addEventListener("click", () => {
    try {
      oauthLogin(button.dataset.provider);
    } catch (error) {
      notice.textContent = errorMessage(error);
    }
  });
});
logoutButton.addEventListener("click", async () => {
  logoutButton.disabled = true;
  try {
    await logout();
    authDialog.close();
  } catch (error) {
    notice.textContent = errorMessage(error);
  } finally {
    logoutButton.disabled = false;
  }
});
authForm.addEventListener("submit", async event => {
  event.preventDefault();
  notice.textContent = "";

  if (authMode === "login" && authStep === "email") {
    authStep = "credentials";
    authDescription.textContent = "Enter your password to continue.";
    passwordField.hidden = false;
    passwordInput.required = true;
    forgotButton.hidden = false;
    submitButton.textContent = "Log in";
    passwordInput.focus();
    return;
  }

  submitButton.disabled = true;
  try {
    await submitAuth();
  } catch (error) {
    notice.textContent = errorMessage(error);
  } finally {
    submitButton.disabled = false;
  }
});
authDialog.addEventListener("click", event => {
  if (event.target === authDialog) authDialog.close();
});

onAuthChange((event, user) => {
  currentUser = user;
  renderAvatar();
  if (event === "recovery") openDialog("reset");
});

async function initAuth() {
  try {
    settings = await getSettings();
  } catch {
    settings = null;
  }

  try {
    const result = await handleAuthCallback();
    if (result) {
      history.replaceState(null, "", location.pathname + location.search);
      currentUser = result.user;
      renderAvatar();
      if (result.type === "recovery") {
        openDialog("reset");
      } else if (result.type === "invite") {
        inviteToken = result.token;
        openDialog("invite");
      } else if (result.type === "confirmation") {
        openDialog("account");
        notice.textContent = "Your email is confirmed. Welcome to Morning's Courses!";
      } else if (result.type === "email_change") {
        openDialog("account");
        notice.textContent = "Your email address has been updated.";
      }
    }
  } catch (error) {
    openDialog("login");
    notice.textContent = errorMessage(error);
  }

  if (!currentUser) {
    currentUser = await getUser();
    renderAvatar();
  }
}

initAuth();
