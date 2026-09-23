// Project data for the portfolio grid.
// Descriptions are kept short on purpose; the full story lives in each repo.

export const projects = [
  {
    name: "movie-recommender-system",
    url: "https://github.com/panteamkhh/movie-recommender-system",
    emoji: "🎬",
    color: "#ffb3c7",
    description:
      "Movie recommendations on MovieLens 100k with item/user collaborative filtering and SVD, packaged as a FastAPI service with Docker.",
    tags: ["Recommenders", "SVD", "FastAPI"],
  },
  {
    name: "yelp-review-classification",
    url: "https://github.com/panteamkhh/yelp-review-classification",
    emoji: "🍽️",
    color: "#a8e6cf",
    description:
      "Yelp review sentiment analysis with TF-IDF and linear models — 0.95 F1 across 25 figures, served with FastAPI and Docker.",
    tags: ["NLP", "TF-IDF", "FastAPI"],
  },
  {
    name: "spam-email-classifier",
    url: "https://github.com/panteamkhh/spam-email-classifier",
    emoji: "📧",
    color: "#a9d9ff",
    description:
      "Spam email classification with TF-IDF and Naive Bayes / linear models — 99% F1, with a FastAPI + Docker deployment.",
    tags: ["NLP", "Naive Bayes", "FastAPI"],
  },
  {
    name: "traffic-sign-classification",
    url: "https://github.com/panteamkhh/traffic-sign-classification",
    emoji: "🚦",
    color: "#cdc0ff",
    description:
      "German traffic sign recognition across 43 classes with a PyTorch LeNet CNN — 93% accuracy, FastAPI + Docker.",
    tags: ["PyTorch", "CNN", "Computer vision"],
  },
  {
    name: "avocado-price-forecasting",
    url: "https://github.com/panteamkhh/avocado-price-forecasting",
    emoji: "🥑",
    color: "#c3f0ca",
    description:
      "Avocado price forecasting using seasonality, lag features and gradient boosting, deployed behind FastAPI + Docker.",
    tags: ["Time series", "Boosting", "Forecasting"],
  },
  {
    name: "chicago-crime-rate-forecasting",
    url: "https://github.com/panteamkhh/chicago-crime-rate-forecasting",
    emoji: "🏙️",
    color: "#ffe6a7",
    description:
      "Chicago crime-rate time-series forecasting with statsmodels and XGBoost, wrapped in a FastAPI + Docker service.",
    tags: ["Time series", "XGBoost", "Forecasting"],
  },
  {
    name: "cifar10-image-classification",
    url: "https://github.com/panteamkhh/cifar10-image-classification",
    emoji: "🖼️",
    color: "#ffb3c7",
    description:
      "CIFAR-10 image classification with a PyTorch CNN — EDA, training curves and evaluation, served with FastAPI + Docker.",
    tags: ["PyTorch", "CNN", "Deep learning"],
  },
  {
    name: "sales-data-analysis",
    url: "https://github.com/panteamkhh/sales-data-analysis",
    emoji: "📊",
    color: "#a8e6cf",
    description:
      "Retail sales analysis with Power BI and Python — sales, profit, products, discounts, trends and geographic performance.",
    tags: ["Power BI", "pandas", "EDA"],
  },
  {
    name: "python-self-study-course",
    url: "https://github.com/panteamkhh/python-self-study-course",
    emoji: "📗",
    color: "#a9d9ff",
    description:
      "A complete, self-paced Python course from zero to advanced: 15 lessons with runnable examples, exercises, solutions and quizzes.",
    tags: ["Python", "Education", "Course"],
  },
  {
    name: "Audio-Merger-Telegram-Bot",
    url: "https://github.com/panteamkhh/Audio-Merger-Telegram-Bot",
    emoji: "🎵",
    color: "#cdc0ff",
    description:
      "Self-hosted Telegram bot (aiogram 3 + FFmpeg) that merges many audio tracks into one file, in the exact order they're sent.",
    tags: ["aiogram", "FFmpeg", "Docker"],
  },
  {
    name: "spotify-powerbi-analytics",
    url: "https://github.com/panteamkhh/spotify-powerbi-analytics",
    emoji: "🎧",
    color: "#c3f0ca",
    description:
      "End-to-end Power BI analytics on Spotify music data — cleaning, transformation, data modelling and interactive dashboards.",
    tags: ["Power BI", "Power Query", "Modelling"],
  },
  {
    name: "task-reminder-telegram",
    url: "https://github.com/panteamkhh/task-reminder-telegram",
    emoji: "⏰",
    color: "#ffe6a7",
    description:
      "Lightweight Telegram task manager and reminder bot with JSON persistence, built on pyTelegramBotAPI.",
    tags: ["Telegram", "Python", "Bots"],
  },
  {
    name: "Mini-Projects",
    url: "https://github.com/panteamkhh/Mini-Projects",
    emoji: "🎯",
    color: "#ffb3c7",
    description:
      "A collection of 20 practical Python mini projects, from core language fundamentals to basic data analysis.",
    tags: ["Python", "OOP", "Practice"],
  },
  {
    name: "Math-for-AI-From-Zero-to-Intelligence",
    url: "https://github.com/panteamkhh/Math-for-AI-From-Zero-to-Intelligence",
    emoji: "➗",
    color: "#a8e6cf",
    description:
      "The intuitive math behind AI — one 10-minute lesson a day for 80 days across linear algebra, calculus, probability and statistics.",
    tags: ["Math", "AI", "Education"],
  },
  {
    name: "insurance-data-analysis",
    url: "https://github.com/panteamkhh/insurance-data-analysis",
    emoji: "🛡️",
    color: "#a8e6cf",
    description:
      "Insurance portfolio analysis in Python — premium, claims, loss ratios and trends — plus an ML sentiment model for customer feedback.",
    tags: ["Python", "pandas", "NLP", "Sentiment"],
  },
  {
    name: "cefr-lexical-intelligence",
    url: "https://github.com/panteamkhh/cefr-lexical-intelligence",
    emoji: "📚",
    color: "#cdc0ff",
    description:
      "NLP system that maps vocabulary through semantic embeddings and CEFR levels: embeddings, clustering, semantic search and category discovery.",
    tags: ["NLP", "Embeddings", "Clustering"],
  },
  {
    name: "hotel-cancellation-prediction",
    url: "https://github.com/panteamkhh/hotel-cancellation-prediction",
    emoji: "🏨",
    color: "#ffb3c7",
    description:
      "End-to-end analysis of ~119k hotel bookings and a LightGBM model (0.922 ROC-AUC) that predicts cancellations at booking time.",
    tags: ["LightGBM", "Classification"],
  },
  {
    name: "car-price-predictor-ml",
    url: "https://github.com/panteamkhh/car-price-predictor-ml",
    emoji: "🚗",
    color: "#a9d9ff",
    description:
      "Regression project predicting how much a customer will pay for a car: 9 models, cross-validation, Optuna tuning and SHAP explainability.",
    tags: ["XGBoost", "SHAP", "FastAPI"],
  },
  {
    name: "ecommerce-orders-lens",
    url: "https://github.com/panteamkhh/ecommerce-orders-lens",
    emoji: "🛒",
    color: "#c3f0ca",
    description:
      "A 21-step documented cleaning pipeline with an audit log, Python EDA, order-outcome ML, RFM KMeans segmentation and an HTML dashboard.",
    tags: ["scikit-learn", "EDA", "KMeans"],
  },
  {
    name: "maintenance-data-pipeline",
    url: "https://github.com/panteamkhh/maintenance-data-pipeline",
    emoji: "🛠️",
    color: "#ffe6a7",
    description:
      "Maintenance analytics on a CMMS dataset: data-quality audit, KPIs (MTTR, availability, PM compliance), Pareto RCA and a Streamlit dashboard.",
    tags: ["Streamlit", "KPIs", "Pareto"],
  },
  {
    name: "pharma-sales360",
    url: "https://github.com/panteamkhh/pharma-sales360",
    emoji: "💊",
    color: "#a8e6cf",
    description:
      "Pharma sales & CRM analytics: reproducible Python generator, SQL Server star schema, statistical analysis, Power BI/DAX spec and Excel reports.",
    tags: ["SQL Server", "Power BI", "Star schema"],
  },
  {
    name: "upi-transactions-data-analysis",
    url: "https://github.com/panteamkhh/upi-transactions-data-analysis",
    emoji: "💳",
    color: "#cdc0ff",
    description:
      "End-to-end UPI transactions analysis with a Python pipeline, an interactive Streamlit dashboard and a Power BI star-schema report.",
    tags: ["Fintech", "Streamlit", "Power BI"],
  },
  {
    name: "google-play-store-analytics",
    url: "https://github.com/panteamkhh/google-play-store-analytics",
    emoji: "📱",
    color: "#c3f0ca",
    description:
      "Google Play Store apps taken through cleaning, EDA and feature engineering to a rating-prediction model, with reusable modules and tests.",
    tags: ["EDA", "scikit-learn"],
  },
  {
    name: "student-performance-ml",
    url: "https://github.com/panteamkhh/student-performance-ml",
    emoji: "🎓",
    color: "#ffe6a7",
    description:
      "Student-performance analysis and ML study — classification, regression and K-Means — with an interactive Streamlit dashboard.",
    tags: ["scikit-learn", "Streamlit"],
  },
  {
    name: "build-mcp-agents",
    url: "https://github.com/panteamkhh/build-mcp-agents",
    emoji: "🔌",
    color: "#ffb3c7",
    description:
      "Hands-on, code-first playbook for building MCP servers and agents: 10 phases from fundamentals to production, with a capstone agent.",
    tags: ["MCP", "Agents", "Python"],
  },
  {
    name: "build-ai-agents",
    url: "https://github.com/panteamkhh/build-ai-agents",
    emoji: "🤖",
    color: "#a9d9ff",
    description:
      "Code-first playbook for building AI agents: 5 phases from fundamentals to production, runnable examples and an offline capstone project.",
    tags: ["LLM", "Agents", "RAG"],
  },
  {
    name: "llm-engineering-lab",
    url: "https://github.com/panteamkhh/llm-engineering-lab",
    emoji: "🧪",
    color: "#a8e6cf",
    description:
      "A practical generative-AI engineering lab exploring LLM foundations, tokenization, deployment strategies and real-world system design.",
    tags: ["GenAI", "LLM"],
  },
  {
    name: "python-data-lab",
    url: "https://github.com/panteamkhh/python-data-lab",
    emoji: "🐍",
    color: "#c3f0ca",
    description:
      "Hands-on lab for the Python data stack — NumPy, Pandas and Matplotlib — with 15 sessions, mini projects and cheat sheets.",
    tags: ["pandas", "matplotlib"],
  },
  {
    name: "ml-course-from-scratch",
    url: "https://github.com/panteamkhh/ml-course-from-scratch",
    emoji: "📐",
    color: "#cdc0ff",
    description:
      "Learning machine learning by building algorithms from scratch, understanding the theory, and validating them against scikit-learn.",
    tags: ["ML theory", "From scratch"],
  },
  {
    name: "planner-pro",
    url: "https://github.com/panteamkhh/planner-pro",
    emoji: "🗓️",
    color: "#ffe6a7",
    description:
      "Fully offline, bilingual (Persian/English) personal planner with Jalali & Gregorian calendars — zero dependencies, a single HTML file.",
    tags: ["Vanilla JS", "Offline"],
  },
];

export const skills = [
  { title: "Languages & data", items: ["Python", "SQL", "pandas", "NumPy", "Jupyter"] },
  { title: "Machine learning", items: ["scikit-learn", "XGBoost", "LightGBM", "Optuna", "SHAP"] },
  { title: "NLP & AI", items: ["sentence-transformers", "LLM APIs", "RAG", "Agents"] },
  { title: "BI & visualization", items: ["Power BI", "DAX", "Power Query", "matplotlib", "seaborn", "Streamlit"] },
  { title: "Engineering", items: ["pytest", "ruff", "black", "Git", "Docker", "GitHub Actions"] },
];
