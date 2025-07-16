import React, { useEffect, useState } from "react";
import { setTheme } from "@/lib/theme";
import { Button } from "@/components/ui/button";

const themes = [
  { label: "Default Light", value: "default-light" },
  { label: "Default Dark", value: "default-dark" },
  { label: "Twitter", value: "twitter" },
  { label: "Summer", value: "summer" },
  { label: "Clay", value: "clay" },
  { label: "Marvel", value: "marvel" },
  { label: "T3", value: "t3" },
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

  return (
    <div className="flex flex-wrap gap-2 sm:gap-3 items-center">
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
}
