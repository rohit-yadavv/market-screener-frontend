import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { BASE_URL } from "@/utils/api";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "../ui/badge";

export default function AddNewSymbol() {
  const [allSymbols, setAllSymbols] = useState([]);
  const [symbolsLoading, setSymbolsLoading] = useState(true);
  const [newSymbol, setNewSymbol] = useState("");
  const [adding, setAdding] = useState(false);

  const [editSymbol, setEditSymbol] = useState("");
  const [editInput, setEditInput] = useState("");
  const [editing, setEditing] = useState(false);

  const [deletingSymbol, setDeletingSymbol] = useState(null);

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

  const handleDeleteSymbol = async (symbolToDelete) => {
    const confirm = window.confirm(
      `Are you sure you want to delete "${symbolToDelete}"?`
    );
    if (!confirm) return;

    setDeletingSymbol(symbolToDelete);
    try {
      const res = await axios.delete(`${BASE_URL}/user/symbols/all`, {
        data: { symbol: symbolToDelete },
        withCredentials: true,
      });
      if (res.data.success && res.data.allSymbols) {
        setAllSymbols(res.data.allSymbols);
        toast.success("Symbol deleted!");
      } else {
        toast.error(res.data.message || "Failed to delete.");
      }
    } catch (err) {
      console.error("Delete symbol failed", err);
      toast.error("Could not delete symbol.");
    } finally {
      setDeletingSymbol(null);
    }
  };

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
    fetchSymbols();
  }, []);

  return (
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
                <Badge
                  key={sym}
                  variant="outline"
                  className="flex items-center justify-between gap-2 p-2 rounded-md "
                >
                  <span className="font-medium">{sym}</span>

                  <div className="flex items-center gap-1">
                    {/* Edit Symbol Dialog */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 p-0 text-muted-foreground hover:text-primary"
                          onClick={() => {
                            setEditSymbol(sym);
                            setEditInput(sym);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
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

                    {/* Delete Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 p-0 text-red-500 hover:text-red-600"
                      onClick={() => handleDeleteSymbol(sym)}
                      disabled={deletingSymbol === sym}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Badge>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No symbols added yet.</p>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleAddSymbol} disabled={adding}>
          {adding ? "Adding..." : "Add Symbol"}
        </Button>
      </CardFooter>
    </Card>
  );
}
