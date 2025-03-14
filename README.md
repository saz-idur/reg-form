# Ex-ISCIAN's Iftar Party - Registration Form

This project is a registration form for the Ex-ISCIAN's Iftar Party, built using Next.js, TypeScript, Tailwind CSS, and Supabase.

## 🚀 Technologies Used

- **Next.js:** React framework for building server-rendered applications.
- **TypeScript:** Static typing for JavaScript.
- **Tailwind CSS:** Utility-first CSS framework.
- **Supabase:** Open-source Firebase alternative for backend services.
- **Radix UI:** Unstyled, accessible component primitives.
- **shadcn/ui:** Re-usable components built using Radix UI and Tailwind CSS.
- **pnpm:** Fast, disk space efficient package manager.

## 💻 Development Setup

Follow these steps to set up and run the project locally:

### 1. 📥 Clone the Repository

Clone the project repository to your local environment:

```bash
git clone https://github.com/saz-idur/irs-client.git
cd irs-client
```

### 2. 📦 Install Dependencies

Ensure you have all the required dependencies installed. Run:

```bash
pnpm install
```

### 3. ⚙️ Environment Configuration

Copy the example environment configuration file and rename it to `.env.local`:

```bash
cp .env.example .env.local
```

Update the `.env.local` file with your Supabase credentials and any other necessary environment variables.

Example .env.local:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Note:** Replace your_supabase_url and your_supabase_anon_key with your actual Supabase project URL and anonymous key.

### 4. 🚀 Run the Application

To start the development server and see your changes in real-time:

```bash
pnpm run dev
```

This will launch the application in your default browser at `http://localhost:3000`.

## License

This project is licensed under the MIT License.
