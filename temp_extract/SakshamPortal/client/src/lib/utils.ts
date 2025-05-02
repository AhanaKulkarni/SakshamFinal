import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function validateEmail(email: string): boolean {
  return email.endsWith('@tcetmumbai.in');
}

export const subjectGroups = {
  group1: [
    { id: 1, name: "Physics", icon: "ri-book-2-line", color: "primary" },
    { id: 2, name: "Basic Electrical Engineering", icon: "ri-flashlight-line", color: "warning" },
    { id: 3, name: "Mathematics 1", icon: "ri-calculator-line", color: "info" },
    { id: 4, name: "EGPC", icon: "ri-cpu-line", color: "success" },
    { id: 5, name: "EGD", icon: "ri-pen-nib-line", color: "primary" },
    { id: 6, name: "AAD", icon: "ri-palette-line", color: "info" },
    { id: 7, name: "PC Assembly", icon: "ri-computer-line", color: "warning" }
  ],
  group2: [
    { id: 8, name: "EM", icon: "ri-lightbulb-line", color: "warning" },
    { id: 9, name: "Mathematics 2", icon: "ri-function-line", color: "info" },
    { id: 10, name: "IIKS", icon: "ri-braces-line", color: "primary" },
    { id: 11, name: "Chemistry", icon: "ri-flask-line", color: "success" },
    { id: 12, name: "PPS", icon: "ri-code-s-slash-line", color: "primary" },
    { id: 13, name: "AAD", icon: "ri-palette-line", color: "info" },
    { id: 14, name: "WMP", icon: "ri-tools-line", color: "warning" }
  ]
};

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase();
}

export function calculateGrade(percentage: number): string {
  if (percentage >= 90) return 'A+';
  if (percentage >= 80) return 'A';
  if (percentage >= 70) return 'B+';
  if (percentage >= 60) return 'B';
  if (percentage >= 50) return 'C';
  if (percentage >= 40) return 'D';
  return 'F';
}
