// Project data for the portfolio grid.
// Descriptions are kept short on purpose; the full story lives in each repo.

export const projects = [
  {
    name: "insurance-data-analysis",
    url: "https://github.com/panteamkhh/insurance-data-analysis",
    emoji: "🛡️",
    color: "#35d0c8",
    description:
      "Insurance portfolio analysis in Python — premium, claims, loss ratios and trends — plus an ML sentiment model for customer feedback.",
    tags: ["Python", "pandas", "NLP", "Sentiment"],
  },
  {
    name: "cefr-lexical-intelligence",
    url: "https://github.com/panteamkhh/cefr-lexical-intelligence",
    emoji: "📚",
    color: "#8b5cf6",
    description:
      "NLP system that maps vocabulary through semantic embeddings and CEFR levels: embeddings, clustering, semantic search and category discovery.",
    tags: ["NLP", "Embeddings", "Clustering"],
  },
  {
    name: "hotel-cancellation-prediction",
    url: "https://github.com/panteamkhh/hotel-cancellation-prediction",
    emoji: "🏨",
    color: "#ff3d8b",
    description:
      "End-to-end analysis of ~119k hotel bookings and a LightGBM model (0.922 ROC-AUC) that predicts cancellations at booking time.",
    tags: ["LightGBM", "Classification"],
  },
  {
    name: "car-price-predictor-ml",
    url: "https://github.com/panteamkhh/car-price-predictor-ml",
    emoji: "🚗",
    color: "#4aa8ff",
    description:
      "Regression project predicting how much a customer will pay for a car: 9 models, cross-validation, Optuna tuning and SHAP explainability.",
    tags: ["XGBoost", "SHAP", "FastAPI"],
  },
  {
    name: "ecommerce-orders-lens",
    url: "https://github.com/panteamkhh/ecommerce-orders-lens",
    emoji: "🛒",
    color: "#4ade80",
    description:
      "A 21-step documented cleaning pipeline with an audit log, Python EDA, order-outcome ML, RFM KMeans segmentation and an HTML dashboard.",
    tags: ["scikit-learn", "EDA", "KMeans"],
  },
  {
    name: "maintenance-data-pipeline",
    url: "https://github.com/panteamkhh/maintenance-data-pipeline",
    emoji: "🛠️",
    color: "#ffc857",
    description:
      "Maintenance analytics on a CMMS dataset: data-quality audit, KPIs (MTTR, availability, PM compliance), Pareto RCA and a Streamlit dashboard.",
    tags: ["Streamlit", "KPIs", "Pareto"],
  },
  {
    name: "pharma-sales360",
    url: "https://github.com/panteamkhh/pharma-sales360",
    emoji: "💊",
    color: "#35d0c8",
    description:
      "Pharma sales & CRM analytics: reproducible Python generator, SQL Server star schema, statistical analysis, Power BI/DAX spec and Excel reports.",
    tags: ["SQL Server", "Power BI", "Star schema"],
  },
  {
    name: "upi-transactions-data-analysis",
    url: "https://github.com/panteamkhh/upi-transactions-data-analysis",
    emoji: "💳",
    color: "#8b5cf6",
    description:
      "End-to-end UPI transactions analysis with a Python pipeline, an interactive Streamlit dashboard and a Power BI star-schema report.",
    tags: ["Fintech", "Streamlit", "Power BI"],
  },
  {
    name: "google-play-store-analytics",
    url: "https://github.com/panteamkhh/google-play-store-analytics",
    emoji: "📱",
    color: "#4ade80",
    description:
      "Google Play Store apps taken through cleaning, EDA and feature engineering to a rating-prediction model, with reusable modules and tests.",
    tags: ["EDA", "scikit-learn"],
  },
  {
    name: "student-performance-ml",
    url: "https://github.com/panteamkhh/student-performance-ml",
    emoji: "🎓",
    color: "#ffc857",
    description:
      "Student-performance analysis and ML study — classification, regression and K-Means — with an interactive Streamlit dashboard.",
    tags: ["scikit-learn", "Streamlit"],
  },
  {
    name: "build-mcp-agents",
    url: "https://github.com/panteamkhh/build-mcp-agents",
    emoji: "🔌",
    color: "#ff3d8b",
    description:
      "Hands-on, code-first playbook for building MCP servers and agents: 10 phases from fundamentals to production, with a capstone agent.",
    tags: ["MCP", "Agents", "Python"],
  },
  {
    name: "build-ai-agents",
    url: "https://github.com/panteamkhh/build-ai-agents",
    emoji: "🤖",
    color: "#4aa8ff",
    description:
      "Code-first playbook for building AI agents: 5 phases from fundamentals to production, runnable examples and an offline capstone project.",
    tags: ["LLM", "Agents", "RAG"],
  },
  {
    name: "llm-engineering-lab",
    url: "https://github.com/panteamkhh/llm-engineering-lab",
    emoji: "🧪",
    color: "#35d0c8",
    description:
      "A practical generative-AI engineering lab exploring LLM foundations, tokenization, deployment strategies and real-world system design.",
    tags: ["GenAI", "LLM"],
  },
  {
    name: "python-data-lab",
    url: "https://github.com/panteamkhh/python-data-lab",
    emoji: "🐍",
    color: "#4ade80",
    description:
      "Hands-on lab for the Python data stack — NumPy, Pandas and Matplotlib — with 15 sessions, mini projects and cheat sheets.",
    tags: ["pandas", "matplotlib"],
  },
  {
    name: "ml-course-from-scratch",
    url: "https://github.com/panteamkhh/ml-course-from-scratch",
    emoji: "📐",
    color: "#8b5cf6",
    description:
      "Learning machine learning by building algorithms from scratch, understanding the theory, and validating them against scikit-learn.",
    tags: ["ML theory", "From scratch"],
  },
  {
    name: "planner-pro",
    url: "https://github.com/panteamkhh/planner-pro",
    emoji: "🗓️",
    color: "#ffc857",
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
