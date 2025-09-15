# TAOS Super App

A Next.js-based super app for The Affordable Organic Store (TAOS) that extends the functionality of the main WordPress/WooCommerce website with additional features for order management, shipping label generation, and more.

## 🛠️ Tech Stack

- **Framework**: Next.js
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: ShadCN UI
- **State Management**: React Query
- **Form Handling**: React Hook Form with Zod validation
- **Authentication**: Better Auth
- **Logging**: Axiom

## 🔧 Environment Variables

Copy the `.env.example` file to `.env.local` in the root directory and update the values as needed.

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Run the development server:
   ```bash
   pnpm dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📊 Axiom Logging Setup

This project uses Axiom.co for structured logging. You need to create the following map fields in your Axiom dataset:

### Required Map Fields

Create these map fields in your Axiom dataset to properly structure the log data:

- `fields.input` - For logging request payloads and input parameters
- `fields.parsedInput` - For logging validated/parsed input data
- `fields.response` - For logging API response data
- `fields.parsedResponse` - For logging validated/parsed response data
- `fields.error` - For logging general error information
- `fields.parsedError` - For logging structured error responses
- `fields.fetchError` - For logging HTTP request/fetch errors
- `fields.data` - For logging general data objects
- `fields.session` - For logging user session information
- `fields.user` - For logging user information

### Setup Instructions

1. Log in to your Axiom.co dashboard
2. Navigate to your dataset
3. Add each field above as a "Map" type field
4. Configure your Axiom API token in your environment variables
