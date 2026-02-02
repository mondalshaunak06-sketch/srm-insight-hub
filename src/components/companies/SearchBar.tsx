import { useState, useEffect } from "react";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useCompanySearch } from "@/hooks/useCompanies";
import { Link } from "react-router-dom";

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { data: results, isLoading } = useCompanySearch(debouncedTerm);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search companies, sectors, tech stack..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          className="pl-10 bg-card border-border"
        />
        {isLoading && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
        )}
      </div>

      {isOpen && results && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-popover border border-border rounded-lg shadow-lg z-50 max-h-80 overflow-auto">
          {results.map((company) => (
            <Link
              key={company.id}
              to={`/company/${company.id}`}
              className="flex items-center gap-3 p-3 hover:bg-accent transition-colors"
            >
              {company.logo_url ? (
                <img
                  src={company.logo_url}
                  alt=""
                  className="w-8 h-8 rounded object-contain bg-muted p-0.5"
                />
              ) : (
                <div className="w-8 h-8 rounded bg-muted flex items-center justify-center text-xs font-medium">
                  {company.name.charAt(0)}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{company.name}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {company.category} • {company.focus_sectors?.split(";")[0]}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {isOpen && debouncedTerm && results?.length === 0 && !isLoading && (
        <div className="absolute top-full mt-2 w-full bg-popover border border-border rounded-lg shadow-lg z-50 p-4 text-center text-sm text-muted-foreground">
          No companies found for "{debouncedTerm}"
        </div>
      )}
    </div>
  );
}
