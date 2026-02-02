import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Linkedin, Twitter, Facebook, Instagram, Mail, Phone, MapPin, Users, Calendar, Building2, Globe } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCompany } from "@/hooks/useCompanies";
import { cn } from "@/lib/utils";
import { useState } from "react";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "business", label: "Business & Market" },
  { id: "culture", label: "Culture & People" },
  { id: "learning", label: "Learning & Growth" },
  { id: "compensation", label: "Compensation" },
  { id: "logistics", label: "Work Logistics" },
  { id: "financials", label: "Financials" },
  { id: "technology", label: "Technology" },
  { id: "leadership", label: "Leadership" },
  { id: "brand", label: "Brand & Digital" },
];

export default function CompanyDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: company, isLoading, error } = useCompany(id || "");
  const [activeSection, setActiveSection] = useState("overview");

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="space-y-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-64 w-full" />
        </div>
      </MainLayout>
    );
  }

  if (error || !company) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">Company not found</h2>
          <p className="text-muted-foreground mb-4">The company you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/explore">Back to Explore</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  const InfoField = ({ label, value, icon: Icon }: { label: string; value: string | null; icon?: any }) => {
    if (!value) return null;
    return (
      <div className="flex items-start gap-2">
        {Icon && <Icon className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />}
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-sm">{value}</p>
        </div>
      </div>
    );
  };

  return (
    <MainLayout>
      <div className="flex gap-6">
        {/* Sidebar Navigation */}
        <aside className="hidden lg:block w-56 shrink-0">
          <div className="sticky top-20">
            <Button variant="ghost" size="sm" asChild className="mb-4">
              <Link to="/explore">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Link>
            </Button>
            <ScrollArea className="h-[calc(100vh-12rem)]">
              <nav className="space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={cn(
                      "w-full text-left px-3 py-2 text-sm rounded-md transition-colors",
                      activeSection === section.id
                        ? "bg-primary/20 text-primary font-medium"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {section.label}
                  </button>
                ))}
              </nav>
            </ScrollArea>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 space-y-8 pb-12">
          {/* Header */}
          <div className="flex items-start gap-4">
            {company.logo_url ? (
              <img
                src={company.logo_url}
                alt={`${company.name} logo`}
                className="w-16 h-16 rounded-lg object-contain bg-muted p-2"
              />
            ) : (
              <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center">
                <Building2 className="h-8 w-8 text-muted-foreground" />
              </div>
            )}
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl font-bold">{company.name}</h1>
                {company.short_name && (
                  <Badge variant="secondary">{company.short_name}</Badge>
                )}
                {company.category && (
                  <Badge variant="outline" className="bg-primary/20 text-primary border-primary/30">
                    {company.category}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                {company.headquarters_address && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {company.headquarters_address}
                  </span>
                )}
                {company.employee_size && (
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    {company.employee_size.toLocaleString()} employees
                  </span>
                )}
                {company.incorporation_year && (
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    Est. {company.incorporation_year}
                  </span>
                )}
              </div>
            </div>
            {company.website_url && (
              <Button asChild variant="outline" size="sm">
                <a href={company.website_url} target="_blank" rel="noopener noreferrer">
                  <Globe className="h-4 w-4 mr-2" />
                  Website
                </a>
              </Button>
            )}
          </div>

          {/* Section 1: Overview */}
          <section id="overview">
            <Card>
              <CardHeader>
                <CardTitle>Company Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {company.overview_text && (
                  <p className="text-sm leading-relaxed">{company.overview_text}</p>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <InfoField label="Nature" value={company.nature_of_company} icon={Building2} />
                  <InfoField label="Operating Countries" value={company.operating_countries} icon={Globe} />
                  <InfoField label="Office Locations" value={company.office_locations} icon={MapPin} />
                  <InfoField label="Office Count" value={company.office_count} />
                </div>
                {company.interesting_facts && (
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-xs text-muted-foreground mb-1">Interesting Facts</p>
                    <p className="text-sm">{company.interesting_facts}</p>
                  </div>
                )}
                {company.recent_news && (
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-xs text-muted-foreground mb-1">Recent News</p>
                    <p className="text-sm">{company.recent_news}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </section>

          {/* Section 2: Business & Market */}
          <section id="business">
            <Card>
              <CardHeader>
                <CardTitle>Business & Market</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoField label="Focus Sectors" value={company.focus_sectors} />
                  <InfoField label="Pain Points Addressed" value={company.pain_points_addressed} />
                  <InfoField label="Offerings / Services" value={company.offerings_description} />
                  <InfoField label="Top Customers" value={company.top_customers} />
                  <InfoField label="Core Value Proposition" value={company.core_value_proposition} />
                  <InfoField label="Unique Differentiators" value={company.unique_differentiators} />
                  <InfoField label="Competitive Advantages" value={company.competitive_advantages} />
                  <InfoField label="Weaknesses / Gaps" value={company.weaknesses_gaps} />
                  <InfoField label="Key Challenges" value={company.key_challenges_needs} />
                  <InfoField label="Key Competitors" value={company.key_competitors} />
                </div>
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">TAM</p>
                    <p className="font-semibold">{company.tam || "—"}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">SAM</p>
                    <p className="font-semibold">{company.sam || "—"}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">SOM</p>
                    <p className="font-semibold">{company.som || "—"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 3: Culture & People */}
          <section id="culture">
            <Card>
              <CardHeader>
                <CardTitle>Culture, People & Work</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <InfoField label="Work Culture" value={company.work_culture_summary} />
                  <InfoField label="Hiring Velocity" value={company.hiring_velocity} />
                  <InfoField label="Employee Turnover" value={company.employee_turnover} />
                  <InfoField label="Avg Retention Tenure" value={company.avg_retention_tenure} />
                  <InfoField label="Manager Quality" value={company.manager_quality} />
                  <InfoField label="Psychological Safety" value={company.psychological_safety} />
                  <InfoField label="Feedback Culture" value={company.feedback_culture} />
                  <InfoField label="Diversity Metrics" value={company.diversity_metrics} />
                  <InfoField label="D&I Score" value={company.diversity_inclusion_score} />
                  <InfoField label="Ethical Standards" value={company.ethical_standards} />
                  <InfoField label="Layoff History" value={company.layoff_history} />
                  <InfoField label="Burnout Risk" value={company.burnout_risk} />
                  <InfoField label="Mission Clarity" value={company.mission_clarity} />
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 4: Learning & Growth */}
          <section id="learning">
            <Card>
              <CardHeader>
                <CardTitle>Learning, Growth & Career Signal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <InfoField label="Training Spend" value={company.training_spend} />
                  <InfoField label="Onboarding Quality" value={company.onboarding_quality} />
                  <InfoField label="Learning Culture" value={company.learning_culture} />
                  <InfoField label="Exposure Quality" value={company.exposure_quality} />
                  <InfoField label="Mentorship Availability" value={company.mentorship_availability} />
                  <InfoField label="Internal Mobility" value={company.internal_mobility} />
                  <InfoField label="Promotion Clarity" value={company.promotion_clarity} />
                  <InfoField label="Tools Access" value={company.tools_access} />
                  <InfoField label="Role Clarity" value={company.role_clarity} />
                  <InfoField label="Early Ownership" value={company.early_ownership} />
                  <InfoField label="Work Impact" value={company.work_impact} />
                  <InfoField label="Execution vs Thinking Balance" value={company.execution_thinking_balance} />
                  <InfoField label="Automation Level" value={company.automation_level} />
                  <InfoField label="Cross-Functional Exposure" value={company.cross_functional_exposure} />
                  <InfoField label="Exit Opportunities" value={company.exit_opportunities} />
                  <InfoField label="Skill Relevance" value={company.skill_relevance} />
                  <InfoField label="Network Strength" value={company.network_strength} />
                  <InfoField label="Global Exposure" value={company.global_exposure} />
                  <InfoField label="External Recognition" value={company.external_recognition} />
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 5: Compensation */}
          <section id="compensation">
            <Card>
              <CardHeader>
                <CardTitle>Compensation & Lifestyle</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <InfoField label="Fixed vs Variable Pay" value={company.fixed_vs_variable_pay} />
                  <InfoField label="Bonus Predictability" value={company.bonus_predictability} />
                  <InfoField label="ESOPs & Incentives" value={company.esops_incentives} />
                  <InfoField label="Family Health Insurance" value={company.family_health_insurance} />
                  <InfoField label="Relocation Support" value={company.relocation_support} />
                  <InfoField label="Lifestyle Benefits" value={company.lifestyle_benefits} />
                  <InfoField label="Leave Policy" value={company.leave_policy} />
                  <InfoField label="Health Support" value={company.health_support} />
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 6: Work Logistics */}
          <section id="logistics">
            <Card>
              <CardHeader>
                <CardTitle>Work Logistics & Safety</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <InfoField label="Remote Policy" value={company.remote_policy_details} />
                  <InfoField label="Typical Hours" value={company.typical_hours} />
                  <InfoField label="Overtime Expectations" value={company.overtime_expectations} />
                  <InfoField label="Weekend Work" value={company.weekend_work} />
                  <InfoField label="Flexibility Level" value={company.flexibility_level} />
                  <InfoField label="Location Centrality" value={company.location_centrality} />
                  <InfoField label="Public Transport Access" value={company.public_transport_access} />
                  <InfoField label="Cab Policy" value={company.cab_policy} />
                  <InfoField label="Airport Commute Time" value={company.airport_commute_time} />
                  <InfoField label="Office Zone Type" value={company.office_zone_type} />
                  <InfoField label="Area Safety" value={company.area_safety} />
                  <InfoField label="Safety Policies" value={company.safety_policies} />
                  <InfoField label="Infrastructure Safety" value={company.infrastructure_safety} />
                  <InfoField label="Emergency Preparedness" value={company.emergency_preparedness} />
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 7: Financials */}
          <section id="financials">
            <Card>
              <CardHeader>
                <CardTitle>Financials, Risk & Stability</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <InfoField label="Annual Revenue" value={company.annual_revenue} />
                  <InfoField label="Annual Profit" value={company.annual_profit} />
                  <InfoField label="Revenue Mix" value={company.revenue_mix} />
                  <InfoField label="Valuation" value={company.valuation} />
                  <InfoField label="YoY Growth Rate" value={company.yoy_growth_rate} />
                  <InfoField label="Profitability Status" value={company.profitability_status} />
                  <InfoField label="Key Investors" value={company.key_investors} />
                  <InfoField label="Recent Funding Rounds" value={company.recent_funding_rounds} />
                  <InfoField label="Total Capital Raised" value={company.total_capital_raised} />
                  <InfoField label="Burn Rate" value={company.burn_rate} />
                  <InfoField label="Runway (months)" value={company.runway_months} />
                  <InfoField label="Burn Multiplier" value={company.burn_multiplier} />
                  <InfoField label="ESG Ratings" value={company.esg_ratings} />
                  <InfoField label="Regulatory Status" value={company.regulatory_status} />
                  <InfoField label="Legal Issues" value={company.legal_issues} />
                  <InfoField label="Supply Chain Dependencies" value={company.supply_chain_dependencies} />
                  <InfoField label="Geopolitical Risks" value={company.geopolitical_risks} />
                  <InfoField label="Macro Risks" value={company.macro_risks} />
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 8: Technology */}
          <section id="technology">
            <Card>
              <CardHeader>
                <CardTitle>Technology & Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <InfoField label="Tech Stack" value={company.tech_stack} />
                  <InfoField label="Technology Partners" value={company.technology_partners} />
                  <InfoField label="Intellectual Property" value={company.intellectual_property} />
                  <InfoField label="R&D Investment" value={company.r_and_d_investment} />
                  <InfoField label="AI/ML Adoption Level" value={company.ai_ml_adoption_level} />
                  <InfoField label="Cybersecurity Posture" value={company.cybersecurity_posture} />
                  <InfoField label="Innovation Roadmap" value={company.innovation_roadmap} />
                  <InfoField label="Product Pipeline" value={company.product_pipeline} />
                  <InfoField label="Tech Adoption Rating" value={company.tech_adoption_rating} />
                  <InfoField label="Partnership Ecosystem" value={company.partnership_ecosystem} />
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 9: Leadership */}
          <section id="leadership">
            <Card>
              <CardHeader>
                <CardTitle>Leadership & Contacts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoField label="CEO Name" value={company.ceo_name} />
                  <InfoField label="CEO LinkedIn" value={company.ceo_linkedin_url} />
                  <InfoField label="Key Leaders" value={company.key_leaders} />
                  <InfoField label="Board Members" value={company.board_members} />
                  <InfoField label="Warm Intro Pathways" value={company.warm_intro_pathways} />
                  <InfoField label="Decision Maker Access" value={company.decision_maker_access} />
                </div>
                <div className="border-t border-border mt-4 pt-4">
                  <h4 className="text-sm font-medium mb-3">Contact Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoField label="Contact Person" value={company.contact_person_name} />
                    <InfoField label="Title" value={company.contact_person_title} />
                    <InfoField label="Email" value={company.contact_person_email} icon={Mail} />
                    <InfoField label="Phone" value={company.contact_person_phone} icon={Phone} />
                    <InfoField label="Company Email" value={company.primary_contact_email} icon={Mail} />
                    <InfoField label="Company Phone" value={company.primary_phone_number} icon={Phone} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 10: Brand & Digital */}
          <section id="brand">
            <Card>
              <CardHeader>
                <CardTitle>Brand & Digital Presence</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <InfoField label="Website Quality" value={company.website_quality} />
                  <InfoField label="Website Rating" value={company.website_rating} />
                  <InfoField label="Website Traffic Rank" value={company.website_traffic_rank} />
                  <InfoField label="Social Media Followers" value={company.social_media_followers} />
                  <InfoField label="Glassdoor Rating" value={company.glassdoor_rating} />
                  <InfoField label="Indeed Rating" value={company.indeed_rating} />
                  <InfoField label="Google Rating" value={company.google_rating} />
                  <InfoField label="Brand Sentiment" value={company.brand_sentiment_score} />
                  <InfoField label="Awards & Recognitions" value={company.awards_recognitions} />
                  <InfoField label="Event Participation" value={company.event_participation} />
                  <InfoField label="Customer Testimonials" value={company.customer_testimonials} />
                </div>

                {/* Social Links */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                  {company.linkedin_url && (
                    <Button asChild variant="outline" size="sm">
                      <a href={company.linkedin_url} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-4 w-4 mr-2" />
                        LinkedIn
                      </a>
                    </Button>
                  )}
                  {company.twitter_handle && (
                    <Button asChild variant="outline" size="sm">
                      <a href={`https://twitter.com/${company.twitter_handle.replace("@", "")}`} target="_blank" rel="noopener noreferrer">
                        <Twitter className="h-4 w-4 mr-2" />
                        Twitter
                      </a>
                    </Button>
                  )}
                  {company.facebook_url && (
                    <Button asChild variant="outline" size="sm">
                      <a href={company.facebook_url} target="_blank" rel="noopener noreferrer">
                        <Facebook className="h-4 w-4 mr-2" />
                        Facebook
                      </a>
                    </Button>
                  )}
                  {company.instagram_url && (
                    <Button asChild variant="outline" size="sm">
                      <a href={company.instagram_url} target="_blank" rel="noopener noreferrer">
                        <Instagram className="h-4 w-4 mr-2" />
                        Instagram
                      </a>
                    </Button>
                  )}
                  {company.marketing_video_url && (
                    <Button asChild variant="outline" size="sm">
                      <a href={company.marketing_video_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Marketing Video
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </MainLayout>
  );
}
