"use client";

import React from "react";
import { Control, FieldValues, Path, Controller } from "react-hook-form";
import { cn } from "@/lib/utils";

// UI Components
import { Field, FieldError, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label"; // Optional: if you want labels

// --- STYLES ---
// This ensures the Select and Textarea look exactly like your Inputs
const CONTAINER_STYLES =
  "border border-zinc-300 rounded-lg px-4 py-3 focus-within:border-[#fcb65a] focus-within:ring-1 focus-within:ring-[#fcb65a] transition-all bg-white flex items-center";

const INNER_INPUT_STYLES =
  "bg-transparent border-none outline-none shadow-none h-auto p-0 placeholder:text-zinc-400 w-full focus-visible:ring-0 resize-none";

// --- TYPES ---
interface Option {
  label: string;
  value: string;
}

interface CustomFormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string; // Added Label support
  placeholder?: string;
  type?: string; // HTML Input type (text, password, number)
  autoComplete?: string;
  description?: string;
  fieldType?: "input" | "textarea" | "select"; // Logic switcher
  options?: Option[]; // For Select types
  className?: string; // Allow custom overrides
  disabled?: boolean;
}

/**
 * Versatile Form Field: Supports Input, Textarea, and Select
 * Maintains the specific 'zinc' and '#fcb65a' visual style.
 */
export const CustomFormField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  autoComplete,
  description,
  fieldType = "input",
  options = [],
  className,
  disabled = false,
}: CustomFormFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field
          data-invalid={fieldState.invalid}
          className={cn("space-y-1", className)}
        >
          {/* Optional Label */}
          {label && (
            <Label className="text-sm font-semibold text-zinc-700 mb-1 block">
              {label}
            </Label>
          )}

          {/* Render Input Type based on fieldType prop */}
          <div
            className={cn(
              CONTAINER_STYLES,
              fieldState.invalid && "border-red-500 ring-red-200" // Optional: visual error state on container
            )}
          >
            {/* 1. STANDARD INPUT */}
            {fieldType === "input" && (
              <Input
                {...field}
                id={name}
                type={type}
                placeholder={placeholder}
                autoComplete={autoComplete}
                className={INNER_INPUT_STYLES}
                disabled={disabled}
              />
            )}

            {/* 2. TEXTAREA */}
            {fieldType === "textarea" && (
              <Textarea
                {...field}
                id={name}
                placeholder={placeholder}
                className={cn(INNER_INPUT_STYLES, "min-h-[100px]")} // Add height for textarea
                disabled={disabled}
              />
            )}

            {/* 3. SELECT DROPDOWN */}
            {fieldType === "select" && (
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={disabled}
              >
                <SelectTrigger
                  className={cn(
                    INNER_INPUT_STYLES,
                    "flex w-full items-center justify-between"
                  )}
                >
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {options.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          {/* Description */}
          {description && (
            <FieldDescription className="mt-1 text-xs text-zinc-500 ml-1 leading-relaxed">
              {description}
            </FieldDescription>
          )}

          {/* Error Message */}
          {fieldState.invalid && (
            <FieldError errors={[fieldState.error]} className="ml-1" />
          )}
        </Field>
      )}
    />
  );
};
