# Modern Registration Portal: Full-Stack Sign-Up System (Next.js & Supabase)

## Overview

This project is a visually appealing, full-stack registration form, initially built for the Ex-ISCIAN's Iftar Party. Crafted with Next.js, TypeScript, and Tailwind CSS, it offers a clean and modern user interface. While designed for a specific event, it can be easily adapted and integrated into any registration system requiring a user-friendly front-end component. Supabase is used as the backend database, providing a complete solution for data collection and management.

## Prerequisites

-   Node.js (>= 18)
-   pnpm (>= 8)
-   Supabase account

## Installation

1.  Clone the repository:

    ```bash
    git clone [https://github.com/saz-idur/reg-form.git](https://github.com/saz-idur/reg-form.git)
    cd reg-form
    ```

2.  Install the dependencies:

    ```bash
    pnpm install
    ```

## Configuration

1.  Copy the example environment configuration file and rename it to `.env.local`:

    ```bash
    cp .env.example .env.local
    ```

2.  Update the `.env.local` file with your Supabase credentials:

    ```bash
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

    -   `NEXT_PUBLIC_SUPABASE_URL`: The URL of your Supabase project.
    -   `NEXT_PUBLIC_SUPABASE_ANON_KEY`: The anonymous key for your Supabase project.

    **How to get Supabase keys:**
    * Go to your supabase project dashboard.
    * Navigate to settings -> API.
    * Copy the URL and anon key.

## Usage

1.  Start the development server:

    ```bash
    pnpm run dev
    ```

2.  Open your browser and navigate to `http://localhost:3000`.

3.  Fill out the registration form and submit it.

4.  The submitted data will be stored in your Supabase database.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Credit

This project was created by [Sazidur Rahman](https://github.com/saz-idur/)
