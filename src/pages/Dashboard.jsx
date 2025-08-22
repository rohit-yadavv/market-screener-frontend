import { useEffect } from "react";
import { subscribeToPushNotifications } from "../utils/push.util";

import AlertConfig from "../components/AlertConfig";
import PastAlerts from "../components/PastAlerts";
import PastDecision from "../components/PastDecision";
import Settings from "../components/Settings/Page";
import RealtimeEvents from "@/components/RealTimeEvents";
import DecisionPage from "./DecisionPage";
import TradingPage from "./TradingPage";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  CircleAlert,
  History,
  Radio,
  Settings as SettingsIcon,
  ArrowLeftRight,
  ClipboardList,
  TrendingUp,
} from "lucide-react";

export default function Dashboard() {
  // Push Notification Setup
  useEffect(() => {
    async function registerPush() {
      if (!("serviceWorker" in navigator) || !("PushManager" in window)) return;
      const registration = await navigator.serviceWorker.ready;
      const existingSub = await registration.pushManager.getSubscription();
      if (existingSub) return;

      const vapidKey = import.meta.env.VITE_APP_VAPID_PUBLIC_KEY;
      await subscribeToPushNotifications(vapidKey);
    }

    registerPush();
  }, []);

  return (
    <main className="min-h-screen bg-background py-6 px-4 md:px-10">
      <h1 className="text-3xl font-bold mb-6 text-foreground">
        Screener Dashboard
      </h1>

      <Tabs defaultValue="stocks" className="w-full">
        <div className="border-b border-border">
          <TabsList className="my-6 h-12 px-2 w-full flex gap-2 justify-between overflow-x-auto">
            <TabsTrigger
              className="cursor-pointer text-xs md:text-sm lg:text-base flex items-center"
              value="stocks"
            >
              <CircleAlert className="w-4 h-4 md:w-5 md:h-5 mr-0 md:mr-2" />
              <span className="hidden sm:inline">Alert Config</span>
            </TabsTrigger>

            <TabsTrigger
              className="cursor-pointer text-xs md:text-sm lg:text-base flex items-center"
              value="decision"
            >
              <ClipboardList className="w-4 h-4 md:w-5 md:h-5 mr-0 md:mr-2" />
              <span className="hidden sm:inline">Decision Config</span>
            </TabsTrigger>

            <TabsTrigger
              className="cursor-pointer text-xs md:text-sm lg:text-base flex items-center"
              value="realtime"
            >
              <Radio className="w-4 h-4 md:w-5 md:h-5 mr-0 md:mr-2" />
              <span className="hidden sm:inline">Realtime</span>
            </TabsTrigger>

            <TabsTrigger
              className="cursor-pointer text-xs md:text-sm lg:text-base flex items-center"
              value="past-alerts"
            >
              <History className="w-4 h-4 md:w-5 md:h-5 mr-0 md:mr-2" />
              <span className="hidden sm:inline">Past Alerts</span>
            </TabsTrigger>

            <TabsTrigger
              className="cursor-pointer text-xs md:text-sm lg:text-base flex items-center"
              value="past-decision"
            >
              <TrendingUp className="w-4 h-4 md:w-5 md:h-5 mr-0 md:mr-2" />
              <span className="hidden sm:inline">Past Decision</span>
            </TabsTrigger>

            <TabsTrigger
              className="cursor-pointer text-xs md:text-sm lg:text-base flex items-center"
              value="settings"
            >
              <SettingsIcon className="w-4 h-4 md:w-5 md:h-5 mr-0 md:mr-2" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>
        </div>
        <div className="py-6">
          <TabsContent value="stocks">
            <AlertConfig />
          </TabsContent>

          <TabsContent value="decision">
            <DecisionPage />
          </TabsContent>

          <TabsContent value="realtime">
            <RealtimeEvents />
          </TabsContent>

          <TabsContent value="past-alerts">
            <PastAlerts />
          </TabsContent>

          <TabsContent value="past-decision">
            <PastDecision />
          </TabsContent>

          <TabsContent value="settings">
            <Settings />
          </TabsContent>
        </div>
      </Tabs>
    </main>
  );
}
