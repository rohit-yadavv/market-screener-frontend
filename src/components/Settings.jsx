/* eslint-disable no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { BASE_URL } from "../utils/api";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import ThemeSwitcher from "./ThemeSwitcher";
import { Pencil } from "lucide-react";

export default function Settings() {
  const [allSymbols, setAllSymbols] = useState([]);
  const [symbolsLoading, setSymbolsLoading] = useState(true);
  const [newSymbol, setNewSymbol] = useState("");
  const [adding, setAdding] = useState(false);

  const [editSymbol, setEditSymbol] = useState("");
  const [editInput, setEditInput] = useState("");
  const [editing, setEditing] = useState(false);

  const [newUser, setNewUser] = useState({ email: "", password: "" });
  const [addingUser, setAddingUser] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [updatingPassword, setUpdatingPassword] = useState(false);

  const [alertEmail, setAlertEmail] = useState("");
  const [newAlertEmail, setNewAlertEmail] = useState("");
  const [updatingAlertEmail, setUpdatingAlertEmail] = useState(false);
  const [loadingAlertEmail, setLoadingAlertEmail] = useState(true);

  useEffect(() => {
    const fetchSymbols = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user/symbols/all`, {
          withCredentials: true,
        });
        if (res.data.success && res.data.allSymbols) {
          setAllSymbols(res.data.allSymbols);
        }
      } catch (err) {
        console.error("Failed to load symbols", err);
        toast.error("Failed to fetch symbols");
      } finally {
        setSymbolsLoading(false);
      }
    };

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

    fetchSymbols();
    fetchAlertEmail();
  }, []);

  const handleAddSymbol = async () => {
    const trimmed = newSymbol.trim().toUpperCase();
    if (!/^[A-Z.]{1,10}$/.test(trimmed)) {
      return toast.error("Invalid symbol.");
    }
    if (allSymbols.includes(trimmed)) {
      return toast.info("Symbol already exists.");
    }

    setAdding(true);
    try {
      const res = await axios.post(
        `${BASE_URL}/user/symbols/all`,
        { symbols: [trimmed] },
        { withCredentials: true }
      );
      if (res.data.success && res.data.allSymbols) {
        setAllSymbols(res.data.allSymbols);
        setNewSymbol("");
        toast.success("Symbol added!");
      }
    } catch (err) {
      console.error("Add symbol failed", err);
      toast.error("Could not add symbol.");
    } finally {
      setAdding(false);
    }
  };

  const handleSaveEditSymbol = async () => {
    const trimmed = editInput.trim().toUpperCase();
    if (!/^[A-Z.]{1,10}$/.test(trimmed)) {
      return toast.error("Invalid symbol.");
    }
    if (allSymbols.includes(trimmed) && trimmed !== editSymbol) {
      return toast.info("Symbol already exists.");
    }

    setEditing(true);
    try {
      const res = await axios.put(
        `${BASE_URL}/user/symbols/all`,
        { oldSymbol: editSymbol, newSymbol: trimmed },
        { withCredentials: true }
      );
      if (res.data.success && res.data.allSymbols) {
        setAllSymbols(res.data.allSymbols);
        setEditInput("");
        setEditSymbol("");
        toast.success("Symbol updated!");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error("Edit symbol failed", err);
      toast.error("Could not update symbol.");
    } finally {
      setEditing(false);
    }
  };

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
    } catch (err) {
      toast.error("Could not update alert email");
    } finally {
      setUpdatingAlertEmail(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Card Theme */}
        <Card className="sm:col-span-2">
          <CardHeader>
            <CardTitle>Select Appearance</CardTitle>
          </CardHeader>
          <CardContent>
            <ThemeSwitcher />
          </CardContent>
        </Card>

        {/* Card 1: Add Symbol */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Add New Symbol</CardTitle>
            <CardDescription>
              Add custom stock symbols to your list.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Label className="mb-1 block">New Symbol</Label>
              <Input
                value={newSymbol}
                onChange={(e) => setNewSymbol(e.target.value.toUpperCase())}
                placeholder="e.g. AAPL"
              />
            </div>
            {symbolsLoading ? (
              <Skeleton className="w-full h-10 rounded-md" />
            ) : allSymbols.length > 0 ? (
              <div>
                <Label className="mb-2 block">Your Symbol List</Label>
                <div className="flex flex-wrap gap-2 max-h-40 overflow-auto pr-1">
                  {allSymbols.map((sym) => (
                    <div
                      key={sym}
                      className="flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-gray-100 border border-gray-300"
                    >
                      <span>{sym}</span>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className={" rounded-full p-1"}
                            onClick={() => {
                              setEditSymbol(sym);
                              setEditInput(sym);
                            }}
                          >
                            <Pencil />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Symbol</DialogTitle>
                          </DialogHeader>
                          <div className="py-4">
                            <Label className="mb-1 block">New Symbol</Label>
                            <Input
                              value={editInput}
                              onChange={(e) =>
                                setEditInput(e.target.value.toUpperCase())
                              }
                              placeholder="e.g. AAPL"
                            />
                          </div>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline" disabled={editing}>
                                Cancel
                              </Button>
                            </DialogClose>
                            <Button
                              onClick={handleSaveEditSymbol}
                              disabled={editing}
                            >
                              {editing ? "Saving..." : "Save"}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No symbols added yet.
              </p>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={handleAddSymbol} disabled={adding}>
              {adding ? "Adding..." : "Add Symbol"}
            </Button>
          </CardFooter>
        </Card>

        {/* Card 2: Add User */}
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

        {/* Card 3: Change Password */}
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

        {/* Card 4: Alert Email */}
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
            <Button
              onClick={handleChangeAlertEmail}
              disabled={updatingAlertEmail}
            >
              {updatingAlertEmail ? "Saving..." : "Update Email"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
