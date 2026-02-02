import { useSearchParams, Link } from "react-router-dom";
import { Building2, Users, Briefcase, TrendingUp } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { CompanyGrid } from "@/components/companies/CompanyGrid";
import { Card, CardContent } from "@/components/ui/card";
import { useCompaniesByCategory, useCompanyCounts } from "@/hooks/useCompanies";
import { cn } from "@/lib/utils";

const categories = [
  {
    id: "Enterprise",
    title: "Enterprise",
    description: "Large corporations with established processes and global presence",
    icon: Building2,
    color: "bg-primary/20 text-primary border-primary/30",
  },
  {
    id: "Product",
    title: "Product Companies",
    description: "Companies building and selling software or hardware products",
    icon: Briefcase,
    color: "bg-chart-2/20 text-chart-2 border-chart-2/30",
  },
  {
    id: "Service",
    title: "Service Companies",
    description: "IT services, consulting, and professional services firms",
    icon: Users,
    color: "bg-chart-3/20 text-chart-3 border-chart-3/30",
  },
  {
    id: "Startup",
    title: "Startups & Scale-ups",
    description: "High-growth emerging companies with innovative solutions",
    icon: TrendingUp,
    color: "bg-chart-4/20 text-chart-4 border-chart-4/30",
  },
];

export default function Categories() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("type") || "";

  const { data: counts } = useCompanyCounts();
  const { data: companies, isLoading } = useCompaniesByCategory(selectedCategory);

  const handleCategorySelect = (categoryId: string) => {
    if (categoryId === selectedCategory) {
      searchParams.delete("type");
    } else {
      searchParams.set("type", categoryId);
    }
    setSearchParams(searchParams);
  };

  return (
    <MainLayout>
      <PageHeader
        title="Categories"
        description="Browse companies by category type"
      />

      {/* Category Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {categories.map((category) => (
          <Card
            key={category.id}
            className={cn(
              "cursor-pointer transition-all duration-200 hover:shadow-lg",
              selectedCategory === category.id
                ? "border-primary ring-1 ring-primary"
                : "hover:border-primary/50"
            )}
            onClick={() => handleCategorySelect(category.id)}
          >
            <CardContent className="pt-6">
              <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center mb-4", category.color)}>
                <category.icon className="h-6 w-6" />
              </div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold">{category.title}</h3>
                <span className="text-sm font-medium text-muted-foreground">
                  {counts?.[category.id] || 0}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{category.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Company List */}
      {selectedCategory ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              {categories.find((c) => c.id === selectedCategory)?.title} Companies
            </h2>
            <p className="text-sm text-muted-foreground">
              {companies?.length || 0} companies
            </p>
          </div>
          <CompanyGrid
            companies={companies}
            isLoading={isLoading}
            emptyMessage={`No ${selectedCategory} companies found`}
          />
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Select a category above to view companies</p>
        </div>
      )}
    </MainLayout>
  );
}
