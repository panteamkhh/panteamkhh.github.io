// Curated project data. Charts and dashboard screenshots are pulled from each
// repository into assets/projects/<slug>/ and rendered as real figures.
// `art` stays as the fallback visual for repos without a usable figure.

export const featured = [
  {
    num: "01",
    title: "Hotel cancellation risk at booking time",
    repo: "hotel-cancellation-prediction",
    url: "https://github.com/panteamkhh/hotel-cancellation-prediction",
    chips: ["Classification", "LightGBM", "Python", "FastAPI"],
    desc: "Revenue managers usually learn a room was lost after the fact. This predicts cancellation probability the moment a booking is made, from ~119k real bookings.",
    impact: [
      "0.922 ROC-AUC on a held-out split across 119,390 bookings",
      "Features engineered from lead time, deposit type and booking channel",
      "Model served behind a FastAPI endpoint, containerised with Docker",
    ],
    metrics: [
      { v: "0.922", k: "ROC-AUC" },
      { v: "119,390", k: "Bookings" },
      { v: "18", k: "Figures" },
    ],
    code: {
      file: "model.py",
      lang: "Python",
      html:
`<span class="c"># balanced target, honest holdout</span>
<span class="k">import</span> lightgbm <span class="k">as</span> lgb

clf = lgb.<span class="f">LGBMClassifier</span>(
    n_estimators=<span class="n">600</span>,
    learning_rate=<span class="n">0.03</span>,
    class_weight=<span class="s">"balanced"</span>,
)
clf.<span class="f">fit</span>(X_train, y_train)

<span class="c"># 0.922 ROC-AUC — see 03_evaluation.ipynb</span>`,
    },
    img: "assets/projects/hotel-cancel/by-lead-time.png",
    thumbs: [
      { src: "assets/projects/hotel-cancel/heatmap.png", cap: "Feature correlation" },
      { src: "assets/projects/hotel-cancel/by-country.png", cap: "Cancellations by market" },
    ],
    art: "bars",
  },
  {
    num: "02",
    title: "Pharma sales &amp; CRM analytics",
    repo: "pharma-sales360",
    url: "https://github.com/panteamkhh/pharma-sales360",
    chips: ["Power BI", "SQL Server", "DAX", "Star schema"],
    desc: "A pharma sales and CRM dataset turned into a governed star schema, a documented DAX measure set, and a Power BI report management actually reads.",
    impact: [
      "Star schema across fact sales, product, customer and date dimensions",
      "DAX measures specified for margin, growth, ranking and RFM segments",
      "Report paired with Excel output for teams that still live in spreadsheets",
    ],
    metrics: [
      { v: "4", k: "Report pages" },
      { v: "6", k: "DAX measures" },
      { v: "1", k: "Star schema" },
    ],
    code: {
      file: "revenue.sql",
      lang: "T-SQL",
      html:
`<span class="c">-- margin by category, from the star schema</span>
<span class="k">SELECT</span>  p.category,
        <span class="f">SUM</span>(f.revenue) <span class="k">AS</span> revenue,
        <span class="f">ROUND</span>(<span class="n">100.0</span> * <span class="f">SUM</span>(f.revenue - f.cost)
              / <span class="f">NULLIF</span>(<span class="f">SUM</span>(f.revenue), <span class="n">0</span>), <span class="n">1</span>) <span class="k">AS</span> margin_pct
<span class="k">FROM</span>    fact_sales  <span class="k">AS</span> f
<span class="k">JOIN</span>    dim_product <span class="k">AS</span> p <span class="k">ON</span> p.product_key = f.product_key
<span class="k">GROUP</span> <span class="k">BY</span> p.category
<span class="k">ORDER</span> <span class="k">BY</span> margin_pct <span class="k">DESC</span>;`,
    },
    img: "assets/projects/pharma/revenue-category.png",
    thumbs: [
      { src: "assets/projects/pharma/monthly-trend.png", cap: "Monthly sales trend" },
      { src: "assets/projects/pharma/funnel.png", cap: "CRM funnel" },
    ],
    art: "donut",
  },
  {
    num: "03",
    title: "CEFR lexical intelligence",
    repo: "cefr-lexical-intelligence",
    url: "https://github.com/panteamkhh/cefr-lexical-intelligence",
    chips: ["NLP", "Embeddings", "UMAP", "Clustering"],
    desc: "Vocabulary mapped by meaning instead of by a word list. Sentence embeddings and UMAP clustering show how words actually group across CEFR levels — and where the textbook levels disagree with the data.",
    impact: [
      "Sentence-transformer embeddings for the full vocabulary, projected to 2D with UMAP",
      "Clusters compared against the original CEFR labels to expose drift between levels",
      "Random-forest and SVM classifiers trained on the same features as a sanity check",
    ],
    metrics: [
      { v: "8", k: "GitHub stars" },
      { v: "A1–C2", k: "Level coverage" },
      { v: "UMAP", k: "2D projection" },
    ],
    code: {
      file: "map.py",
      lang: "Python",
      html: `<span class="k">from</span> sentence_transformers <span class="k">import</span> SentenceTransformer
<span class="k">import</span> umap

model = <span class="f">SentenceTransformer</span>(<span class="s">"all-MiniLM-L6-v2"</span>)
X = model.<span class="f">encode</span>(vocab, normalize_embeddings=<span class="k">True</span>)

map2d = umap.<span class="f">UMAP</span>(
    n_neighbors=<span class="n">15</span>, min_dist=<span class="n">0.1</span>,
    metric=<span class="s">"cosine"</span>,
).<span class="f">fit_transform</span>(X)`,
    },
    img: "assets/projects/cefr/umap.png",
    thumbs: [
      { src: "assets/projects/cefr/categories.png", cap: "Semantic categories" },
      { src: "assets/projects/cefr/confusion.png", cap: "Random-forest confusion" },
    ],
    art: "scatter",
  },
];

export const dashboards = [
  {
    name: "sales-data-analysis",
    title: "Retail sales dashboard",
    url: "https://github.com/panteamkhh/sales-data-analysis",
    tool: "Power BI",
    metric: { v: "5 pages", k: "sales · profit" },
    desc: "Power BI report on sales, profit, discounts, product mix and geographic performance.",
    tags: ["Power BI", "DAX", "pandas"],
    img: "assets/projects/sales/overview.png",
  },
  {
    name: "spotify-powerbi-analytics",
    title: "Spotify analytics dashboard",
    url: "https://github.com/panteamkhh/spotify-powerbi-analytics",
    tool: "Power BI",
    metric: { v: "3 pages", k: "audio features" },
    desc: "Cleaning and modelling on Spotify data, finished as an interactive listening dashboard.",
    tags: ["Power Query", "Modelling", "DAX"],
    img: "assets/projects/spotify/overview.png",
  },
  {
    name: "pizza-sales-dashboard",
    title: "Pizza sales dashboard",
    url: "https://github.com/panteamkhh/pizza-sales-dashboard",
    tool: "Excel",
    metric: { v: "4 KPIs", k: "SQL + Excel" },
    desc: "Revenue, order trends and product performance analysed in SQL Server and reported in Excel.",
    tags: ["SQL Server", "Excel", "KPI"],
    img: "assets/projects/pizza/dashboard.png",
  },
  {
    name: "insurance-data-analysis",
    title: "Insurance portfolio dashboard",
    url: "https://github.com/panteamkhh/insurance-data-analysis",
    tool: "Power BI",
    metric: { v: "Loss ratio", k: "claims" },
    desc: "Premium, claims, loss ratios and trends for an insurance portfolio, built into a Power BI report.",
    tags: ["Power BI", "Risk", "pandas"],
    img: "assets/projects/insurance/dashboard.png",
  },
  {
    name: "ecommerce-orders-lens",
    title: "E-commerce orders lens",
    url: "https://github.com/panteamkhh/ecommerce-orders-lens",
    tool: "HTML",
    metric: { v: "13 charts", k: "RFM segments" },
    desc: "A 21-step documented cleaning pipeline with audit log, RFM KMeans segmentation and a self-contained HTML dashboard.",
    tags: ["scikit-learn", "KMeans", "Dashboard"],
    img: "assets/projects/ecommerce/hero.png",
  },
  {
    name: "upi-transactions-data-analysis",
    title: "UPI transactions report",
    url: "https://github.com/panteamkhh/upi-transactions-data-analysis",
    tool: "Streamlit",
    metric: { v: "2 views", k: "Streamlit + BI" },
    desc: "A fintech transaction pipeline with an interactive Streamlit dashboard and a Power BI star-schema report.",
    tags: ["Fintech", "Streamlit", "Power BI"],
    img: "assets/projects/upi/trend.png",
  },
  {
    // Reserved slot: drop the finished report in assets/projects/sales/ and
    // replace `placeholder: true` with `img: "assets/projects/sales/<file>.png"`.
    name: "sales-performance-dashboard",
    title: "Sales performance dashboard",
    url: "https://github.com/panteamkhh/sales-data-analysis",
    tool: "Power BI",
    metric: { v: "In progress", k: "new build" },
    desc: "A rebuilt sales report with margin, discount and territory views. This slot is reserved for the finished dashboard.",
    tags: ["Power BI", "DAX", "Star schema"],
    placeholder: true,
  },
];

export const projects = [
  {
    name: "car-price-predictor-ml",
    title: "Car price prediction",
    url: "https://github.com/panteamkhh/car-price-predictor-ml",
    cat: "ML",
    desc: "Regression with nine models, cross-validation, Optuna tuning, SHAP explainability and a FastAPI service.",
    tags: ["XGBoost", "SHAP", "Optuna"],
    metric: { v: "0.91", k: "R² score" },
    stars: 0,
    img: "assets/projects/car/pred-actual.png",
    art: "line",
  },  {
    name: "traffic-sign-classification",
    title: "Traffic sign recognition",
    url: "https://github.com/panteamkhh/traffic-sign-classification",
    cat: "Vision",
    desc: "German traffic signs across 43 classes with a PyTorch LeNet CNN.",
    tags: ["PyTorch", "CNN"],
    metric: { v: "93%", k: "accuracy" },
    stars: 1,
    img: "assets/projects/traffic/curves.png",
    art: "heat",
  },
  {
    name: "cifar10-image-classification",
    title: "CIFAR-10 classifier",
    url: "https://github.com/panteamkhh/cifar10-image-classification",
    cat: "Vision",
    desc: "CNN training with EDA, learning curves and full evaluation.",
    tags: ["PyTorch", "Deep learning"],
    metric: { v: "23", k: "figures" },
    stars: 1,
    img: "assets/projects/cifar10/loss.png",
    art: "heat",
  },
  {
    name: "yelp-review-classification",
    title: "Yelp review sentiment",
    url: "https://github.com/panteamkhh/yelp-review-classification",
    cat: "NLP",
    desc: "TF-IDF plus linear models on Yelp reviews, served with FastAPI.",
    tags: ["NLP", "TF-IDF"],
    metric: { v: "0.95", k: "F1" },
    stars: 1,
    img: "assets/projects/yelp/topwords.png",
    art: "bars",
  },
  {
    name: "spam-email-classifier",
    title: "Spam email classifier",
    url: "https://github.com/panteamkhh/spam-email-classifier",
    cat: "NLP",
    desc: "Naive Bayes and linear models on TF-IDF features, deployed in Docker.",
    tags: ["Naive Bayes", "scikit-learn"],
    metric: { v: "0.99", k: "F1" },
    stars: 1,
    img: "assets/projects/spam/topwords.png",
    art: "bars",
  },
  {
    name: "movie-recommender-system",
    title: "Movie recommender",
    url: "https://github.com/panteamkhh/movie-recommender-system",
    cat: "ML",
    desc: "Item and user collaborative filtering plus SVD on MovieLens 100k.",
    tags: ["Recommenders", "SVD"],
    metric: { v: "100k", k: "ratings" },
    stars: 1,
    img: "assets/projects/movie/top-rated.png",
    art: "scatter",
  },
  {
    name: "avocado-price-forecasting",
    title: "Avocado price forecasting",
    url: "https://github.com/panteamkhh/avocado-price-forecasting",
    cat: "Forecasting",
    desc: "Seasonality, lag features and gradient boosting for weekly prices.",
    tags: ["Time series", "Boosting"],
    metric: { v: "30", k: "figures" },
    stars: 1,
    img: "assets/projects/avocado/seasonality.png",
    art: "line",
  },
  {
    name: "chicago-crime-rate-forecasting",
    title: "Chicago crime forecasting",
    url: "https://github.com/panteamkhh/chicago-crime-rate-forecasting",
    cat: "Forecasting",
    desc: "Statsmodels and XGBoost on city crime time series, wrapped in FastAPI.",
    tags: ["statsmodels", "XGBoost"],
    metric: { v: "26", k: "figures" },
    stars: 1,
    img: "assets/projects/chicago/overview.png",
    art: "line",
  },
  {
    name: "maintenance-data-pipeline",
    title: "Maintenance KPI pipeline",
    url: "https://github.com/panteamkhh/maintenance-data-pipeline",
    cat: "Analytics",
    desc: "CMMS data-quality audit, MTTR / availability / PM compliance KPIs and Pareto root cause.",
    tags: ["Streamlit", "KPI", "Pareto"],
    metric: { v: "5 KPIs", k: "MTTR" },
    stars: 0,
    img: "assets/projects/maintenance/pareto.png",
    art: "bars",
  },
  {
    name: "ab-testing",
    title: "A/B test analysis",
    url: "https://github.com/panteamkhh/ab-testing",
    cat: "Analytics",
    desc: "Hypothesis testing, bootstrap intervals, Bayesian posteriors and power curves.",
    tags: ["Statistics", "Experiments"],
    metric: { v: "A/B", k: "significance" },
    stars: 1,
    img: "assets/projects/ab-testing/retention.png",
    art: "matrix",
  },
  {
    name: "google-play-store-analytics",
    title: "Play Store app analytics",
    url: "https://github.com/panteamkhh/google-play-store-analytics",
    cat: "ML",
    desc: "Cleaning, EDA and feature engineering through to a rating-prediction model.",
    tags: ["EDA", "scikit-learn"],
    metric: { v: "pytest", k: "test suite" },
    stars: 0,
    img: "assets/projects/google-play/models.png",
    art: "bars",
  },
  {
    name: "student-performance-ml",
    title: "Student performance study",
    url: "https://github.com/panteamkhh/student-performance-ml",
    cat: "ML",
    desc: "Classification, regression and K-Means with an interactive Streamlit dashboard.",
    tags: ["scikit-learn", "Streamlit"],
    metric: { v: "3", k: "ML tasks" },
    stars: 0,
    img: "assets/projects/student/importance.png",
    art: "kpi",
  },
];

export const toolbox = [
  { title: "Languages", items: ["Python", "SQL"] },
  { title: "Analytics & ML", items: ["pandas", "NumPy", "scikit-learn", "LightGBM / XGBoost", "PyTorch", "NLP & embeddings", "Recommenders", "Feature engineering"] },
  { title: "BI & reporting", items: ["Power BI", "DAX", "Power Query", "Data modelling", "Star schema", "Dashboards", "Excel"] },
  { title: "Data platforms", items: ["SQL Server (T-SQL)", "Snowflake", "Spark", "Databricks", "ETL", "OLAP"] },
  { title: "Engineering", items: ["FastAPI", "Docker", "Streamlit", "REST APIs", "Git & GitHub"] },
  { title: "Business", items: ["KPI analysis", "Sales & pricing", "Segmentation", "Management reporting", "Data governance"] },
];

export const stack = [
  "Python", "SQL Server", "Power BI", "DAX", "pandas", "scikit-learn", "LightGBM", "PyTorch",
  "Streamlit", "FastAPI", "Docker", "Power Query", "Excel", "Git",
];

export const queries = [
  {
    kind: "sql",
    file: "06_business_analysis.sql",
    tag: "T-SQL",
    cap: "Monthly revenue with MoM and YoY growth, built on window functions.",
    code: `;WITH Monthly AS (
    SELECT d.[Year], d.[Month], SUM(f.Net_Sales) AS Net_Sales
    FROM core.FactSales f
    JOIN core.DimDate d ON d.DateKey = f.OrderDateKey
    GROUP BY d.[Year], d.[Month]
)
SELECT
    [Year], [Month], Net_Sales,
    LAG(Net_Sales, 1) OVER (ORDER BY [Year], [Month]) AS Prev_Month_Sales,
    ROUND(100.0 * (Net_Sales - LAG(Net_Sales, 1) OVER (ORDER BY [Year], [Month]))
          / NULLIF(LAG(Net_Sales, 1) OVER (ORDER BY [Year], [Month]), 0), 1) AS MoM_Growth_Pct
FROM Monthly
ORDER BY [Year], [Month];`,
  },
  {
    kind: "sql",
    file: "01_kpi_metrics.sql",
    tag: "T-SQL",
    cap: "Pizza sales: headline KPIs read straight from the staging table.",
    code: `-- 1. Total revenue
SELECT ROUND(SUM(total_price), 2) AS total_revenue
FROM dbo.pizza_sales;

-- 4. Average order value
SELECT ROUND(SUM(total_price) / COUNT(DISTINCT order_id), 2) AS average_order_value
FROM dbo.pizza_sales;

-- 5. Average pizzas per order
SELECT CAST(SUM(quantity) * 1.0 / COUNT(DISTINCT order_id) AS DECIMAL(10, 2))
       AS average_pizzas_per_order
FROM dbo.pizza_sales;`,
  },
];