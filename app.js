const modules = [
  {
    name: "Foundations",
    lessons: [
      { title: "How the Web Works", summary: "Learn how browsers, servers, and HTML turn a web address into a visible page.", sections: [
        { heading: "A request and a response", text: "When you enter a URL, your browser requests files from a server. The server responds with HTML, CSS, and JavaScript, and the browser builds the page you see.", code: "Browser → Request → Server\nServer → HTML response → Browser" },
        { heading: "HTML gives meaning", text: "HTML describes the structure and meaning of content. CSS controls presentation, while JavaScript controls behavior." }
      ]},
      { title: "Anatomy of an HTML Document", summary: "Build a valid page from the document type, head, and body.", sections: [
        { heading: "Start with the document", text: "Every modern HTML page needs a doctype and a document language. The head contains metadata, and the body contains visible content.", code: "<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\">\n    <title>My Page</title>\n  </head>\n  <body>\n    <h1>Hello!</h1>\n  </body>\n</html>" }
      ]},
      { title: "Headings and Paragraphs", summary: "Structure text with semantic headings and readable paragraphs.", sections: [
        { heading: "Use headings in order", text: "One page should normally have one main h1. Headings below it use h2, h3, and so on to create a useful outline.", code: "<h1>Recipe Guide</h1>\n<h2>Ingredients</h2>\n<p>Gather these items before cooking.</p>" },
        { heading: "Write meaningful text", text: "Paragraphs should contain complete units of thought. Avoid formatting each line as a separate paragraph." }
      ]},
      { title: "Links and Images", summary: "Connect pages and add accessible visual content.", sections: [
        { heading: "Link to another resource", text: "The anchor element creates a hyperlink. Its href attribute identifies the destination.", code: "<a href=\"https://example.com\">Visit Example</a>" },
        { heading: "Describe images", text: "The alt text is read by screen readers and shown if an image fails to load. It should describe useful content, while decorative images can use empty alt text.", code: "<img src=\"cat.jpg\" alt=\"Orange cat sitting near a window\">" }
      ]}
    ],
    project: { title: "Project 1: Personal Profile", summary: "Create a complete profile page using the document structure, text, links, and images covered so far.", requirements: ["Use a valid HTML document", "Add a single h1 and relevant subheadings", "Include at least two paragraphs", "Add one external link and one local or remote image", "Write useful alt text for the image"] , starter: "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <title>My Profile</title>\n</head>\n<body>\n  <!-- Build your profile here -->\n</body>\n</html>" }
  },
  {
    name: "Content & Structure",
    lessons: [
      { title: "Lists That Make Sense", summary: "Present steps, choices, and unordered information clearly.", sections: [{ heading: "Choose the right list", text: "Use ul for unordered items, ol for ordered items, and li for each list item.", code: "<ul>\n  <li>HTML</li>\n  <li>CSS</li>\n</ul>\n\n<ol>\n  <li>Open editor</li>\n  <li>Write markup</li>\n</ol>" }] },
      { title: "Tables for Data", summary: "Represent two-dimensional data without using tables for layout.", sections: [{ heading: "Give data a header", text: "Use thead, tbody, tr, th, and td to make tabular information understandable.", code: "<table>\n  <thead>\n    <tr><th>Language</th><th>Level</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>HTML</td><td>Beginner</td></tr>\n  </tbody>\n</table>" }] },
      { title: "Semantic Page Sections", summary: "Use meaningful landmarks such as header, main, article, and footer.", sections: [{ heading: "Let HTML describe purpose", text: "Semantic elements help navigation tools, search engines, and other developers understand the page.", code: "<header>Site identity</header>\n<main>Primary content</main>\n<aside>Related content</aside>\n<footer>Copyright</footer>" }] },
      { title: "The Content Model", summary: "Understand which elements can contain one another.", sections: [{ heading: "Avoid invalid nesting", text: "Block-level and text elements have specific content rules. Valid nesting keeps browsers from repairing markup unpredictably.", code: "<!-- Common valid pattern -->\n<article>\n  <h2>Title</h2>\n  <p>Paragraph text.</p>\n</article>" }, { heading: "Developer tools help", text: "If a document looks visually broken, inspect the rendered HTML and use a validator to find malformed structure." }] }
    ],
    project: { title: "Project 2: Study Guide", summary: "Build a structured study guide that uses lists, a data table, and semantic page sections.", requirements: ["Create header, main, aside, and footer landmarks", "Include ordered and unordered lists", "Add a table with a header and body", "Add an article with a title and paragraphs", "Use valid semantic nesting"] , starter: "<!DOCTYPE html>\n<html lang=\"en\">\n<body>\n  <header>\n    <h1>HTML Study Guide</h1>\n  </header>\n  <!-- Add your guide -->\n</body>\n</html>" }
  },
  {
    name: "Forms & User Input",
    lessons: [
      { title: "Building a Form", summary: "Collect user data with a form and a submit action.", sections: [{ heading: "Wrap controls in a form", text: "The form element groups controls. Give every control a useful name and label.", code: "<form action=\"/submit\" method=\"post\">\n  <label for=\"email\">Email</label>\n  <input type=\"email\" id=\"email\" name=\"email\">\n  <button type=\"submit\">Submit</button>\n</form>" }] },
      { title: "Input Types", summary: "Choose controls that match the kind of information you need.", sections: [{ heading: "Use specific types", text: "Types such as email, number, date, and tel offer appropriate controls and browser validation.", code: "<input type=\"email\" name=\"email\">\n<input type=\"date\" name=\"birthday\">\n<input type=\"tel\" name=\"phone\">" }] },
      { title: "Labels and Fieldsets", summary: "Make forms understandable for keyboard and screen reader users.", sections: [{ heading: "Connect labels explicitly", text: "A label's for attribute matches an input's id. This expands the clickable area and communicates the control's purpose.", code: "<label for=\"name\">Full name</label>\n<input id=\"name\" name=\"name\">" }, { heading: "Group related choices", text: "Use fieldset and legend to identify groups of radio buttons or checkboxes." }] },
      { title: "Validation Basics", summary: "Guide users with required fields and meaningful constraints.", sections: [{ heading: "Use native validation", text: "Attributes such as required, minlength, maxlength, min, and max allow the browser to enforce common rules.", code: "<input type=\"text\" name=\"username\" required minlength=\"3\">\n<input type=\"number\" name=\"age\" min=\"13\" max=\"120\">" }] }
    ],
    project: { title: "Project 3: Event Registration", summary: "Create a practical event signup form with varied controls and accessible grouping.", requirements: ["Include text, email, date, and select controls", "Use fieldset and legend for related choices", "Connect every label to its control", "Mark required fields", "Include a submit button and helpful instructions"] , starter: "<!DOCTYPE html>\n<html lang=\"en\">\n<body>\n  <h1>Register for the Workshop</h1>\n  <form>\n    <!-- Add registration controls -->\n  </form>\n</body>\n</html>" }
  },
  {
    name: "Rich Media",
    lessons: [
      { title: "Accessible Images", summary: "Choose the right image element and describe it responsibly.", sections: [{ heading: "Write useful alternative text", text: "Describe information and function rather than repeating a generic phrase. Empty alt text is appropriate for decorative images.", code: "<img src=\"team.jpg\" alt=\"Four developers collaborating around a table\">\n<img src=\"divider.png\" alt=\"\">" }] },
      { title: "Picture and Responsive Images", summary: "Deliver appropriate image sources for different screens.", sections: [{ heading: "Let the browser select", text: "picture can select an art-directed source. srcset with sizes allows the browser to choose based on pixel density and layout.", code: "<picture>\n  <source media=\"(max-width: 600px)\" srcset=\"small.jpg\">\n  <img src=\"large.jpg\" alt=\"Mountain trail\">\n</picture>" }] },
      { title: "Audio and Video", summary: "Embed media with controls, sources, and fallback content.", sections: [{ heading: "Provide controls and options", text: "Use controls for playback. Add multiple source formats when browser support differs, and provide captions or transcripts for video.", code: "<video controls width=\"640\">\n  <source src=\"lesson.mp4\" type=\"video/mp4\">\n  Your browser does not support video.\n</video>" }] },
      { title: "Embedding Content", summary: "Understand the strengths and risks of embedded resources.", sections: [{ heading: "Use iframe carefully", text: "An iframe loads another HTML document. Always provide a descriptive title and only embed trusted sources when possible.", code: "<iframe src=\"https://example.com/map\" title=\"Workshop location map\"></iframe>" }] }
    ],
    project: { title: "Project 4: Recipe Page", summary: "Design a rich recipe document with an image, ingredient list, instructions, and media.", requirements: ["Include at least one responsive image", "Use an ordered list for cooking steps", "Use an unordered list for ingredients", "Add audio or video content with controls when available", "Include alt text and a caption or transcript"] , starter: "<!DOCTYPE html>\n<html lang=\"en\">\n<body>\n  <article>\n    <h1>Weeknight Pasta</h1>\n    <!-- Add image, ingredients, steps, and media -->\n  </article>\n</body>\n</html>" }
  },
  {
    name: "Polishing & Publishing",
    lessons: [
      { title: "Metadata and Document Head", summary: "Improve discoverability and browser behavior with head metadata.", sections: [{ heading: "Describe the page", text: "A title names the page, while description and viewport metadata support search results and responsive layouts.", code: "<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<meta name=\"description\" content=\"A short description\">\n<title>Page Title</title>" }] },
      { title: "Accessibility", summary: "Apply language, keyboard, focus, and structure best practices.", sections: [{ heading: "Accessibility is structural", text: "Semantic HTML often provides accessible behavior by default. Add ARIA only when native HTML cannot express the relationship.", code: "<html lang=\"en\">\n<button type=\"button\">Open menu</button>" }, { heading: "Keep keyboard users in mind", text: "All interactive elements must be reachable, usable, and distinguishable with keyboard focus." }] },
      { title: "Validation and Quality", summary: "Check HTML for errors and improve consistency before publishing.", sections: [{ heading: "Validate your document", text: "HTML validators find broken nesting, missing attributes, duplicate IDs, and other issues.", code: "Checklist:\n✓ Unique IDs\n✓ All images have alt text\n✓ Every form control has a label\n✓ Headings follow a logical order" }] },
      { title: "Publishing Your Site", summary: "Prepare files and publish a static HTML site.", sections: [{ heading: "Keep paths relative", text: "Place HTML, stylesheets, scripts, and images in a clear folder structure. Relative paths connect them without depending on your local computer.", code: "index.html\nstyles.css\nimages/\n  portrait.jpg" }, { heading: "Publish when ready", text: "Upload the site to any static web host. Make sure index.html is at the public root and test every link and resource in the deployed version." }] }
    ],
    project: { title: "Project 5: Portfolio Site", summary: "Combine everything into a polished multi-section portfolio site with complete metadata and accessibility checks.", requirements: ["Use semantic sections and navigation", "Include a project table or card list", "Add contact details or a contact form", "Use an image with useful alt text", "Validate document head and keyboard accessibility"] , starter: "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  <title>Your Name | Portfolio</title>\n</head>\n<body>\n  <!-- Build your portfolio -->\n</body>\n</html>" }
  }
];

const lessonItems = [];
modules.forEach((module, moduleIndex) => {
  module.lessons.forEach((lesson, lessonIndex) => {
    lessonItems.push({ ...lesson, kind: "lesson", moduleIndex, lessonIndex, moduleName: module.name });
  });
  lessonItems.push({ ...module.project, kind: "project", moduleIndex, lessonIndex: module.lessons.length, moduleName: module.name });
});

const storageKey = "markup-html-progress-v1";
let completed = new Set(JSON.parse(localStorage.getItem(storageKey) || "[]"));
let activeIndex = Number(localStorage.getItem("markup-html-active")) || 0;
let projectEditorOpen = false;
const practicePassedKey = "markup-html-practice-passed-v2";
const practicePassed = new Map(
  Object.entries(JSON.parse(localStorage.getItem(practicePassedKey) || "{}"))
    .map(([index, source]) => [Number(index), source])
);

const practiceChallenges = {
  "Anatomy of an HTML Document": {
    task: "Write a basic HTML document with a doctype, language, head, title, and body.",
    checks: [
      { type: "sourceIncludes", value: "<!doctype html", message: "Start with <!DOCTYPE html>." },
      { type: "sourceIncludes", value: "</body>", message: "Close the body element with </body>." },
      { type: "sourceIncludes", value: "</html>", message: "Close the html element with </html>." },
      { type: "nonEmptyAttribute", selector: "html", attribute: "lang", message: "Set a language on the html element, such as lang=\"en\"." },
      { type: "nonEmptyText", selector: "head title", message: "Add a page title inside the head." },
      { type: "nonEmptyText", selector: "body h1", message: "Add a heading inside the body." }
    ]
  },
  "Headings and Paragraphs": {
    task: "Add one main heading, a section heading, and a paragraph about a topic you enjoy.",
    checks: [
      { type: "count", selector: "h1", min: 1, max: 1, message: "Use exactly one h1 as the main heading." },
      { type: "nonEmptyText", selector: "h2", message: "Add text to an h2 section heading." },
      { type: "nonEmptyText", selector: "p", message: "Add text to a paragraph." }
    ]
  },
  "Links and Images": {
    task: "Create a link and an image. Give the link a destination and the image a source and descriptive alt text.",
    checks: [
      { type: "nonEmptyAttribute", selector: "a", attribute: "href", message: "Give the link a destination in href." },
      { type: "nonEmptyText", selector: "a", message: "Add descriptive text to the link." },
      { type: "nonEmptyAttribute", selector: "img", attribute: "src", message: "Give the image a file path in src." },
      { type: "nonEmptyAttribute", selector: "img", attribute: "alt", minLength: 3, message: "Write a useful image description in alt." }
    ]
  },
  "Lists That Make Sense": {
    task: "Create an unordered list and an ordered list, each with at least two items.",
    checks: [
      { type: "count", selector: "ul > li", min: 2, message: "Add at least two list items inside a ul." },
      { type: "nonEmptyText", selector: "ul > li", message: "Add text to the unordered list items." },
      { type: "count", selector: "ol > li", min: 2, message: "Add at least two list items inside an ol." },
      { type: "nonEmptyText", selector: "ol > li", message: "Add text to the ordered list items." }
    ]
  },
  "Tables for Data": {
    task: "Build a small data table with a header row and at least one data row.",
    checks: [
      { type: "exists", selector: "table thead th", message: "Add a table header using th inside thead." },
      { type: "nonEmptyText", selector: "table thead th", message: "Add a label to the table header." },
      { type: "exists", selector: "table tbody td", message: "Add a data cell using td inside tbody." },
      { type: "nonEmptyText", selector: "table tbody td", message: "Add data to the table body." }
    ]
  },
  "Semantic Page Sections": {
    task: "Use semantic elements to create a page header, main content, related aside, and footer.",
    checks: ["header", "main", "aside", "footer"].map(tag => ({
      type: "nonEmptyText",
      selector: tag,
      message: `Add content inside the ${tag} element.`
    }))
  },
  "The Content Model": {
    task: "Place a heading and paragraph inside an article element.",
    checks: [
      { type: "nonEmptyText", selector: "article > h2", message: "Add a heading directly inside article." },
      { type: "nonEmptyText", selector: "article > p", message: "Add a paragraph directly inside article." }
    ]
  },
  "Building a Form": {
    task: "Create a form with a labeled email field and a submit button.",
    checks: [
      { type: "exists", selector: "form input[type=\"email\"]", message: "Add an email input inside the form." },
      { type: "labelsConnected", selector: "form input[type=\"email\"]", message: "Connect a label to the email input using matching for and id values." },
      { type: "nonEmptyText", selector: "form button[type=\"submit\"]", message: "Give the submit button a useful label." }
    ]
  },
  "Input Types": {
    task: "Add email, date, and telephone inputs using their matching input types.",
    checks: ["email", "date", "tel"].map(type => ({
      type: "exists",
      selector: `input[type="${type}"]`,
      message: `Add an input with type="${type}".`
    }))
  },
  "Labels and Fieldsets": {
    task: "Group a labeled choice inside a fieldset and give the group a legend.",
    checks: [
      { type: "nonEmptyText", selector: "fieldset legend", message: "Add a descriptive legend inside the fieldset." },
      { type: "exists", selector: "fieldset input", message: "Add a form control inside the fieldset." },
      { type: "labelsConnected", selector: "fieldset input", message: "Connect the control to its label with matching for and id values." }
    ]
  },
  "Validation Basics": {
    task: "Create a required username with a minimum length and an age field limited to 13–120.",
    checks: [
      { type: "attributeValue", selector: "input[required][minlength]", attribute: "minlength", value: "3", message: "Set minlength to 3 on a required input." },
      { type: "attributeValue", selector: "input[type=\"number\"][min][max]", attribute: "min", value: "13", message: "Set the minimum age to 13." },
      { type: "attributeValue", selector: "input[type=\"number\"][min][max]", attribute: "max", value: "120", message: "Set the maximum age to 120." }
    ]
  },
  "Accessible Images": {
    task: "Add an informative image with descriptive alt text and a decorative image with empty alt text.",
    checks: [
      { type: "exists", selector: "img[alt]:not([alt=\"\"])", message: "Add an informative image with non-empty alt text." },
      { type: "imagesHaveAlt", message: "Give every image an alt attribute." },
      { type: "exists", selector: "img[alt=\"\"]", message: "Mark the decorative image with alt=\"\"." }
    ]
  },
  "Picture and Responsive Images": {
    task: "Use picture and source to offer an alternate image, with an img fallback and alt text.",
    checks: [
      { type: "exists", selector: "picture source[srcset]", message: "Add a source with a srcset inside picture." },
      { type: "exists", selector: "picture img[src][alt]", message: "Add an img fallback with src and alt inside picture." }
    ]
  },
  "Audio and Video": {
    task: "Add a video with playback controls and at least one source element.",
    checks: [
      { type: "exists", selector: "video[controls] source[src]", message: "Add a source with a file path inside a video that has controls." }
    ]
  },
  "Embedding Content": {
    task: "Embed a trusted page in an iframe and give the frame a descriptive title.",
    checks: [
      { type: "nonEmptyAttribute", selector: "iframe", attribute: "src", message: "Set the iframe src to the page you want to embed." },
      { type: "nonEmptyAttribute", selector: "iframe", attribute: "title", minLength: 3, message: "Give the iframe a descriptive title." }
    ]
  },
  "Metadata and Document Head": {
    task: "Create a document head with a title, viewport setting, and description metadata.",
    checks: [
      { type: "sourceIncludes", value: "<!doctype html", message: "Start with <!DOCTYPE html>." },
      { type: "nonEmptyText", selector: "head title", message: "Add a page title inside head." },
      { type: "exists", selector: "head meta[name=\"viewport\"]", message: "Add viewport metadata inside head." },
      { type: "nonEmptyAttribute", selector: "head meta[name=\"viewport\"]", attribute: "content", message: "Set the viewport metadata content." },
      { type: "nonEmptyAttribute", selector: "head meta[name=\"description\"]", attribute: "content", minLength: 10, message: "Write a useful page description in the metadata." }
    ]
  },
  "Accessibility": {
    task: "Set the document language and add a native button that can be used to open a menu.",
    checks: [
      { type: "nonEmptyAttribute", selector: "html", attribute: "lang", message: "Set the document language with html lang." },
      { type: "nonEmptyText", selector: "button[type=\"button\"]", message: "Give the button an accessible label." }
    ]
  },
  "Validation and Quality": {
    task: "Create a page with unique IDs, an image alt attribute, and a label connected to a form field.",
    checks: [
      { type: "uniqueIds", message: "Make sure every id value is unique." },
      { type: "imagesHaveAlt", message: "Add at least one image and give every image an alt attribute." },
      { type: "labelsConnected", message: "Connect the label to the input using matching for and id values." }
    ]
  },
  "Publishing Your Site": {
    task: "Link a stylesheet and an image using relative file paths, not full web addresses.",
    checks: [
      { type: "relativeStylesheet", message: "Link a stylesheet with a relative href such as styles.css." },
      { type: "relativeImage", message: "Add an image with a relative src path and alt text." }
    ]
  }
};

const courseNav = document.querySelector("#courseNav");
const lessonKicker = document.querySelector("#lessonKicker");
const lessonTitle = document.querySelector("#lessonTitle");
const lessonSummary = document.querySelector("#lessonSummary");
const lessonContent = document.querySelector("#lessonContent");
const completeButton = document.querySelector("#completeButton");
const previousButton = document.querySelector("#previousButton");
const courseProgress = document.querySelector("#courseProgress");
const coursePercent = document.querySelector("#coursePercent");

function renderNav() {
  courseNav.innerHTML = modules.map((module, moduleIndex) => {
    const items = [];
    module.lessons.forEach((lesson, lessonIndex) => {
      const index = lessonItems.findIndex(item => item.kind === "lesson" && item.moduleIndex === moduleIndex && item.lessonIndex === lessonIndex);
      items.push(`<button class="nav-item ${activeIndex === index ? "active" : ""} ${completed.has(index) ? "completed" : ""}" data-index="${index}"><span class="status-dot">${completed.has(index) ? "✓" : lessonIndex + 1}</span><span>${lesson.title}</span></button>`);
    });
    const projectIndex = lessonItems.findIndex(item => item.kind === "project" && item.moduleIndex === moduleIndex);
    items.push(`<button class="nav-item project-item ${activeIndex === projectIndex ? "active" : ""} ${completed.has(projectIndex) ? "completed" : ""}" data-index="${projectIndex}"><span class="status-dot">${completed.has(projectIndex) ? "✓" : "★"}</span><span>${module.project.title.replace("Project ", "Project ")}</span></button>`);
    return `<div class="nav-module"><button class="module-toggle" aria-expanded="true">${module.name}</button><div class="module-lessons">${items.join("")}</div></div>`;
  }).join("");
  updateProgress();
}

function escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function getPracticeErrors(challenge, source) {
  const document = new DOMParser().parseFromString(source, "text/html");
  return challenge.checks
    .filter(check => {
      switch (check.type) {
        case "exists":
          return !document.querySelector(check.selector);
        case "nonEmptyText": {
          const elements = [...document.querySelectorAll(check.selector)];
          return elements.length === 0 || elements.some(element => (
            !element.textContent.trim() && !element.getAttribute("aria-label")?.trim()
          ));
        }
        case "count": {
          const count = document.querySelectorAll(check.selector).length;
          return count < check.min || (check.max !== undefined && count > check.max);
        }
        case "nonEmptyAttribute": {
          const elements = [...document.querySelectorAll(check.selector)];
          return elements.length === 0 || elements.some(element => {
            const value = element.getAttribute(check.attribute)?.trim() || "";
            return value.length < (check.minLength || 1);
          });
        }
        case "attributeValue": {
          const elements = [...document.querySelectorAll(check.selector)];
          return elements.length === 0
            || elements.some(element => element.getAttribute(check.attribute) !== check.value);
        }
        case "textIncludes":
          return !document.body.textContent.toLowerCase().includes(check.value.toLowerCase());
        case "sourceIncludes":
          return !source.toLowerCase().includes(check.value);
        case "labelsConnected": {
          const controls = [...document.querySelectorAll(check.selector || "input[id], select[id], textarea[id]")];
          return controls.length === 0 || controls.some(control => (
            !control.id
            || ![...document.querySelectorAll("label[for]")].some(label => (
              label.htmlFor === control.id && label.textContent.trim()
            ))
          ));
        }
        case "uniqueIds": {
          const ids = [...document.querySelectorAll("[id]")].map(element => element.id);
          return new Set(ids).size !== ids.length;
        }
        case "imagesHaveAlt": {
          const images = [...document.querySelectorAll("img")];
          return images.length === 0 || images.some(image => !image.hasAttribute("alt"));
        }
        case "relativeStylesheet":
          return ![...document.querySelectorAll('link[rel~="stylesheet"][href]')]
            .some(link => !/^(?:[a-z][a-z\d+.-]*:|\/\/|\/)/i.test(link.getAttribute("href")));
        case "relativeImage":
          return ![...document.querySelectorAll("img[src][alt]")]
            .some(image => !/^(?:[a-z][a-z\d+.-]*:|\/\/|\/)/i.test(image.getAttribute("src")));
        default:
          return true;
      }
    })
    .map(check => check.message);
}

function savePracticePassed() {
  localStorage.setItem(practicePassedKey, JSON.stringify(Object.fromEntries(practicePassed)));
}

function renderLesson() {
  const item = lessonItems[activeIndex];
  completeButton.hidden = false;
  localStorage.setItem("markup-html-active", String(activeIndex));
  lessonKicker.textContent = `${item.moduleName} · ${item.kind === "project" ? "Hands-on project" : `Lesson ${item.lessonIndex + 1} of 4`}`;
  lessonTitle.textContent = item.title;
  lessonSummary.textContent = item.summary;

  if (item.kind === "lesson") {
    const challenge = practiceChallenges[item.title];
    let lessonMarkup = item.sections.map(section => `
      <section class="lesson-section">
        <h2>${section.heading}</h2>
        <p>${section.text}</p>
        ${section.code ? `<pre class="code-block"><code>${escapeHtml(section.code)}</code></pre>` : ""}
      </section>`).join("") + `
      `;
    if (challenge) {
      const draftKey = `markup-html-practice-draft-${activeIndex}`;
      const draft = localStorage.getItem(draftKey) || "";
      const passed = practicePassed.get(activeIndex) === draft;
      lessonMarkup += passed
        ? `<p class="practice-success" role="status">Great work!</p>`
        : `
          <section class="practice-panel" aria-labelledby="practiceTitle">
            <h2 id="practiceTitle">Practice the code</h2>
            <form class="practice-form">
              <label class="visually-hidden" for="practiceCode">HTML code</label>
              <textarea id="practiceCode" name="code" rows="1" spellcheck="false" autocapitalize="off" autocomplete="off" aria-describedby="practiceFeedback"></textarea>
              <div class="practice-actions">
                <button class="primary-button" type="submit">Check my code</button>
                <p class="practice-feedback" id="practiceFeedback" role="status" aria-live="polite"></p>
              </div>
            </form>
          </section>`;
    }
    lessonContent.innerHTML = lessonMarkup;
    if (challenge) {
      const practiceEditor = lessonContent.querySelector("#practiceCode");
      const passed = practicePassed.get(activeIndex) === (localStorage.getItem(`markup-html-practice-draft-${activeIndex}`) || "");
      if (practiceEditor) {
        practiceEditor.value = localStorage.getItem(`markup-html-practice-draft-${activeIndex}`) || "";
        resizePracticeEditor(practiceEditor);
      }
      if (!passed && practicePassed.has(activeIndex)) {
        practicePassed.delete(activeIndex);
        savePracticePassed();
      }
      completeButton.disabled = !passed;
    } else {
      completeButton.disabled = false;
    }
    completeButton.textContent = completed.has(activeIndex) ? "Lesson complete ✓" : "Complete lesson →";
  } else {
    if (projectEditorOpen) {
      lessonContent.innerHTML = `
        <section class="project-editor-panel" aria-label="Project code editor">
          <label class="visually-hidden" for="projectCode">Project HTML code</label>
          <textarea id="projectCode" spellcheck="false" autocapitalize="off" autocomplete="off"></textarea>
          <div class="project-editor-actions">
            <button class="secondary-button" id="backToProject" type="button">Back to project</button>
            <button class="primary-button" id="runProject" type="button">Run</button>
          </div>
        </section>
        <section class="project-output" id="projectOutput" aria-label="Project preview" hidden>
          <h2>Preview</h2>
          <iframe id="projectPreview" title="${escapeHtml(item.title)} preview" sandbox=""></iframe>
        </section>`;
      const projectCode = lessonContent.querySelector("#projectCode");
      projectCode.value = localStorage.getItem(`markup-html-project-${activeIndex}`) || "";
      completeButton.hidden = true;
    } else {
      lessonContent.innerHTML = `
        <section class="project-panel">
          <h2>Build brief</h2>
          <p>${item.summary}</p>
          <ul class="project-list">${item.requirements.map(requirement => `<li>${requirement}</li>`).join("")}</ul>
          <button class="primary-button" id="makeProject" type="button">Make a project</button>
        </section>`;
      completeButton.hidden = false;
    }
    completeButton.disabled = false;
    completeButton.textContent = completed.has(activeIndex) ? "Project complete ✓" : "Mark project complete ✓";
  }

  previousButton.textContent = activeIndex === 0 ? "← Home" : "← Previous";
  previousButton.disabled = activeIndex === 0;
  renderNav();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function resizePracticeEditor(editor) {
  editor.style.height = "48px";
  editor.style.height = `${Math.min(editor.scrollHeight, 240)}px`;
}

lessonContent.addEventListener("input", event => {
  if (event.target.id !== "practiceCode") return;
  resizePracticeEditor(event.target);
  const draftKey = `markup-html-practice-draft-${activeIndex}`;
  localStorage.setItem(draftKey, event.target.value);
  if (practicePassed.delete(activeIndex)) savePracticePassed();
  completeButton.disabled = true;
  const feedback = lessonContent.querySelector("#practiceFeedback");
  feedback.textContent = "";
  feedback.classList.remove("is-correct", "is-incorrect");
});

lessonContent.addEventListener("keydown", event => {
  if (!["practiceCode", "projectCode"].includes(event.target.id) || event.key !== "Tab") return;
  event.preventDefault();
  const editor = event.target;
  const start = editor.selectionStart;
  const end = editor.selectionEnd;
  editor.setRangeText("  ", start, end, "end");
  editor.dispatchEvent(new Event("input", { bubbles: true }));
});

lessonContent.addEventListener("input", event => {
  if (event.target.id !== "projectCode") return;
  localStorage.setItem(`markup-html-project-${activeIndex}`, event.target.value);
});

lessonContent.addEventListener("click", event => {
  if (event.target.closest("#makeProject")) {
    projectEditorOpen = true;
    renderLesson();
    lessonContent.querySelector("#projectCode").focus();
    return;
  }
  if (event.target.closest("#backToProject")) {
    projectEditorOpen = false;
    renderLesson();
    return;
  }
  if (event.target.closest("#runProject")) {
    const source = lessonContent.querySelector("#projectCode").value;
    localStorage.setItem(`markup-html-project-${activeIndex}`, source);
    const output = lessonContent.querySelector("#projectOutput");
    output.hidden = false;
    lessonContent.querySelector("#projectPreview").srcdoc = source;
  }
});

lessonContent.addEventListener("submit", event => {
  if (!event.target.matches(".practice-form")) return;
  event.preventDefault();
  const item = lessonItems[activeIndex];
  const challenge = practiceChallenges[item.title];
  const source = lessonContent.querySelector("#practiceCode").value;
  const errors = getPracticeErrors(challenge, source);
  const feedback = lessonContent.querySelector("#practiceFeedback");

  if (errors.length) {
    feedback.textContent = `Not quite yet: ${errors.join(" ")}`;
    feedback.classList.remove("is-correct");
    feedback.classList.add("is-incorrect");
    practicePassed.delete(activeIndex);
    savePracticePassed();
    completeButton.disabled = true;
    return;
  }

  practicePassed.set(activeIndex, source);
  savePracticePassed();
  renderLesson();
});

function updateProgress() {
  const percent = Math.round((completed.size / lessonItems.length) * 100);
  courseProgress.style.width = `${percent}%`;
  coursePercent.textContent = `${percent}% complete`;
}

courseNav.addEventListener("click", event => {
  const button = event.target.closest("[data-index]");
  if (button) {
    activeIndex = Number(button.dataset.index);
    projectEditorOpen = false;
    renderLesson();
    if (mobileSidebar.matches) setSidebarOpen(false);
  }
  const toggle = event.target.closest(".module-toggle");
  if (toggle) {
    const lessons = toggle.nextElementSibling;
    const isOpen = lessons.style.display !== "none";
    lessons.style.display = isOpen ? "none" : "grid";
    toggle.setAttribute("aria-expanded", String(!isOpen));
  }
});

completeButton.addEventListener("click", () => {
  const practiceDraft = localStorage.getItem(`markup-html-practice-draft-${activeIndex}`) || "";
  if (
    practiceChallenges[lessonItems[activeIndex].title]
    && practicePassed.get(activeIndex) !== practiceDraft
  ) return;
  completed.add(activeIndex);
  localStorage.setItem(storageKey, JSON.stringify([...completed]));
  if (activeIndex < lessonItems.length - 1) activeIndex += 1;
  projectEditorOpen = false;
  renderLesson();
});

previousButton.addEventListener("click", () => {
  if (activeIndex > 0) {
    activeIndex -= 1;
    projectEditorOpen = false;
    renderLesson();
  }
});

const menuButton = document.querySelector("#menuButton");
const sidebar = document.querySelector("#sidebar");
const mobileSidebar = window.matchMedia("(max-width: 820px)");

function setSidebarOpen(open) {
  if (mobileSidebar.matches) {
    sidebar.classList.toggle("open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    return;
  }

  sidebar.classList.toggle("collapsed", !open);
  document.body.classList.toggle("sidebar-collapsed", !open);
  menuButton.setAttribute("aria-expanded", String(open));
}

setSidebarOpen(!mobileSidebar.matches);

menuButton.addEventListener("click", () => {
  const open = mobileSidebar.matches
    ? !sidebar.classList.contains("open")
    : sidebar.classList.contains("collapsed");
  setSidebarOpen(open);
});

document.addEventListener("pointerdown", event => {
  if (!mobileSidebar.matches) return;
  if (sidebar.contains(event.target) || menuButton.contains(event.target)) return;
  if (sidebar.classList.contains("open")) setSidebarOpen(false);
});

let sidebarDrag = null;

sidebar.addEventListener("pointerdown", event => {
  if (!mobileSidebar.matches || !sidebar.classList.contains("open") || event.pointerType !== "touch") return;
  sidebarDrag = { pointerId: event.pointerId, startX: event.clientX, offset: 0 };
});

window.addEventListener("pointermove", event => {
  if (!sidebarDrag || event.pointerId !== sidebarDrag.pointerId) return;
  const offset = Math.min(0, event.clientX - sidebarDrag.startX);
  if (offset === 0) return;
  sidebarDrag.offset = offset;
  sidebar.classList.add("dragging");
  sidebar.style.transform = `translateX(${offset}px)`;
});

function finishSidebarDrag(event) {
  if (!sidebarDrag || event.pointerId !== sidebarDrag.pointerId) return;
  const close = Math.abs(sidebarDrag.offset) > sidebar.offsetWidth / 2;
  sidebarDrag = null;
  sidebar.classList.remove("dragging");
  sidebar.style.removeProperty("transform");
  if (close) setSidebarOpen(false);
}

window.addEventListener("pointerup", finishSidebarDrag);
window.addEventListener("pointercancel", finishSidebarDrag);

mobileSidebar.addEventListener("change", () => {
  sidebarDrag = null;
  sidebar.classList.remove("dragging");
  sidebar.style.removeProperty("transform");
  setSidebarOpen(!mobileSidebar.matches);
});

renderLesson();
