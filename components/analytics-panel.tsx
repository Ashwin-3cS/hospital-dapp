import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "'@/components/ui/card'";
import { Activity, Users, ShieldCheck } from "lucide-react";

export function AnalyticsPanel() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Patients Accessed
          </CardTitle>
          <Users className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1,234</div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            +20.1% from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Active Permissions
          </CardTitle>
          <ShieldCheck className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">567</div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            +10.5% from last week
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Recent Activities
          </CardTitle>
          <Activity className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">89</div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            In the last 24 hours
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
