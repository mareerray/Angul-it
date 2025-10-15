>Here is a detailed step-by-step guide to set up your Angular environment for the Angul-It project, starting from your empty cloned GitHub repository through to a ready-to-develop Angular app.​​

## 1. Initial Setup in Your Repository
Open your terminal and navigate to your cloned project folder:

````
cd /path/to/your/cloned/angul-it-repo

(Optional) Initialize a README.md to document setup and progress:

echo "# Angul-It" > README.md
git add README.md
git commit -m "Add README"
`````

## 2. Install Node.js and Angular CLI
Download and install the latest LTS version of Node.js from [nodejs.org].​

To check your current version 
````
node -v

npm -v
````

Open the terminal and install Angular CLI globally:

````
npm install -g @angular/cli@latest
````
## 3. Create Angular Application 
Initialize a new Angular project in your root path ex. Desktop:

````
ng new angul-it --routing --style=css
````
- ng :	The Angular CLI (Command-Line Interface) tool. It is used to create, build, test, and manage Angular projects​.
- new	: Instructs the Angular CLI to generate a new Angular workspace and application​.
- angul-it : This is the project name. The CLI creates a new folder called angul-it containing your project files​.
- --routing	: Adds a routing module (app.routes.ts) automatically. This lets you define navigation paths between pages (HomeComponent → CaptchaComponent → ResultComponent). It’s essential for your Angul-It project since it has multiple stages​.
- --style=css	: Sets your default styling language to CSS. You could alternatively choose scss, sass, or less, but CSS is simplest for beginners

The CLI will ask you configuration questions; typical answers:

- Do you want to enable Server-Side Rendering (SSR) and Static Site Generation (SSG/Prerendering)? No (Your Angul-It requirements focus on in-browser interaction and state, not server-rendered pages.)
- Do you want to create a 'zoneless' application without zone.js? No (Zoneless Angular is an advanced feature for very specific performance or architecture cases, not needed for standard applications like Angul-It.)

## 4. Install Required Dependencies
### 4.1 Angular Material — UI Components and Styling
Dependency for UI components (Angular Material):

````
ng add @angular/material@latest
`````

#### Purpose:
Angular Material is a comprehensive UI component library following Google’s Material Design principles. It provides pre-built, accessible, and responsive components such as buttons, cards, dialogs, side navigation, input fields, and progress bars.​

#### Why you need it for Angul-It:

- Helps you design a clean and mobile-friendly interface for captcha challenges and results pages.

- Saves time — no need to manually code or style UI elements like buttons, modals, or forms.​

- Supports responsive design, so your captcha grid and forms adapt seamlessly to any screen size.​

- Ensures professional and consistent design with minimal effort.

In short, Angular Material focuses on appearance and user experience.

---
### 4.2 NgRx Store — State Management
Dependency for state management (NgRx):

````
npm install @ngrx/store@latest
`````
#### Purpose:
NgRx is Angular’s equivalent of Redux (a predictable state container). It helps manage and synchronize application data (state) across components using a central store.​

#### Why you need it for Angul-It:

- Your project requires tracking progress across multiple captcha stages.

- NgRx lets you store and retrieve user progress even after page refresh.

- Ensures data like “which captchas are completed” or “user’s selected answers” remain consistent across components.

- Makes your app more robust and testable, which aligns with your project’s final testing requirements.

In short, NgRx handles logic and data consistency across your app.

---
### 4.3 Angular Forms — Form Validation and User Input
Dependency for advanced form handling:

````
npm install @angular/forms@latest
`````
#### Purpose:
The @angular/forms module enables both template-driven and reactive forms, offering advanced tools for capturing, validating, and managing user input.

#### Why you need it for Angul-It:

- Handles all user input validation during captcha tasks (e.g., ensuring required selections are made before continuing).

- Integrates easily with Material form controls such as input fields and checkboxes.

- Displays friendly error messages for invalid actions (e.g., “Please select all required images”).

- Enforces strict form validation, required as part of the project spec.

In short, @angular/forms controls validation, input, and data feedback.


## 5. Review Your Project Structure
#### Key folders:

> /src/app: All your Angular code (components, services, modules).

> /src/assets: Static files and images for captchas.

#### Important config files:

> angular.json: Angular CLI and project configuration.

> package.json: Lists project dependencies.

> tsconfig.json: TypeScript settings for your project.

## 6. Run and Preview the App
Launch the development server and open the browser to preview:

````
ng serve

Visit http://localhost:4200 to view your app.
````

## 7. Prepare for Component Development
### Generate starter components (run in project folder):

````
ng generate component home
ng generate component captcha
ng generate component result
````

### Set up routing in src/app/app-routing.module.ts:

typescript
````
import { HomeComponent } from './home/home.component';
import { CaptchaComponent } from './captcha/captcha.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'captcha', component: CaptchaComponent },
  { path: 'result', component: ResultComponent }
];
`````

## 8. Commit All Changes
Stage and commit your new Angular app files:

````
git add .
git commit -m "Set up Angular app scaffold with base components"
git push
````

Your environment is now ready for development: you have a running Angular project scaffolded, necessary dependencies installed, and your base components generated. You can now proceed to build out features such as captcha logic, state management, and routing as described in your project requirements.