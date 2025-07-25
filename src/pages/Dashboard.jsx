import { useEffect } from "react";
import { subscribeToPushNotifications } from "../utils/push.util";

import AlertConfig from "../components/AlertConfig";
import PastEvents from "../components/PastEvents";
import Settings from "../components/Settings/Page";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  History,
  LineChart,
  Radio,
  Settings as SettingsIcon,
  Zap,
} from "lucide-react";
import RealtimeEvents from "@/components/RealTimeEvents";

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
          <TabsList className="my-6 h-12 px-2 w-full">
            <TabsTrigger className="cursor-pointer" value="stocks">
              <LineChart className="w-4 h-4 mr-2" />
              Alert Config
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="realtime">
              <Radio className="w-4 h-4 mr-2" />
              RealTime Events
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="events">
              <History className="w-4 h-4 mr-2" />
              Past Events
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="settings">
              <SettingsIcon className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>
        </div>
        <div className="py-6">
          <TabsContent value="stocks">
            <AlertConfig />
          </TabsContent>

          <TabsContent value="realtime">
            <RealtimeEvents />
          </TabsContent>

          <TabsContent value="events">
            <PastEvents />
          </TabsContent>

          <TabsContent value="settings">
            <Settings />
          </TabsContent>
        </div>
      </Tabs>
    </main>
  );
}
