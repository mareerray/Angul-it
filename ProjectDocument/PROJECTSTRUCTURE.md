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
│   ├── app.config.ts   // Global app configuration for standalone setup.
│   ├── app.ts          // Root standalone component; connects template, styles, and routing.
│   │
│   ├── home/           // "Home" page feature folder
│   │   ├── home.component.ts     // Home component logic and metadata.
│   │   ├── home.component.html   // Home page layout and structure.
│   │   ├── home.component.css    // Styles scoped only to the Home page.  -- (optional)
│   │
│   ├── captcha/        // "Captcha" page feature folder
│   │   ├── captcha.component.ts  // Captcha component logic.
│   │   ├── captcha.component.html    // Captcha page layout.
│   │   ├── captcha.component.css     // Captcha-specific styles.  -- (optional)
│   │   ├── captcha.guard.ts.    // Keeps everything CAPTCHA-related self-contained
│   │   ├── captcha.model.ts.   // Defines ImageItem and Challenge
│   │
│   ├── result/         // "Result" page feature folder
│   │   ├── result.component.ts   // Result component logic.
│   │   ├── result.component.html // Result layout template.
│   │   ├── result.component.css      // Styles for the Result page.  -- (optional)
│   │
│   ├── utils/         // A folder for shared helper files and utility functions used throughout the app.
│   │   ├── session.ts   // A helper file for starting, resetting, and clearing CAPTCHA session data in localStorage.
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