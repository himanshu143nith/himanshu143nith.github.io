"""Utilities for maintaining structured portfolio content.

This module intentionally uses only the Python standard library, so it can be
used locally or in GitHub Actions without installing dependencies.
"""

from __future__ import annotations

from dataclasses import asdict, dataclass
import json
from pathlib import Path
from typing import Iterable


@dataclass(frozen=True)
class Project:
    """A project displayed in the portfolio."""

    title: str
    description: str
    technologies: tuple[str, ...]
    category: str
    featured: bool = False

    def matches(self, query: str) -> bool:
        """Return whether *query* occurs in searchable project content."""
        needle = query.strip().casefold()
        searchable = " ".join(
            (self.title, self.description, self.category, *self.technologies)
        ).casefold()
        return bool(needle) and needle in searchable


@dataclass(frozen=True)
class Portfolio:
    """Structured portfolio content with query and summary helpers."""

    projects: tuple[Project, ...]

    @classmethod
    def from_json(cls, path: str | Path) -> "Portfolio":
        """Load and validate portfolio projects from a JSON file."""
        source = json.loads(Path(path).read_text(encoding="utf-8"))
        projects = tuple(Project(**project) for project in source["projects"])
        portfolio = cls(projects=projects)
        portfolio.validate()
        return portfolio

    def validate(self) -> None:
        """Raise ``ValueError`` when content is incomplete or duplicated."""
        if not self.projects:
            raise ValueError("portfolio must contain at least one project")

        titles = [project.title.strip().casefold() for project in self.projects]
        if any(not title for title in titles):
            raise ValueError("every project must have a title")
        if len(titles) != len(set(titles)):
            raise ValueError("project titles must be unique")

        for project in self.projects:
            if not project.description.strip():
                raise ValueError(f"{project.title!r} needs a description")
            if not project.technologies:
                raise ValueError(f"{project.title!r} needs at least one technology")

    def search(self, query: str) -> tuple[Project, ...]:
        """Find projects by title, description, category, or technology."""
        return tuple(project for project in self.projects if project.matches(query))

    def skills(self) -> tuple[str, ...]:
        """Return unique technologies in display order."""
        return tuple(dict.fromkeys(
            technology
            for project in self.projects
            for technology in project.technologies
        ))


def featured_projects(projects: Iterable[Project]) -> tuple[Project, ...]:
    """Return featured projects while preserving their source order."""
    return tuple(project for project in projects if project.featured)


def export_summary(portfolio: Portfolio, destination: str | Path) -> None:
    """Write a compact JSON summary for future website integrations."""
    payload = {
        "project_count": len(portfolio.projects),
        "featured_count": len(featured_projects(portfolio.projects)),
        "skills": list(portfolio.skills()),
        "projects": [asdict(project) for project in portfolio.projects],
    }
    Path(destination).write_text(
        json.dumps(payload, indent=2) + "\n", encoding="utf-8"
    )


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Validate portfolio content")
    parser.add_argument("content", type=Path, help="source portfolio JSON")
    parser.add_argument("--output", type=Path, help="optional summary JSON path")
    args = parser.parse_args()

    portfolio = Portfolio.from_json(args.content)
    if args.output:
        export_summary(portfolio, args.output)
    print(f"Validated {len(portfolio.projects)} projects and {len(portfolio.skills())} skills.")
