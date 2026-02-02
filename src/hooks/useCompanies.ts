import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Company, CompanyCardData, CompanyFilters, CompanySort } from "@/types/company";

// Fetch all companies for list views
export function useCompanies(filters?: CompanyFilters, sort?: CompanySort) {
  return useQuery({
    queryKey: ["companies", filters, sort],
    queryFn: async () => {
      let query = supabase
        .from("company")
        .select(`
          id,
          name,
          short_name,
          logo_url,
          category,
          employee_size,
          focus_sectors,
          hiring_velocity,
          profitability_status,
          remote_policy_details,
          yoy_growth_rate,
          brand_value
        `);

      // Apply filters
      if (filters?.category) {
        query = query.eq("category", filters.category);
      }
      if (filters?.profitability_status) {
        query = query.eq("profitability_status", filters.profitability_status);
      }
      if (filters?.remote_policy_details) {
        query = query.ilike("remote_policy_details", `%${filters.remote_policy_details}%`);
      }
      if (filters?.focus_sectors) {
        query = query.ilike("focus_sectors", `%${filters.focus_sectors}%`);
      }
      if (filters?.hiring_velocity) {
        query = query.ilike("hiring_velocity", `%${filters.hiring_velocity}%`);
      }

      // Apply sorting
      if (sort?.field) {
        query = query.order(sort.field, { ascending: sort.direction === "asc" });
      } else {
        query = query.order("name", { ascending: true });
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as CompanyCardData[];
    },
  });
}

// Fetch single company with all fields
export function useCompany(id: string) {
  return useQuery({
    queryKey: ["company", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("company")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) throw error;
      return data as Company | null;
    },
    enabled: !!id,
  });
}

// Fetch companies by category
export function useCompaniesByCategory(category: string) {
  return useQuery({
    queryKey: ["companies", "category", category],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("company")
        .select(`
          id,
          name,
          short_name,
          logo_url,
          category,
          employee_size,
          focus_sectors,
          hiring_velocity,
          profitability_status,
          remote_policy_details,
          yoy_growth_rate,
          brand_value
        `)
        .eq("category", category)
        .order("name", { ascending: true });

      if (error) throw error;
      return data as CompanyCardData[];
    },
    enabled: !!category,
  });
}

// Fetch company count by category
export function useCompanyCounts() {
  return useQuery({
    queryKey: ["company-counts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("company")
        .select("category");

      if (error) throw error;

      const counts: Record<string, number> = {
        total: data.length,
        Enterprise: 0,
        Product: 0,
        Service: 0,
        Startup: 0,
      };

      data.forEach((company) => {
        if (company.category && counts.hasOwnProperty(company.category)) {
          counts[company.category]++;
        }
      });

      return counts;
    },
  });
}

// Search companies by name, focus sectors, or tech stack
export function useCompanySearch(searchTerm: string) {
  return useQuery({
    queryKey: ["companies", "search", searchTerm],
    queryFn: async () => {
      if (!searchTerm.trim()) {
        return [];
      }

      const { data, error } = await supabase
        .from("company")
        .select(`
          id,
          name,
          short_name,
          logo_url,
          category,
          employee_size,
          focus_sectors,
          hiring_velocity,
          profitability_status,
          tech_stack
        `)
        .or(
          `name.ilike.%${searchTerm}%,focus_sectors.ilike.%${searchTerm}%,tech_stack.ilike.%${searchTerm}%`
        )
        .limit(20);

      if (error) throw error;
      return data;
    },
    enabled: searchTerm.trim().length > 0,
  });
}

// Fetch companies for comparison
export function useCompaniesForComparison(ids: string[]) {
  return useQuery({
    queryKey: ["companies", "comparison", ids],
    queryFn: async () => {
      if (ids.length === 0) return [];

      const { data, error } = await supabase
        .from("company")
        .select("*")
        .in("id", ids);

      if (error) throw error;
      return data as Company[];
    },
    enabled: ids.length > 0,
  });
}

// Fetch companies for skill matching
export function useCompaniesForSkillMatch() {
  return useQuery({
    queryKey: ["companies", "skill-match"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("company")
        .select(`
          id,
          name,
          short_name,
          logo_url,
          category,
          employee_size,
          focus_sectors,
          hiring_velocity,
          profitability_status,
          tech_stack,
          ai_ml_adoption_level,
          automation_level,
          skill_relevance
        `)
        .order("name", { ascending: true });

      if (error) throw error;
      return data;
    },
  });
}

// Analytics data
export function useCompanyAnalytics() {
  return useQuery({
    queryKey: ["company-analytics"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("company")
        .select(`
          category,
          profitability_status,
          remote_policy_details,
          hiring_velocity,
          nature_of_company
        `);

      if (error) throw error;

      // Process data for analytics
      const categoryDistribution: Record<string, number> = {};
      const profitabilityMix: Record<string, number> = { Profitable: 0, "Non-Profitable": 0 };
      const remotePolicyMix: Record<string, number> = { Remote: 0, Hybrid: 0, "On-site": 0 };
      const hiringVelocityTrends: Record<string, number> = {};

      data.forEach((company) => {
        // Category distribution
        if (company.category) {
          categoryDistribution[company.category] = (categoryDistribution[company.category] || 0) + 1;
        }

        // Profitability
        if (company.profitability_status?.toLowerCase().includes("profitable")) {
          profitabilityMix["Profitable"]++;
        } else if (company.profitability_status) {
          profitabilityMix["Non-Profitable"]++;
        }

        // Remote policy
        if (company.remote_policy_details) {
          const policy = company.remote_policy_details.toLowerCase();
          if (policy.includes("remote")) remotePolicyMix["Remote"]++;
          else if (policy.includes("hybrid")) remotePolicyMix["Hybrid"]++;
          else remotePolicyMix["On-site"]++;
        }

        // Hiring velocity (simplified parsing)
        if (company.hiring_velocity) {
          const velocity = company.hiring_velocity.toLowerCase();
          if (velocity.includes("high") || velocity.includes("500+")) {
            hiringVelocityTrends["High"] = (hiringVelocityTrends["High"] || 0) + 1;
          } else if (velocity.includes("moderate") || velocity.includes("100-500")) {
            hiringVelocityTrends["Moderate"] = (hiringVelocityTrends["Moderate"] || 0) + 1;
          } else {
            hiringVelocityTrends["Low"] = (hiringVelocityTrends["Low"] || 0) + 1;
          }
        }
      });

      return {
        categoryDistribution,
        profitabilityMix,
        remotePolicyMix,
        hiringVelocityTrends,
        totalCompanies: data.length,
      };
    },
  });
}
