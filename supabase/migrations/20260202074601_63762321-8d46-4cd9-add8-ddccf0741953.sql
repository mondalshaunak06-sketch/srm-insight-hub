-- Create the company table with all 163 columns mapped 1:1 from the schema
-- SRM Placement Intelligence - Company Data Table

CREATE TABLE public.company (
  -- Primary Key
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Company Basics (1-7)
  name TEXT NOT NULL,
  short_name TEXT,
  logo_url TEXT,
  category TEXT,
  incorporation_year INTEGER,
  nature_of_company TEXT,
  headquarters_address TEXT,
  
  -- Company Narrative (6, 16, 17)
  overview_text TEXT,
  interesting_facts TEXT,
  recent_news TEXT,
  
  -- Geographic Presence (9-11)
  operating_countries TEXT,
  office_count TEXT,
  office_locations TEXT,
  
  -- People & Talent (12-15, 89-91)
  employee_size INTEGER,
  hiring_velocity TEXT,
  employee_turnover TEXT,
  avg_retention_tenure TEXT,
  diversity_metrics TEXT,
  remote_policy_details TEXT,
  training_spend TEXT,
  
  -- Business Model (16-20)
  pain_points_addressed TEXT,
  focus_sectors TEXT,
  offerings_description TEXT,
  top_customers TEXT,
  core_value_proposition TEXT,
  
  -- Strategy & Culture (21-27)
  vision TEXT,
  mission TEXT,
  company_values TEXT,
  unique_differentiators TEXT,
  competitive_advantages TEXT,
  weaknesses_gaps TEXT,
  key_challenges_needs TEXT,
  
  -- Competitive Landscape (28-29)
  key_competitors TEXT,
  technology_partners TEXT,
  
  -- Digital Presence (32-43)
  website_url TEXT,
  website_quality TEXT,
  website_rating TEXT,
  website_traffic_rank TEXT,
  social_media_followers TEXT,
  glassdoor_rating TEXT,
  indeed_rating TEXT,
  google_rating TEXT,
  linkedin_url TEXT,
  twitter_handle TEXT,
  facebook_url TEXT,
  instagram_url TEXT,
  marketing_video_url TEXT,
  customer_testimonials TEXT,
  
  -- Leadership (44-48)
  ceo_name TEXT,
  ceo_linkedin_url TEXT,
  key_leaders TEXT,
  warm_intro_pathways TEXT,
  decision_maker_access TEXT,
  board_members TEXT,
  
  -- Contact Info (49-54)
  primary_contact_email TEXT,
  primary_phone_number TEXT,
  contact_person_name TEXT,
  contact_person_title TEXT,
  contact_person_email TEXT,
  contact_person_phone TEXT,
  
  -- Reputation (55-57)
  awards_recognitions TEXT,
  brand_sentiment_score TEXT,
  event_participation TEXT,
  
  -- Risk & Compliance (58-59, 86-88)
  regulatory_status TEXT,
  legal_issues TEXT,
  supply_chain_dependencies TEXT,
  geopolitical_risks TEXT,
  macro_risks TEXT,
  
  -- Financials (60-66)
  annual_revenue TEXT,
  annual_profit TEXT,
  revenue_mix TEXT,
  valuation TEXT,
  yoy_growth_rate TEXT,
  profitability_status TEXT,
  market_share_percentage TEXT,
  
  -- Funding (67-69)
  key_investors TEXT,
  recent_funding_rounds TEXT,
  total_capital_raised TEXT,
  
  -- Sustainability (70, 94-95)
  esg_ratings TEXT,
  carbon_footprint TEXT,
  ethical_sourcing TEXT,
  
  -- Sales & Growth (71-80)
  sales_motion TEXT,
  customer_acquisition_cost TEXT,
  customer_lifetime_value TEXT,
  cac_ltv_ratio TEXT,
  churn_rate TEXT,
  net_promoter_score TEXT,
  customer_concentration_risk TEXT,
  burn_rate TEXT,
  runway_months TEXT,
  burn_multiplier TEXT,
  
  -- Innovation (81-83, 102-103)
  intellectual_property TEXT,
  r_and_d_investment TEXT,
  ai_ml_adoption_level TEXT,
  innovation_roadmap TEXT,
  product_pipeline TEXT,
  
  -- Operations (84-85)
  tech_stack TEXT,
  cybersecurity_posture TEXT,
  
  -- Market (92-93, 107-110)
  partnership_ecosystem TEXT,
  exit_strategy TEXT,
  tam TEXT,
  sam TEXT,
  som TEXT,
  
  -- Benchmarking (96, 113)
  benchmark_vs_peers TEXT,
  tech_adoption_rating TEXT,
  
  -- Forecasting (97-98)
  future_projections TEXT,
  strategic_priorities TEXT,
  
  -- Network (99)
  industry_associations TEXT,
  
  -- Proof Points (100, 106)
  case_studies TEXT,
  
  -- Go-to-Market (101)
  go_to_market_strategy TEXT,
  
  -- Culture & People (111-117)
  work_culture_summary TEXT,
  manager_quality TEXT,
  psychological_safety TEXT,
  feedback_culture TEXT,
  diversity_inclusion_score TEXT,
  ethical_standards TEXT,
  
  -- Work-Life Balance (117-122)
  typical_hours TEXT,
  overtime_expectations TEXT,
  weekend_work TEXT,
  flexibility_level TEXT,
  leave_policy TEXT,
  burnout_risk TEXT,
  
  -- Location, Commute & Accessibility (123-127)
  location_centrality TEXT,
  public_transport_access TEXT,
  cab_policy TEXT,
  airport_commute_time TEXT,
  office_zone_type TEXT,
  
  -- Safety & Well-being (128-132)
  area_safety TEXT,
  safety_policies TEXT,
  infrastructure_safety TEXT,
  emergency_preparedness TEXT,
  health_support TEXT,
  
  -- Learning & Growth (133-139)
  onboarding_quality TEXT,
  learning_culture TEXT,
  exposure_quality TEXT,
  mentorship_availability TEXT,
  internal_mobility TEXT,
  promotion_clarity TEXT,
  tools_access TEXT,
  
  -- Role & Work Quality (140-145)
  role_clarity TEXT,
  early_ownership TEXT,
  work_impact TEXT,
  execution_thinking_balance TEXT,
  automation_level TEXT,
  cross_functional_exposure TEXT,
  
  -- Company Stability & Reputation (146-149)
  company_maturity TEXT,
  brand_value TEXT,
  client_quality TEXT,
  layoff_history TEXT,
  
  -- Compensation & Benefits (150-155)
  fixed_vs_variable_pay TEXT,
  bonus_predictability TEXT,
  esops_incentives TEXT,
  family_health_insurance TEXT,
  relocation_support TEXT,
  lifestyle_benefits TEXT,
  
  -- Long-Term Career Signaling (156-160)
  exit_opportunities TEXT,
  skill_relevance TEXT,
  external_recognition TEXT,
  network_strength TEXT,
  global_exposure TEXT,
  
  -- Values Alignment (161-163)
  mission_clarity TEXT,
  sustainability_csr TEXT,
  crisis_behavior TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.company ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (placement data is public for students)
CREATE POLICY "Companies are publicly readable"
  ON public.company
  FOR SELECT
  USING (true);

-- Create an index on category for faster filtering
CREATE INDEX idx_company_category ON public.company(category);

-- Create an index on name for faster search
CREATE INDEX idx_company_name ON public.company(name);

-- Create a function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_company_updated_at
  BEFORE UPDATE ON public.company
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Add comment describing the table
COMMENT ON TABLE public.company IS 'SRM Placement Intelligence - Company data with 163 structured parameters for placement analysis';