import { Settings } from "../../../components/templates/settings";
import { Suspense } from "react";

export const metadata = {
  title: "Settings",
};

export default function SettingsPage() {  
  return (
    <Suspense>
      <Settings />
    </Suspense>
  );
}
