import { useState } from "react";
import { Bell, LogOut, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { criticalAlerts } from "@/data/mockData";
import logo from "@/assets/logo_pathology.png";

export function TopBar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-border bg-card px-6">
      <div className="flex items-center gap-3">
        <img src={logo} alt="Target Pathology Laboratory" className="h-9" />
      </div>

      <div className="flex items-center gap-2">
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="h-5 w-5 text-muted-foreground" />
            {criticalAlerts.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] text-destructive-foreground">
                {criticalAlerts.length}
              </span>
            )}
          </Button>

          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 rounded-lg border border-border bg-card shadow-lg">
              <div className="border-b border-border px-4 py-3">
                <p className="text-sm font-medium text-foreground">Critical Alerts</p>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {criticalAlerts.map(alert => (
                  <button
                    key={alert.id}
                    className="flex w-full flex-col gap-1 border-b border-border px-4 py-3 text-left hover:bg-muted/50"
                    onClick={() => {
                      navigate(`/results/${alert.resultId}`);
                      setShowNotifications(false);
                    }}
                  >
                    <span className="text-sm font-medium text-destructive">
                      ⚠ {alert.testName}: {alert.criticalValue}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {alert.patient.initials}, {alert.patient.age}{alert.patient.gender} · {alert.timeFlagged}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 border-l border-border pl-3 ml-1">
          <span className="text-sm text-foreground">Dr. Sarah Mitchell</span>
          <Button variant="ghost" size="icon" title="Logout">
            <LogOut className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
      </div>
    </header>
  );
}
