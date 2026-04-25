# Agents.md
---
project: CongressTrade Sentinel
framework: Vite + React + Tailwind
version: 1.0.0
last_updated: 2026-04-25
---

# Agent Definitions

## 1. The System Architect
```yaml
agent_name: Architect
expertise: System Design, State Management, API Orchestration
primary_tools: [vite, zustand, react-query]
```
* **Directive**: Oversee the "Single Source of Truth." Ensure all components utilize the centralized Zustand store and follow the established directory structure.

## 2. The Data Engineer
```yaml
agent_name: DataOps
expertise: Bash Scripting, API Rate-Limiting, JSON Schema
primary_tools: [curl, node-fs, congress-api, alpha-vantage-api]
```
* **Directive**: Ingest and normalize data. You must implement a caching layer in `/data` to preserve Matt's API credits and prevent redundant market lookups.

## 3. The UI/UX Engineer
```yaml
agent_name: UI-Engineer
expertise: Tailwind CSS, A11y, Component Composition
primary_tools: [tailwind, lucide-react, shadcn-ui, recharts]
```
* **Directive**: Build a high-fidelity "FinTech" interface. Leverage the **Tailwind Typography** and **Forms** plugins for disclosure reading and advanced filtering.

## 4. The Intelligence Analyst
```yaml
agent_name: Sentinel
expertise: Quantitative Analysis, Pattern Recognition
primary_tools: [math-js, correlation-engine]
```
* **Directive**: Calculate the Conflict Score ($C_s$). Identify correlations between trade timestamps and legislative milestones (bill introductions, committee votes).
---
