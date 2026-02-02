import { useState, useMemo } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useCompaniesForSkillMatch } from "@/hooks/useCompanies";
import { X, Plus, Building2, TrendingUp, AlertCircle } from "lucide-react";
import type { SkillMatchResult } from "@/types/company";
import { Link } from "react-router-dom";

const commonSkills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "Python",
  "Java",
  "SQL",
  "AWS",
  "Azure",
  "Docker",
  "Kubernetes",
  "Machine Learning",
  "Data Analytics",
  "DevOps",
  "Git",
  "REST APIs",
  "GraphQL",
  "MongoDB",
  "PostgreSQL",
  "Agile",
];

export default function SkillMapping() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [customSkill, setCustomSkill] = useState("");

  const { data: companies, isLoading } = useCompaniesForSkillMatch();

  const addSkill = (skill: string) => {
    if (skill && !selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
    setCustomSkill("");
  };

  const removeSkill = (skill: string) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill));
  };

  const matchResults = useMemo((): SkillMatchResult[] => {
    if (!companies || selectedSkills.length === 0) return [];

    return companies
      .map((company) => {
        const techStack = company.tech_stack?.toLowerCase() || "";
        const aiMl = company.ai_ml_adoption_level?.toLowerCase() || "";
        const automation = company.automation_level?.toLowerCase() || "";
        const skillRelevance = company.skill_relevance?.toLowerCase() || "";

        const allCompanyText = `${techStack} ${aiMl} ${automation} ${skillRelevance}`;

        const matchedSkills: string[] = [];
        const gaps: string[] = [];

        selectedSkills.forEach((skill) => {
          if (allCompanyText.includes(skill.toLowerCase())) {
            matchedSkills.push(skill);
          } else {
            gaps.push(skill);
          }
        });

        const matchRatio = matchedSkills.length / selectedSkills.length;
        let fitScore: "High" | "Medium" | "Low";
        if (matchRatio >= 0.7) {
          fitScore = "High";
        } else if (matchRatio >= 0.4) {
          fitScore = "Medium";
        } else {
          fitScore = "Low";
        }

        // Generate focus areas based on company's tech profile
        const focusAreas: string[] = [];
        if (aiMl.includes("high") || aiMl.includes("advanced")) {
          focusAreas.push("AI/ML skills highly valued");
        }
        if (automation.includes("high")) {
          focusAreas.push("Automation expertise needed");
        }
        if (techStack.includes("cloud") || techStack.includes("aws") || techStack.includes("azure")) {
          focusAreas.push("Cloud platform knowledge important");
        }

        return {
          company: {
            id: company.id,
            name: company.name,
            short_name: company.short_name,
            logo_url: company.logo_url,
            category: company.category,
            employee_size: company.employee_size,
            focus_sectors: company.focus_sectors,
            hiring_velocity: company.hiring_velocity,
            profitability_status: company.profitability_status,
            remote_policy_details: null,
            yoy_growth_rate: null,
            brand_value: null,
          },
          fitScore,
          matchedSkills,
          gaps,
          focusAreas,
        };
      })
      .filter((result) => result.matchedSkills.length > 0)
      .sort((a, b) => {
        const scoreOrder = { High: 3, Medium: 2, Low: 1 };
        return scoreOrder[b.fitScore] - scoreOrder[a.fitScore];
      });
  }, [companies, selectedSkills]);

  const getFitScoreColor = (score: "High" | "Medium" | "Low") => {
    switch (score) {
      case "High":
        return "bg-success/20 text-success border-success/30";
      case "Medium":
        return "bg-warning/20 text-warning border-warning/30";
      case "Low":
        return "bg-destructive/20 text-destructive border-destructive/30";
    }
  };

  return (
    <MainLayout>
      <PageHeader
        title="Skill Mapping"
        description="Enter your skills to find companies that match your profile"
      />

      {/* Skill Input Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-lg">Your Skills</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Selected Skills */}
          <div className="flex flex-wrap gap-2 min-h-[40px]">
            {selectedSkills.length === 0 ? (
              <p className="text-sm text-muted-foreground">No skills selected yet</p>
            ) : (
              selectedSkills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="pl-3 pr-1 py-1.5 text-sm"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    className="ml-2 hover:bg-muted rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))
            )}
          </div>

          {/* Custom Skill Input */}
          <div className="flex gap-2">
            <Input
              placeholder="Add a custom skill..."
              value={customSkill}
              onChange={(e) => setCustomSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addSkill(customSkill);
                }
              }}
              className="max-w-xs"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => addSkill(customSkill)}
              disabled={!customSkill.trim()}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>

          {/* Common Skills */}
          <div>
            <p className="text-sm text-muted-foreground mb-2">Common Skills (click to add):</p>
            <div className="flex flex-wrap gap-2">
              {commonSkills
                .filter((skill) => !selectedSkills.includes(skill))
                .map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="cursor-pointer hover:bg-muted transition-colors"
                    onClick={() => addSkill(skill)}
                  >
                    {skill}
                  </Badge>
                ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      {selectedSkills.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Matching Companies</h2>
            <p className="text-sm text-muted-foreground">
              {matchResults.length} companies match your skills
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-48" />
              ))}
            </div>
          ) : matchResults.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium mb-1">No Matching Companies</h3>
                <p className="text-sm text-muted-foreground">
                  No companies in the database match your selected skills.
                  <br />
                  Try adding different skills or fewer criteria.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {matchResults.map((result) => (
                <Link key={result.company.id} to={`/company/${result.company.id}`}>
                  <Card className="h-full hover:border-primary/50 transition-all duration-200">
                    <CardContent className="pt-6 space-y-4">
                      {/* Company Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          {result.company.logo_url ? (
                            <img
                              src={result.company.logo_url}
                              alt={`${result.company.name} logo`}
                              className="w-10 h-10 rounded-lg object-contain bg-muted p-1"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                              <Building2 className="h-5 w-5 text-muted-foreground" />
                            </div>
                          )}
                          <div>
                            <p className="font-semibold">{result.company.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {result.company.category}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className={getFitScoreColor(result.fitScore)}
                        >
                          <TrendingUp className="h-3 w-3 mr-1" />
                          {result.fitScore} Fit
                        </Badge>
                      </div>

                      {/* Matched Skills */}
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Matched Skills</p>
                        <div className="flex flex-wrap gap-1">
                          {result.matchedSkills.map((skill) => (
                            <Badge
                              key={skill}
                              variant="outline"
                              className="text-xs bg-success/10 text-success border-success/30"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Skill Gaps */}
                      {result.gaps.length > 0 && (
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Skill Gaps</p>
                          <div className="flex flex-wrap gap-1">
                            {result.gaps.map((skill) => (
                              <Badge
                                key={skill}
                                variant="outline"
                                className="text-xs bg-warning/10 text-warning border-warning/30"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Focus Areas */}
                      {result.focusAreas.length > 0 && (
                        <div className="text-xs text-muted-foreground">
                          <p className="font-medium mb-1">Preparation Focus:</p>
                          <ul className="list-disc list-inside">
                            {result.focusAreas.map((area, i) => (
                              <li key={i}>{area}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {selectedSkills.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-1">Enter Your Skills</h3>
          <p className="text-sm text-muted-foreground">
            Select or add skills above to find matching companies
          </p>
        </div>
      )}
    </MainLayout>
  );
}
