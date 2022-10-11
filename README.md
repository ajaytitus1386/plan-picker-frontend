<hr>
<h1 style="text-align:center;width:100%;">Video Plan Subscription Web App</h1>
<hr>

- [:rocket: Getting Started](#rocket-getting-started)
  - [Or just head to https://richpanel-task-frontend-ten.vercel.app/ to see the **deployed build**!](#or-just-head-to-httpsrichpanel-task-frontend-tenvercelapp-to-see-the-deployed-build)
- [:clipboard: Main Technologies](#clipboard-main-technologies)
- [:arrow_down: Process Flow](#arrow_down-process-flow)
  - [1. Authentication](#1-authentication)
  - [2. Current Subscribed Plan](#2-current-subscribed-plan)
  - [3. Choose A Plan](#3-choose-a-plan)
  - [4. Subscription Payment](#4-subscription-payment)

## :rocket: Getting Started

1. Clone the repository from `https://github.com/ajaytitus1386/richpanel-task-frontend` using your preferred method.

2. Next, navigate to the root of the project and install the dependencies:

   ```bash
   yarn install
   ```

3. Then, run the **development server**:

   ```bash
   yarn run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see a development preview.

<hr>

Check out the backend implementation at [https://github.com/ajaytitus1386/richpanel-task-backend](https://github.com/ajaytitus1386/richpanel-task-backend)

### Or just head to [https://richpanel-task-frontend-ten.vercel.app/](https://richpanel-task-frontend-ten.vercel.app/) to see the **deployed build**!

## :clipboard: Main Technologies

- **Next.JS**: React Framework that supports easy page routing
- **Formik**: Effective Form State Management library
- **Yup**: Form Validation Schema
- **Axios**: HTTP Client for Node.JS
- **Toastify**: React library to implement simple toast messages to give user feedback

## :arrow_down: Process Flow

### 1. Authentication

On Loading, up the web app will redirect to the login page if no token was found in the local storage. You can either sign up for a new account or log into an existing account. The navbar on the top has a button that can be used to logout or login depending on the user state.

useContext Hooks are used to manage the Auth State of user variables such as the user token, details and their current subscription.

Once authenticated, the token is used to fetch the User Details and will redirect the user to their current plan page. Similarily, if the token exists in localStorage, all this is done automatically

### 2. Current Subscribed Plan

This displays the current subscription and its state as well as an option to choose a new plan if no subscription exists yet.

On an Active Plan, the cancel button will cancel the subscription in both the database and on the STRIPE API

### 3. Choose A Plan

Presents a view of all the plans fetched from the database. The billing cycle toggle allows you to switch between Monthly and Yearly billing.

### 4. Subscription Payment

Once a plan is selected, the next step is to collect the User's Credit Card Info and make a request to the STRIPE API and the backend. If the Payment goes well, the user will be redirected to their Current Subscribed Plan page
