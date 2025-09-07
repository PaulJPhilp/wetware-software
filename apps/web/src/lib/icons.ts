import { Bot, Brain, Briefcase, Code, Users, type LucideIcon } from "lucide-react";

// Centralized icon mapping to reduce bundle duplication
export const focusAreaIcons: Record<string, LucideIcon> = {
  "Human-Centric": Brain,
  "Tech-Centric": Bot,
  "Human-AI Collaboration": Users,
  Coding: Code,
  "Business of AI": Briefcase,
} as const;

// Common icons used across the app
export const commonIcons = {
  Bot,
  Brain,
  Briefcase,
  Code,
  Users,
} as const;
