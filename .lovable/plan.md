

## SRM Placement Intelligence — Enterprise PWA

A dark-mode, enterprise-grade Progressive Web Application for campus placement intelligence, featuring a minimal & clean design with SRM Blue/Navy color scheme.

---

### 🎨 Design Foundation

**Theme**: Dark mode only with SRM Blue (#0B3D91) accent colors
**Style**: Minimal & clean, data-dense but readable
**Typography**: Clear hierarchy optimized for analytical information
**Layout**: Responsive mobile-first design with vertical sidebar navigation

---

### 📱 Core Pages (6 Total)

#### 1. **Home / Dashboard**
- Welcome orientation with total company count
- Companies grouped by category tiles (Tech Giants, Product, Service, Startups)
- Global search bar (by name, focus sectors, tech stack)
- Quick insight cards showing:
  - Hiring velocity distribution
  - Profitable vs non-profitable mix
  - Remote/Hybrid/On-site breakdown

#### 2. **Explore Companies**
- Card grid view of all companies
- Each card displays: logo, name, category, employee size, focus sectors, hiring velocity, profitability status
- Filter panel: category, focus sectors, employee size, profitability, remote policy, hiring velocity
- Sorting: name, employee size, YoY growth rate, brand value
- Pagination for large datasets

#### 3. **Categories View**
- Dedicated filtered views per category (Enterprise, Product, Service, Startup)
- Same card layout and filters as Explore
- Category-specific insights and counts

#### 4. **Company Detail Page** (Core Screen)
- **Vertical sidebar navigation** on the left with 10 section links
- Scrollable content panel on the right
- **10 Organized Sections**:
  1. **Company Overview** — name, logo, incorporation year, headquarters, offices, employee size, overview, history, news
  2. **Business & Market** — pain points, focus sectors, offerings, customers, value proposition, competitors, TAM/SAM/SOM
  3. **Culture, People & Work** — work culture, hiring velocity, turnover, retention, diversity, psychological safety
  4. **Learning, Growth & Career** — training, onboarding, mentorship, mobility, promotion clarity, skill relevance
  5. **Compensation & Lifestyle** — pay structure, bonuses, ESOPs, health insurance, leave policy, relocation
  6. **Work Logistics & Safety** — remote policy, hours, overtime, transport, office zone, area safety
  7. **Financials, Risk & Stability** — revenue, profit, valuation, growth rate, funding, ESG, regulatory status
  8. **Technology & Innovation** — tech stack, AI/ML adoption, cybersecurity, R&D investment, innovation roadmap
  9. **Leadership & Contacts** — CEO, key leaders, board members, contact persons, warm intro pathways
  10. **Brand & Digital Presence** — website, social media, ratings (Glassdoor, Indeed, Google), awards

#### 5. **Compare Mode**
- Two-company side-by-side comparison
- Company selectors at the top
- Comparison organized by category:
  - Culture & Work
  - Compensation
  - Learning & Growth
  - Financials
  - Technology
  - Career Signaling
- Visual highlighting of strengths, trade-offs, and risk areas

#### 6. **Skill Mapping Tool**
- Student skill input form (tags/checkboxes)
- Matching algorithm against: tech_stack, ai_ml_adoption_level, automation_level
- Results display:
  - High/Medium/Low fit score per company
  - Skill gap analysis
  - Preparation focus recommendations
- Rule-based matching only (no AI inference)

#### 7. **Analytics & Insights**
- Interactive charts and visualizations:
  - Company distribution by category (pie/donut)
  - Hiring velocity trends (bar chart)
  - Product vs Service mix
  - Enterprise vs Startup exposure
  - Career signal strength comparison
- Powered by Recharts (already installed)

---

### 🗄️ Database Architecture

**Supabase Table**: `public.company` with all 163 columns mapped 1:1 from the schema

**Column Categories** (matching your Excel structure):
- Company Basics (12 fields)
- Geographic Presence (4 fields)
- People & Talent (10 fields)
- Business Model (8 fields)
- Strategy & Culture (8 fields)
- Financials & Funding (15 fields)
- Digital Presence (15 fields)
- Leadership & Contacts (10 fields)
- Work-Life & Location (15 fields)
- Learning & Growth (12 fields)
- Compensation (8 fields)
- Innovation & Technology (10 fields)
- And more...

---

### 🏗️ Technical Architecture

**Frontend Stack**:
- React + TypeScript + Vite
- TailwindCSS (dark theme)
- Shadcn/UI components
- React Router for SPA navigation
- TanStack Query for data fetching
- Recharts for analytics visualizations

**PWA Features**:
- Service worker for offline capability
- Installable to home screen
- Optimized caching strategy
- Mobile-optimized meta tags

**Data Layer**:
- Supabase client integration
- Custom hooks for company data fetching
- Typed interfaces matching all 163 columns
- Adapters ready for dynamic data binding

---

### 📐 Component Architecture

```
src/
├── components/
│   ├── layout/
│   │   ├── AppSidebar.tsx
│   │   ├── MainLayout.tsx
│   │   └── PageHeader.tsx
│   ├── companies/
│   │   ├── CompanyCard.tsx
│   │   ├── CompanyGrid.tsx
│   │   ├── CompanyFilters.tsx
│   │   ├── CompanyDetailSidebar.tsx
│   │   └── sections/ (10 detail sections)
│   ├── compare/
│   │   ├── CompareSelector.tsx
│   │   └── ComparisonTable.tsx
│   ├── skills/
│   │   ├── SkillInput.tsx
│   │   └── SkillMatchResults.tsx
│   └── analytics/
│       └── (chart components)
├── hooks/
│   ├── useCompanies.ts
│   ├── useCompany.ts
│   └── useSkillMatch.ts
├── types/
│   └── company.ts (163-field interface)
└── pages/ (6 route pages)
```

---

### 🔒 Key Constraints Honored

✅ All 163 columns mapped 1:1 from schema — no renaming or merging
✅ No sample data hardcoded — empty states and dynamic binding only
✅ All components accept props for any number of companies
✅ Data access abstracted through hooks/services
✅ Schema-based TypeScript interfaces for type safety

