import { Link } from "react-router-dom";
import { Building2, Users, TrendingUp, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { CompanyCardData } from "@/types/company";

interface CompanyCardProps {
  company: CompanyCardData;
}

export function CompanyCard({ company }: CompanyCardProps) {
  const getCategoryColor = (category: string | null) => {
    switch (category?.toLowerCase()) {
      case "enterprise":
        return "bg-primary/20 text-primary border-primary/30";
      case "product":
        return "bg-chart-2/20 text-chart-2 border-chart-2/30";
      case "service":
        return "bg-chart-3/20 text-chart-3 border-chart-3/30";
      case "startup":
      case "scale-up":
        return "bg-chart-4/20 text-chart-4 border-chart-4/30";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getProfitabilityColor = (status: string | null) => {
    if (!status) return "";
    return status.toLowerCase().includes("profitable")
      ? "text-success"
      : "text-warning";
  };

  const formatEmployeeSize = (size: number | null) => {
    if (!size) return "—";
    if (size >= 100000) return `${(size / 1000).toFixed(0)}K+`;
    if (size >= 1000) return `${(size / 1000).toFixed(1)}K`;
    return size.toString();
  };

  return (
    <Link to={`/company/${company.id}`}>
      <Card className="h-full hover:border-primary/50 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5 group">
        <CardHeader className="pb-3">
          <div className="flex items-start gap-3">
            {company.logo_url ? (
              <img
                src={company.logo_url}
                alt={`${company.name} logo`}
                className="w-12 h-12 rounded-lg object-contain bg-muted p-1"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.nextElementSibling?.classList.remove("hidden");
                }}
              />
            ) : null}
            <div
              className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center ${
                company.logo_url ? "hidden" : ""
              }`}
            >
              <Building2 className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                {company.name}
              </h3>
              {company.short_name && (
                <p className="text-sm text-muted-foreground">{company.short_name}</p>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {company.category && (
              <Badge variant="outline" className={getCategoryColor(company.category)}>
                {company.category}
              </Badge>
            )}
            {company.profitability_status && (
              <Badge variant="outline" className={getProfitabilityColor(company.profitability_status)}>
                {company.profitability_status}
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Users className="h-3.5 w-3.5" />
              <span>{formatEmployeeSize(company.employee_size)}</span>
            </div>
            {company.yoy_growth_rate && (
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <TrendingUp className="h-3.5 w-3.5" />
                <span>{company.yoy_growth_rate}</span>
              </div>
            )}
          </div>

          {company.focus_sectors && (
            <p className="text-xs text-muted-foreground line-clamp-2">
              {company.focus_sectors}
            </p>
          )}

          {company.hiring_velocity && (
            <div className="flex items-center gap-1.5 text-xs">
              <MapPin className="h-3 w-3 text-primary" />
              <span className="text-muted-foreground line-clamp-1">
                {company.hiring_velocity.split(";")[0]}
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
