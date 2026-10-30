import { firebaseConfig } from "./firebase-config.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  updateProfile
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

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
  <section class="auth-account" id="authAccount" hidden>
    <p class="auth-account-email" id="authAccountEmail"></p>
    <button class="auth-submit" id="authSignOut" type="button">Log out</button>
  </section>
  <div id="authGuestContent">
    <form class="auth-form" id="authForm">
      <label class="auth-field" id="nameField">
        <span>Your name</span>
        <input id="authName" name="name" type="text" autocomplete="name" placeholder="John Stewart" required>
      </label>
      <label class="auth-field">
        <span>Email address</span>
        <input id="authEmail" name="email" type="email" autocomplete="email" placeholder="you@example.com" required>
      </label>
      <label class="auth-field" id="passwordField">
        <span>Password</span>
        <span class="password-input-wrap">
          <input id="authPassword" name="password" type="password" autocomplete="new-password" aria-describedby="passwordHint" minlength="8" required>
          <button class="password-visibility" id="passwordVisibility" type="button" aria-label="Show password" aria-pressed="false">
            <svg class="password-eye" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
            <svg class="password-eye-off" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" hidden>
              <path d="m3 3 18 18M10.6 10.6a2 2 0 0 0 2.8 2.8"/>
              <path d="M9.9 5.2A10.7 10.7 0 0 1 12 5c6.4 0 10 7 10 7a14.8 14.8 0 0 1-3.2 4.1M6.2 6.2C3.5 8 2 12 2 12s3.6 7 10 7c1.4 0 2.7-.4 3.8-.9"/>
            </svg>
          </button>
        </span>
        <span class="auth-field-hint" id="passwordHint">Use at least 8 characters; a longer, unique passphrase is safer. You can use letters, numbers, and symbols, but no particular mix is required. Avoid personal details and passwords you use elsewhere.</span>
      </label>
      <button class="auth-submit" type="submit">Create account</button>
      <button class="auth-link" id="authResetPassword" type="button" hidden>Forgot password?</button>
    </form>
    <div class="auth-divider">or continue with</div>
    <div class="auth-providers">
      <button class="auth-provider" type="button" data-provider="google">
        <svg class="provider-mark" aria-hidden="true" viewBox="0 0 48 48">
          <path fill="#4285F4" d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.5 9.5 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.9 6.1-15Z"/>
          <path fill="#34A853" d="M24 44c5.5 0 10.1-1.8 13.5-4.8l-6.6-5.1c-1.8 1.2-4.1 2-6.9 2-5.3 0-9.8-3.6-11.4-8.5H5.8v5.3A20 20 0 0 0 24 44Z"/>
          <path fill="#FBBC05" d="M12.6 27.6a12 12 0 0 1 0-7.2v-5.3H5.8a20 20 0 0 0 0 17.8l6.8-5.3Z"/>
          <path fill="#EA4335" d="M24 11.9c3 0 5.7 1 7.8 3.1l5.9-5.9C34.1 5.8 29.5 4 24 4A20 20 0 0 0 5.8 15.1l6.8 5.3c1.6-4.9 6.1-8.5 11.4-8.5Z"/>
        </svg>
        <span>Google</span>
      </button>
    </div>
    <p class="auth-switch"><span id="authSwitchPrompt">Already have an account?</span> <button id="authSwitchButton" type="button">Log in</button></p>
  </div>
  <p class="auth-notice" id="authNotice" role="status" aria-live="polite"></p>
  <p class="auth-legal">Authentication is securely handled by Firebase. Your password is never stored by this site.</p>
`;
document.body.append(authDialog);

const auth = isFirebaseConfigured(firebaseConfig)
  ? getAuth(initializeApp(firebaseConfig))
  : null;
const authForm = authDialog.querySelector("#authForm");
const authName = authDialog.querySelector("#authName");
const authEmail = authDialog.querySelector("#authEmail");
const authPassword = authDialog.querySelector("#authPassword");
const nameField = authDialog.querySelector("#nameField");
const passwordField = authDialog.querySelector("#passwordField");
const passwordHint = authDialog.querySelector("#passwordHint");
const passwordVisibility = authDialog.querySelector("#passwordVisibility");
const authSubmit = authForm.querySelector(".auth-submit");
const authGuestContent = authDialog.querySelector("#authGuestContent");
const authAccount = authDialog.querySelector("#authAccount");
const authAccountEmail = authDialog.querySelector("#authAccountEmail");
const authNotice = authDialog.querySelector("#authNotice");
const authTitle = authDialog.querySelector("#authTitle");
const authDescription = authDialog.querySelector("#authDescription");
const authSwitchPrompt = authDialog.querySelector("#authSwitchPrompt");
const authSwitch = authDialog.querySelector("#authSwitchButton");
const resetPasswordButton = authDialog.querySelector("#authResetPassword");
const authSignOut = authDialog.querySelector("#authSignOut");
let authMode = "signup";
let currentUser = null;

function isFirebaseConfigured(config) {
  return ["apiKey", "authDomain", "projectId", "appId"]
    .every(key => typeof config[key] === "string" && config[key].trim() !== "" && !config[key].startsWith("REPLACE_"));
}

function setAuthMode(mode) {
  authMode = mode;
  const isSignup = mode === "signup";
  authForm.reset();
  nameField.hidden = !isSignup;
  authName.required = isSignup;
  authPassword.minLength = isSignup ? 8 : 0;
  authPassword.autocomplete = isSignup ? "new-password" : "current-password";
  authPassword.type = "password";
  passwordVisibility.setAttribute("aria-label", "Show password");
  passwordVisibility.setAttribute("aria-pressed", "false");
  authDialog.querySelector(".password-eye").removeAttribute("hidden");
  authDialog.querySelector(".password-eye-off").setAttribute("hidden", "");
  passwordHint.hidden = !isSignup;
  authTitle.textContent = isSignup ? "Create an account" : "Welcome back";
  authDescription.textContent = isSignup
    ? "Save your learning progress and pick up where you left off."
    : "Enter your email and password to log in.";
  authSubmit.textContent = isSignup ? "Create account" : "Log in";
  authSwitchPrompt.textContent = isSignup ? "Already have an account?" : "New to Morning's Courses?";
  authSwitch.textContent = isSignup ? "Log in" : "Sign up";
  resetPasswordButton.hidden = isSignup;
  authDialog.querySelector(".auth-close").setAttribute(
    "aria-label",
    isSignup ? "Close sign-up dialog" : "Close log-in dialog"
  );
  authNotice.textContent = auth
    ? ""
    : "Authentication is not configured yet. Add the Firebase web app settings in firebase-config.js, then enable the sign-in providers in Firebase Console.";
}

function showAuthError(error) {
  const messages = {
    "auth/account-exists-with-different-credential": "An account already uses this email with a different sign-in method. Try the method you used before.",
    "auth/email-already-in-use": "An account already exists for this email. Log in instead.",
    "auth/invalid-credential": "That email or password is not correct.",
    "auth/invalid-email": "Enter a valid email address.",
    "auth/network-request-failed": "Network error. Check your connection and try again.",
    "auth/operation-not-allowed": "This sign-in method is not enabled in Firebase Authentication yet.",
    "auth/popup-blocked": "Your browser blocked the sign-in window. Allow pop-ups for this site and try again.",
    "auth/popup-closed-by-user": "The sign-in window was closed before authentication finished.",
    "auth/unauthorized-domain": "This website address is not authorized in Firebase Authentication. Add its hostname under Authentication settings.",
    "auth/user-disabled": "This account has been disabled. Contact the site administrator.",
    "auth/user-not-found": "No account was found for this email.",
    "auth/weak-password": "Choose a password with at least 8 characters.",
    "auth/wrong-password": "That email or password is not correct."
  };
  authNotice.textContent = messages[error.code] || `Authentication failed. ${error.message || "Please try again."}`;
}

async function runAuthAction(action) {
  if (!auth) {
    authNotice.textContent = "Authentication is not configured yet. Add the Firebase web app settings in firebase-config.js, then enable the sign-in providers in Firebase Console.";
    return;
  }
  authNotice.textContent = "";
  authSubmit.disabled = true;
  try {
    await setPersistence(auth, browserLocalPersistence);
    await action();
  } catch (error) {
    showAuthError(error);
  } finally {
    authSubmit.disabled = false;
  }
}

function updateProfileButton(user) {
  profileButton.classList.toggle("is-signed-in", Boolean(user));
  if (!user) {
    profileButton.innerHTML = `
      <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
        <circle cx="12" cy="8" r="3.5"></circle>
        <path d="M5 20c0-4.1 3.1-7 7-7s7 2.9 7 7"></path>
      </svg>`;
    profileButton.setAttribute("aria-label", "Sign up or log in");
    return;
  }
  const name = user.displayName || user.email || "Account";
  profileButton.textContent = name.trim().charAt(0).toUpperCase();
  profileButton.setAttribute("aria-label", `Signed in as ${name}. Open account`);
}

function showAccount(user) {
  currentUser = user;
  updateProfileButton(user);
  authGuestContent.hidden = Boolean(user);
  authAccount.hidden = !user;
  if (user) {
    authTitle.textContent = "Your account";
    authDescription.textContent = "You’re signed in to Morning’s Courses.";
    authAccountEmail.textContent = user.displayName
      ? `${user.displayName} · ${user.email || "Signed in with a provider"}`
      : user.email || "Signed in with a provider";
  } else {
    authTitle.textContent = "Create an account";
    authDescription.textContent = "Save your learning progress and pick up where you left off.";
  }
}

profileButton.addEventListener("click", () => {
  authNotice.textContent = auth
    ? ""
    : "Authentication is not configured yet. Add the Firebase web app settings in firebase-config.js, then enable the sign-in providers in Firebase Console.";
  if (currentUser) {
    showAccount(currentUser);
  } else {
    setAuthMode("signup");
    authGuestContent.hidden = false;
    authAccount.hidden = true;
  }
  authDialog.showModal();
});

authDialog.querySelector(".auth-close").addEventListener("click", () => authDialog.close());
authSwitch.addEventListener("click", () => setAuthMode(authMode === "signup" ? "login" : "signup"));
passwordVisibility.addEventListener("click", () => {
  const isVisible = authPassword.type === "password";
  authPassword.type = isVisible ? "text" : "password";
  passwordVisibility.setAttribute("aria-label", isVisible ? "Hide password" : "Show password");
  passwordVisibility.setAttribute("aria-pressed", String(isVisible));
  authDialog.querySelector(".password-eye").toggleAttribute("hidden", isVisible);
  authDialog.querySelector(".password-eye-off").toggleAttribute("hidden", !isVisible);
});

authForm.addEventListener("submit", event => {
  event.preventDefault();
  const email = authEmail.value.trim();
  const password = authPassword.value;
  runAuthAction(async () => {
    if (authMode === "signup") {
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      if (authName.value.trim()) {
        await updateProfile(credential.user, { displayName: authName.value.trim() });
      }
      showAccount(credential.user);
    } else {
      await signInWithEmailAndPassword(auth, email, password);
    }
  });
});

resetPasswordButton.addEventListener("click", () => runAuthAction(async () => {
  const email = authEmail.value.trim();
  if (!email) {
    authNotice.textContent = "Enter your email address first, then choose Forgot password.";
    return;
  }
  await sendPasswordResetEmail(auth, email);
  authNotice.textContent = "If an account exists for that email, Firebase will send a password reset link.";
}));

authDialog.querySelectorAll("[data-provider]").forEach(button => {
  button.addEventListener("click", () => runAuthAction(async () => {
    const provider = new GoogleAuthProvider();

    if (window.matchMedia("(max-width: 820px)").matches) {
      await signInWithRedirect(auth, provider);
    } else {
      await signInWithPopup(auth, provider);
    }
  }));
});

authSignOut.addEventListener("click", () => runAuthAction(async () => {
  await signOut(auth);
  setAuthMode("signup");
}));

authDialog.addEventListener("click", event => {
  if (event.target === authDialog) authDialog.close();
});

if (auth) {
  getRedirectResult(auth).catch(showAuthError);
  onAuthStateChanged(auth, showAccount);
} else {
  authNotice.textContent = "Firebase is not configured yet. Follow the setup steps in README.md to enable authentication.";
}
