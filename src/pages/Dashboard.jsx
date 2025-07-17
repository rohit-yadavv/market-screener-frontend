import { useEffect } from "react";
import StockSelector from "../components/MacdAlertConfig";
import MacdPastEvents from "@/components/MacdPastEvents";
import { subscribeToPushNotifications } from "../utils/push.util";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LineChart, SettingsIcon, Zap } from "lucide-react";
import Settings from "@/components/Settings/Page";

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
        <TabsList className="my-6 h-12 px-2">
          <TabsTrigger className="cursor-pointer" value="stocks">
            <LineChart className="w-4 h-4 mr-2" />
            MACD Alert Config
          </TabsTrigger>
          <TabsTrigger className="cursor-pointer" value="events">
            <Zap className="w-4 h-4 mr-2" />
            MACD Past Events
          </TabsTrigger>
          <TabsTrigger className="cursor-pointer" value="settings">
            <SettingsIcon className="w-4 h-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>
        <div className="p-6 ">
          <TabsContent value="stocks">
            <StockSelector />
          </TabsContent>

          <TabsContent value="events">
            <MacdPastEvents />
          </TabsContent>

          <TabsContent value="settings">
            <Settings />
          </TabsContent>
        </div>
      </Tabs>
    </main>
  );
}
