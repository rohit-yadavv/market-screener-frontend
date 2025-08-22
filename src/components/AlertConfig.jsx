import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
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
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Plus,
  Edit,
  Trash2,
  Check,
  X,
  Bell,
  BarChart3,
  LineChart,
  Repeat,
  TrendingUp,
  AlertTriangle,
  Power,
  PowerOff,
  ChevronDown,
  ChevronRight,
  Settings,
} from "lucide-react";

export default function AlertConfig() {
  const [allSymbols, setAllSymbols] = useState([]);
  const [alertConfigs, setAlertConfigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Form states for creating new alert config
  const [newName, setNewName] = useState("");
  const [newAlertType, setNewAlertType] = useState("macd");
  const [newThreshold, setNewThreshold] = useState(1);
  const [newMacdThreshold, setNewMacdThreshold] = useState(1);
  const [newSelectedSymbols, setNewSelectedSymbols] = useState([]);
  const [newSymbolSearch, setNewSymbolSearch] = useState("");
  const [creating, setCreating] = useState(false);

  // State for editing
  const [editingConfigId, setEditingConfigId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editAlertType, setEditAlertType] = useState("");
  const [editThreshold, setEditThreshold] = useState(1);
  const [editMacdThreshold, setEditMacdThreshold] = useState(1);
  const [editSelectedSymbols, setEditSelectedSymbols] = useState([]);
  const [editSymbolSearch, setEditSymbolSearch] = useState("");
  const [updating, setUpdating] = useState(false);

  // State for toggling active status
  const [togglingStatus, setTogglingStatus] = useState({});

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [symbolRes, alertRes] = await Promise.all([
        axios.get(`${BASE_URL}/user/symbols/all`, {
          withCredentials: true,
        }),
        axios.get(`${BASE_URL}/alerts`, {
          withCredentials: true,
        }),
      ]);

      if (symbolRes.data.success) {
        setAllSymbols(symbolRes.data.allSymbols || []);
      }

      if (alertRes.data.success) {
        setAlertConfigs(alertRes.data.data);
      } else {
        toast.error("Failed to load alert configurations.");
        setError(alertRes.data.message);
      }
    } catch (err) {
      toast.error("Error loading data.");
      setError(err.message);
    } finally {
      setLoading(false);
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

  const getAlertTypeIcon = (alertType) => {
    switch (alertType) {
      case "macd":
        return <BarChart3 className="w-4 h-4" />;
      case "trend_continuation":
        return <Repeat className="w-4 h-4" />;
      case "price_action":
        return <LineChart className="w-4 h-4" />;
      case "high_low":
        return <TrendingUp className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const getAlertTypeLabel = (alertType) => {
    switch (alertType) {
      case "macd":
        return "MACD Cycles";
      case "trend_continuation":
        return "Trend Continuation";
      case "price_action":
        return "Price Action (MACD)";
      case "high_low":
        return "High/Low";
      default:
        return alertType;
    }
  };

  const handleCreateAlert = async () => {
    if (
      !newName ||
      !newAlertType ||
      newThreshold < 1 ||
      newSelectedSymbols.length === 0
    ) {
      toast.error("Please fill all fields and add at least one symbol.");
      return;
    }

    // Validate MACD threshold for price action alerts
    if (newAlertType === "price_action" && (!newMacdThreshold || newMacdThreshold < 1)) {
      toast.error("MACD threshold is required and must be at least 1 for price action alerts.");
      return;
    }

    setCreating(true);
    try {
      const requestData = {
        name: newName,
        alertType: newAlertType,
        threshold: newThreshold,
        symbols: newSelectedSymbols,
      };

      // Add MACD threshold for price action alerts
      if (newAlertType === "price_action") {
        requestData.macdThreshold = newMacdThreshold;
      }

      const response = await axios.post(
        `${BASE_URL}/alerts`,
        requestData,
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Alert configuration created successfully!");
        setNewName("");
        setNewAlertType("macd");
        setNewThreshold(1);
        setNewMacdThreshold(1);
        setNewSelectedSymbols([]);
        setNewSymbolSearch("");
        setIsCreateOpen(false);
        fetchAllData();
      } else {
        toast.error("Failed to create alert configuration.");
      }
    } catch (err) {
      toast.error("Error creating alert configuration.");
      console.error("Create alert error:", err);
    } finally {
      setCreating(false);
    }
  };

  const handleEditClick = (config) => {
    setEditingConfigId(config._id);
    setEditName(config.name);
    setEditAlertType(config.alertType);
    setEditThreshold(config.threshold);
    setEditMacdThreshold(config.macdThreshold || 1);
    setEditSelectedSymbols(config.symbols);
    setEditSymbolSearch("");
  };

  const handleCancelEdit = () => {
    setEditingConfigId(null);
    setEditName("");
    setEditAlertType("");
    setEditThreshold(1);
    setEditMacdThreshold(1);
    setEditSelectedSymbols([]);
    setEditSymbolSearch("");
  };

  const handleUpdateAlert = async (id) => {
    if (
      !editName ||
      !editAlertType ||
      editThreshold < 1 ||
      editSelectedSymbols.length === 0
    ) {
      toast.error("Please fill all fields and add at least one symbol.");
      return;
    }

    // Validate MACD threshold for price action alerts
    if (editAlertType === "price_action" && (!editMacdThreshold || editMacdThreshold < 1)) {
      toast.error("MACD threshold is required and must be at least 1 for price action alerts.");
      return;
    }

    setUpdating(true);
    try {
      const requestData = {
        name: editName,
        alertType: editAlertType,
        threshold: editThreshold,
        symbols: editSelectedSymbols,
      };

      // Add MACD threshold for price action alerts
      if (editAlertType === "price_action") {
        requestData.macdThreshold = editMacdThreshold;
      }

      const response = await axios.put(
        `${BASE_URL}/alerts/${id}`,
        requestData,
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Alert configuration updated successfully!");
        setEditingConfigId(null);
        fetchAllData();
      } else {
        toast.error("Failed to update alert configuration.");
      }
    } catch (err) {
      toast.error("Error updating alert configuration.");
      console.error("Update alert error:", err);
    } finally {
      setUpdating(false);
    }
  };

  const handleToggleActiveStatus = async (id, currentStatus) => {
    setTogglingStatus((prev) => ({ ...prev, [id]: true }));

    try {
      const response = await axios.put(
        `${BASE_URL}/alerts/${id}`,
        {
          isActive: !currentStatus,
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        const newStatus = !currentStatus;
        toast.success(
          `Alert configuration ${
            newStatus ? "activated" : "deactivated"
          } successfully!`
        );

        setAlertConfigs((prev) =>
          prev.map((config) =>
            config._id === id ? { ...config, isActive: newStatus } : config
          )
        );
      } else {
        toast.error("Failed to update alert status.");
      }
    } catch (err) {
      toast.error("Error updating alert status.");
      console.error("Toggle status error:", err);
    } finally {
      setTogglingStatus((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleDeleteAlert = async (id) => {
    if (!confirm("Are you sure you want to delete this alert configuration?")) {
      return;
    }

    try {
      const response = await axios.delete(`${BASE_URL}/alerts/${id}`, {
        withCredentials: true,
      });

      if (response.data.success) {
        toast.success("Alert configuration deleted successfully!");
        fetchAllData();
      } else {
        toast.error("Failed to delete alert configuration.");
      }
    } catch (err) {
      toast.error("Error deleting alert configuration.");
      console.error("Delete alert error:", err);
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
          <h2 className="text-2xl font-bold">Alert Configurations</h2>
        </div>
        <Button onClick={() => setIsCreateOpen(!isCreateOpen)}>
          {isCreateOpen ? (
            <X className="w-4 h-4 mr-2" />
          ) : (
            <Plus className="w-4 h-4 mr-2" />
          )}
          {isCreateOpen ? "Cancel" : "Create New Alert"}
        </Button>
      </div>
      {/* Create Alert Configuration */}{" "}
      <Collapsible open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <CollapsibleContent>
          <Card className="border-2 border-dashed">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Create New Alert Configuration
              </CardTitle>
              <CardDescription>
                Set up a new alert strategy for specific symbols
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="alert-name">Configuration Name</Label>
                  <Input
                    id="alert-name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g., My MACD Strategy"
                  />
                </div>

                <div>
                  <Label htmlFor="alert-type">Alert Type</Label>
                  <Select value={newAlertType} onValueChange={setNewAlertType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select alert type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="macd">MACD Cycles</SelectItem>
                      <SelectItem value="trend_continuation">
                        Trend Continuation
                      </SelectItem>
                      <SelectItem value="price_action">Price Action (with MACD threshold)</SelectItem>
                      <SelectItem value="high_low">High/Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="threshold">Threshold</Label>
                  <Input
                    id="threshold"
                    type="number"
                    min={1}
                    max={10}
                    value={newThreshold}
                    onChange={(e) => setNewThreshold(Number(e.target.value))}
                    placeholder="Number of cycles/instances needed"
                  />
                </div>

                {newAlertType === "price_action" && (
                  <div>
                    <Label htmlFor="macd-threshold">MACD Threshold</Label>
                    <Input
                      id="macd-threshold"
                      type="number"
                      min={1}
                      max={10}
                      value={newMacdThreshold}
                      onChange={(e) => setNewMacdThreshold(Number(e.target.value))}
                      placeholder="MACD cycles needed before price alert"
                    />
                  </div>
                )}
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
                  {filteredNewSymbols.map((symbol) => {
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
                onClick={handleCreateAlert}
                disabled={creating}
                className="w-full"
              >
                {creating ? "Creating..." : "Create Alert Configuration"}
              </Button>
            </CardFooter>
          </Card>
        </CollapsibleContent>
      </Collapsible>
      {/* Existing Configurations */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Your Configurations ({alertConfigs.length})
        </h3>

        {loading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-48 w-full rounded-lg" />
            ))}
          </div>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : alertConfigs.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Bell className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-2">
                No alert configurations found
              </p>
              <p className="text-sm text-muted-foreground">
                Create your first alert configuration to get started
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {alertConfigs.map((config) => (
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
                      {getAlertTypeIcon(config.alertType)}
                      {config.name}
                    </CardTitle>
                  )}
                  <CardDescription className="flex items-center gap-2">
                    <Badge variant="outline">
                      {getAlertTypeLabel(config.alertType)}
                    </Badge>
                    <Badge variant={config.isActive ? "default" : "secondary"}>
                      {config.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Threshold:
                    </span>
                    {editingConfigId === config._id ? (
                      <Input
                        type="number"
                        min={1}
                        max={10}
                        value={editThreshold}
                        onChange={(e) =>
                          setEditThreshold(Number(e.target.value))
                        }
                        className="w-20"
                      />
                    ) : (
                      <Badge variant="outline">{config.threshold}</Badge>
                    )}
                  </div>

                  {config.alertType === "price_action" && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        MACD Threshold:
                      </span>
                      {editingConfigId === config._id ? (
                        <Input
                          type="number"
                          min={1}
                          max={10}
                          value={editMacdThreshold}
                          onChange={(e) =>
                            setEditMacdThreshold(Number(e.target.value))
                          }
                          className="w-20"
                        />
                      ) : (
                        <Badge variant="outline">{config.macdThreshold || 1}</Badge>
                      )}
                    </div>
                  )}

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
                            {filteredEditSymbols.map((symbol) => {
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
                        config.symbols.map((symbol) => (
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
                          onClick={() => handleUpdateAlert(config._id)}
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
                          onClick={() => handleDeleteAlert(config._id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>

                  {editingConfigId !== config._id && (
                    <Button
                      variant={config.isActive ? "destructive" : "default"}
                      size="sm"
                      onClick={() =>
                        handleToggleActiveStatus(config._id, config.isActive)
                      }
                      disabled={togglingStatus[config._id]}
                    >
                      {togglingStatus[config._id] ? (
                        "Updating..."
                      ) : config.isActive ? (
                        <>
                          <PowerOff className="h-4 w-4 mr-1" />
                          Deactivate
                        </>
                      ) : (
                        <>
                          <Power className="h-4 w-4 mr-1" />
                          Activate
                        </>
                      )}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
