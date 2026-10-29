import { firebaseConfig } from "./firebase-config.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  onAuthStateChanged,
  OAuthProvider,
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
        <input id="authName" name="name" type="text" autocomplete="name" required>
      </label>
      <label class="auth-field">
        <span>Email address</span>
        <input id="authEmail" name="email" type="email" autocomplete="email" placeholder="you@example.com" required>
      </label>
      <label class="auth-field" id="passwordField">
        <span>Password</span>
        <input id="authPassword" name="password" type="password" autocomplete="new-password" minlength="8" required>
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
      <button class="auth-provider" type="button" data-provider="apple">
        <svg class="provider-mark provider-mark-apple" aria-hidden="true" viewBox="0 0 24 24">
          <path d="M16.37 12.53c.02 2.14 1.88 2.85 1.9 2.86-.02.05-.3 1.03-.98 2.04-.59.87-1.2 1.73-2.16 1.75-.94.02-1.24-.56-2.32-.56-1.08 0-1.42.54-2.31.58-.93.04-1.64-.94-2.24-1.81-1.22-1.76-2.15-4.97-.9-7.14a3.47 3.47 0 0 1 2.92-1.77c.91-.02 1.77.62 2.33.62.55 0 1.59-.77 2.68-.66.46.02 1.76.19 2.59 1.42-.07.04-1.55.9-1.53 2.67ZM14.61 6.98a3.42 3.42 0 0 0 .78-2.45 3.47 3.47 0 0 0-2.24 1.18 3.23 3.23 0 0 0-.8 2.36 2.88 2.88 0 0 0 2.26-1.09Z"/>
        </svg>
        <span>Apple</span>
      </button>
      <button class="auth-provider" type="button" data-provider="microsoft">
        <svg class="provider-mark provider-mark-microsoft" aria-hidden="true" viewBox="0 0 24 24">
          <path fill="#F25022" d="M2 2h9.5v9.5H2z"/>
          <path fill="#7FBA00" d="M12.5 2H22v9.5h-9.5z"/>
          <path fill="#00A4EF" d="M2 12.5h9.5V22H2z"/>
          <path fill="#FFB900" d="M12.5 12.5H22V22h-9.5z"/>
        </svg>
        <span>Microsoft</span>
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
    let provider;
    switch (button.dataset.provider) {
      case "google":
        provider = new GoogleAuthProvider();
        break;
      case "apple":
        provider = new OAuthProvider("apple.com");
        provider.addScope("email");
        provider.addScope("name");
        break;
      case "microsoft":
        provider = new OAuthProvider("microsoft.com");
        break;
      default:
        throw new Error("Unsupported sign-in provider.");
    }

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
