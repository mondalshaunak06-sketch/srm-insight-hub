import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full dark">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="h-14 flex items-center border-b border-border px-4 sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
            <SidebarTrigger className="mr-4" />
            <div className="flex items-center gap-2">
              <span className="font-semibold text-lg text-gradient">SRM</span>
              <span className="text-muted-foreground text-sm">Placement Intelligence</span>
            </div>
          </header>
          <main className="flex-1 p-6">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
