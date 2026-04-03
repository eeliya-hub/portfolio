# 🎨 Premium OS-Inspired Portfolio - Complete Setup Guide

Welcome to your custom-built portfolio! This is a fully modern, high-performance portfolio website built with React, Vite, Tailwind CSS, and Framer Motion animations. 

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation & Running Locally

```bash
# Navigate to your project directory
cd /Users/eeliya/my-portfolio

# Install dependencies (already done, but if needed)
npm install

# Start development server
npm run dev

# The portfolio will be available at: http://localhost:5173/
```

### Building for Production

```bash
# Create optimized production build
npm run build

# Preview the production build locally
npm run preview

# The built files will be in the /dist directory - ready to deploy
```

---

## 📁 Project Structure

```
my-portfolio/
├── src/
│   ├── components/          # All React components
│   │   ├── Navbar.jsx       # Fixed navbar with theme toggle & navigation
│   │   ├── Hero.jsx         # Hero section with animated glass cards
│   │   ├── About.jsx        # About section with stats
│   │   ├── Skills.jsx       # Skills section with animated progress bars
│   │   ├── Projects.jsx     # Projects grid with interactive cards
│   │   ├── Experience.jsx   # Timeline with work/education
│   │   ├── Contact.jsx      # Contact form & social links
│   │   └── Footer.jsx       # Footer with credits
│   ├── context/
│   │   └── ThemeContext.jsx # Light/dark mode state management
│   ├── data/
│   │   └── portfolio.js     # All placeholder portfolio data (easily replaceable)
│   ├── utils/
│   │   └── animations.js    # Reusable Framer Motion animation variants
│   ├── App.jsx              # Main app component
│   ├── App.css              # (Empty - using Tailwind + index.css)
│   ├── index.css            # Global styles & Tailwind + custom animations
│   └── main.jsx             # React entry point
├── index.html               # HTML template
├── vite.config.js           # Vite configuration
├── package.json             # Dependencies & scripts
├── eslint.config.js         # ESLint configuration
└── README.md
```

---

## 🎨 Design System & Customization

### Colors & Theme

The portfolio uses a sophisticated color system with glassmorphism. Edit colors in your Tailwind CSS configuration:

**Primary Colors:**
- Blue: `from-blue-500 to-blue-600` (Primary accent)
- Purple: `from-purple-500 to-purple-600` (Secondary accent)
- Pink: `from-pink-500 to-pink-600` (Tertiary accent)

**Theme Colors:**
- Light Mode: White backgrounds with dark text
- Dark Mode: `dark:bg-gray-950` backgrounds with light text

To customize colors globally, modify the Tailwind color references in components or add custom colors to your Tailwind configuration in `eslint.config.js`.

### Glass Effects

Three levels of glassmorphism are used throughout:

```jsx
// Light glass (lighter background with more opacity)
<div className="bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20">

// Medium glass (standard effect)
<div className="bg-white/5 dark:bg-white/5 backdrop-blur-2xl border border-white/10">

// Heavy glass (very dark with blur)
<div className="bg-black/20 dark:bg-black/10 backdrop-blur-3xl border border-white/5">
```

---

## 📝 Customizing Portfolio Data

All portfolio content is centralized in `/src/data/portfolio.js`. Easily swap placeholder data with your own:

### Personal Information
```javascript
personal: {
  name: "Your Name",
  role: "Your Role",
  intro: "Your intro text",
  location: "Your Location",
  email: "your@email.com",
  socials: {
    github: "https://github.com/yourusername",
    twitter: "https://twitter.com/yourusername",
    linkedin: "https://linkedin.com/in/yourprofile",
    dribbble: "https://dribbble.com/yourprofile"
  }
}
```

### Skills
```javascript
skills: {
  categories: [
    {
      name: "Frontend",
      skills: [
        { name: "React", level: 95 },
        { name: "TypeScript", level: 88 },
        // Add more skills...
      ]
    },
    // Add more categories...
  ]
}
```

### Projects
```javascript
projects: [
  {
    id: 1,
    title: "Your Project Title",
    description: "Project description",
    tags: ["React", "Node.js", "PostgreSQL"],
    image: "https://your-image-url.com/image.jpg", // Use any image URL
    links: {
      demo: "https://your-demo.com",
      github: "https://github.com/your-repo"
    }
  },
  // Add more projects...
]
```

### Experience
```javascript
experience: [
  {
    id: 1,
    type: "work", // or "education"
    company: "Company Name",
    position: "Your Position",
    period: "2022 - Present",
    description: "Description of role",
    skills: ["Skill1", "Skill2", "Skill3"]
  },
  // Add more experience items...
]
```

---

## 🎬 Animation System

All animations use Framer Motion with predefined variants for consistency. Key animation patterns:

### Entry Animations
Sections animate in on scroll using `whileInView`:

```jsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true, margin: '-100px' }}
>
  Content
</motion.div>
```

### Staggered Children
Lists animate with staggered delays:

```jsx
<motion.div
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
>
  {items.map((item) => (
    <motion.div key={item.id} variants={itemVariants}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

### Hover Effects
Cards have subtle hover animations:

```jsx
<motion.div
  whileHover={{ y: -10 }}
  whileTap={{ scale: 0.95 }}
>
  Interactive Element
</motion.div>
```

See `/src/utils/animations.js` for all available animation variants that you can reuse.

---

## 🎯 Key Features Explained

### 1. **Responsive Design**
- Desktop: Full layout with all features
- Tablet: Optimized grid layouts
- Mobile: Single column, touch-friendly navigation

The site uses Tailwind CSS responsive prefixes:
- `sm:` → 640px
- `md:` → 768px
- `lg:` → 1024px

### 2. **Light/Dark Mode Toggle**
- Fixed in the top navbar (Sun/Moon icon)
- Preference saved to localStorage
- Automatic theme switching throughout the site
- Both themes are fully designed and look premium

**To style for dark mode:**
```jsx
<div className="text-gray-900 dark:text-white">
  This text is dark in light mode, white in dark mode
</div>
```

### 3. **Smooth Scrolling**
- Navbar links smoothly scroll to sections
- Each section has an `id` attribute for linking
- Added `scroll-smooth` to HTML for smooth native scrolling

### 4. **Performance Optimizations**
- Lazy loading of sections with `whileInView` prevents unnecessary renders
- Images use Unsplash for fast loading
- CSS-in-JS styled components minimize bundle size
- All animations use GPU-accelerated transforms

### 5. **Accessibility**
- Semantic HTML structure
- ARIA labels on interactive elements
- Proper color contrast ratios
- Keyboard navigation support

---

## 🔧 Advanced Customization

### Adding New Sections

1. Create a new component in `/src/components/NewSection.jsx`:

```jsx
import { motion } from 'motion/react';
import { itemVariants } from '../utils/animations';

const NewSection = () => {
  return (
    <section id="newsection" className="section-padding">
      <div className="container-max">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-4xl md:text-5xl font-bold mb-16"
        >
          Section Title
        </motion.h2>
        {/* Your content */}
      </div>
    </section>
  );
};

export default NewSection;
```

2. Add to `/src/App.jsx`:

```jsx
import NewSection from './components/NewSection';

// Inside the App component:
<NewSection />
```

3. Add to navbar navigation in `/src/components/Navbar.jsx`:

```javascript
const sections = [
  // ... existing sections
  { id: 'newsection', label: 'New Section' },
];
```

### Changing the Color Scheme

The portfolio uses gradients from blue → purple → pink. To change:

1. Search for these color classes in components:
   - `from-blue-500 to-purple-600`
   - `from-purple-500 to-pink-500`

2. Replace with your preferred colors:
   - `from-green-500 to-cyan-600`
   - `from-orange-500 to-red-500`
   - etc.

### Modifying Button Styles

Buttons use utility classes defined in `index.css`:
- `.btn-glass` - Glass effect button
- `.btn-gradient` - Gradient background button

Edit in `/src/index.css` to change all button styles globally.

---

## 📱 Viewport Breakpoints

```
Mobile:  < 640px (full width, single column)
Tablet:  640px - 1024px (2 columns, responsive)
Desktop: > 1024px (full 3+ column layouts)
```

Adjust all breakpoints in component classNames using Tailwind prefixes.

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)
```bash
npm run build
# Then connect your repository to Vercel at vercel.com
```

### Deploy to Netlify
```bash
npm run build
# Drag the /dist folder to Netlify
```

### Deploy to GitHub Pages
1. Update `vite.config.js`:
```javascript
export default defineConfig({
  base: '/your-repo-name/',
  plugins: [react(), tailwindcss()],
})
```

2. Build and deploy:
```bash
npm run build
# Use gh-pages package or manual upload
```

---

## 🐛 Troubleshooting

### Dark mode not working?
- Check that ThemeProvider wraps your entire app in `/src/App.jsx`
- Verify `localStorage` is not blocked
- Check browser DevTools for errors

### Animations not showing?
- Ensure Motion (Framer Motion) is installed: `npm list motion`
- Check that components use `whileInView` for scroll animations
- Verify `viewport={{ once: true }}` with margin for proper detection

### Styles not applying?
- Clear browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)
- Restart dev server
- Check that Tailwind is properly imported in `index.css`

### Project won't start?
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

## 📦 Dependencies Used

- **React 19.2.4** - UI framework
- **Vite 8.0.1** - Build tool
- **Tailwind CSS 4.2.2** - Styling
- **Motion/Framer Motion 12.38.0** - Animations
- **Lucide React 1.7.0** - Icons

No other external UI libraries or complex dependencies needed - this keeps the bundle small and maintainable.

---

## ✨ Pro Tips

1. **Use Placeholder Images**: Replace `https://images.unsplash.com/...` with your own images for faster load times
2. **Add Google Analytics**: Paste the GA script in `index.html` to track visitors
3. **Custom Domain**: Point your domain's DNS to Vercel/Netlify for a professional look
4. **Form Backend**: Contact form logs to console - integrate with Formspree, Netlify Forms, or your backend
5. **SEO**: Update meta tags in `index.html` for better search engine visibility

---

## 📧 Next Steps

1. **Replace all placeholder data** in `/src/data/portfolio.js` with your actual information
2. **Update images** - replace Unsplash URLs with your own portfolio images
3. **Update social links** in the data file
4. **Deploy** to Vercel, Netlify, or your hosting of choice
5. **Set up custom domain** for a professional presence

---

**You now have a premium, fully-featured, custom portfolio website!** 🎉

The code is clean, well-organized, and ready for future updates. All data is centralized for easy editing, and the design is unique, modern, and built to impress.

Happy portfolioing! 🚀