const base = import.meta.env.BASE_URL;

export const navigationItems = [
  { id: 'home', label: 'Home', hint: 'System overview' },
  { id: 'about', label: 'About', hint: 'Profile frame' },
  { id: 'projects', label: 'Projects', hint: 'Workspace' },
  { id: 'skills', label: 'Stack', hint: 'Control panel' },
  { id: 'journey', label: 'Journey', hint: 'Timeline' },
  { id: 'contact', label: 'Contact', hint: 'Open channel' },
];

export const portfolioData = {
  identity: {
    name: 'Eeliya Nayeri',
    role: 'Computer Science Student • Developer',
    intro:
      'Building modern apps, backend systems, and product-like interfaces with a focus on clean UI, responsive interactions, and software that feels polished from the first click.',
    status: 'Designing thoughtful interfaces and practical systems.',
    focus: ['Clean UI', 'App Lifecycle', 'Backend Systems', 'Product Experiences'],
  },
  heroStats: [
    {
      label: 'Speciality',
      value: 'Modern Applications',
      detail: 'Multi-view interfaces with motion, responsive design, and product framing. Designed for ease of use and visual clarity across desktop and mobile applications.',
    },
    {
      label: 'Primary Focus',
      value: 'Modern app design',
      detail: 'UI quality, interaction design, and structured engineering.',
    },
    {
      label: 'Lifecycle Strength',
      value: 'Frontend + backend',
      detail: 'Efficiently combining frontend and backend technologies to create cohesive and functional applications. ',
    },
  ],
  heroPanels: [
    {
      title: 'Interface Layer',
      value: 'Premium UI',
      detail: 'Glassy panels, motion-led transitions, and product framing.',
    },
    {
      title: 'Application Layer',
      value: 'Cross-stack',
      detail: 'React, Node.js, Express, Flutter, and backend integrations.',
    },
    {
      title: 'Build Intent',
      value: 'Recruiter-ready',
      detail: 'The site behaves like a polished software product, not a template.',
    },
  ],
  about: {
    summary:
      'I am a Computer Science student and developer interested in software that feels refined, useful, and intentional. My work leans toward modern interfaces, mobile and web app development, backend APIs, and product-style experiences that connect clean visuals with solid engineering.',
    education: {
      institution: 'University of Westminster',
      degree: 'BSc Computer Science',
      result: '1st Class (Predicted)',
    },
    highlights: [
      { label: 'Demonstrated Strength', value: 'Turning ideas into polished, working apps' },
      { label: 'Built Through', value: 'Flutter, React, Node.js, Express, Firebase, and SwiftUI' },
      { label: 'What I Show Best', value: 'Clean UI, structured backend logic, and product thinking' },
    ],
    focusAreas: [
      {
        title: 'Frontend Systems',
        description:
          'Building interfaces that feel sharp, fast, and coherent across desktop and mobile.',
      },
      {
        title: 'Backend Services',
        description:
          'Designing APIs and service layers that keep application flows simple and dependable.',
      },
      {
        title: 'Mobile Interfaces',
        description:
          'Exploring app experiences with Flutter and SwiftUI where motion and usability matter.',
      },
      {
        title: 'Product Thinking',
        description:
          'Treating portfolio work and side projects like real software products, not demos.',
      },
    ],
  },
  projects: [
    {
      id: 'traverse',
      title: 'Traverse',
      category: 'Travel App',
      summary:
        'A cross-platform travel planning app that brings flight search, hotel search, itinerary building, budget tracking, and an AI travel assistant into one connected experience.',
      description:
        'Traverse is my final year project — a cross-platform travel app that lets users search flights and hotels, build trip itineraries, track budgets, and use an AI travel assistant. A Firebase data layer and Node.js proxy backend handle storage, API security, and integrations. Unfortunately, the flight and hotel search features are primarily non-functional due to the shutdown of the Amadeus API. The rest of the app is fully built and demonstrates the intended user experience. The app guides you with a demo set of search results when attempting to use the flight and hotel search features, allowing you to explore the itinerary building, budget tracking, and AI assistant functionality as originally designed.',
      tech: ['Flutter', 'Dart', 'Firebase', 'Node.js', 'Express', 'Google Places API', 'Amadeus API'],
      features: [
        'Flight and hotel search brought together in one app instead of separate planning tools',
        'Trip management with saved itinerary items, preferences, and budget tracking',
        'AI-assisted travel support with backend proxying to protect external API keys',
      ],
      thumbnail:
        `${base}projectImages/traversethumb.png`,
      gallery: [
        `${base}projectImages/Traverse1.png`,
        `${base}projectImages/Traverse2.png`,
        `${base}projectImages/Traverse3.png`,
        `${base}projectImages/Traverse4.png`,
        `${base}projectImages/Traverse5.png`,
      ],
      actions: [
        { label: 'Live Demo', href: 'https://eeliya-hub.github.io/traverse-web/' },
        { label: 'GitHub', href: null },
        { label: 'Doc', href: `${base}docs/Traverse Doc.pdf`, download: true },
      ],
    },
    {
      id: 'alumni-api',
      title: 'Alumni API',
      category: 'Backend/API Project',
      summary:
        'A structured alumni showcase platform with authentication, profile management, bidding logic, and documented API endpoints built across two connected services.',
      description:
        'A RESTful backend system for managing alumni accounts, profiles, and featured alumni selection. It uses a two-service architecture separating auth and API key logic from alumni data, bidding, and winner selection, with layered routing, business logic, and database access.',
      tech: ['Node.js', 'Express', 'SQL', 'SQLite', 'Postman', 'REST APIs', 'JWT Authentication', 'JavaScript', 'CSS', 'HTML'],
      features: [
        'Two-service setup separating authentication and API key logic from alumni platform features',
        'Full profile management across linked sections such as biography, qualifications, and employment',
        'Blind bidding system with winner selection, protected routes, and documented API endpoints',
      ],
      thumbnail:
        `${base}projectImages/alumthumb.png`,
      gallery: [
        `${base}projectImages/Alum1.png`,
        `${base}projectImages/Alum2.png`,
        `${base}projectImages/Alum3.png`,
      ],
      actions: [
        { label: 'API Preview', href: null },
        { label: 'GitHub', href: null },
        { label: 'Doc', href: `${base}docs/Alumni API.pdf`, download: true },
      ],
    },
    {
      id: 'sky-health',
      title: 'Sky Health Project',
      category: 'Health Platform',
      summary:
        'An internal staff health check system where employees complete guided check-ins, track trends over time, and review past responses through a clear dashboard flow.',
      description:
        'Built from a real client brief set by Sky UK, this Django-based system lets staff complete guided health check surveys, track trends over time, and review past responses. It includes employee verification, session management, and trend visualisation across a clean dashboard.',
      tech: ['Django', 'HTML', 'CSS', 'JavaScript'],
      features: [
        'Guided health check survey flow with one-question-at-a-time completion',
        'Dashboard logic for employee verification, session availability, and submission history',
        'Trend visualisation that helps users review patterns in past health check responses',
      ],
      thumbnail:
        `${base}projectImages/skythumb.png`,
      gallery: [
        `${base}projectImages/Sky1.png`,
        `${base}projectImages/Sky2.png`,
        `${base}projectImages/Sky3.png`,
        `${base}projectImages/Sky4.png`,
      ],
      actions: [
        { label: 'Prototype', href: null },
        { label: 'GitHub', href: null },
        { label: 'Doc', href: `${base}docs/Heath Check.pdf`, download: true },
      ],
    },
    {
      id: 'weather-app',
      title: 'Weather App',
      category: 'Weather Application',
      summary:
        'A native iOS weather dashboard that combines live forecasts, nearby points of interest, map interaction, and saved locations in one smooth SwiftUI app.',
      description:
        'A native iOS weather app built with SwiftUI and MVVM. Users can search locations, view current conditions and forecasts, explore nearby points of interest on a map, and revisit saved places through local persistence — combining reactive UI with async data handling.',
      tech: ['Swift', 'SwiftUI', 'OpenWeather API', 'SwiftData', 'MVVM'],
      features: [
        'Current weather and short-term forecast views for searched locations',
        'Map-based nearby points of interest with linked list and annotation interaction',
        'Saved location history that restores previously viewed places across sessions',
      ],
      thumbnail:
        `${base}projectImages/weatherthumb.png`,
      gallery: [
        `${base}projectImages/Weather1.png`,
        `${base}projectImages/Weather2.png`,
      ],
      actions: [
        { label: 'Preview', href: null },
        { label: 'GitHub', href: null },
        { label: 'Doc', href: `${base}docs/Weather App.pdf`, download: true },
      ],
    },
    {
      id: 'prem-predictor',
      title: 'Prem Predictor',
      category: 'Football Prediction Project',
      summary:
        'A browser-based Premier League prediction app where users create leagues, submit full table predictions, compare results, and generate PDF summaries.',
      description:
        'A client-side web app that turns informal football predictions into a structured experience. Users create leagues, submit full 20-team table predictions, get scored against actual results, and generate PDF reports — all in the browser without accounts or backend storage.',
      tech: ['JavaScript', 'CSS', 'HTML'],
      features: [
        'League creation and player management for private prediction groups',
        'Validation and scoring of full 20-team table predictions with automatic leaderboard ranking',
        'Client-side PDF report generation to compare predictions against actual results',
      ],
      thumbnail:
        `${base}projectImages/premthumb.png`,
      gallery: [
        `${base}projectImages/PremPred1.png`,
        `${base}projectImages/PremPred2.png`,
        `${base}projectImages/PremPred3.png`,
      ],
      actions: [
        { label: 'Dashboard', href: null },
        { label: 'GitHub', href: null },
        { label: 'Doc', href: `${base}docs/Prem Predictor.pdf`, download: true },
      ],
    },
  ],
  skills: {
    groups: [
      {
        title: 'Languages',
        description: 'Core programming and scripting languages.',
        items: [
          { name: 'Python', desc: 'Data processing, backend logic, and prediction models.', used: 'Prem Predictor, university coursework' },
          { name: 'Java', desc: 'Object-oriented programming and enterprise patterns.', used: 'University modules, algorithm projects' },
          { name: 'JavaScript', desc: 'Dynamic web apps, React frontends, and Node backends.', used: 'Traverse, Weather App, this portfolio' },
          { name: 'Dart', desc: 'Cross-platform UI development with Flutter.', used: 'Traverse' },
          { name: 'SQL', desc: 'Relational database queries, schema design, and data modelling.', used: 'Alumni API, Traverse, Prem Predictor' },
          { name: 'Swift', desc: 'Native iOS development with modern Apple frameworks.', used: 'Personal iOS experiments' },
          { name: 'PHP', desc: 'Server-side scripting and dynamic web pages.', used: 'University web projects' },
          { name: 'HTML', desc: 'Semantic markup and accessible page structure.', used: 'Every web project' },
          { name: 'CSS', desc: 'Layout systems, animations, and responsive styling.', used: 'Every web project, this portfolio' },
        ],
      },
      {
        title: 'Frameworks & Stacks',
        description: 'Libraries and frameworks I build with.',
        items: [
          { name: 'React', desc: 'Component-based UI library for interactive interfaces.', used: 'Traverse, Weather App, this portfolio' },
          { name: 'Node.js', desc: 'Server-side JavaScript runtime for backend services.', used: 'Alumni API, Traverse' },
          { name: 'Express', desc: 'Lightweight Node framework for RESTful APIs.', used: 'Alumni API, Traverse, Prem Predictor' },
          { name: 'Django', desc: 'High-level Python web framework for rapid, secure development.', used: 'Backend projects' },
          { name: 'Flutter', desc: "Google's cross-platform mobile UI toolkit.", used: 'Traverse' },
          { name: 'SwiftUI', desc: 'Declarative UI framework for Apple platforms.', used: 'iOS experiments' },
          { name: 'Tailwind CSS', desc: 'Utility-first CSS framework for rapid UI styling.', used: 'This portfolio' },
          { name: 'Vite', desc: 'Next-gen frontend build tool with instant HMR.', used: 'This portfolio' },
          { name: 'Firebase', desc: "Google's BaaS for auth, database, and hosting.", used: 'Traverse' },
          { name: 'REST APIs', desc: 'Designing and consuming structured HTTP endpoints.', used: 'Alumni API, Weather App, Traverse' },
        ],
      },
      {
        title: 'Software',
        description: 'Tools and platforms I use daily.',
        items: [
          { name: 'VS Code', desc: 'Primary code editor with extensions and terminal workflow.', used: 'All projects' },
          { name: 'Git', desc: 'Version control for collaboration and history tracking.', used: 'All projects' },
          { name: 'GitHub', desc: 'Remote repositories, CI workflows, and code review.', used: 'All projects' },
          { name: 'Figma', desc: 'UI/UX design, wireframing, and prototyping.', used: 'Portfolio design, project mockups' },
          { name: 'Postman', desc: 'API testing, request collections, and documentation.', used: 'Alumni API, Traverse' },
          { name: 'Google Cloud', desc: 'Cloud hosting, functions, and managed services.', used: 'Backend deployments' },
          { name: 'Xcode', desc: "Apple's IDE for iOS and macOS development.", used: 'Swift / SwiftUI projects' },
          { name: 'Android Studio', desc: 'Official IDE for Android and Flutter development.', used: 'Traverse' },
        ],
      },
      {
        title: 'Tech Capabilities',
        description: 'Technical skills and engineering patterns.',
        items: [
          { name: 'Responsive Design', desc: 'Fluid layouts that adapt across all screen sizes.', used: 'Every frontend project' },
          { name: 'API Design', desc: 'RESTful endpoint architecture with clear contracts.', used: 'Alumni API, Traverse' },
          { name: 'MVVM Architecture', desc: 'Model-View-ViewModel pattern for structured apps.', used: 'Weather App' },
          { name: 'Database Modelling', desc: 'Schema design, normalisation, and query optimisation.', used: 'Alumni API, Prem Predictor' },
          { name: 'Motion & Animation', desc: 'Framer Motion transitions, CSS keyframes, and micro-interactions.', used: 'This portfolio' },
          { name: 'CI/CD Workflows', desc: 'Automated build, test, and deploy pipelines.', used: 'GitHub Actions on multiple repos' },
          { name: 'Version Control', desc: 'Branching strategies, pull requests, and merge workflows.', used: 'All team and solo projects' },
          { name: 'UI/UX Systems', desc: 'Design systems, component libraries, and consistent patterns.', used: 'Portfolio, Traverse' },
        ],
      },
      {
        title: 'Personal Skills',
        description: 'Soft skills and professional qualities.',
        items: [
          { name: 'Leadership', desc: 'Guiding teams and taking ownership of project direction.', used: 'Group university projects' },
          { name: 'Communication', desc: 'Clear verbal and written communication across teams.', used: 'Presentations, documentation' },
          { name: 'Problem Solving', desc: 'Breaking down complex issues into actionable steps.', used: 'Debugging, architecture decisions' },
          { name: 'Team Collaboration', desc: 'Working effectively in agile and cross-functional teams.', used: 'University group work, pair programming' },
          { name: 'Time Management', desc: 'Prioritising tasks and meeting deadlines consistently.', used: 'Balancing coursework and projects' },
          { name: 'Adaptability', desc: 'Quickly learning new tools, languages, and frameworks.', used: 'Picking up Flutter, SwiftUI, Tailwind' },
          { name: 'Critical Thinking', desc: 'Evaluating trade-offs and making informed decisions.', used: 'Architecture planning, code reviews' },
          { name: 'Project Management', desc: 'Planning sprints, tracking progress, and delivering on scope.', used: 'All major projects' },
        ],
      },
    ],
  },
  journey: [
    {
      phase: 'Sep 2018 – May 2023',
      title: 'GCSEs & A Levels',
      summary:
        'Completed eleven GCSEs at grades 9–5 at The North School, then three A Levels in Mathematics, Computer Science and Physics at The Norton Knatchbull School.',
      bullets: ['Mathematics', 'Computer Science', 'Physics'],
    },
    {
      phase: 'Oct 2021 – Present',
      title: 'Customer Advisor — B&Q',
      summary:
        'Working in two separate roles: as a Frontend Customer Advisor processing transactions and resolving issues, and as a Building & Hardware Advisor supporting product queries and managing stock.',
      bullets: ['Customer service', 'Problem solving', 'Team collaboration'],
    },
    {
      phase: 'Jul 2022',
      title: 'Work Experience — SpringPod & Fujitsu',
      summary:
        'Technology work experience with SpringPod covering different roles and opportunities in the sector, plus a Fujitsu WorkX placement exploring their research, solutions, and company roles.',
      bullets: ['Tech sector insight', 'Industry research', 'Professional exposure'],
    },
    {
      phase: 'Sep 2023 – Present',
      title: 'BSc Computer Science — University of Westminster',
      summary:
        'Currently studying BSc Computer Science (Honours), covering software development, computer system fundamentals and database systems. On track for a First-Class Honours (expected 2026).',
      bullets: ['Software development', 'Database systems', 'First-Class track'],
    },
    {
      phase: 'Jun – Jul 2026',
      title: 'Ideathon — Aston Martin F1',
      summary:
        'Joining a collaborative ideathon with Aston Martin F1, working in teams to explore how AI is being applied across different sectors and professional roles. The programme will involve research, ideation sessions, and group presentations around real-world AI use cases.',
      bullets: ['AI applications', 'Team collaboration', 'Cross-sector research'],
    },
  ],
  contact: {
    intro:
      'If you want to discuss a project, internship, collaboration, or a product idea, this panel is ready to open a new thread.',
    methods: [
      {
        label: 'Email',
        value: 'eeliya.nayeri@gmail.com',
        note: 'Preferred contact method',
        href: 'mailto:eeliya.nayeri@gmail.com',
      },
      {
        label: 'GitHub',
        value: 'eeliya-hub',
        note: 'Repositories and project code',
        href: 'https://github.com/eeliya-hub',
        iconLight: `${base}projectImages/githublight.png`,
        iconDark: `${base}projectImages/githubdark.png`,
      },
      {
        label: 'LinkedIn',
        value: 'eeliya',
        note: 'Professional profile and network',
        href: 'https://www.linkedin.com/in/eeliya/',
        iconLight: `${base}projectImages/linkedinLight.png`,
        iconDark: `${base}projectImages/linkedinDark.png`,
      },
      {
        label: 'Location',
        value: 'London, England',
        note: 'Open to remote and on-site opportunities',
        href: null,
      },
    ],
    terminalLines: [
      'status: ready for internships, collaborations, and software conversations',
      'preferred_topics: modern apps, clean UI, backend systems, product experiences',
      'response_window: update with your real response time or availability',
    ],
  },
};
