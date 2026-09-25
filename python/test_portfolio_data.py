"""Tests for the portfolio content module."""

import json
from pathlib import Path
import tempfile
import unittest

from portfolio_data import Portfolio, featured_projects


CONTENT = Path(__file__).with_name("portfolio_content.json")


class PortfolioTests(unittest.TestCase):
    def setUp(self) -> None:
        self.portfolio = Portfolio.from_json(CONTENT)

    def test_content_is_valid(self) -> None:
        self.assertEqual(len(self.portfolio.projects), 3)
        self.assertEqual(len(featured_projects(self.portfolio.projects)), 2)

    def test_search_matches_technologies_case_insensitively(self) -> None:
        matches = self.portfolio.search("PYTHON")
        self.assertEqual(len(matches), 3)

    def test_skills_are_unique_and_keep_display_order(self) -> None:
        self.assertEqual(
            self.portfolio.skills(),
            ("Python", "Azure", "IoT", "SQL", "Azure Bot Services", "CI/CD", "Machine Learning", "Data Science"),
        )

    def test_summary_can_be_exported(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory) / "summary.json"
            from portfolio_data import export_summary

            export_summary(self.portfolio, output)
            summary = json.loads(output.read_text(encoding="utf-8"))
            self.assertEqual(summary["project_count"], 3)
            self.assertIn("Python", summary["skills"])


if __name__ == "__main__":
    unittest.main()
