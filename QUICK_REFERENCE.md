# ⚡ Quick Reference - Common Edits

## Change Your Name & Role

**File:** `src/data/portfolio.js`

```javascript
personal: {
  name: "Eeliya Nayeri",          // ← Change this
  role: "Full-Stack Developer & Creative Technologist", // ← And this
  intro: "Crafting digital experiences...", // ← And this
}
```

---

## Add/Remove Skills

**File:** `src/data/portfolio.js`

```javascript
categories: [
  {
    name: "Frontend",           // Category name
    skills: [
      { name: "React", level: 95 },     // Add/edit/delete skills here
      { name: "Tailwind CSS", level: 90 },
      // Add more skills...
    ]
  },
  // Add more categories...
]
```

**Level:** 0-100 (represents skill proficiency percentage)

---

## Update Projects

**File:** `src/data/portfolio.js`

```javascript
projects: [
  {
    id: 1,
    title: "Your Project Name",           // Project title
    description: "What the project does", // Short description
    tags: ["Tech1", "Tech2", "Tech3"],    // Technologies used
    image: "https://...",                 // Image URL (from Unsplash or your own)
    links: {
      demo: "https://...",                // Demo link
      github: "https://..."               // GitHub link
    }
  },
  // Add more projects... (max 4 recommended for grid layout)
]
```

---

## Add Work Experience

**File:** `src/data/portfolio.js`

```javascript
experience: [
  {
    id: 1,
    type: "work",                        // or "education"
    company: "Company Name",
    position: "Your Job Title",
    period: "2022 - Present",
    description: "What you did here",
    skills: ["Skill1", "Skill2"]
  },
]
```

---

## Update Contact Info

**File:** `src/data/portfolio.js`

```javascript
personal: {
  name: "Your Name",
  email: "your@email.com",              // ← Update email
  location: "Your City, Country",
  socials: {
    github: "https://github.com/yourname",       // ← Your GitHub
    linkedin: "https://linkedin.com/in/yourname", // ← Your LinkedIn
    twitter: "https://twitter.com/yourname",     // ← Your Twitter
    dribbble: "https://dribbble.com/yourname"    // ← Your Dribbble
  }
}
```

---

## Change Colors

**Search & Replace in all component files:**

| Find | Replace With | Effect |
|------|----------|--------|
| `from-blue-500` | `from-green-500` | Primary color |
| `to-purple-600` | `to-cyan-600` | Secondary color |
| `to-pink-500` | `to-orange-500` | Accent color |

**Pro tip:** Use VS Code Find & Replace (Cmd+H on Mac) to replace all instances at once.

---

## Change Navbar Logo

**File:** `src/components/Navbar.jsx` (around line 40)

```jsx
<div className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
  AC    {/* ← Change "AC" to your initials */}
</div>
```

---

## Replace Images

**Current images come from Unsplash.** Replace with your own:

1. **Hero/Project Images**: Replace URLs in `src/data/portfolio.js`
   - Recommended size: 800x600px minimum
   - Supported formats: JPG, PNG, WebP

2. **Favicon**: Replace `/public/favicon.svg` with your own

---

## Update About Section

**File:** `src/data/portfolio.js`

```javascript
about: {
  title: "About",
  bio: "Your about text goes here...", // ← Update this
  highlights: [
    { label: "5+", stat: "Years Experience" }, // ← Update these stats
    { label: "40+", stat: "Projects Completed" },
    { label: "30+", stat: "Happy Clients" }
  ]
}
```

---

## Change Section Order

**File:** `src/App.jsx`

Just reorder these components:

```jsx
export default function App() {
  return (
    <ThemeProvider>
      <div className="...">
        <Navbar />
        <Hero />           {/* Reorder by moving these... */}
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
        <Footer />
      </div>
    </ThemeProvider>
  );
}
```

---

## Add Google Analytics

**File:** `index.html`

Add this before the closing `</head>` tag:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR_GA_ID');
</script>
```

Replace `YOUR_GA_ID` with your Google Analytics property ID.

---

## Enable Contact Form

**Current:** Form logs to browser console

**To send emails:**

1. **Option A - Formspree (Easiest)**
   - Go to formspree.io and create account
   - Get your form endpoint
   - Update `Contact.jsx` form action

2. **Option B - Netlify Forms**
   - Deploy to Netlify
   - Add `netlify` attribute to form
   - Emails go to your Netlify dashboard

3. **Option C - Backend API**
   - Create your own backend endpoint
   - Update handleSubmit in `Contact.jsx`

---

## Customize Animation Speed

**File:** `src/utils/animations.js`

```javascript
transition: {
  duration: 0.6,    // ← Change this (in seconds) - smaller = faster
  ease: "easeOut"   // ← Options: easeIn, easeOut, easeInOut, linear
}
```

**Pro tip:** Find & Replace all `duration: 0.6` to change global animation speed.

---

## Make Sections Wider/Narrower

**File:** Search for `max-w-6xl` in component files

```jsx
<div className="max-w-6xl mx-auto">  {/* Container width */}
  // ← Change to: max-w-5xl, max-w-7xl, max-w-full, etc.
</div>
```

---

## Build for Production

```bash
npm run build    # Creates optimized /dist folder
npm run preview  # Test the build locally
```

Then deploy the `/dist` folder to:
- **Vercel** (recommended) → vercel.com
- **Netlify** → netlify.com
- **GitHub Pages** → pages.github.com
- Any web host with a deploy script

---

## Hide/Show Sections Temporarily

**File:** `src/App.jsx`

Just comment out the component:

```jsx
<Hero />
{/* <About /> */}  {/* Hidden until you uncomment */}
<Skills />
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Styles don't update | Clear cache: Cmd+Shift+Delete, then restart dev server |
| Animations lag on mobile | Reduce `duration` in animations.js from 0.8 to 0.3 |
| Layout looks broken | Check that section has `max-w-6xl mx-auto` wrapper |
| Colors too bright/dark | Adjust opacity: `bg-white/10` → `bg-white/5` (lower = darker) |
| Text too small on mobile | Ensure component has `text-sm md:text-base` responsive sizing |

---

## Need Help?

1. Check `PORTFOLIO_GUIDE.md` for full documentation
2. Search components for similar patterns to copy
3. Framer Motion docs: motion.dev
4. Tailwind CSS docs: tailwindcss.com
5. Lucide Icons: lucide.dev (for more icons)

---

**Happy customizing! Your portfolio is now ready to showcase your work.** 🎉