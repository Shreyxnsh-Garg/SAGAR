# SAGAR — Satellite Analytics for Geospatial Anomaly & Responsibility-Tracing

> *~ "Spill se Source Tak."*

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Leaflet](https://img.shields.io/badge/Leaflet-GIS-199900?logo=leaflet&logoColor=white)](https://leafletjs.com/)
[![License](https://img.shields.io/badge/License-Proprietary%20%2F%20Defense-0B1528)](LICENSE)

**SAGAR** is a defense-grade maritime surveillance, reverse hydrodynamic attribution, and statutory enforcement platform developed under the operational mandate of the **National Technical Research Organisation (NTRO)** in coordination with the **Indian Coast Guard (ICG)**. 

The system bridges satellite radar remote sensing, Lagrangian particle advection hindcasting, AIS trajectory kinematics, and statutory legal reporting to autonomously trace marine pollution back to the culprit vessel and generate court-admissible interdiction dossiers.

---

## ⚡ Core Operational Capabilities

### 1. Regional Maritime Surveillance Grid
* **Multi-Sensor Satellite Ingestion:** Real-time processing of Synthetic Aperture Radar (Sentinel-1A C-Band SAR, RISAT-1A) feeds over India's Western Exclusive Economic Zone (EEZ).
* **Automated Anomaly Detection:** Constant False Alarm Rate (CFAR) algorithms identify surface slicks, dark-pixel SAR signatures, and anomalous surface backscatter damping.
* **Multi-Sector Threat Monitoring:** Dedicated incident consoles for critical offshore sectors:
  * **Mumbai High Sector 4** (Offshore extraction & high-density tanker traffic)
  * **Gulf of Khambhat** (Macro-tidal estuarine ecosystems & port approaches)
  * **Ratnagiri Offshore** (Sensitive coastal reef and turtle nesting habitats)

### 2. Forensic Attribution (Tab 1)
* **Lagrangian Reverse Hindcast:** Rewinds oceanic surface currents (INCOIS / ERA5 models) and local wind leeway vectors (3.1% windage + Coriolis deflection) to calculate the precise **Source Discharge Window**.
* **AIS Spatiotemporal Vessel Correlation:** Ingests maritime AIS broadcast corridors to isolate, track, and correlate all candidate vessels transiting within the discharge spatio-temporal boundary.
* **Elimination & Proof Matrix:** Evaluates vessel speed curves, sudden drift deviations, engine operational spikes, and historical heading anomalies to separate the **Primary Culprit** from **Exonerated** commercial traffic.
* **Counterfactual Simulations:** Simulates alternative vessel paths to mathematically disprove false-positive attribution in maritime admiralty hearings.

### 3. Forward Impact Analysis & Precautions (Tab 2)
* **Continuous 48-Hour Time Scrubber (T+0h to T+48h):** Interactive scrubbing engine calculating real-time dynamic Eulerian-Lagrangian plume translation, spreading radius, emulsion thickness, and evaporation loss.
* **Progressive Advection Milestone Cones:** Progressively drops advection footprints at 8-hour intervals (+8h, +16h, +24h, +32h, +40h, +48h) with hover-activated telemetry inspection.
* **Vulnerable Coastal Receptor Index:** Real-time ETA tracking for fragile mangroves, intertidal aquaculture flats, industrial desalination intakes, and marine sanctuaries.
* **Mandated Containment Directives:** Auto-computes specific GPS deployment anchor points for heavy-duty curtain booms, Oil Spill Dispersant (OSD) spray corridors, and rapid skimmer vessel dispatch (ICGS Samudra Prahari).

### 4. Statutory Enforcement & Court-Admissible Dossiers
* **Automated ICG Form 356 Generation:** Generates comprehensive statutory interdiction dossiers compliant with **Part XI-A of the Indian Merchant Shipping Act, 1958**.
* **Cryptographic Tamper-Proofing:** Dossiers are bound with SHA-256 cryptographic signatures linking satellite timestamps, AIS corridor logs, and drift trajectory matrices to secure indisputable legal standing in admiralty courts.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | React 18 with TypeScript |
| **Styling & Design System** | Tailwind CSS (Defense/Tactical High-Contrast Aesthetic) |
| **GIS & Spatial Mapping** | Leaflet, React-Leaflet, Esri World Imagery |
| **Hydrodynamic Modeling** | Lagrangian Particle Dispersion Models, INCOIS Drift Interfaces |
| **Build & Tooling** | Vite, PostCSS, ESLint |

---

## 📂 Project Structure

```text
sagar/
├── public/
│   ├── assets/
│   │   ├── sagar-logo.png          # High-resolution emblem
│   │   └── ocean-background.mp4    # Landing page looping radar backdrop
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── LandingPage.tsx          # Public-facing command overview & capabilities
│   │   ├── MapViewer.tsx            # Regional EEZ surveillance map & case selector
│   │   ├── ForensicsView.tsx        # Tab 1: Reverse hindcast, AIS correlation, proof matrix
│   │   └── ForwardImpactAnalysis.tsx# Tab 2: 48h forward drift scrubbing & containment
│   ├── data/
│   │   └── incidents.ts             # SAR polygon, telemetry, and vessel correlation datasets
│   ├── types/
│   │   └── index.ts                 # Type definitions for GIS, AIS, and Drift models
│   ├── App.tsx                      # Primary application shell, 2-row navigation, live clocks
│   ├── index.css                    # Tailwind utility layers and map styling overrides
│   └── main.tsx                     # React application entry point
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts

🧭 Workflow & Usage Guide
[ Regional Surveillance Map ]
              │
              ▼ (Select Incident Sector)
┌─────────────────────────────────────────────────────────────┐
│                       SAGAR WORKSPACE                       │
├──────────────────────────────┬──────────────────────────────┤
│  TAB 1: FORENSIC ATTRIBUTION │ TAB 2: IMPACT & PRECAUTIONS  │
│  • Reverse Hindcasting       │  • 48h Forward Time-Scrub    │
│  • AIS Correlated Suspects   │  • Expanding Advection Cones │
│  • Culprit Identification    │  • Containment Directives    │
└──────────────────────────────┴──────────────────────────────┘
              │
              ▼
[ Export Form 356 Statutory Notice ]
Select an Active Case: On the Regional Surveillance map, choose between Mumbai High, Gulf of Khambhat, or Ratnagiri.
Review Forensic Attribution: Use the bottom timeline to reverse the drift to the exact discharge window. Inspect the suspect vessel list and launch counterfactual proofs.
Analyze Impact: Switch to the yellow Impact Analysis & Precautions tab. Scrub forward across the 48-hour timeline to observe plume dispersion milestones and evaluate coastal landfall risks.
Issue Statutory Notice: Click EXPORT NOTICE (FORM 356) in the top navigation bar to generate the interdiction dossier.
⚖️ Statutory Framework & Compliance
This platform implements analytical specifications aligned with:
The Merchant Shipping Act, 1958 (Act No. 44 of 1958), Part XI-A: Prevention and Containment of Pollution of the Sea by Oil.
MARPOL 73/78 (Annex I): International regulations for the prevention of pollution by oil from ships.
Indian Coast Guard Act, 1978: Mandate for preservation and protection of the maritime environment and prevention of marine pollution.
📄 License
This software and its associated algorithmic pipelines are maintained for maritime security and research applications. Unauthorized duplication, modification, or distribution is governed under applicable statutory defense and copyright frameworks.