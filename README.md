# HTML Fundamentals Course

A responsive, framework-free HTML course with 20 lessons and five real projects. The course is organized into JavaScript data structures in `app.js`. Lesson progress, practice drafts, passed code checks, and project drafts are saved in browser localStorage. Each project includes a blank editor and a sandboxed HTML preview.

Authentication uses Firebase Authentication for email/password, Google, Apple, and Microsoft sign-in. The public Firebase web-app configuration is kept in `firebase-config.js`; OAuth client secrets must only be entered in Firebase and provider dashboards, never in the website code.

## Run locally

From the workspace root:

```powershell
python -m http.server 4173
```

Then open `http://localhost:4173`.

## Configure authentication

The sign-in UI is wired to Firebase Authentication, but real accounts work only after you connect a Firebase project and enable the providers:

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/) and register a **Web app**.
2. Copy the web app's `apiKey`, `authDomain`, `projectId`, and `appId` into `firebase-config.js`. This browser configuration is public by design; do not put service-account keys, OAuth client secrets, or private keys in this file.
3. In **Authentication → Sign-in method**, enable **Email/Password**, **Google**, **Apple**, and **Microsoft**.
4. In **Authentication → Settings → Authorized domains**, add `akarisconquer.github.io`, `localhost`, and `127.0.0.1` (and any custom domain you use).
5. Configure the provider credentials in Firebase:
   - **Google:** enable the provider in Firebase and use its configured OAuth client.
   - **Apple:** configure Sign in with Apple in the Apple Developer portal, then enter the Service ID, Team ID, key ID, and private key in Firebase. Apple requires an Apple Developer Program membership. Register Firebase's OAuth handler URL shown in Firebase as Apple's Return URL.
   - **Microsoft:** register an app in Microsoft Entra ID, then enter its client ID and client secret in Firebase. Add the Firebase OAuth handler URL shown in Firebase as the redirect URI in Microsoft Entra.
6. Publish through GitHub Pages. Test locally using `http://localhost:4173` rather than opening the HTML files as `file://`; OAuth requires an authorized web origin.

Firebase persists the sign-in session in the browser. Course progress remains in localStorage and is not yet synced between devices.

## Publish with GitHub Pages

This is a static site and does not need a build step. The workflow at `.github/workflows/deploy-pages.yml` publishes the required HTML, CSS, and JavaScript files whenever `main` or `master` is pushed.

1. Create a new **public, empty** repository on GitHub. Do not initialize it with another README or license.
2. From this workspace folder, initialize Git and publish the site:

   ```powershell
   git init
   git add index.html html-course.html styles.css app.js auth.js README.md .gitignore .github/workflows/deploy-pages.yml
   git commit -m "Prepare Morning's Courses for GitHub Pages"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
   git push -u origin main
   ```

3. In the GitHub repository, open **Settings → Pages** and set the source to **GitHub Actions**.
4. Open the **Actions** tab and wait for **Deploy static site to GitHub Pages** to finish. GitHub will show the public URL in the deployment environment and Pages settings.

The workflow deliberately copies only the site files to Pages, not workspace configuration or other repository files. Subsequent pushes to `main` automatically update the site.

## Course structure

- Module 1: Foundations - Personal Profile project
- Module 2: Content and Structure - Study Guide project
- Module 3: Forms and User Input - Event Registration project
- Module 4: Rich Media - Recipe Page project
- Module 5: Polishing and Publishing - Portfolio Site project

## Files

- `index.html` - semantic application shell
- `styles.css` - responsive course interface and themes
- `app.js` - course data, navigation, and progress tracking
- `auth.js` - Firebase Authentication UI and provider flows
- `firebase-config.js` - public Firebase web app configuration
