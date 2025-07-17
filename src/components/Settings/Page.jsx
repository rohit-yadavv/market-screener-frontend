/* eslint-disable no-unused-vars */
"use client";

import { useState } from "react";
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
import { BASE_URL } from "@/utils/api";
import ThemeSwitcher from "../ThemeSwitcher";
import AddNewSymbol from "./AddNewSymbol";
import NotificationEmail from "./NotificationEmail";

export default function Settings() {
  const [newUser, setNewUser] = useState({ email: "", password: "" });
  const [addingUser, setAddingUser] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [updatingPassword, setUpdatingPassword] = useState(false);

  const handleAddUser = async () => {
    const { email, password } = newUser;
    if (!email || !password) return toast.error("Please fill all fields.");

    setAddingUser(true);
    try {
      const res = await axios.post(
        `${BASE_URL}/auth/add`,
        { email, password },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message || "User added.");
        setNewUser({ email: "", password: "" });
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Could not add user.");
    } finally {
      setAddingUser(false);
    }
  };

  const handleChangePassword = async () => {
    if (!newPassword) return toast.error("Please enter a new password.");

    setUpdatingPassword(true);
    try {
      const res = await axios.post(
        `${BASE_URL}/auth/change/password`,
        { newPassword },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success("Password updated.");
        setNewPassword("");
      } else {
        toast.error(res.data.message || "Failed to update password.");
      }
    } catch (err) {
      toast.error("Could not update password.");
    } finally {
      setUpdatingPassword(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Card 1: Theme */}
        <ThemeSwitcher />

        {/* Card 2: Add Symbol */}
        <AddNewSymbol />

        {/* Card 3: Add User */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Add User</CardTitle>
            <CardDescription>
              Create a new user account manually.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Label className="mb-1 block">Email</Label>
              <Input
                type="email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                placeholder="Email"
              />
            </div>
            <div>
              <Label className="mb-1 block">Password</Label>
              <Input
                type="password"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
                placeholder="Password"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleAddUser} disabled={addingUser}>
              {addingUser ? "Adding..." : "Add User"}
            </Button>
          </CardFooter>
        </Card>

        {/* Card 34 Change Password */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>Update your account password.</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <Label className="mb-1 block">New Password</Label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleChangePassword} disabled={updatingPassword}>
              {updatingPassword ? "Updating..." : "Update Password"}
            </Button>
          </CardFooter>
        </Card>

        {/* Card 5: Change Alert email */}
        <NotificationEmail />
      </div>
    </div>
  );
}
