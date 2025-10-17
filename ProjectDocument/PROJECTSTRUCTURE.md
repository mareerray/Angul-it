````
src/
├── main.ts              // App entry point; bootstraps the root component with routes and providers.
├── index.html           // Base HTML template rendered in the browser; root of your app.
├── styles.css.         // Global CSS applied across all pages (e.g., fonts, layout, colors).
│   
├── app/                // Main application folder containing logic, routing, and pages.
│   ├── app.html        // Root app template (usually contains <router-outlet>).
│   ├── app.css         // Styles specific to the root layout (can remove if unused).  -- (optional)
│   ├── app.routes.ts   // Defines router paths (home, captcha, result).
│   ├── app.spec.ts     // Unit test file for app-level behavior.
│   ├── app.config.ts   // Global app configuration for standalone setup.
│   ├── app.ts          // Root standalone component; connects template, styles, and routing.
│   │
│   ├── home/           // "Home" page feature folder
│   │   ├── home.ts     // Home component logic and metadata.
│   │   ├── home.html   // Home page layout and structure.
│   │   ├── home.css    // Styles scoped only to the Home page.  -- (optional)
│   │
│   ├── captcha/        // "Captcha" page feature folder
│   │   ├── captcha.ts  // Captcha component logic.
│   │   ├── captcha.html    // Captcha page layout.
│   │   ├── captcha.css     // Captcha-specific styles.  -- (optional)
│   │
│   ├── result/         // "Result" page feature folder
│   │   ├── result.ts   // Result component logic.
│   │   ├── result.html // Result layout template.
│   │   ├── result.css      // Styles for the Result page.  -- (optional)
│   │
└── assets/             // Static files like images, icons, and fonts.
    └── images/         // Project images used across pages.
   
````
---

`````
│   ├── core/ ?
│   │   ├── services/
│   │   │   ├── api.service.ts
│   │   │   ├── auth.service.ts
│   │   ├── guards/
│   │   │   ├── auth.guard.ts
│   │   └── models/
│   │       ├── user.model.ts
│   │       ├── captcha.model.ts
│   │
│   └── shared/ ?
│       ├── components/
│       │   ├── navbar/
│       │   │   ├── navbar.ts
│       │   │   ├── navbar.html
│       │   │   ├── navbar.css
│       ├── directives/
│       └── pipes/

````

- There should be a *guard* for this project as well 
- Save each state in session
- *ngFor, *ngIf