import getCurrentUser from "@/app/actions/getCurrentUser";

import DesktopSidebar from "./DesktopSidebar";
import MobileFooter from "./MobileFooter";
import { listLanguages } from "@/app/actions/getTranslation";

async function Sidebar({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser();
  const languages = await listLanguages();

  return (
    <div className="h-full">
      <DesktopSidebar currentUser={currentUser!} languages={languages} />
      <MobileFooter />
      <main className="lg:pl-20 h-full">{children}</main>
    </div>
  );
}

export default Sidebar;
