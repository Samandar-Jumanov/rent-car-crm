✨ Features

⚡ Next.js with TypeScript for robust, type-safe development
🔐 Authentication using NextAuth.js for secure user management
🗃️ State management with Redux Toolkit for predictable state updates
🔄 Data fetching and caching with React Query for efficient API interactions
✅ Form validation using Zod for type-safe schema validation
🎨 UI components from shadcn/ui for a polished look and feel
🎭 Animations powered by Framer Motion for engaging user experiences
💾 Database access with Prisma for type-safe database operations


📦 Getting Started
Follow these steps to set up the project locally:

Clone the repository:
bashCopygit clone https://github.com/Samandar-Jumanov/NEXTJS
cd NEXTJS

Install dependencies:
bashCopynpm install

Set up environment variables:
Create a .env.local file in the root directory and add the following:
CopyDATABASE_URL="your_database_url_here"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_nextauth_secret_here"
GITHUB_ID="your_github_oauth_id_here"
GITHUB_SECRET="your_github_oauth_secret_here"

Set up the database:
bashCopynpx prisma generate
npx prisma db push

Run the development server:
bashCopynpm run dev

Open http://localhost:3000 in your browser to see the result.


🏗️ Project Structure
Copy📁 nextjs-boilerplate
├── 📁 components/       # Reusable UI components
├── 📁 pages/            # Next.js pages and API routes
│   ├── 📁 api/
│   │   └── 📁 auth/
│   │       └── 📄 [...nextauth].ts
├── 📁 prisma/           # Prisma schema and migrations
│   └── 📄 schema.prisma
├── 📁 public/           # Static assets
├── 📁 schemas/          # Zod schemas for validation
├── 📁 store/            # Redux store and slices
│   ├── 📄 store.ts
│   └── 📄 counterSlice.ts
├── 📁 styles/           # Global styles
├── 📁 utils/            # Utility functions and hooks
│   └── 📄 api.ts
├── 📄 .env.local        # Environment variables (create this file)
├── 📄 next.config.js    # Next.js configuration
├── 📄 package.json      # Project dependencies and scripts
└── 📄 tsconfig.json     # TypeScript configuration

🛠️ Usage
🔐 Authentication
Use the useSession hook from next-auth/react to access the current session:
typescriptCopyimport { useSession } from 'next-auth/react'

const { data: session } = useSession()
🗃️ State Management
Use Redux hooks to access and update the global state:
typescriptCopyimport { useSelector, useDispatch } from 'react-redux'
import { increment } from '../store/counterSlice'

const count = useSelector((state) => state.counter.value)
const dispatch = useDispatch()

dispatch(increment())
🔄 Data Fetching
Use React Query hooks for data fetching:
typescriptCopyimport { useUsers } from '../utils/api'

const { data, isLoading, error } = useUsers()
✅ Form Validation
Use Zod to define schemas and validate data:
typescriptCopyimport { UserSchema } from '../schemas/user'

const userData = UserSchema.parse(formData)
🎨 UI Components
Import and use shadcn/ui components:
typescriptCopyimport { Button } from "@/components/ui/button"

<Button>Click me</Button>
🎭 Animations
Use Framer Motion to add animations:
typescriptCopyimport { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
>
  Animated content
</motion.div>
💾 Database Access
Use Prisma Client to interact with your database:
typescriptCopyimport { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const user = await prisma.user.create({
  data: {
    name: 'John Doe',
    email: 'john@example.com',
  },
})

📚 Learn More
To learn more about the technologies used in this boilerplate, check out the following resources:
TechnologyDocumentationNext.jsDocumentationTypeScriptDocumentationNextAuth.jsDocumentationRedux ToolkitDocumentationReact QueryDocumentationZodDocumentationshadcn/uiDocumentationFramer MotionDocumentationPrismaDocumentation

🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

📝 License
This project is MIT licensed.