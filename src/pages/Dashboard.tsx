import { Link } from "react-router-dom";
import { Building2, Users, TrendingUp, Briefcase, Search, ArrowRight } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SearchBar } from "@/components/companies/SearchBar";
import { useCompanyCounts, useCompanyAnalytics } from "@/hooks/useCompanies";
import { Skeleton } from "@/components/ui/skeleton";

const categoryCards = [
  {
    title: "Enterprise",
    description: "Large corporations with established processes",
    icon: Building2,
    color: "bg-primary/20 text-primary",
    href: "/categories?type=Enterprise",
  },
  {
    title: "Product Companies",
    description: "Companies building and selling products",
    icon: Briefcase,
    color: "bg-chart-2/20 text-chart-2",
    href: "/categories?type=Product",
  },
  {
    title: "Service Companies",
    description: "IT services and consulting firms",
    icon: Users,
    color: "bg-chart-3/20 text-chart-3",
    href: "/categories?type=Service",
  },
  {
    title: "Startups & Scale-ups",
    description: "High-growth emerging companies",
    icon: TrendingUp,
    color: "bg-chart-4/20 text-chart-4",
    href: "/categories?type=Startup",
  },
];

export default function Dashboard() {
  const { data: counts, isLoading: countsLoading } = useCompanyCounts();
  const { data: analytics, isLoading: analyticsLoading } = useCompanyAnalytics();

  return (
    <MainLayout>
      <PageHeader
        title="Welcome to SRM Placement Intelligence"
        description="Analyze companies, compare opportunities, and make data-driven career decisions"
      />

      {/* Search Section */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-6 border border-border">
          <h2 className="text-lg font-semibold mb-2">Find Your Target Companies</h2>
          <p className="text-muted-foreground text-sm mb-4">
            Search by company name, industry sectors, or technology stack
          </p>
          <SearchBar />
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Companies
            </CardTitle>
          </CardHeader>
          <CardContent>
            {countsLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <p className="text-3xl font-bold">{counts?.total || 0}</p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Enterprise
            </CardTitle>
          </CardHeader>
          <CardContent>
            {countsLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <p className="text-3xl font-bold text-primary">{counts?.Enterprise || 0}</p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Product
            </CardTitle>
          </CardHeader>
          <CardContent>
            {countsLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <p className="text-3xl font-bold text-chart-2">{counts?.Product || 0}</p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Service
            </CardTitle>
          </CardHeader>
          <CardContent>
            {countsLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <p className="text-3xl font-bold text-chart-3">{counts?.Service || 0}</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Category Cards */}
      <h2 className="text-lg font-semibold mb-4">Explore by Category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {categoryCards.map((card) => (
          <Link key={card.title} to={card.href}>
            <Card className="h-full hover:border-primary/50 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5 group cursor-pointer">
              <CardContent className="pt-6">
                <div className={`w-12 h-12 rounded-lg ${card.color} flex items-center justify-center mb-4`}>
                  <card.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm text-muted-foreground">{card.description}</p>
                <div className="flex items-center gap-1 mt-3 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Explore</span>
                  <ArrowRight className="h-3 w-3" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Insights Section */}
      <h2 className="text-lg font-semibold mb-4">Quick Insights</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Profitability Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            {analyticsLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ) : analytics?.profitabilityMix ? (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Profitable</span>
                  <span className="font-medium text-success">
                    {analytics.profitabilityMix.Profitable || 0}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Non-Profitable</span>
                  <span className="font-medium text-warning">
                    {analytics.profitabilityMix["Non-Profitable"] || 0}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No data available</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Remote/Hybrid/On-site Mix</CardTitle>
          </CardHeader>
          <CardContent>
            {analyticsLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ) : analytics?.remotePolicyMix ? (
              <div className="space-y-2">
                {Object.entries(analytics.remotePolicyMix).map(([policy, count]) => (
                  <div key={policy} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{policy}</span>
                    <span className="font-medium">{count}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No data available</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Hiring Velocity</CardTitle>
          </CardHeader>
          <CardContent>
            {analyticsLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ) : analytics?.hiringVelocityTrends ? (
              <div className="space-y-2">
                {Object.entries(analytics.hiringVelocityTrends).map(([level, count]) => (
                  <div key={level} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{level}</span>
                    <span className="font-medium">{count}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No data available</p>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
