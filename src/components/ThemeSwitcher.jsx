import React, { useEffect, useState } from "react";
import { setTheme } from "@/lib/theme";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";

const lightThemes = [
  { label: "Default", value: "default-light" },
  { label: "Material", value: "material-light" },
  { label: "T3", value: "t3-light" },
  { label: "Marvel", value: "marvel-light" },
];

const darkThemes = [
  { label: "Default", value: "default-dark" },
  { label: "Material", value: "material-dark" },
  { label: "T3", value: "t3-dark" },
  { label: "Marvel", value: "marvel-dark" },
];

export default function ThemeSwitcher() {
  const [activeTheme, setActiveTheme] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored) setActiveTheme(stored);
  }, []);

  const handleThemeChange = (theme) => {
    setTheme(theme);
    setActiveTheme(theme);
  };

  const renderThemeButtons = (themes) => (
    <div className="flex flex-wrap gap-2">
      {themes.map(({ label, value }) => (
        <Button
          key={value}
          variant={activeTheme === value ? "default" : "outline"}
          onClick={() => handleThemeChange(value)}
          className="text-sm capitalize px-4 py-2"
        >
          {label}
        </Button>
      ))}
    </div>
  );

  return (
    <Card className="sm:col-span-2">
      <CardHeader>
        <CardTitle className="text-base sm:text-lg">
          Select Appearance
        </CardTitle>
        <CardDescription>Choose between light and dark themes</CardDescription>
      </CardHeader>

      <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <p className="text-sm font-medium mb-3">Light Themes</p>
          {renderThemeButtons(lightThemes)}
        </div>

        <div>
          <p className="text-sm font-medium mb-3">Dark Themes</p>
          {renderThemeButtons(darkThemes)}
        </div>
      </CardContent>
    </Card>
  );
}
