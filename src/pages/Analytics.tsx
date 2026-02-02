import { MainLayout } from "@/components/layout/MainLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCompanyAnalytics, useCompanyCounts } from "@/hooks/useCompanies";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "hsl(218, 84%, 51%)", // primary
  "hsl(160, 60%, 45%)", // chart-2
  "hsl(30, 80%, 55%)",  // chart-3
  "hsl(280, 60%, 55%)", // chart-4
  "hsl(340, 75%, 55%)", // chart-5
];

export default function Analytics() {
  const { data: analytics, isLoading: analyticsLoading } = useCompanyAnalytics();
  const { data: counts, isLoading: countsLoading } = useCompanyCounts();

  const isLoading = analyticsLoading || countsLoading;

  // Prepare chart data
  const categoryData = analytics?.categoryDistribution
    ? Object.entries(analytics.categoryDistribution).map(([name, value]) => ({
        name,
        value,
      }))
    : [];

  const profitabilityData = analytics?.profitabilityMix
    ? Object.entries(analytics.profitabilityMix).map(([name, value]) => ({
        name,
        value,
      }))
    : [];

  const remotePolicyData = analytics?.remotePolicyMix
    ? Object.entries(analytics.remotePolicyMix).map(([name, value]) => ({
        name,
        value,
      }))
    : [];

  const hiringVelocityData = analytics?.hiringVelocityTrends
    ? Object.entries(analytics.hiringVelocityTrends).map(([name, value]) => ({
        name,
        value,
      }))
    : [];

  return (
    <MainLayout>
      <PageHeader
        title="Analytics & Insights"
        description="Visual analysis of company data and placement trends"
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total Companies</p>
            {isLoading ? (
              <Skeleton className="h-8 w-16 mt-1" />
            ) : (
              <p className="text-3xl font-bold">{counts?.total || 0}</p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Enterprise</p>
            {isLoading ? (
              <Skeleton className="h-8 w-16 mt-1" />
            ) : (
              <p className="text-3xl font-bold text-primary">{counts?.Enterprise || 0}</p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Product Companies</p>
            {isLoading ? (
              <Skeleton className="h-8 w-16 mt-1" />
            ) : (
              <p className="text-3xl font-bold text-chart-2">{counts?.Product || 0}</p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Service Companies</p>
            {isLoading ? (
              <Skeleton className="h-8 w-16 mt-1" />
            ) : (
              <p className="text-3xl font-bold text-chart-3">{counts?.Service || 0}</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Company Distribution by Category</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-64 w-full" />
            ) : categoryData.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(222, 47%, 8%)",
                      border: "1px solid hsl(217, 32%, 17%)",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                No data available
              </div>
            )}
          </CardContent>
        </Card>

        {/* Profitability Mix */}
        <Card>
          <CardHeader>
            <CardTitle>Profitability Status</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-64 w-full" />
            ) : profitabilityData.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={profitabilityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    <Cell fill="hsl(160, 60%, 45%)" />
                    <Cell fill="hsl(38, 92%, 50%)" />
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(222, 47%, 8%)",
                      border: "1px solid hsl(217, 32%, 17%)",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                No data available
              </div>
            )}
          </CardContent>
        </Card>

        {/* Remote Policy Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Remote/Hybrid/On-site Mix</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-64 w-full" />
            ) : remotePolicyData.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={remotePolicyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 32%, 17%)" />
                  <XAxis
                    dataKey="name"
                    stroke="hsl(215, 20%, 65%)"
                    fontSize={12}
                  />
                  <YAxis stroke="hsl(215, 20%, 65%)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(222, 47%, 8%)",
                      border: "1px solid hsl(217, 32%, 17%)",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="value" fill="hsl(218, 84%, 51%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                No data available
              </div>
            )}
          </CardContent>
        </Card>

        {/* Hiring Velocity Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Hiring Velocity Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-64 w-full" />
            ) : hiringVelocityData.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={hiringVelocityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 32%, 17%)" />
                  <XAxis
                    dataKey="name"
                    stroke="hsl(215, 20%, 65%)"
                    fontSize={12}
                  />
                  <YAxis stroke="hsl(215, 20%, 65%)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(222, 47%, 8%)",
                      border: "1px solid hsl(217, 32%, 17%)",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="value" fill="hsl(160, 60%, 45%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                No data available
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Insights Summary */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium mb-2">Company Mix</h4>
                <p className="text-sm text-muted-foreground">
                  {counts?.total
                    ? `${counts.Enterprise || 0} Enterprise, ${counts.Product || 0} Product, ${counts.Service || 0} Service, and ${counts.Startup || 0} Startups in the database.`
                    : "No company data available yet."}
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Work Policy Trends</h4>
                <p className="text-sm text-muted-foreground">
                  {analytics?.remotePolicyMix
                    ? `${analytics.remotePolicyMix.Hybrid || 0} companies offer hybrid work, ${analytics.remotePolicyMix.Remote || 0} are fully remote, and ${analytics.remotePolicyMix["On-site"] || 0} require on-site presence.`
                    : "Remote policy data will appear once companies are added."}
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Financial Health</h4>
                <p className="text-sm text-muted-foreground">
                  {analytics?.profitabilityMix
                    ? `${analytics.profitabilityMix.Profitable || 0} companies are profitable, while ${analytics.profitabilityMix["Non-Profitable"] || 0} are in growth phase.`
                    : "Profitability data will appear once companies are added."}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </MainLayout>
  );
}
