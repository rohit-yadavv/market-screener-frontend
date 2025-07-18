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
  { label: "Default Light", value: "default-light" },
  { label: "Twitter Light", value: "twitter-light" },
  { label: "T3 Light", value: "t3-light" },
  { label: "Marvel", value: "marvel" },
];

const darkThemes = [
  { label: "Default Dark", value: "default-dark" },
  { label: "Twitter Dark", value: "twitter-dark" },
  { label: "T3 Dark", value: "t3-dark" },
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
    <div className="flex flex-wrap gap-2 sm:gap-3">
      {themes.map(({ label, value }) => (
        <Button
          key={value}
          variant={activeTheme === value ? "default" : "outline"}
          onClick={() => handleThemeChange(value)}
          className="text-xs sm:text-sm capitalize"
        >
          {label}
        </Button>
      ))}
    </div>
  );

  return (
    <Card className="sm:col-span-2">
      <CardHeader>
        <CardTitle>Select Appearance</CardTitle>
        <CardDescription>Choose between light and dark themes</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium mb-2">Light Themes</p>
          {renderThemeButtons(lightThemes)}
        </div>

        <div>
          <p className="text-sm font-medium mb-2">Dark Themes</p>
          {renderThemeButtons(darkThemes)}
        </div>
      </CardContent>
    </Card>
  );
}
