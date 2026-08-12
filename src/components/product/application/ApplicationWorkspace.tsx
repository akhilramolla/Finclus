import {ApplicationNav} from "@/components/product/ApplicationNav";
import {CaseHeader} from "@/components/product/CaseHeader";

export function ApplicationWorkspace({
  stage,
  action,
  children,
}: {
  stage: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return <div className="space-y-4 pb-16 lg:pb-4">
    <CaseHeader stage={stage} action={action}/>
    <ApplicationNav/>
    {children}
  </div>;
}
