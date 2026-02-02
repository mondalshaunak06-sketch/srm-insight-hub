import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useCompanies, useCompaniesForComparison } from "@/hooks/useCompanies";
import { Building2, Check, X, Minus } from "lucide-react";

export default function Compare() {
  const [company1Id, setCompany1Id] = useState<string>("");
  const [company2Id, setCompany2Id] = useState<string>("");

  const { data: allCompanies, isLoading: companiesLoading } = useCompanies();
  const { data: selectedCompanies, isLoading: comparisonLoading } = useCompaniesForComparison(
    [company1Id, company2Id].filter(Boolean)
  );

  const company1 = selectedCompanies?.find((c) => c.id === company1Id);
  const company2 = selectedCompanies?.find((c) => c.id === company2Id);

  const comparisonCategories = [
    {
      title: "Culture & Work",
      fields: [
        { key: "work_culture_summary", label: "Work Culture" },
        { key: "manager_quality", label: "Manager Quality" },
        { key: "psychological_safety", label: "Psychological Safety" },
        { key: "feedback_culture", label: "Feedback Culture" },
        { key: "diversity_inclusion_score", label: "D&I Score" },
        { key: "burnout_risk", label: "Burnout Risk" },
      ],
    },
    {
      title: "Compensation",
      fields: [
        { key: "fixed_vs_variable_pay", label: "Pay Structure" },
        { key: "bonus_predictability", label: "Bonus Predictability" },
        { key: "esops_incentives", label: "ESOPs & Incentives" },
        { key: "family_health_insurance", label: "Health Insurance" },
        { key: "relocation_support", label: "Relocation Support" },
        { key: "lifestyle_benefits", label: "Lifestyle Benefits" },
      ],
    },
    {
      title: "Learning & Growth",
      fields: [
        { key: "training_spend", label: "Training Spend" },
        { key: "onboarding_quality", label: "Onboarding Quality" },
        { key: "learning_culture", label: "Learning Culture" },
        { key: "mentorship_availability", label: "Mentorship" },
        { key: "promotion_clarity", label: "Promotion Clarity" },
        { key: "skill_relevance", label: "Skill Relevance" },
      ],
    },
    {
      title: "Financials",
      fields: [
        { key: "annual_revenue", label: "Annual Revenue" },
        { key: "profitability_status", label: "Profitability" },
        { key: "yoy_growth_rate", label: "YoY Growth" },
        { key: "valuation", label: "Valuation" },
        { key: "burn_rate", label: "Burn Rate" },
        { key: "runway_months", label: "Runway" },
      ],
    },
    {
      title: "Technology",
      fields: [
        { key: "tech_stack", label: "Tech Stack" },
        { key: "ai_ml_adoption_level", label: "AI/ML Adoption" },
        { key: "automation_level", label: "Automation Level" },
        { key: "cybersecurity_posture", label: "Cybersecurity" },
        { key: "r_and_d_investment", label: "R&D Investment" },
        { key: "tech_adoption_rating", label: "Tech Rating" },
      ],
    },
    {
      title: "Career Signaling",
      fields: [
        { key: "exit_opportunities", label: "Exit Opportunities" },
        { key: "external_recognition", label: "External Recognition" },
        { key: "network_strength", label: "Network Strength" },
        { key: "global_exposure", label: "Global Exposure" },
        { key: "brand_value", label: "Brand Value" },
        { key: "client_quality", label: "Client Quality" },
      ],
    },
  ];

  const CompanyHeader = ({ company }: { company: any }) => (
    <div className="flex items-center gap-3">
      {company?.logo_url ? (
        <img
          src={company.logo_url}
          alt={`${company.name} logo`}
          className="w-10 h-10 rounded-lg object-contain bg-muted p-1"
        />
      ) : (
        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
          <Building2 className="h-5 w-5 text-muted-foreground" />
        </div>
      )}
      <div>
        <p className="font-semibold">{company?.name || "Select a company"}</p>
        {company?.category && (
          <Badge variant="outline" className="text-xs">
            {company.category}
          </Badge>
        )}
      </div>
    </div>
  );

  const getValue = (company: any, key: string) => {
    if (!company) return null;
    return company[key as keyof typeof company] || null;
  };

  return (
    <MainLayout>
      <PageHeader
        title="Compare Companies"
        description="Side-by-side comparison of two companies across key parameters"
      />

      {/* Company Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Company 1</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={company1Id} onValueChange={setCompany1Id}>
              <SelectTrigger>
                <SelectValue placeholder="Select first company" />
              </SelectTrigger>
              <SelectContent>
                {allCompanies?.map((company) => (
                  <SelectItem
                    key={company.id}
                    value={company.id}
                    disabled={company.id === company2Id}
                  >
                    {company.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {company1 && (
              <div className="mt-4">
                <CompanyHeader company={company1} />
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Company 2</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={company2Id} onValueChange={setCompany2Id}>
              <SelectTrigger>
                <SelectValue placeholder="Select second company" />
              </SelectTrigger>
              <SelectContent>
                {allCompanies?.map((company) => (
                  <SelectItem
                    key={company.id}
                    value={company.id}
                    disabled={company.id === company1Id}
                  >
                    {company.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {company2 && (
              <div className="mt-4">
                <CompanyHeader company={company2} />
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Comparison Tables */}
      {company1Id && company2Id ? (
        comparisonLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-48 w-full" />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {comparisonCategories.map((category) => (
              <Card key={category.title}>
                <CardHeader>
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-2 px-3 text-sm font-medium text-muted-foreground w-1/4">
                            Parameter
                          </th>
                          <th className="text-left py-2 px-3 text-sm font-medium w-[37.5%]">
                            {company1?.name || "Company 1"}
                          </th>
                          <th className="text-left py-2 px-3 text-sm font-medium w-[37.5%]">
                            {company2?.name || "Company 2"}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {category.fields.map((field) => {
                          const val1 = getValue(company1, field.key);
                          const val2 = getValue(company2, field.key);
                          return (
                            <tr key={field.key} className="border-b border-border/50">
                              <td className="py-3 px-3 text-sm text-muted-foreground">
                                {field.label}
                              </td>
                              <td className="py-3 px-3 text-sm">
                                {val1 || (
                                  <span className="text-muted-foreground/50">—</span>
                                )}
                              </td>
                              <td className="py-3 px-3 text-sm">
                                {val2 || (
                                  <span className="text-muted-foreground/50">—</span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )
      ) : (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <Building2 className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-1">Select Two Companies</h3>
          <p className="text-sm text-muted-foreground">
            Choose two companies above to see a detailed side-by-side comparison
          </p>
        </div>
      )}
    </MainLayout>
  );
}
