# Himanshu Sharma — Portfolio

Personal portfolio website for **Himanshu Sharma**, a software engineer focused on data engineering, data science, cloud platforms, automation, and connected systems.

🌐 **Live site:** [himanshu143nith.github.io](https://himanshu143nith.github.io)

## About

This portfolio highlights Himanshu's experience building practical software and data solutions, including:

- Connected factory and IoT architectures
- Data engineering and analytics workflows
- Enterprise conversational AI on Azure Bot Services
- Python-based recommendation systems
- Power BI and real-time monitoring dashboards
- CI/CD automation with GitHub Actions and Docker

## Technologies

- Python
- Data Engineering and SQL
- Data Science and Machine Learning
- Microsoft Azure
- Docker
- GitHub Actions and CI/CD
- IoT systems
- HTML, CSS, and JavaScript
- Power BI

## Features

- Responsive portfolio layout for desktop and mobile
- Dark and light theme toggle
- Theme preference saved in local storage
- Scroll-reveal animations
- Project and technology showcase
- Accessible navigation, labels, and external links
- Dependency-free Python content validation and search toolkit
- No build step or framework required

## Run locally

This is a static website, so it can be opened directly in a browser or served with any local HTTP server.

```bash
git clone https://github.com/himanshu143nith/himanshu143nith.github.io.git
cd himanshu143nith.github.io
```

For example, with Python:

```bash
python -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000).

### Run the Python toolkit

The `python/` directory contains a standard-library-only module for validating, searching, and summarizing structured portfolio project content:

```bash
python -m unittest discover -s python -p 'test_*.py'
python python/portfolio_data.py python/portfolio_content.json --output data/portfolio-summary.json
```

## Project files

| File | Description |
| --- | --- |
| `index.html` | Portfolio page structure and content |
| `style.css` | Responsive layout, themes, animations, and visual styling |
| `script.js` | Theme switching, saved preferences, scroll animations, and footer year |
| `python/portfolio_data.py` | Typed Python content model, validation, search, and JSON export |
| `python/portfolio_content.json` | Structured project and technology data |
| `python/test_portfolio_data.py` | Automated tests for the Python toolkit |

## Deployment

The site is deployed using **GitHub Pages** from the `master` branch. Changes pushed to that branch are automatically published after the Pages build completes. The Python toolkit runs locally or in CI to prepare content; GitHub Pages does not execute Python at request time.

## Connect

- [GitHub](https://github.com/himanshu143nith)
- [LinkedIn](https://www.linkedin.com/in/himanshu143nith)
- [Kaggle](https://www.kaggle.com/himanshusharma713)
- [X](https://x.com/himanshu143nith)
- [Email](mailto:himanshusharma713@gmail.com)

## License

The source code is available for personal reference and portfolio use.
