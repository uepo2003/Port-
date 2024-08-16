import { DashboardNav } from "@/components/DashboardNav";
import { MainNav } from "@/components/MainNav";
import { SignOut } from "@/components/SignOut";
import { SiteFooter } from "@/components/SiteFooter";

import { dashboardConfig } from "@/config/dashboard";

const ArticleLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col space-y-6 min-h-screen">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav items={dashboardConfig.mainNav} isLoggedin={true} />
          <SignOut />
        </div>
      </header>
      <div className="flex-grow">
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      <SiteFooter className="border-t" />
    </div>
  );
};

export default ArticleLayout;
