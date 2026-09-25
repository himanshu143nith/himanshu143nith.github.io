# Python portfolio content toolkit

This directory contains a small, dependency-free Python content pipeline for the portfolio. It demonstrates typed data models, JSON processing, validation, searching, and automated tests without making GitHub Pages run a Python server.

## Run it

From the repository root:

```bash
python -m unittest discover -s python -p 'test_*.py'
python python/portfolio_data.py python/portfolio_content.json --output data/portfolio-summary.json
```

The source data lives in `portfolio_content.json`. The optional summary is suitable for a future JavaScript enhancement or a static-site build step. GitHub Pages serves the existing static HTML directly, while this module provides a maintainable way to validate and prepare project content.
