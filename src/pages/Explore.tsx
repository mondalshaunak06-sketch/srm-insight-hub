import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { CompanyGrid } from "@/components/companies/CompanyGrid";
import { CompanyFilters } from "@/components/companies/CompanyFilters";
import { SearchBar } from "@/components/companies/SearchBar";
import { useCompanies } from "@/hooks/useCompanies";
import type { CompanyFilters as Filters, CompanySort } from "@/types/company";

export default function Explore() {
  const [filters, setFilters] = useState<Filters>({});
  const [sort, setSort] = useState<CompanySort>({ field: "name", direction: "asc" });

  const { data: companies, isLoading } = useCompanies(filters, sort);

  const handleReset = () => {
    setFilters({});
    setSort({ field: "name", direction: "asc" });
  };

  return (
    <MainLayout>
      <PageHeader
        title="Explore Companies"
        description="Browse and filter all companies in the placement database"
      >
        <SearchBar />
      </PageHeader>

      <div className="space-y-6">
        <CompanyFilters
          filters={filters}
          sort={sort}
          onFilterChange={setFilters}
          onSortChange={setSort}
          onReset={handleReset}
        />

        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {isLoading ? "Loading..." : `${companies?.length || 0} companies found`}
          </p>
        </div>

        <CompanyGrid
          companies={companies}
          isLoading={isLoading}
          emptyMessage="No companies match your filters"
        />
      </div>
    </MainLayout>
  );
}
