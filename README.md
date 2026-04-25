# 🏟️ Agentic Premier League (APL) - Stadium Operations OS

![APL Dashboard](https://img.shields.io/badge/Status-Synthetic_Operational-amber)
![Version](https://img.shields.io/badge/Version-1.0.0-cyan)
![Design](https://img.shields.io/badge/Design-Midnight_Cyber-purple)

**Agentic Premier League (APL)** is a high-performance, autonomous stadium management dashboard designed for large-scale sporting events. Built with a "Midnight Cyber" aesthetic, it serves as the central nervous system for stadium operations, merging live match intelligence with real-time attendee flow optimization.

---

## 🚀 Purpose & Vision

The core purpose of APL is to transform traditional stadium management into an **Agentic Ecosystem**. Instead of reactive monitoring, APL uses proactive "Agentic Brain" logic to:
- **Predict Congestion**: Identify potential bottlenecks before they become security risks.
- **Optimize Mobility**: Dynamically route fans to less crowded gates and facilities.
- **Synchronize Intelligence**: Link match events (like a wicket or a boundary) to crowd behavioral shifts (roars, surges to food stalls).

### The Idea
The project explores the concept of a **Self-Optimizing Stadium**. By treating every sector, gate, and vendor as a node in an intelligent graph, APL creates a seamless experience for fans while maximizing operational efficiency and safety for stadium authorities.

---

## 🛠️ Key Features

- **Match Intelligence Center**: Real-time (or synthetic) scorecard tracking with advanced player performance analytics.
- **Spatial Topology (3D)**: Interactive 3D visualization of the stadium for high-level situational awareness.
- **Zone Density Heatmap**: 4x4 sector tracking with live density metrics and movement prediction.
- **Autonomous Surge Protocols**: AI-driven alerts that trigger security escalations based on crowd volume or match intensity.
- **Smart Routing Hub**: Real-time wait-time tracking for vendors and facilities with autonomous fan redirection.

---

## 📡 Data Architecture & Integration

> [!IMPORTANT]
> **Data Reality Check**: The current environment is operating on **High-Fidelity Synthetic Data** for demonstration and operational continuity testing.

### 🏏 Live Match Data
If you wish to integrate real-time match data, you can connect the system to a production cricket API (e.g., Cricbuzz via RapidAPI). 
- **Configuration**: Update the headers and endpoints in `src/store/index.ts`.
- **Fallback**: The system is designed with a "Synthetic Fallback Protocol" that takes over if the API stream is interrupted.

### 👥 Crowd Management & IoT
For production-grade crowd intelligence, APL is designed to ingest data from:
- **CCTV Computer Vision**: Real-time density counting via camera feeds.
- **IoT Trackers**: RFID or Bluetooth-based attendee tracking.
- **Ticketing Gateways**: Integrated occupancy data from digital turnstiles.

---

## 💻 Tech Stack

- **Framework**: React 18 + Vite
- **State Management**: Zustand (with Agentic Brain logic loops)
- **Styling**: Tailwind CSS + Custom Design Tokens
- **Animations**: Framer Motion
- **Data Visualization**: Recharts + Lucide Icons
- **Simulation Engine**: Custom timing-based state mutation for crowd movement.

---

## 🛠️ Getting Started

1. **Clone the Repo**
2. **Install Dependencies**: `npm install`
3. **Run Dev Server**: `npm run dev`
4. **Access Dashboard**: `http://localhost:5173`

---

*Designed for the Narendra Modi Stadium & Future Mega-Events.*
