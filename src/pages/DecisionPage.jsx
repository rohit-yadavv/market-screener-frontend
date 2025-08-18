import React, { useEffect, useState } from "react";
import axios from "axios";
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
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Plus,
  Minus,
  Edit,
  Trash2,
  Check,
  X,
  Settings,
  Target,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function DecisionPage() {
  const [decisionConfigs, setDecisionConfigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allSymbols, setAllSymbols] = useState([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Form states for creating new decision config
  const [newName, setNewName] = useState("");
  const [newFirstCondition, setNewFirstCondition] = useState("macd");
  const [newFirstConditionThreshold, setNewFirstConditionThreshold] =
    useState(1);
  const [newPriceConditionThreshold, setNewPriceConditionThreshold] =
    useState(1);
  const [newSelectedSymbols, setNewSelectedSymbols] = useState([]);
  const [newSymbolSearch, setNewSymbolSearch] = useState("");
  const [creating, setCreating] = useState(false);

  // State for editing
  const [editingConfigId, setEditingConfigId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editFirstCondition, setEditFirstCondition] = useState("");
  const [editFirstConditionThreshold, setEditFirstConditionThreshold] =
    useState(1);
  const [editPriceConditionThreshold, setEditPriceConditionThreshold] =
    useState(1);
  const [editSelectedSymbols, setEditSelectedSymbols] = useState([]);
  const [editSymbolSearch, setEditSymbolSearch] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchAllDecisionConfigs();
    fetchAllSymbols();
  }, []);

  const fetchAllDecisionConfigs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/decisions`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setDecisionConfigs(response.data.data);
      } else {
        toast.error("Failed to load decision configurations.");
        setError(response.data.message);
      }
    } catch (err) {
      toast.error("Error loading decision configurations.");
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllSymbols = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/symbols/all`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setAllSymbols(response.data.allSymbols || []);
      }
    } catch (err) {
      console.error("Failed to fetch all symbols:", err);
      toast.error("Failed to fetch all symbols.");
    }
  };

  const handleToggleSymbolSelection = (
    symbol,
    currentSelection,
    setSelection
  ) => {
    setSelection((prev) =>
      prev.includes(symbol)
        ? prev.filter((s) => s !== symbol)
        : [...prev, symbol]
    );
  };

  const handleCreateDecision = async () => {
    if (
      !newName ||
      !newFirstCondition ||
      newFirstConditionThreshold < 1 ||
      newPriceConditionThreshold < 1 ||
      newSelectedSymbols.length === 0
    ) {
      toast.error("Please fill all fields and add at least one symbol.");
      return;
    }

    setCreating(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/decisions`,
        {
          name: newName,
          firstCondition: newFirstCondition,
          firstConditionThreshold: newFirstConditionThreshold,
          priceConditionThreshold: newPriceConditionThreshold,
          symbols: newSelectedSymbols,
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Decision configuration created successfully!");
        setNewName("");
        setNewFirstCondition("macd");
        setNewFirstConditionThreshold(1);
        setNewPriceConditionThreshold(1);
        setNewSelectedSymbols([]);
        setNewSymbolSearch("");
        setIsCreateOpen(false);
        fetchAllDecisionConfigs();
      } else {
        toast.error("Failed to create decision configuration.");
      }
    } catch (err) {
      toast.error("Error creating decision configuration.");
      console.error("Create decision error:", err);
    } finally {
      setCreating(false);
    }
  };

  const handleEditClick = (config) => {
    setEditingConfigId(config._id);
    setEditName(config.name);
    setEditFirstCondition(config.firstCondition);
    setEditFirstConditionThreshold(config.firstConditionThreshold);
    setEditPriceConditionThreshold(config.priceConditionThreshold);
    setEditSelectedSymbols(config.symbols);
    setEditSymbolSearch("");
  };

  const handleCancelEdit = () => {
    setEditingConfigId(null);
    setEditName("");
    setEditFirstCondition("");
    setEditFirstConditionThreshold(1);
    setEditPriceConditionThreshold(1);
    setEditSelectedSymbols([]);
    setEditSymbolSearch("");
  };

  const handleUpdateDecision = async (id) => {
    if (
      !editName ||
      !editFirstCondition ||
      editFirstConditionThreshold < 1 ||
      editPriceConditionThreshold < 1 ||
      editSelectedSymbols.length === 0
    ) {
      toast.error("Please fill all fields and add at least one symbol.");
      return;
    }

    setUpdating(true);
    try {
      const response = await axios.put(
        `${BASE_URL}/decisions/${id}`,
        {
          name: editName,
          firstCondition: editFirstCondition,
          firstConditionThreshold: editFirstConditionThreshold,
          priceConditionThreshold: editPriceConditionThreshold,
          symbols: editSelectedSymbols,
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Decision configuration updated successfully!");
        setEditingConfigId(null);
        fetchAllDecisionConfigs();
      } else {
        toast.error("Failed to update decision configuration.");
      }
    } catch (err) {
      toast.error("Error updating decision configuration.");
      console.error("Update decision error:", err);
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteDecision = async (id) => {
    if (
      !confirm("Are you sure you want to delete this decision configuration?")
    ) {
      return;
    }

    try {
      const response = await axios.delete(`${BASE_URL}/decisions/${id}`, {
        withCredentials: true,
      });

      if (response.data.success) {
        toast.success("Decision configuration deleted successfully!");
        fetchAllDecisionConfigs();
      } else {
        toast.error("Failed to delete decision configuration.");
      }
    } catch (err) {
      toast.error("Error deleting decision configuration.");
      console.error("Delete decision error:", err);
    }
  };

  const filteredNewSymbols = allSymbols.filter((s) =>
    s.toLowerCase().includes(newSymbolSearch.toLowerCase())
  );

  const filteredEditSymbols = allSymbols.filter((s) =>
    s.toLowerCase().includes(editSymbolSearch.toLowerCase())
  );

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Decision Configurations</h2>
        </div>
        <Button onClick={() => setIsCreateOpen(!isCreateOpen)}>
          {isCreateOpen ? (
            <X className="w-4 h-4 mr-2" />
          ) : (
            <Plus className="w-4 h-4 mr-2" />
          )}
          {isCreateOpen ? "Cancel" : "Create New Decision"}
        </Button>
      </div>

      {/* Create New Configuration */}
      <Collapsible open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <CollapsibleContent>
          <Card className="border-2 border-dashed">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Create New Decision Configuration
              </CardTitle>
              <CardDescription>
                Set up automated trading strategies based on technical
                conditions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="decision-name">Configuration Name</Label>
                  <Input
                    id="decision-name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g., My MACD Strategy"
                  />
                </div>

                <div>
                  <Label htmlFor="first-condition">First Condition</Label>
                  <Select
                    value={newFirstCondition}
                    onValueChange={setNewFirstCondition}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="macd">MACD</SelectItem>
                      <SelectItem value="trend_continuation">
                        Trend Continuation
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="first-threshold">
                    First Condition Threshold
                  </Label>
                  <Input
                    id="first-threshold"
                    type="number"
                    min={1}
                    value={newFirstConditionThreshold}
                    onChange={(e) =>
                      setNewFirstConditionThreshold(Number(e.target.value))
                    }
                    placeholder="Number of cycles needed"
                  />
                </div>

                <div>
                  <Label htmlFor="price-threshold">
                    Price Condition Threshold
                  </Label>
                  <Input
                    id="price-threshold"
                    type="number"
                    min={1}
                    value={newPriceConditionThreshold}
                    onChange={(e) =>
                      setNewPriceConditionThreshold(Number(e.target.value))
                    }
                    placeholder="Number of price instances needed"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="symbols">Select Symbols</Label>
                <Input
                  id="search-symbols"
                  value={newSymbolSearch}
                  onChange={(e) => setNewSymbolSearch(e.target.value)}
                  placeholder="Search stock symbols..."
                  className="mb-2"
                />
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto border p-2 rounded-md">
                  {filteredNewSymbols.slice(0, 20).map((symbol) => {
                    const isActive = newSelectedSymbols.includes(symbol);
                    return (
                      <Button
                        key={symbol}
                        variant={isActive ? "secondary" : "outline"}
                        size="sm"
                        className="text-xs"
                        onClick={() =>
                          handleToggleSymbolSelection(
                            symbol,
                            newSelectedSymbols,
                            setNewSelectedSymbols
                          )
                        }
                      >
                        {symbol}
                      </Button>
                    );
                  })}
                </div>
                {newSelectedSymbols.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="text-sm font-medium">Selected:</span>
                    {newSelectedSymbols.map((sym) => (
                      <Badge key={sym} variant="secondary" className="text-xs">
                        {sym}
                        <button
                          onClick={() =>
                            handleToggleSymbolSelection(
                              sym,
                              newSelectedSymbols,
                              setNewSelectedSymbols
                            )
                          }
                          className="ml-1"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleCreateDecision}
                disabled={creating}
                className="w-full"
              >
                {creating ? "Creating..." : "Create Decision Configuration"}
              </Button>
            </CardFooter>
          </Card>
        </CollapsibleContent>
      </Collapsible>

      {/* Existing Configurations */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Your Configurations ({decisionConfigs.length})
        </h3>

        {loading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-48 w-full rounded-lg" />
            ))}
          </div>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : decisionConfigs.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Target className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-2">
                No decision configurations found
              </p>
              <p className="text-sm text-muted-foreground">
                Create your first decision configuration to start automated
                trading
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {decisionConfigs.map((config) => (
              <Card key={config._id}>
                <CardHeader className="pb-3">
                  {editingConfigId === config._id ? (
                    <Input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="font-semibold"
                    />
                  ) : (
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Target className="w-4 h-4" />
                      {config.name}
                    </CardTitle>
                  )}
                  <CardDescription>
                    <Badge variant="outline">
                      {config.firstCondition === "macd"
                        ? "MACD-based"
                        : "Trend-based"}
                    </Badge>
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      First Condition:
                    </span>
                    {editingConfigId === config._id ? (
                      <Select
                        value={editFirstCondition}
                        onValueChange={setEditFirstCondition}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="macd">MACD</SelectItem>
                          <SelectItem value="trend_continuation">
                            Trend
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <Badge variant="outline">{config.firstCondition}</Badge>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      First Threshold:
                    </span>
                    {editingConfigId === config._id ? (
                      <Input
                        type="number"
                        min={1}
                        value={editFirstConditionThreshold}
                        onChange={(e) =>
                          setEditFirstConditionThreshold(Number(e.target.value))
                        }
                        className="w-20"
                      />
                    ) : (
                      <Badge variant="outline">
                        {config.firstConditionThreshold}
                      </Badge>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Price Threshold:
                    </span>
                    {editingConfigId === config._id ? (
                      <Input
                        type="number"
                        min={1}
                        value={editPriceConditionThreshold}
                        onChange={(e) =>
                          setEditPriceConditionThreshold(Number(e.target.value))
                        }
                        className="w-20"
                      />
                    ) : (
                      <Badge variant="outline">
                        {config.priceConditionThreshold}
                      </Badge>
                    )}
                  </div>

                  <div>
                    <span className="text-sm text-muted-foreground">
                      Symbols:
                    </span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {editingConfigId === config._id ? (
                        <>
                          <Input
                            value={editSymbolSearch}
                            onChange={(e) =>
                              setEditSymbolSearch(e.target.value)
                            }
                            placeholder="Search symbols..."
                            className="w-full mb-2"
                          />
                          <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
                            {filteredEditSymbols.slice(0, 10).map((symbol) => {
                              const isActive =
                                editSelectedSymbols.includes(symbol);
                              return (
                                <Button
                                  key={symbol}
                                  variant={isActive ? "secondary" : "outline"}
                                  size="sm"
                                  className="text-xs"
                                  onClick={() =>
                                    handleToggleSymbolSelection(
                                      symbol,
                                      editSelectedSymbols,
                                      setEditSelectedSymbols
                                    )
                                  }
                                >
                                  {symbol}
                                </Button>
                              );
                            })}
                          </div>
                          {editSelectedSymbols.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {editSelectedSymbols.map((sym) => (
                                <Badge
                                  key={sym}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {sym}
                                  <button
                                    onClick={() =>
                                      handleToggleSymbolSelection(
                                        sym,
                                        editSelectedSymbols,
                                        setEditSelectedSymbols
                                      )
                                    }
                                    className="ml-1"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                </Badge>
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        config.symbols.slice(0, 3).map((symbol) => (
                          <Badge
                            key={symbol}
                            variant="secondary"
                            className="text-xs"
                          >
                            {symbol}
                          </Badge>
                        ))
                      )}
                      {!editingConfigId === config._id &&
                        config.symbols.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{config.symbols.length - 3} more
                          </Badge>
                        )}
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex justify-between gap-2 pt-3">
                  <div className="flex gap-1">
                    {editingConfigId === config._id ? (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUpdateDecision(config._id)}
                          disabled={updating}
                        >
                          {updating ? (
                            "Saving..."
                          ) : (
                            <Check className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleCancelEdit}
                          disabled={updating}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditClick(config)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteDecision(config._id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
