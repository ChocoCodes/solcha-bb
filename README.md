# Bantala: APAC Solution Challenge 2025 Entry

## Team AmBot: Google Developer Groups on Campus - USLS
AmBot is a three-member collective from the Philippines that embraces the spirit of bayanihan to tackle real-world challenges through tech. What began as “I don’t know” now drives discovery—transforming ideas into digital solutions with global impact.
### Members:
- [Octavio, John Roland L.](https://www.linkedin.com/in/john-roland-octavio-3a2457323) | Chief Technology Officer, Full Stack Developer
- [Labistre, John Dane M.](https://www.linkedin.com/in/josh-dane-labistre-108405285/) | Chief Information Officer, UIUX Designer
- [Javelona, Ignatius Warren Benjamin D.](https://www.linkedin.com/in/ignatius-warren-benjamin-javelona-bab7272a4/ ) | Artificial Intelligence Lead, Data Engineer

### About the App:
Bantala is a disaster-preparedness web app focused exclusively on communities near Mt. Kanlaon, one of the most active volcanoes in the Philippines.
It empowers communities through:
- 🗺️ Interactive Evacuation Mapping
- 🤖 RAG-Assisted Chatbot
- 📰 Community-Driven Emergency Bulletins

### Features
- **Community Bulletin**: A real-time, crowd-sourced update board where users can share on-the-ground information with varying tags and remarks to strengthen community awareness and response.
- **RAG-Assisted Chatbot**: A conversational assistant powered by Google Gemini that provides easy-to-understand answers to questions about volcanic activity, safety procedures, and preparedness in real time. Real-time data about the status of the Kanlaon Volcano is extracted through DOST-PHIVOLCS bulletin and database.
- **Interactive Safety Map**: A geolocation-based tool using Maps Javascript and Places API that helps users identify nearby evacuation centers and safe zones outside of the 6km Permanent Danger Zone radius, enhancing decision-making during volcanic emergencies.

### Architecture Diagram
<img align="center" alt="Tech Stack" width="400" src="https://i.imgur.com/ME6edks.png">

### Tech Stack Used:
<img align="center" alt="Tech Stack" width="400" src="https://i.imgur.com/71PaBpo.png">

### Other Repositories
- [RAG System](https://github.com/2BYYYY/team-ambot-bantala-rag)
- [Web Scraper](https://github.com/2BYYYY/team-ambot-bantala-scraper)

### Directory Structure
```
└── chococodes-solcha-bb/
    ├── README.md
    ├── components.json
    ├── eslint.config.mjs
    ├── next.config.ts
    ├── package.json
    ├── postcss.config.mjs
    ├── tsconfig.json
    ├── public/
    │   ├── assets/
    │   └── fonts/
    │       ├── Poppins-Bold.woff2
    │       └── Poppins-Regular.woff2
    └── src/
        ├── app/
        │   ├── layout.tsx
        │   ├── page.tsx
        │   ├── api/
        │   │   └── query/
        │   │       └── route.ts
        │   ├── chatbot/
        │   │   └── page.tsx
        │   ├── login/
        │   │   └── page.tsx
        │   └── map/
        │       └── page.tsx
        ├── components/
        │   ├── Footer.tsx
        │   ├── Header.tsx
        │   ├── InputField.tsx
        │   ├── Loading.tsx
        │   ├── Bulletin/
        │   │   ├── AddPostForm.tsx
        │   │   ├── components.tsx
        │   │   ├── Post.tsx
        │   │   └── VolcanoMap.tsx
        │   ├── Chatbot/
        │   │   ├── ChatBox.tsx
        │   │   ├── ChatInput.tsx
        │   │   ├── ChatWelcome.tsx
        │   │   └── components.tsx
        │   ├── Login/
        │   │   ├── components.tsx
        │   │   ├── MaskedImage.tsx
        │   │   └── SignInForm.tsx
        │   ├── Map/
        │   │   └── MapMarker.tsx
        │   ├── Sidebar/
        │   │   ├── components.tsx
        │   │   ├── SidebarItem.tsx
        │   │   └── SidebarLinks.tsx
        │   └── ui/
        │       ├── card.tsx
        │       ├── checkbox.tsx
        │       ├── select.tsx
        │       └── sheet.tsx
        ├── context/
        │   └── AuthContext.tsx
        ├── firebase/
        │   ├── addBulletinPost.ts
        │   ├── addUserCollection.ts
        │   ├── auth.ts
        │   ├── firebase.ts
        │   └── uploadImage.ts
        ├── hooks/
        │   ├── hooks.ts
        │   ├── useAuthCheck.ts
        │   ├── useBulletinPosts.ts
        │   └── useNearbySearch.ts
        ├── lib/
        │   └── utils.ts
        ├── styles/
        │   └── globals.css
        └── utils/
            ├── constants.ts
            ├── haversine.ts
            ├── sampleData.ts
            ├── types.ts
            └── utils.ts

```
### Acknowledgement
The data used for monitoring and analyzing the status of Kanlaon Volcano was sourced from the following:

- **National Disaster Risk Reduction and Management Council (NDRRMC)**  
  Situation Reports (SitReps) from the most recent eruption were retrieved in PDF format and processed as part of this system's data repository.

- **Department of Science and Technology - Philippine Institute of Volcanology and Seismology (DOST-PHIVOLCS)**  
  Real-time volcanic data was obtained through automated web scraping from the official PHIVOLCS website, with data extraction scheduled daily at 12:00 PM.

We acknowledge the efforts of these institutions in providing timely and reliable volcanic activity data to support disaster preparedness and public awareness.

### Data Policy
This AI-powered chatbot does **NOT** predict, forecast, or issue warnings regarding volcanic activity. Instead, it serves as an **informational assistant**—using publicly available data to help users better understand the current status of Kanlaon Volcano.

The primary role of this chatbot is to **enhance public awareness and understanding** by providing simplified, structured, and contextual explanations of official data. By doing so, it aims to empower individuals with knowledge that can support **informed decision-making and preparedness** in the event of a volcanic emergency.

#### Use of DOST-PHIVOLCS Data

This system integrates data labeled as "public" from the **Department of Science and Technology – Philippine Institute of Volcanology and Seismology (DOST-PHIVOLCS)** in accordance with the following guidelines:

- Users of DOST-PHIVOLCS data must register with a valid email address and password. Registration is required only once.
- The data source must always be properly cited as: **DOST-PHIVOLCS**.
- Only **DOST-PHIVOLCS officials** are authorized to use the data for **public forecasting** of ongoing volcanic unrest in the Philippines.
- Redistribution or monetization of DOST-PHIVOLCS data is prohibited.

We fully respect and follow these policies, ensuring that this chatbot remains a **support tool for education and disaster preparedness**, not a substitute for official alerts or scientific authority.

For real-time advisories and official updates, always refer to [DOST-PHIVOLCS](https://wovodat.phivolcs.dost.gov.ph/) and [NDRRMC](https://ndrrmc.gov.ph).

---
<p align="center">
  <strong>APAC Solution Challenge 2025</strong><br/>
  <em><a href="https://www.facebook.com/dsc.usls" target="_blank" rel="noopener noreferrer">Google Developer Groups on Campus - University of St. La Salle</a></em><br/><br/>
  All rights reserved | Octavio, Labistre, Javelona
</p>
