export type BmiCategory = "Underweight" | "Normal" | "Overweight" | "Obese";

export type BmiLog = {
  id: string;
  height_cm: number;
  weight_kg: number;
  bmi: number;
  category: BmiCategory;
  note?: string;
  created_at: string; // ISO
  updated_at?: string; // ISO
};