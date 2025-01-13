# Maintainability Tool

## Overview
The **Maintainability Tool** is a analysis platform/tool designed to help developers identify and address maintainability issues in their JavaScript and lightweight framework projects, like Preact. By integrating multiple code quality tools, the platform provides actionable insights and promotes cleaner, more maintainable codebases.

## Features
- **ESLint Analysis**: Highlights errors and warnings for both custom rules (e.g., Preact-specific) and general JavaScript rules.
- **Heatmap Visualization**: Displays the density of issues across project files, helping developers focus on the most problematic areas.
- **Actionable Suggestions**: Provides targeted recommendations to improve code quality, with a focus on high-impact fixes.
- **Summary Dashboards**: Visual summaries, including pie charts and tables, for an at-a-glance understanding of code health.

## Purpose
This tool is aimed at developers and teams looking to:
- **Improve code maintainability** for lightweight frameworks like Preact.
- **Identify and fix high-priority issues** in large codebases.
- **Promote best practices** through actionable recommendations and summaries.

## Built With
- **Frontend**: Preact.js for UI components and visualisations.
- **Visualisation Libraries**: Chart.js for charts and heatmap displays.
- **Backend**: Node.js to process and aggregate data from tools like ESLint.
- **Code Quality Tools**:
  - **ESLint**: For customisable linting and error reporting.


## How It Works
1. **Analyse Code**: Run the tool on your codebase to collect linting errors, warnings, and SonarQube data.
2. **Visualise Issues**: Use dashboards and heatmaps to pinpoint problematic files and rules.
3. **Act on Recommendations**: Leverage actionable items to systematically improve the codebase.

## Future Enhancements
- GitHub pull request analysis for tracking code quality changes over time.
- SonarQube for deep code analysis and maintainability scoring.


