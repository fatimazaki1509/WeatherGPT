# 🌦️ WeatherGPT
### AI-Powered Climate Intelligence Platform for Citizens, Farmers & Disaster Management

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss)
![IMD](https://img.shields.io/badge/IMD-Weather_Data-orange?style=for-the-badge)
![NDMA](https://img.shields.io/badge/NDMA-Disaster_Alerts-red?style=for-the-badge)
![Gemini_AI](https://img.shields.io/badge/Gemini-AI-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Prototype-brightgreen?style=for-the-badge)

</div>

---

## 🌍 Overview

**WeatherGPT** is an AI-powered climate intelligence platform designed to provide real-time weather insights, environmental monitoring, disaster awareness, and personalized recommendations for citizens, farmers, travelers, and local authorities.

The platform combines weather analytics, air quality monitoring, AI-powered assistance, risk assessment, and location intelligence into a single unified dashboard.

WeatherGPT aims to transform raw weather data into actionable intelligence that helps people make safer and smarter decisions.

---

# 📸 Dashboard Preview

## Main Dashboard


<img width="1887" height="975" alt="image" src="https://github.com/user-attachments/assets/e9e2b66e-1612-4b56-9538-74dfbc877ded" />


---

## Weather Forecast Module



<img width="1917" height="956" alt="image" src="https://github.com/user-attachments/assets/01cbf067-547b-4d3b-b404-50e111b7a4ed" />


---

## AI Weather Assistant



<img width="1917" height="847" alt="image" src="https://github.com/user-attachments/assets/3989f174-ee50-4287-a74e-07b39d1753c9" />


---

## Air Quality Monitoring



<img width="1887" height="968" alt="image" src="https://github.com/user-attachments/assets/c7dbf11e-a690-4eb3-9db8-1c22fb5b667f" />


---

## Farmer Advisory System



<img width="1917" height="972" alt="image" src="https://github.com/user-attachments/assets/2a5f1c03-5367-4057-bfdf-f2bed903f225" />


---

## Disaster Alert Center



<img width="1917" height="980" alt="image" src="https://github.com/user-attachments/assets/5f070979-a6fb-448e-b3ab-3d206ef14222" />


---
## Data Sources
Target Government Integration:
- India Meteorological Department (IMD)
- OpenWeather API (Weather Data)
- Geolocation Services
- National Disaster Management Authority (NDMA)
- ISRO Bhuvan
- CPCB Air Quality Data

# 🚀 Key Features

## 🌤 Real-Time Weather Monitoring

- Live weather conditions
- Temperature tracking
- Humidity monitoring
- Wind speed analysis
- Atmospheric pressure tracking
- Visibility measurement
- Dynamic city search
- Geolocation support

---

## 📅 5-Day Forecast System

- Multi-day weather forecasting
- Temperature predictions
- Rainfall probability
- Weather condition analysis
- Forecast highlights
- Daily weather summaries

---

## 🌫 Air Quality Intelligence

Monitor environmental conditions in real-time.

### Supported Metrics

- AQI Index
- PM2.5
- PM10
- Carbon Monoxide (CO)
- Nitrogen Dioxide (NO₂)
- Pollution Analysis

---

## 🤖 AI Weather Assistant

An intelligent assistant powered by **Google Gemini AI** capable of:

- Weather question answering
- Travel recommendations
- Farming guidance
- Climate awareness
- Safety recommendations
- Weather explanations
- Multi-language communication

### Supported Languages

- English
- Hindi
- Marathi
- Tamil
- Telugu
- Bengali
- Gujarati
- Punjabi
- Malayalam
- Kannada

and more...

---

## 🌾 Farmer Advisory System

Specialized recommendations for agricultural communities.

### Capabilities

- Crop planning guidance
- Weather-based recommendations
- Seasonal farming insights
- Rainfall advisories
- Weather risk notifications

---

## ⚠ Disaster Alert Center

Early warning information for extreme weather conditions.

### Monitoring

- Flood Alerts
- Cyclone Alerts
- Lightning Alerts
- Heatwave Alerts
- Severe Weather Conditions
- Heavy Rainfall Warnings

---

## 🧳 Travel Planner

Smart travel recommendations based on weather conditions.

### Features

- Route weather analysis
- Travel risk assessment
- Weather-aware trip planning
- Environmental condition monitoring

---

## 📊 Weather Impact Score

A custom weather intelligence scoring system that evaluates:

- Flood Risk
- Heatwave Risk
- Lightning Risk
- Cyclone Risk
- Overall Weather Safety

---

## 🗺 Interactive Weather Map

- Live weather visualization
- Geospatial weather insights
- Location-based weather analysis
- Dynamic weather layer integration

---

## 📈 Climate Insights

Data-driven climate observations and weather intelligence.

---

# 🏗️ System Architecture

```text
┌─────────────────────────────────────────────────────────────┐
│                         USER LAYER                          │
├─────────────────────────────────────────────────────────────┤
│ Citizens │ Farmers │ Travelers │ Students │ Authorities     │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                       │
├─────────────────────────────────────────────────────────────┤
│ Next.js Frontend Dashboard                                  │
│ Responsive UI + Interactive Components                      │
│ AI Weather Assistant                                         │
│ Weather Maps                                                 │
│ Multilingual Interface                                       │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    APPLICATION LAYER                        │
├─────────────────────────────────────────────────────────────┤
│ Weather Dashboard                                            │
│ Current Weather Module                                       │
│ Forecast Module                                              │
│ Air Quality Module                                           │
│ Climate Insights Module                                      │
│ AI Assistant Module                                          │
│ Travel Planner Module                                        │
│ Farmer Advisory Module                                       │
│ Disaster Alert Module                                        │
│ Risk Assessment Module                                       │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│               WEATHER INTELLIGENCE ENGINE                   │
├─────────────────────────────────────────────────────────────┤
│ Forecast Processing Engine                                   │
│ Weather Impact Score Engine                                  │
│ Disaster Risk Analysis Engine                                │
│ AQI Analysis Engine                                          │
│ Climate Recommendation Engine                                │
│ Farmer Advisory Engine                                       │
│ Travel Risk Evaluation Engine                                │
│ Alert Generation Engine                                      │
└─────────────────────────────────────────────────────────────┘
                              │
      ┌───────────────────────┼───────────────────────┐
      ▼                       ▼                       ▼

┌───────────────┐     ┌───────────────┐     ┌───────────────┐
│ OpenWeather   │     │ Gemini AI     │     │ Geolocation   │
│ API           │     │ API           │     │ Services      │
└───────────────┘     └───────────────┘     └───────────────┘

      │                       │                       │
      └───────────────┬───────┴───────────────┬───────┘
                      ▼                       ▼

┌─────────────────────────────────────────────────────────────┐
│                       DATA LAYER                            │
├─────────────────────────────────────────────────────────────┤
│ Current Weather Data                                         │
│ 5-Day Forecast Data                                          │
│ Air Quality Data                                             │
│ Geographical Data                                            │
│ User Location Data                                           │
│ AI Generated Insights                                        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      OUTPUT LAYER                           │
├─────────────────────────────────────────────────────────────┤
│ Smart Weather Dashboard                                      │
│ AI Recommendations                                           │
│ Farmer Advisories                                            │
│ Disaster Alerts                                              │
│ Travel Recommendations                                       │
│ AQI Monitoring                                               │
│ Climate Insights                                             │
│ Weather Risk Scores                                          │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 System Workflow

```text
User Request
      │
      ▼
WeatherGPT Dashboard
      │
      ▼
Weather Service Layer
      │
      ├── Current Weather API
      ├── Forecast API
      ├── AQI API
      └── Geolocation API
                │
                ▼
      Weather Intelligence Engine
                │
                ├── Risk Analysis
                ├── Forecast Analysis
                ├── Advisory Generation
                ├── Alert Detection
                └── Travel Evaluation
                │
                ▼
           Gemini AI Layer
                │
                ▼
      AI Insights & Recommendations
                │
                ▼
         Interactive Dashboard
                │
                ▼
               User
```

## 🧠 AI Assistant Architecture

```text
User Question
      │
      ▼
AI Assistant Interface
      │
      ▼
Context Collection Layer
      │
      ├── Current Weather
      ├── Forecast Data
      ├── AQI Data
      ├── User Location
      └── Climate Metrics
      │
      ▼
Prompt Engineering Layer
      │
      ▼
Gemini AI
      │
      ▼
Multilingual Response Engine
      │
      ▼
Text + Voice Output
```

## 🌾 Farmer Advisory Pipeline

```text
Weather Forecast
      │
      ▼
Agriculture Intelligence Layer
      │
      ├── Rain Analysis
      ├── Temperature Analysis
      ├── Humidity Analysis
      └── Risk Detection
      │
      ▼
Crop Recommendation Engine
      │
      ▼
Farmer Advisory Dashboard
```

## 🚨 Disaster Alert Pipeline

```text
Weather Conditions
      │
      ▼
Disaster Risk Engine
      │
      ├── Flood Detection
      ├── Cyclone Detection
      ├── Heatwave Detection
      ├── Lightning Detection
      └── Heavy Rain Detection
      │
      ▼
Alert Generation System
      │
      ▼
Real-Time Disaster Alerts
```

## 🗺️ Weather Map Pipeline

```text
OpenWeather Map Layers
        │
        ├── Rain Layer
        ├── Wind Layer
        ├── Temperature Layer
        ├── Cloud Layer
        └── Pressure Layer
                │
                ▼
        Interactive Weather Map
                │
                ▼
        Real-Time Visualization
```

**Tech Stack:** Next.js • TypeScript • Tailwind CSS • OpenWeather API • Gemini AI • Geolocation API • Leaflet Maps • React Markdown • Web Speech API

# 💻 Technology Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

## APIs

- OpenWeather API
- Gemini AI API

## UI & Design

- Lucide React Icons
- Responsive Dashboard Design
- Modern Glassmorphism Components

---


# 🎯 Use Cases

### 👨‍🌾 Farmers

- Crop planning
- Weather-based decisions
- Risk management

### 🚗 Travelers

- Route planning
- Weather risk awareness

### 🏙 Citizens

- Daily weather intelligence
- AQI monitoring
- Safety alerts

### 🏛 Government & Agencies

- Disaster preparedness
- Environmental monitoring
- Climate awareness

---

# 🔮 Future Enhancements

- Satellite Data Integration
- IMD Data Integration
- Voice Assistant
- Predictive Disaster Analytics
- Government Scheme Recommendations
- AI Climate Forecasting
- Multilingual Voice Interaction
- Mobile Application
- Push Notifications
- Advanced Risk Maps

---

# 🧪 Local Setup

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/WeatherGPT.git
```

## Navigate

```bash
cd WeatherGPT
```

## Install Dependencies

```bash
npm install
```

## Create Environment File

```env
NEXT_PUBLIC_OPENWEATHER_API_KEY=YOUR_KEY
NEXT_PUBLIC_GEMINI_API_KEY=YOUR_KEY
```

## Run Project

```bash
npm run dev
```

Application will run on:

```text
http://localhost:3000
```

---

# 🌟 Vision

WeatherGPT aims to bridge the gap between raw climate data and actionable decision-making by delivering intelligent, accessible, and user-centric weather insights.

The long-term vision is to build a comprehensive climate intelligence ecosystem that supports disaster resilience, agricultural sustainability, environmental awareness, and citizen safety.

---

# 👩‍💻 Developed By

## Fatima Zaki

B.Tech Computer Science & Engineering  
G.H. Raisoni College of Engineering  Nagpur

### Connect

- LinkedIn: https://www.linkedin.com/in/fatima-zaki/
- GitHub: https://github.com/fatimazaki1509

---

<div align="center">

### 🌦 WeatherGPT
### Smarter Weather. Safer Lives.

Built with ❤️ using Next.js, TypeScript, Tailwind CSS and AI.

</div>
