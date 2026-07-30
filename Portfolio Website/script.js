/* Portfolio Interactive Scripts */

document.addEventListener('DOMContentLoaded', () => {

  // Preloader
  const loadingScreen = document.getElementById('loading-screen');
  const loaderBar = document.querySelector('.loader-bar');
  const loaderPercentage = document.querySelector('.loader-percentage');
  
  if (loadingScreen && loaderBar && loaderPercentage) {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          loadingScreen.style.opacity = '0';
          loadingScreen.style.transform = 'scale(1.05)';
          setTimeout(() => {
            loadingScreen.style.display = 'none';
          }, 600);
        }, 300);
      }
      loaderBar.style.width = `${progress}%`;
      loaderPercentage.textContent = `${progress}%`;
    }, 40);
  }

  // Custom Cursor
  const cursorGlow = document.querySelector('.custom-cursor-glow');
  const cursorDot = document.querySelector('.custom-cursor-dot');
  
  if (cursorGlow && cursorDot) {
    document.addEventListener('mousemove', (e) => {
      cursorGlow.style.top = `${e.clientY}px`;
      cursorGlow.style.left = `${e.clientX}px`;
      cursorDot.style.top = `${e.clientY}px`;
      cursorDot.style.left = `${e.clientX}px`;
    });
  }

  // Theme Toggle (Dark/Light)
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;
  const currentTheme = localStorage.getItem('theme') || 'dark';

  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      let theme = document.documentElement.getAttribute('data-theme');
      let newTheme = theme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
      showToast(`Switched to ${newTheme === 'dark' ? 'Dark Mode' : 'Light Mode'}`);
    });
  }

  function updateThemeIcon(theme) {
    if (themeIcon) {
      if (theme === 'dark') {
        themeIcon.className = 'fa-solid fa-sun';
      } else {
        themeIcon.className = 'fa-solid fa-moon';
      }
    }
  }

  // Typing Animation
  const typingElement = document.querySelector('.hero-role .typing');
  const rolePrefixElement = document.getElementById('role-prefix');

  if (typingElement) {
    const roles = [
      { prefix: 'a ', text: 'Frontend Developer' },
      { prefix: 'an ', text: 'AI Developer' },
      { prefix: 'a ', text: 'Python Developer' },
      { prefix: 'an ', text: 'AI / ML Engineer' },
      { prefix: 'a ', text: 'Full-Stack Developer' }
    ];
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    
    function typeEffect() {
      const currentObj = roles[roleIdx];
      
      // Sync prefix (a / an) dynamically
      if (rolePrefixElement && rolePrefixElement.textContent !== currentObj.prefix) {
        rolePrefixElement.textContent = currentObj.prefix;
      }

      if (isDeleting) {
        typingElement.textContent = currentObj.text.substring(0, charIdx - 1);
        charIdx--;
      } else {
        typingElement.textContent = currentObj.text.substring(0, charIdx + 1);
        charIdx++;
      }
      
      let speed = isDeleting ? 30 : 65;
      
      if (!isDeleting && charIdx === currentObj.text.length) {
        speed = 2200; // Hold visible text before disappearing
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        speed = 400; // Brief delay before typing next title
      }
      setTimeout(typeEffect, speed);
    }
    setTimeout(typeEffect, 600);
  }

  // Mobile Menu
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });
    
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.className = 'fa-solid fa-bars';
        }
      });
    });
  }

  // Background Particles
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
        this.color = document.documentElement.getAttribute('data-theme') === 'light' 
          ? 'rgba(15, 23, 42, 0.05)' 
          : 'rgba(255, 255, 255, 0.05)';
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
      }
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    function initParticles() {
      particlesArray = [];
      const numberOfParticles = Math.min(100, Math.floor((canvas.width * canvas.height) / 15000));
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    }
    initParticles();
    
    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
    window.addEventListener('theme-changed', initParticles);
  }

  // Header & Active Section Observer
  const header = document.getElementById('header');
  const scrollIndicator = document.getElementById('scroll-indicator');
  const backToTopBtn = document.getElementById('back-to-top');
  const sections = document.querySelectorAll('section');
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    
    if (scrollIndicator) {
      scrollIndicator.style.width = `${scrollPercent}%`;
    }
    
    if (header) {
      if (scrollTop > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    
    if (backToTopBtn) {
      if (scrollTop > 400) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }
    
    let currentId = '';
    sections.forEach(sec => {
      const secTop = sec.offsetTop - 120;
      const secHeight = sec.offsetHeight;
      if (scrollTop >= secTop && scrollTop < secTop + secHeight) {
        currentId = sec.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Statistics Counters
  const statNumbers = document.querySelectorAll('.stat-number');
  const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const targetVal = parseInt(target.getAttribute('data-target'));
        let count = 0;
        const increment = Math.ceil(targetVal / 30);
        const timer = setInterval(() => {
          count += increment;
          if (count >= targetVal) {
            target.textContent = `${targetVal}+`;
            clearInterval(timer);
          } else {
            target.textContent = `${count}+`;
          }
        }, 40);
        observer.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(num => statsObserver.observe(num));

  // Skills Progress Fill
  const skillFills = document.querySelectorAll('.skill-progress-fill');
  const skillsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const widthVal = fill.getAttribute('data-width');
        fill.style.width = widthVal;
        observer.unobserve(fill);
      }
    });
  }, { threshold: 0.1 });

  skillFills.forEach(fill => skillsObserver.observe(fill));

  // Experience Accordion
  const experienceBlocks = document.querySelectorAll('.experience-block');
  experienceBlocks.forEach(block => {
    const header = block.querySelector('.experience-summary-header');
    if (header) {
      header.addEventListener('click', () => {
        const wasExpanded = block.classList.contains('expanded');
        experienceBlocks.forEach(b => b.classList.remove('expanded'));
        if (!wasExpanded) {
          block.classList.add('expanded');
        }
      });
    }
  });

  if (experienceBlocks.length > 0) {
    experienceBlocks[0].classList.add('expanded');
  }

  // Projects Data & Renderer
const projectsData = [
  // AI & Machine Learning Projects
  {
    id: 1,
    title: "AI-Powered Web Scraping Agent",
    category: "AI Projects",
    difficulty: "Hard",
    status: "Completed",
    duration: "2 Weeks",
    tech: "Python, BeautifulSoup, PEAS Framework, CSV/JSON",
    icon: "fa-solid fa-spider",
    desc: "Intelligent autonomous agent that navigates websites, extracts structured data, applies filtering logic, and stores results efficiently.",
    features: [
      "Autonomous goal-based navigation using PEAS framework",
      "Handles pagination, element filtering, and structured data extraction",
      "Stores results in CSV and JSON formats with custom filtering"
    ],
    learnings: "Deepened knowledge of PEAS framework, web scraping ethics, state-space search, and data pipeline creation.",
    challenges: "Handling anti-scraping mechanisms; resolved using request delays and data validation layers."
  },
  {
    id: 2,
    title: "Face Mask Detection System",
    category: "AI Projects",
    difficulty: "Hard",
    status: "Completed",
    duration: "4 Weeks",
    tech: "Python, OpenCV, TensorFlow, MobileNet CNN",
    icon: "fa-solid fa-mask",
    desc: "Real-time deep learning system integrating MobileNet-based CNN with OpenCV for live face detection and mask classification.",
    features: [
      "Real-time face detection using OpenCV",
      "Mask/No Mask classification using lightweight MobileNet CNN",
      "CPU-optimized pipeline for efficient performance",
      "Audio alert system for non-compliance detection"
    ],
    learnings: "Mastered deep learning concepts, model optimization, computer vision, and real-world system integration.",
    challenges: "CPU performance optimization; resolved using lightweight MobileNet and efficient preprocessing."
  },
  {
    id: 3,
    title: "Student Performance Prediction System",
    category: "AI Projects",
    difficulty: "Hard",
    status: "Completed",
    duration: "3 Weeks",
    tech: "Python, Scikit-learn, XGBoost, Pandas, Google Colab",
    icon: "fa-solid fa-chart-line",
    desc: "ML system forecasting exam scores based on behavioral and demographic factors, achieving R² of 0.914 with XGBoost.",
    features: [
      "Comprehensive data preprocessing on 6,607 student records",
      "Built multiple regression models with hyperparameter tuning",
      "Feature importance analysis identifying key predictors",
      "Early warning system for at-risk students"
    ],
    learnings: "Data preprocessing, model building, evaluation, and translating analytical results into actionable insights.",
    challenges: "High model variance; resolved using cross-validation and gradient-boosted tuning adjustments."
  },
  {
    id: 4,
    title: "Goal-Based Soccer Agent",
    category: "AI Projects",
    difficulty: "Medium",
    status: "Completed",
    duration: "2 Weeks",
    tech: "Python, PEAS Framework, AI Search",
    icon: "fa-solid fa-futbol",
    desc: "AI agent that perceives ball and goal, moves strategically, gains possession, and scores using goal-based planning.",
    features: [
      "PEAS framework implementation for agent design",
      "Step-by-step movement logic with possession mechanics",
      "Goal detection and scoring algorithms"
    ],
    learnings: "PEAS framework application, agent perception-action loops, and goal-based problem solving.",
    challenges: "Pathfinding efficiency; optimized using state space pruning."
  },
  {
    id: 5,
    title: "Water Jug Problem Solver (BFS)",
    category: "AI Projects",
    difficulty: "Medium",
    status: "Completed",
    duration: "1 Week",
    tech: "Python, BFS Algorithm, State-Space Search",
    icon: "fa-solid fa-water",
    desc: "Classical AI search problem using Breadth-First Search to find the shortest sequence of steps to reach the goal state.",
    features: [
      "State-space search using BFS algorithm",
      "Valid operations: fill, empty, pour between jugs",
      "Shortest path identification"
    ],
    learnings: "AI search strategies, state representation, and problem-solving in unstructured environments.",
    challenges: "State explosion; managed using efficient state tracking and pruning."
  },
  {
    id: 6,
    title: "Ultimate Tutor Bot",
    category: "AI Projects",
    difficulty: "Medium",
    status: "Completed",
    duration: "2 Weeks",
    tech: "JavaScript, HTML, CSS, AI Logic",
    icon: "fa-solid fa-brain",
    desc: "Interactive AI-based learning assistant solving math problems, programming questions, science concepts, and unit conversions.",
    features: [
      "Math problem solver with step-by-step explanations",
      "Programming solutions and code assistance",
      "Science concept explanations",
      "Unit conversion tools"
    ],
    learnings: "DOM manipulation, event handling, building responsive AI interfaces without external APIs.",
    challenges: "Managing complex knowledge base; solved using structured JSON and efficient lookup algorithms."
  },

  // Web Development & Full-Stack
  {
    id: 7,
    title: "Furqan Store - E-Commerce Platform",
    category: "Web Development",
    difficulty: "Hard",
    status: "Completed",
    duration: "1 Month",
    tech: "PHP, MySQL, JavaScript, HTML5, CSS3",
    icon: "fa-solid fa-cart-shopping",
    desc: "Full-stack e-commerce web application with multi-role system, featuring secure authentication and vendor commission model.",
    features: [
      "Multi-role authentication (Admin, Vendor, Customer)",
      "Dynamic product catalog with category system",
      "Shopping cart and order management",
      "Vendor dashboard and commission tracking",
      "REST-style API architecture"
    ],
    learnings: "Full-stack state coordination, role-based access control, MVC architecture, and relational database design.",
    challenges: "Synchronizing checkout states with inventory; resolved using database transactions and lock mechanisms."
  },
  {
    id: 8,
    title: "Student Fee Management System",
    category: "Web Development",
    difficulty: "Hard",
    status: "Completed",
    duration: "3 Weeks",
    tech: "PHP, MySQL, Software Engineering, UML",
    icon: "fa-solid fa-money-check-dollar",
    desc: "Enterprise educational management system for student registration, installment scheduling, and billing automation.",
    features: [
      "Student registration and fee processing",
      "Full and partial payment support",
      "Installment plans and overdue tracking",
      "Automated receipt and report generation",
      "Role-based authentication",
      "Backup and restore functionality"
    ],
    learnings: "Systems engineering, UML modeling, requirement specifications, and database schema design.",
    challenges: "Partial payment calculation logic; resolved using conditional billing arrays and transaction handling."
  },
  {
    id: 9,
    title: "Student Management System (Web-Based)",
    category: "Web Development",
    difficulty: "Medium",
    status: "Completed",
    duration: "2 Weeks",
    tech: "HTML5, CSS3, JavaScript, Chart.js, LocalStorage",
    icon: "fa-solid fa-users-gear",
    desc: "Responsive web interface with admin and student portals, CGPA calculation, and interactive analytics dashboard.",
    features: [
      "Full CRUD operations with LocalStorage persistence",
      "Admin dashboard for grade and fee management",
      "Student portal with CGPA tracking",
      "Chart.js visualizations for analytics",
      "CSV export functionality"
    ],
    learnings: "Front-end state management, LocalStorage APIs, Chart.js integration, and responsive design.",
    challenges: "Chart rendering on data updates; solved by clearing canvas buffers before re-instantiation."
  },
  {
    id: 10,
    title: "Personal Portfolio Website",
    category: "Web Development",
    difficulty: "Medium",
    status: "Completed",
    duration: "2 Weeks",
    tech: "HTML5, CSS3, JavaScript, Responsive Design",
    icon: "fa-solid fa-briefcase",
    desc: "Fully responsive personal portfolio showcasing projects, certifications, technical skills, and academic journey.",
    features: [
      "Modern responsive design with semantic HTML",
      "Smooth navigation and animations",
      "Project showcase with detailed descriptions",
      "Certification and skill display",
      "Mobile-first approach"
    ],
    learnings: "Responsive web design principles, CSS Grid/Flexbox, semantic HTML, and user experience design.",
    challenges: "Mobile responsiveness optimization; solved using media queries and flexible layouts."
  },

  // Frontend & UI Projects
  {
    id: 11,
    title: "Aether Weather App",
    category: "Frontend Projects",
    difficulty: "Hard",
    status: "Completed",
    duration: "3 Weeks",
    tech: "HTML5, CSS3, Vanilla JavaScript, OpenWeatherMap API",
    icon: "fa-solid fa-cloud",
    desc: "Premium weather application with dynamic themes, animated SVG icons, forecasts, and smart caching features.",
    features: [
      "Real-time weather data via OpenWeatherMap API",
      "Dynamic weather-based themes and animations",
      "Hourly and 7-day forecasts",
      "Geolocation support with search suggestions",
      "Favorites management and local storage",
      "Comfort score and AQI/UV index display",
      "Skeleton loading animations",
      "Smart request caching"
    ],
    learnings: "API integration, state management, localStorage optimization, and premium UI design patterns.",
    challenges: "Caching strategy for API calls; implemented smart cache invalidation and request throttling."
  },
  {
    id: 12,
    title: "Thermex - Temperature Converter",
    category: "Frontend Projects",
    difficulty: "Medium",
    status: "Completed",
    duration: "1 Week",
    tech: "HTML5, CSS3, JavaScript, Glassmorphism",
    icon: "fa-solid fa-thermometer",
    desc: "Modern temperature converter featuring live conversion, history tracking, and glassmorphic design interface.",
    features: [
      "Accurate conversions between Celsius, Fahrenheit, Kelvin",
      "Live conversion as user types",
      "Conversion history tracking",
      "Input validation and absolute zero protection",
      "Dark/light mode toggle",
      "Keyboard shortcuts support",
      "Clean glassmorphism UI"
    ],
    learnings: "Real-time input handling, theme switching, keyboard event management, and modern UI aesthetics.",
    challenges: "Precision in temperature calculations; solved using proper float handling and validation."
  },
  {
    id: 13,
    title: "Personality Predictor",
    category: "Frontend Projects",
    difficulty: "Easy",
    status: "Completed",
    duration: "1 Week",
    tech: "HTML5, CSS3, JavaScript, Interactive UI",
    icon: "fa-solid fa-sparkles",
    desc: "Web-based personality predictor that processes user input and dynamically generates personality-based results.",
    features: [
      "Interactive questionnaire interface",
      "Dynamic result generation",
      "Offline functionality",
      "Curiosity-driven questions",
      "Result persistence"
    ],
    learnings: "DOM manipulation, event handling, dynamic content rendering, and user interaction design.",
    challenges: "Ensuring accurate personality mapping; solved using structured question scoring algorithm."
  },
  {
    id: 14,
    title: "FurqanLabs Landing Page",
    category: "Frontend Projects",
    difficulty: "Medium",
    status: "Completed",
    duration: "1 Week",
    tech: "HTML5, CSS3, Responsive Design, Semantic HTML",
    icon: "fa-solid fa-rocket",
    desc: "Modern, fully responsive landing page featuring hero section, services, pricing, and testimonials.",
    features: [
      "Hero section with call-to-action",
      "Services showcase",
      "Pricing tables",
      "Mobile-first responsive design",
      "CSS Flexbox and Grid layouts"
    ],
    learnings: "CSS Grid/Flexbox mastery, responsive design patterns, and semantic HTML structure.",
    challenges: "Cross-browser compatibility; resolved using vendor prefixes and fallback layouts."
  },

  // Games & Interactive Projects
  {
    id: 15,
    title: "Ping Pong Game",
    category: "Games",
    difficulty: "Medium",
    status: "Completed",
    duration: "1 Week",
    tech: "HTML5 Canvas, JavaScript, CSS3",
    icon: "fa-solid fa-gamepad",
    desc: "Interactive Ping Pong game with real-time paddle and ball movement, collision detection, and score tracking.",
    features: [
      "Real-time paddle and ball movement",
      "Collision detection algorithms",
      "Score tracking and display",
      "Keyboard-based controls",
      "Responsive UI design"
    ],
    learnings: "Game logic implementation, collision detection, canvas rendering, and event handling.",
    challenges: "Frame rate optimization; solved using requestAnimationFrame and efficient collision checks."
  },
  {
    id: 16,
    title: "Snake Classic Game",
    category: "Games",
    difficulty: "Easy",
    status: "Completed",
    duration: "3 Days",
    tech: "HTML5 Canvas, JavaScript, CSS3",
    icon: "fa-solid fa-gamepad",
    desc: "Classic snake game with smooth animations, dynamic difficulty, and high score persistence.",
    features: [
      "60 FPS canvas rendering",
      "Dynamic speed escalation based on score",
      "High score tracking with LocalStorage",
      "Responsive grid-based gameplay"
    ],
    learnings: "Game loops, canvas APIs, grid-based movement, and state persistence.",
    challenges: "Collision detection optimization; solved using precise grid coordinate calculations."
  },
  {
    id: 17,
    title: "Tic Tac Toe Game (AI)",
    category: "Games",
    difficulty: "Medium",
    status: "Completed",
    duration: "2 Days",
    tech: "JavaScript, HTML5, CSS3",
    icon: "fa-solid fa-xmark",
    desc: "Premium two-player game with unbeatable AI opponent using Minimax algorithm.",
    features: [
      "Unbeatable AI using Minimax algorithm",
      "Glassmorphic design with fluid animations",
      "Player vs Player or Player vs AI modes",
      "Win/Draw detection",
      "Game reset functionality"
    ],
    learnings: "Minimax algorithm, game tree analysis, recursion, and AI decision-making.",
    challenges: "AI computational efficiency; optimized by caching win combinations and pruning search."
  },

  // Data Analysis & Database Systems
  {
    id: 18,
    title: "Exploratory Data Analysis - Starbucks Dataset",
    category: "Data Analysis",
    difficulty: "Medium",
    status: "Completed",
    duration: "2 Weeks",
    tech: "Python, Pandas, Matplotlib, Seaborn, Google Colab",
    icon: "fa-solid fa-chart-bar",
    desc: "Comprehensive EDA on Starbucks beverage dataset exploring nutritional patterns and customer insights.",
    features: [
      "Data structure analysis and missing value handling",
      "Descriptive statistics and data cleaning",
      "Correlation analysis and feature relationships",
      "Visualizations: bar charts, histograms, box plots, heatmaps",
      "Nutritional pattern identification"
    ],
    learnings: "Data cleaning, exploratory analysis, visualization techniques, and insight extraction.",
    challenges: "Handling missing values intelligently; solved using statistical imputation methods."
  },
  {
    id: 19,
    title: "SQL Advanced Queries (Joins & Aggregations)",
    category: "Databases",
    difficulty: "Medium",
    status: "Completed",
    duration: "2 Weeks",
    tech: "SQL, Microsoft SQL Server",
    icon: "fa-solid fa-database",
    desc: "Mastering complex SQL operations including joins, aggregations, GROUP BY, and set operations.",
    features: [
      "INNER JOIN and LEFT JOIN techniques",
      "Aggregate functions: COUNT, SUM, AVG, MAX, MIN",
      "GROUP BY and HAVING clauses",
      "Set operations: UNION, INTERSECT",
      "Multi-table relationships"
    ],
    learnings: "Relational database design, query optimization, and complex data analysis.",
    challenges: "Query performance on large datasets; optimized using indexing and query restructuring."
  },
  {
    id: 20,
    title: "SQL JOIN Practice & Relational Analysis",
    category: "Databases",
    difficulty: "Medium",
    status: "Completed",
    duration: "1 Week",
    tech: "SQL, Relational Databases",
    icon: "fa-solid fa-database",
    desc: "Comprehensive practice with JOIN operations and aggregate functions for relational data analysis.",
    features: [
      "INNER and LEFT JOIN mastery",
      "Multi-table joins",
      "Aggregate analysis across tables",
      "Grouped analysis with aggregations",
      "Top performer identification"
    ],
    learnings: "Multi-table queries, data correlation, and advanced aggregation techniques.",
    challenges: "Handling null values in joins; solved using COALESCE and proper NULL handling."
  },
  {
    id: 21,
    title: "SQL Pattern Matching (LIKE & Wildcards)",
    category: "Databases",
    difficulty: "Easy",
    status: "Completed",
    duration: "1 Week",
    tech: "SQL, Database Query",
    icon: "fa-solid fa-magnifying-glass",
    desc: "Mastering LIKE operator and wildcard patterns for flexible real-world data retrieval scenarios.",
    features: [
      "LIKE operator for pattern matching",
      "% wildcard for multi-character matching",
      "_ wildcard for single-character placeholders",
      "Search bar functionality implementation",
      "Database filtering on name patterns and SKU formats"
    ],
    learnings: "Pattern matching techniques, wildcard usage, and real-world search implementation.",
    challenges: "Performance with complex patterns; solved using indexed columns and strategic pattern design."
  },

  // Systems & Academic Programming
  {
    id: 22,
    title: "Assembly Multiplication Tables (16-bit MASM)",
    category: "Systems Programming",
    difficulty: "Medium",
    status: "Completed",
    duration: "2 Weeks",
    tech: "16-bit MASM, DOS Interrupts, Assembly",
    icon: "fa-solid fa-microchip",
    desc: "16-bit Assembly program generating multiplication tables 1-20 using nested loops and DOS interrupts.",
    features: [
      "Nested loop structures in Assembly",
      "Procedure implementation",
      "DOS interrupt (int 21h) for output",
      "Register usage optimization",
      "Formatted output generation"
    ],
    learnings: "Low-level Assembly concepts, register manipulation, and systems-level programming.",
    challenges: "Memory segmentation and far calls; resolved using proper segment declarations."
  },
  {
    id: 23,
    title: "C++ Loop & Pattern Practice",
    category: "Systems Programming",
    difficulty: "Easy",
    status: "Completed",
    duration: "2 Weeks",
    tech: "C++, Loops, Pattern Printing",
    icon: "fa-solid fa-code",
    desc: "Collection of C++ programs demonstrating loop constructs and pattern printing techniques.",
    features: [
      "For and nested loop constructs",
      "Number pattern generation",
      "Alphabet pattern printing",
      "Shape and square patterns",
      "Multiplication table displays"
    ],
    learnings: "Loop constructs mastery, nested logic, and pattern generation algorithms.",
    challenges: "Precision in pattern alignment; solved using proper spacing calculations."
  },
  {
    id: 24,
    title: "C++ Object-Oriented Programming",
    category: "Systems Programming",
    difficulty: "Medium",
    status: "Completed",
    duration: "3 Weeks",
    tech: "C++, OOP, Inheritance, Classes",
    icon: "fa-solid fa-cube",
    desc: "Comprehensive C++ programs demonstrating OOP concepts including inheritance, constructors, and operator overloading.",
    features: [
      "Class design and object instantiation",
      "Inheritance and polymorphism",
      "Constructors and destructors",
      "Operator overloading",
      "Friend classes and functions",
      "Arrays and matrices of objects"
    ],
    learnings: "OOP principles, class hierarchies, memory management, and advanced C++ concepts.",
    challenges: "Managing object lifecycle; solved using proper constructor/destructor patterns."
  },
  {
    id: 25,
    title: "C++ Practice Programs (Advanced Fundamentals)",
    category: "Systems Programming",
    difficulty: "Medium",
    status: "Completed",
    duration: "2 Weeks",
    tech: "C++, Problem Solving, Algorithms",
    icon: "fa-solid fa-code",
    desc: "Collection of intermediate-to-advanced C++ programs for strengthening programming fundamentals.",
    features: [
      "Loops and conditionals mastery",
      "Function design and implementation",
      "Array manipulation",
      "Real-world logic problems",
      "Well-commented code structure"
    ],
    learnings: "Problem-solving approaches, algorithm design, and code organization.",
    challenges: "Complex logic debugging; solved using structured testing and step-by-step validation."
  },
  {
    id: 26,
    title: "Data Structures & Algorithms (DSA) Lab",
    category: "Systems Programming",
    difficulty: "Hard",
    status: "Completed",
    duration: "4 Weeks",
    tech: "C++, DSA, Dynamic Memory",
    icon: "fa-solid fa-sitemap",
    desc: "Comprehensive DSA implementations including sorting, searching, stacks, queues, and doubly linked lists.",
    features: [
      "Sorting algorithms: Bubble, Quick, Merge",
      "Searching: Linear and Binary Search",
      "Stack and Queue implementations",
      "Doubly Linked Lists",
      "Dynamic memory allocation and pointers",
      "Time complexity analysis"
    ],
    learnings: "Data structure design, algorithm efficiency, memory management, and complexity analysis.",
    challenges: "Pointer management and memory leaks; solved using careful allocation tracking."
  },
  {
    id: 27,
    title: "Student Management System (DSA)",
    category: "Systems Programming",
    difficulty: "Medium",
    status: "Completed",
    duration: "2 Weeks",
    tech: "C++, Data Structures, File I/O",
    icon: "fa-solid fa-network-wired",
    desc: "Console-based student management system using DSA concepts for efficient data handling.",
    features: [
      "Linked Lists and Vectors for data storage",
      "CRUD operations with efficient algorithms",
      "Search and sort functionality",
      "File I/O for data persistence",
      "Menu-driven interface"
    ],
    learnings: "Practical DSA application, file operations, and user interface design.",
    challenges: "Efficient searching on large datasets; optimized using binary search and indexing."
  },
  {
    id: 28,
    title: "Student Management System (Programming Fundamentals)",
    category: "Systems Programming",
    difficulty: "Easy",
    status: "Completed",
    duration: "1 Week",
    tech: "C++, Fundamentals, Arrays",
    icon: "fa-solid fa-users",
    desc: "Beginner-level console-based system for student record management using arrays and functions.",
    features: [
      "Add, view, update, search, delete operations",
      "Menu-driven user interface",
      "Input validation",
      "Basic data management",
      "Structured programming approach"
    ],
    learnings: "Function design, array manipulation, menu systems, and basic data management.",
    challenges: "Array boundary management; solved using proper indexing and validation."
  },
  {
    id: 29,
    title: "Digital Logic Design Lab",
    category: "Systems Programming",
    difficulty: "Medium",
    status: "Completed",
    duration: "2 Weeks",
    tech: "Digital Logic, Circuit Design",
    icon: "fa-solid fa-diagram-project",
    desc: "Circuit diagrams for combinational and sequential logic including adders, multiplexers, and flip-flops.",
    features: [
      "Logic gates implementation",
      "Adder and subtractor circuits",
      "Multiplexers and decoders",
      "Flip-flops and counters",
      "Circuit diagram documentation"
    ],
    learnings: "Digital logic principles, circuit design, and schematic documentation.",
    challenges: "Complex circuit optimization; solved using Boolean algebra and circuit simplification."
  },
  {
    id: 30,
    title: "Programming Fundamentals Lab Tasks",
    category: "Systems Programming",
    difficulty: "Easy",
    status: "Completed",
    duration: "2 Weeks",
    tech: "C++, Basics",
    icon: "fa-solid fa-graduation-cap",
    desc: "Beginner-level C++ programs covering geometric calculations, variable swapping, and I/O operations.",
    features: [
      "Geometric calculations",
      "Variable swapping techniques",
      "ASCII character manipulation",
      "Basic input/output operations",
      "Simple problem solving"
    ],
    learnings: "C++ syntax, basic algorithms, and fundamental programming concepts.",
    challenges: "Precision in calculations; solved using proper data types and mathematical formulas."
  },
  {
    id: 31,
    title: "SQL Practice - Aggregate Functions & GROUP BY",
    category: "Databases",
    difficulty: "Medium",
    status: "Completed",
    duration: "1 Week",
    tech: "SQL, Aggregation",
    icon: "fa-solid fa-database",
    desc: "Exercises focused on aggregate functions, GROUP BY, and HAVING clauses for data summarization.",
    features: [
      "Aggregate functions: COUNT, SUM, AVG, MAX, MIN",
      "GROUP BY for data organization",
      "HAVING clause for filtered aggregation",
      "Summary statistics generation",
      "Data analysis queries"
    ],
    learnings: "Aggregation techniques, grouped analysis, and data summarization.",
    challenges: "Complex grouping scenarios; solved using multi-level grouping and sub-queries."
  },
  {
    id: 32,
    title: "PHP Fundamentals Practice",
    category: "Backend Programming",
    difficulty: "Easy",
    status: "Completed",
    duration: "2 Weeks",
    tech: "PHP, Notepad, Server-Side",
    icon: "fa-solid fa-code",
    desc: "Manual PHP coding practice covering variables, conditionals, loops, and arrays without IDE.",
    features: [
      "Variable declaration and manipulation",
      "Conditional statements (if-else)",
      "Loop structures (for, while, do-while, foreach)",
      "Indexed and associative arrays",
      "Manual syntax learning"
    ],
    learnings: "PHP syntax fundamentals, server-side execution, and foundational programming.",
    challenges: "Syntax accuracy without IDE assistance; improved through manual code review."
  },

  // Automation & Workflow Integration
  {
    id: 33,
    title: "n8n Restaurant AI Automation Workflow",
    category: "Automation",
    difficulty: "Medium",
    status: "Completed",
    duration: "2 Weeks",
    tech: "n8n, Gemini API, Google Sheets, LLM",
    icon: "fa-solid fa-robot",
    desc: "AI-powered restaurant automation workflow managing orders, inventory, and customer feedback using n8n and Gemini API.",
    features: [
      "Automated order management",
      "Real-time inventory tracking",
      "Customer query analysis using Gemini LLM",
      "Automated FAQ responses",
      "Google Sheets data synchronization",
      "Performance analytics and insights"
    ],
    learnings: "Workflow orchestration, LLM integration, prompt engineering, and automation design.",
    challenges: "LLM output formatting; solved using strict JSON schema declarations in prompts."
  }
];

  const projectsGrid = document.getElementById('projects-grid-container');
  const detailsModal = document.getElementById('project-details-modal');
  const modalContent = detailsModal ? detailsModal.querySelector('.modal-body-content') : null;

  // Project cards are now static HTML (baked into index.html) so they always
  // display even if this script fails to run or load. This script only wires
  // up the "Read Details" modal for them.
  if (projectsGrid) {
    // Details Modal Click Listener
    document.querySelectorAll('.project-details-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'));
        const proj = projectsData.find(p => p.id === id);
        if (proj && detailsModal && modalContent) {
          const difficultyClass = proj.difficulty === 'Easy' ? 'difficulty-easy' : (proj.difficulty === 'Medium' ? 'difficulty-medium' : 'difficulty-hard');
          
          let featuresHTML = '';
          proj.features.forEach(f => {
            featuresHTML += `<li>${f}</li>`;
          });

          modalContent.innerHTML = `
            <div class="modal-project-header">
              <div class="modal-project-title-row">
                <h2>${proj.title}</h2>
                <span class="project-sr-difficulty ${difficultyClass}">${proj.difficulty}</span>
              </div>
              <div class="modal-project-meta-row">
                <span><strong>Category:</strong> ${proj.category}</span>
                <span><strong>Status:</strong> ${proj.status}</span>
                <span><strong>Duration:</strong> ${proj.duration}</span>
              </div>
            </div>
            <div class="modal-project-body">
              <p>${proj.desc}</p>
              <div>
                <h4>Key Features</h4>
                <ul class="modal-bullets-list">
                  ${featuresHTML}
                </ul>
              </div>
              <div>
                <h4>Key Learnings</h4>
                <p>${proj.learnings}</p>
              </div>
              <div>
                <h4>Challenges Solved</h4>
                <p>${proj.challenges}</p>
              </div>
              <p><strong>Technologies Used:</strong> ${proj.tech}</p>
            </div>
            <div class="modal-project-links">
              <a href="https://github.com/furqanzubair209-cell" target="_blank" class="btn-primary">
                <i class="fa-brands fa-github"></i> GitHub Profile
              </a>
              <a href="https://www.linkedin.com/in/muhammad-furqan-228807304/" target="_blank" class="btn-secondary">
                <i class="fa-brands fa-linkedin-in"></i> LinkedIn
              </a>
            </div>
          `;
          detailsModal.classList.add('show');
        }
      });
    });
  }

  // Close Modals
  document.querySelectorAll('.modal-backdrop').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.classList.contains('modal-close-btn')) {
        modal.classList.remove('show');
      }
    });
  });

  // Certifications Data & Renderer
  const certsData = [
    { name: "C Intermediate", issuer: "Sololearn", date: "Jul 2026", id: "CC-O8ZRWWT3", skills: "Pointers, Recursion, File Handling, Memory Management" },
    { name: "Python Intermediate", issuer: "Sololearn", date: "Jul 2026", id: "CC-5G2SYHYD", skills: "Object-Oriented Programming, File Handling, Exception Handling" },
    { name: "Claude with Anthropic API", issuer: "Anthropic", date: "Jun 2026", id: "fiws6btf6aef", skills: "API Integration, Prompt Design, AI Applications" },
    { name: "AI Fluency: Framework & Foundations", issuer: "Anthropic", date: "Jun 2026", id: "9irmywg3n7h3", skills: "AI Fundamentals, Responsible AI, Framework Principles" },
    { name: "Claude Code 101", issuer: "Anthropic", date: "Jun 2026", id: "zfeu8py2orp4", skills: "AI-Assisted Development, Debugging, Code Optimization" },
    { name: "Claude 101", issuer: "Anthropic", date: "Jun 2026", id: "shgu6gyn969j", skills: "Large Language Models, Prompting Strategies, Responsible AI" },
    { name: "AI Fluency for Students", issuer: "Anthropic", date: "Jun 2026", id: "eaev74cqgwt8", skills: "AI Fundamentals, Prompt Engineering, AI-Assisted Learning" },
    { name: "Introduction to HTML", issuer: "Sololearn", date: "Jun 2026", id: "CC-KURNTB6E", skills: "HTML5, Semantic Elements, Web Structure, Forms" },
    { name: "Generative AI in Practice", issuer: "Sololearn", date: "Jun 2026", id: "CC-DIPE9EM5", skills: "Generative AI, Prompt Engineering, AI Applications" },
    { name: "Data Analytics with AI", issuer: "Sololearn", date: "Jun 2026", id: "CC-HFRQGOL5", skills: "Data Analysis, Visualization, Statistical Analysis, AI-Driven Insights" },
    { name: "SQL Intermediate", issuer: "Sololearn", date: "Jun 2026", id: "CC-NJCVPJER", skills: "Complex Queries, Joins, Subqueries, Database Optimization" },
    { name: "Coding Foundations", issuer: "Sololearn", date: "Jun 2026", id: "CC-K9YKYDTF", skills: "Programming Logic, Algorithms, Data Types, Control Structures" },
    { name: "Introduction to Python", issuer: "Sololearn", date: "Jun 2026", id: "CC-F8CCOGF9", skills: "Python Programming, Variables, Data Types, Functions" },
    { name: "Introduction to C++", issuer: "Sololearn", date: "May 2026", id: "CC-LG9MIFTE", skills: "C++ Fundamentals, Object-Oriented Programming, DSA" },
    { name: "Introduction to C language", issuer: "Sololearn", date: "May 2026", id: "CC-VVTVQFPL", skills: "C Programming, Memory Addressing, Logic Fundamentals" },
    { name: "Character Mastery", issuer: "The Superior University", date: "Sep 2024", id: "CAKCCIS-2024", skills: "Leadership, Ethics, Communication, Teamwork" },
    { name: "Introduction to SQL", issuer: "Sololearn", date: "May 2026", id: "CC-M7TF0W3T", skills: "SQL Fundamentals, Queries, Database Operations, Filtering" }
  ];

  const certsGrid = document.getElementById('certifications-grid-container');
  if (certsGrid) {
    certsData.forEach(cert => {
      const card = document.createElement('div');
      card.className = 'cert-dashboard-card';
      
      let initials = cert.issuer.split(' ').map(w => w[0]).join('');
      
      card.innerHTML = `
        <div class="cert-card-header">
          <div class="cert-card-logo-placeholder">${initials}</div>
          <div class="cert-card-header-meta">
            <h4>${cert.name}</h4>
            <span class="cert-card-issuer">${cert.issuer}</span>
          </div>
        </div>
        <div class="cert-card-body">
          <span><i class="fa-solid fa-calendar-days"></i> Issued ${cert.date}</span>
          <span><i class="fa-solid fa-hashtag"></i> ID: ${cert.id}</span>
          <span class="cert-card-skills-tag">Skills: ${cert.skills}</span>
        </div>
      `;
      certsGrid.appendChild(card);
    });
  }

  // Resume Modal & Download Controller
  const resumePreviewModal = document.getElementById('resume-preview-modal');
  const resumeTriggers = document.querySelectorAll('.resume-trigger');
  
  resumeTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      const id = e.currentTarget.id;
      if (id === 'resume-download-btn' || id === 'resume-modal-download-btn') {
        window.open('Furqan CV.pdf', '_blank');
      } else if (resumePreviewModal) {
        e.preventDefault();
        resumePreviewModal.classList.add('show');
      }
    });
  });

  const closeResumeModal = document.getElementById('close-resume-modal');
  if (closeResumeModal && resumePreviewModal) {
    closeResumeModal.addEventListener('click', () => {
      resumePreviewModal.classList.remove('show');
    });
  }

  // Contact Form Handling
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const subject = document.getElementById('form-subject').value.trim();
      const message = document.getElementById('form-msg').value.trim();
      
      if (!name || !email || !subject || !message) {
        showToast("Please fill in all details.");
        return;
      }
      
      const emailTarget = "furqanzubair209@gmail.com";
      const emailSubject = `Portfolio Message: ${subject}`;
      const emailBody = `Sender Name: ${name}\nSender Email: ${email}\n\nMessage Details:\n${message}`;
      
      const mailtoUrl = `mailto:${emailTarget}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      
      window.location.href = mailtoUrl;
      showToast("Redirecting to email client...");
      contactForm.reset();
    });
  }

  // Copy Email to Clipboard
  const copyEmailBtn = document.getElementById('copy-email-btn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const emailAddress = "furqanzubair209@gmail.com";
      navigator.clipboard.writeText(emailAddress).then(() => {
        showToast("Email address copied to clipboard!");
      }).catch(err => {
        showToast("Failed to copy email.");
      });
    });
  }

  // Toast Notifications
  const toastContainer = document.getElementById('toast-container');
  function showToast(msg) {
    if (toastContainer) {
      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.innerHTML = `<i class="fa-solid fa-circle-info"></i> <span>${msg}</span>`;
      
      toastContainer.appendChild(toast);
      
      setTimeout(() => {
        toast.classList.add('hide');
        setTimeout(() => {
          toast.remove();
        }, 300);
      }, 3000);
    }
  }

  // Scroll Reveal Observer
  const revealElements = document.querySelectorAll('.scroll-reveal-fade, .scroll-reveal-zoom, .scroll-reveal-slide');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });

    revealElements.forEach(el => revealObserver.observe(el));

    // Safety net: if a browser's IntersectionObserver never fires for some
    // elements (seen on some WebViews), force-reveal everything after a delay
    // so content can never get stuck permanently invisible.
    setTimeout(() => {
      revealElements.forEach(el => el.classList.add('revealed'));
    }, 4000);
  } else {
    // No IntersectionObserver support at all: just show everything immediately.
    revealElements.forEach(el => el.classList.add('revealed'));
  }
});

