import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { BASE_URL } from "@/utils/api";

export default function NotificationEmail() {
  const [alertEmail, setAlertEmail] = useState("");
  const [newAlertEmail, setNewAlertEmail] = useState("");
  const [updatingAlertEmail, setUpdatingAlertEmail] = useState(false);
  const [loadingAlertEmail, setLoadingAlertEmail] = useState(true);

  useEffect(() => {
    const fetchAlertEmail = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/auth/alert-email`, {
          withCredentials: true,
        });
        if (res.data.success && res.data.alertEmail) {
          setAlertEmail(res.data.alertEmail);
        }
      } catch (err) {
        console.error("Failed to load alert email", err);
      } finally {
        setLoadingAlertEmail(false);
      }
    };
    fetchAlertEmail();
  }, []);

  const handleChangeAlertEmail = async () => {
    const email = newAlertEmail.trim();
    if (!email) return toast.error("Email required");

    setUpdatingAlertEmail(true);
    try {
      const res = await axios.post(
        `${BASE_URL}/auth/alert-email`,
        { alertEmail: email },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success("Notification email updated");
        setAlertEmail(email);
        setNewAlertEmail("");
      } else {
        toast.error(res.data.message || "Update failed");
      }
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      toast.error("Could not update alert email");
    } finally {
      setUpdatingAlertEmail(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Notification Email</CardTitle>
        <CardDescription>
          Email where alerts and notifications will be sent.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-4 gap-2 text-sm text-muted-foreground">
          Current Alert Email:
          {loadingAlertEmail ? (
            <Skeleton className="w-40 h-4 rounded-md" />
          ) : (
            <span className="text-foreground font-medium">
              {alertEmail || "Not Set"}
            </span>
          )}
        </div>
        <div>
          <Label className="mb-1 block">New Alert Email</Label>
          <Input
            type="email"
            value={newAlertEmail}
            onChange={(e) => setNewAlertEmail(e.target.value)}
            placeholder="Enter email for notifications"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleChangeAlertEmail} disabled={updatingAlertEmail}>
          {updatingAlertEmail ? "Saving..." : "Update Email"}
        </Button>
      </CardFooter>
    </Card>
  );
}
