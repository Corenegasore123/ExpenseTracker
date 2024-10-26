# ExpenseTracker

## Description
ExpenseTracker is a simple web application designed to help users track their daily expenses. The app allows users to add expenses, view their total spending, and organize their expenses by category. This project showcases React skills, state management, and data persistence in the browser.

## Features

### 1. Add New Expenses
- Users can add a new expense by filling out the following fields:
  - **Amount**
  - **Category**
  - **Date**
  - **Description**
- The form validates input and prevents submission if any required fields are missing.

### 2. Display Expenses
- A comprehensive list of all added expenses is displayed, showing the details entered by the user (amount, category, date, description).
- Users can filter the list by category.

### 3. Calculation
- The app displays the total sum of all expenses, updating it dynamically as new expenses are added or removed.
- All expenses are saved to `localStorage` for data persistence.

### 4. Styling
- The application is styled using Tailwind CSS, ensuring a user-friendly layout that is responsive for different screen sizes.

### 5. Additional Features
- **Group Expenses**: Users can group expenses by category or date, with grouped data displayed in the UI.
- **Data Visualization**: Charts (using libraries like Chart.js) visually represent expenses:
  - A pie chart showing expenses broken down by category.
  - A bar chart illustrating daily or monthly expenses.
- **Edit and Delete Functionality**: Users can edit or delete individual expenses from the list, with the total dynamically updating if an expense is deleted.

## Project Requirements
- React for building the user interface.
- State management for handling expense data.
- Data persistence using `localStorage` or `IndexedDB`.
- Tailwind CSS or plain CSS for styling.
- Chart.js (or similar) for data visualization.

## Installation
To run the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/Corenegasore123/ExpenseTracker.git
