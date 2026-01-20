import { useFormContext } from "react-hook-form";
import { OnboardingFormData } from "@/lib/schemas/onboarding-schema";
import { CustomFormField } from "@/components/ui/custom-form-field";

const CATEGORIES = [
  { label: "Artist", value: "artist" },
  { label: "Musician", value: "musician" },
  { label: "Developer", value: "developer" },
  { label: "Entrepreneur", value: "entrepreneur" },
  // ...others
];

export const StepCreatorDetails = () => {
  const { control } = useFormContext<OnboardingFormData>();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CustomFormField
          control={control}
          name="fullName"
          label="Full Name"
          placeholder="e.g. Jane Doe"
        />
        <CustomFormField
          control={control}
          name="creatorHandle"
          label="Handle"
          placeholder="janedoe"
        />
      </div>

      <CustomFormField
        control={control}
        name="category"
        label="Category"
        fieldType="select"
        options={CATEGORIES}
        placeholder="Select a category"
      />

      <CustomFormField
        control={control}
        name="bio"
        label="Bio"
        fieldType="textarea"
        placeholder="Tell your story..."
        description="Min 50 characters"
      />

      <CustomFormField
        control={control}
        name="wallet"
        label="Solana Wallet"
        placeholder="Base58 public key..."
        className="font-mono"
      />
    </div>
  );
};
