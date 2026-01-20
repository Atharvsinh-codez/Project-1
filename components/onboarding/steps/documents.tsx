"use client";

import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { CheckCircle2, Trash2, UploadCloud } from "lucide-react";

// Imports
import { OnboardingFormData } from "@/lib/schemas/onboarding-schema"; // Adjust path if needed
import { CustomFormField } from "@/components/ui/custom-form-field"; // Adjust path if needed

const DOCUMENT_TYPES = [
  { label: "Identity", value: "identity" },
  { label: "Proof of Address", value: "proof_of_address" },
  { label: "Business License", value: "business_license" },
  { label: "Tax Document", value: "tax_document" },
  { label: "Other", value: "other" },
];

const DocumentsStep = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<OnboardingFormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "documents",
  });

  return (
    <div className="space-y-6">
      {/* Info Box */}
      <div className="bg-[#fbdeb8] border border-blue-100 p-4 rounded-lg flex items-start gap-3">
        <CheckCircle2 className="text-[#fc9816] shrink-0 mt-0.5" size={18} />
        <div className="text-sm">
          <p className="font-semibold text-zinc-900">KYC Requirement</p>
          <p className="opacity-80 text-zinc-600 text-xs">
            We are required to verify your identity before you can launch a
            token. Please upload a government ID.
          </p>
        </div>
      </div>

      {/* Dynamic Fields */}
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="p-4 bg-[#fbdeb8] border border-slate-200 rounded-lg relative group transition-all"
        >
          <div className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Document Type Select */}
              <CustomFormField
                control={control}
                name={`documents.${index}.type`}
                label="Document Type"
                fieldType="select"
                placeholder="Select type"
                options={DOCUMENT_TYPES}
              />

              {/* File URL Input */}
              <CustomFormField
                control={control}
                name={`documents.${index}.fileUrl`}
                label="File URL (Mock)"
                placeholder="https://storage..."
              />
            </div>

            {/* Notes Input */}
            <CustomFormField
              control={control}
              name={`documents.${index}.notes`}
              label="Notes (Optional)"
              placeholder="Additional details..."
            />
          </div>

          {/* Remove Button */}
          <button
            type="button"
            onClick={() => remove(index)}
            className="absolute -top-2 -right-2 bg-white text-slate-400 hover:text-red-500 border shadow-sm rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            title="Remove document"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ))}

      {/* Add Button */}
      <div
        className="flex justify-center py-8 border-2 border-dashed border-slate-200 rounded-xl bg-[#fbdeb8] hover:bg-[#f6c586] transition-colors cursor-pointer group"
        onClick={() =>
          append({
            type: "identity",
            fileUrl: "",
            notes: "",
          })
        }
      >
        <div className="text-center">
          <div className="mx-auto w-10 h-10 bg-[#f79d28] rounded-full flex items-center justify-center border shadow-sm mb-3 group-hover:scale-110 transition-transform">
            <UploadCloud className="text-zinc-800" size={20} />
          </div>
          <p className="text-sm font-semibold text-slate-900">
            Click to upload document
          </p>
          <p className="text-xs text-zinc-500 mt-1">
            SVG, PNG, JPG or PDF (max. 800x400px)
          </p>
        </div>
      </div>

      {/* Global Field Array Error */}
      {errors.documents && (
        <p className="text-red-500 text-xs text-center font-medium">
          {errors.documents.message || errors.documents.root?.message}
        </p>
      )}
    </div>
  );
};

export default DocumentsStep;
