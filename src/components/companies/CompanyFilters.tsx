import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import type { CompanyFilters as Filters, CompanySort, CompanySortField, SortDirection } from "@/types/company";

interface CompanyFiltersProps {
  filters: Filters;
  sort: CompanySort;
  onFilterChange: (filters: Filters) => void;
  onSortChange: (sort: CompanySort) => void;
  onReset: () => void;
}

const categories = ["Enterprise", "Product", "Service", "Startup", "Scale-up"];
const profitabilityStatuses = ["Profitable", "Non-Profitable"];
const remotePolicies = ["Remote", "Hybrid", "On-site"];
const sortFields: { value: CompanySortField; label: string }[] = [
  { value: "name", label: "Name" },
  { value: "employee_size", label: "Employee Size" },
  { value: "yoy_growth_rate", label: "YoY Growth" },
  { value: "brand_value", label: "Brand Value" },
];

export function CompanyFilters({
  filters,
  sort,
  onFilterChange,
  onSortChange,
  onReset,
}: CompanyFiltersProps) {
  const hasActiveFilters = Object.values(filters).some((v) => v);

  return (
    <div className="flex flex-wrap items-center gap-3 p-4 bg-card rounded-lg border border-border">
      <Select
        value={filters.category || ""}
        onValueChange={(value) =>
          onFilterChange({ ...filters, category: value || undefined })
        }
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.profitability_status || ""}
        onValueChange={(value) =>
          onFilterChange({ ...filters, profitability_status: value || undefined })
        }
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Profitability" />
        </SelectTrigger>
        <SelectContent>
          {profitabilityStatuses.map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.remote_policy_details || ""}
        onValueChange={(value) =>
          onFilterChange({ ...filters, remote_policy_details: value || undefined })
        }
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Work Policy" />
        </SelectTrigger>
        <SelectContent>
          {remotePolicies.map((policy) => (
            <SelectItem key={policy} value={policy}>
              {policy}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex-1" />

      <Select
        value={sort.field}
        onValueChange={(value) =>
          onSortChange({ ...sort, field: value as CompanySortField })
        }
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          {sortFields.map((field) => (
            <SelectItem key={field.value} value={field.value}>
              {field.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={sort.direction}
        onValueChange={(value) =>
          onSortChange({ ...sort, direction: value as SortDirection })
        }
      >
        <SelectTrigger className="w-[100px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">Asc</SelectItem>
          <SelectItem value="desc">Desc</SelectItem>
        </SelectContent>
      </Select>

      {hasActiveFilters && (
        <Button variant="ghost" size="sm" onClick={onReset}>
          <X className="h-4 w-4 mr-1" />
          Clear
        </Button>
      )}
    </div>
  );
}
