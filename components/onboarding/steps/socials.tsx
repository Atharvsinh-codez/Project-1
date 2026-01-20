import { useFormContext, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { OnboardingFormData } from "@/lib/schemas/onboarding-schema";
import { CustomFormField } from "@/components/ui/custom-form-field";

const PLATFORMS = [
  { label: "Twitter", value: "twitter" },
  { label: "Instagram", value: "instagram" },
  { label: "YouTube", value: "youtube" },
];

export const StepSocials = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<OnboardingFormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "socials",
  });

  return (
    <div className="space-y-6">
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="p-4 bg-[#fbdeb8] border border-slate-200 rounded-lg relative group"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-5">
            <CustomFormField
              control={control}
              name={`socials.${index}.platform`}
              label="Platform"
              fieldType="select"
              options={PLATFORMS}
              placeholder="Select"
            />
            <CustomFormField
              control={control}
              name={`socials.${index}.handle`}
              label="Handle"
              placeholder="@username"
            />
            <CustomFormField
              control={control}
              name={`socials.${index}.url`}
              label="URL"
              placeholder="https://..."
            />
          </div>
          <button
            type="button"
            onClick={() => remove(index)}
            className="absolute -top-2 -right-2 bg-white text-slate-400 hover:text-red-500 border shadow-sm rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={() => append({ platform: "twitter", handle: "", url: "" })}
        className="w-full border-dashed"
      >
        <Plus size={16} className="mr-2" /> Add Social
      </Button>

      {errors.socials?.root && (
        <p className="text-red-500 text-sm">{errors.socials.root.message}</p>
      )}
    </div>
  );
};
