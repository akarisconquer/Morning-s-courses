# HTML Fundamentals Course

A responsive, framework-free HTML course with 20 lessons and five real projects. The course is organized into JavaScript data structures in `app.js`. Lesson progress, practice drafts, passed code checks, and project drafts are saved in browser localStorage. Each project includes a blank editor and a sandboxed HTML preview.

Accounts are powered by Netlify Identity. The profile button opens a dialog for signing up, logging in, resetting a forgotten password, and logging out. Google and GitHub sign-in buttons appear automatically once those providers are enabled under **Project configuration > Identity > External providers** in the Netlify dashboard. Accounts only work on the Netlify deployment (or locally via `netlify dev`); the GitHub Pages copy has no Identity service.

## Run locally

From the workspace root:

```powershell
python -m http.server 4173
```

Then open `http://localhost:4173`. To test sign-up and login locally, run `netlify dev` instead so the Identity endpoint is available.

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
- `auth.js` - sign-up, login, password reset, and account menu (Netlify Identity)
