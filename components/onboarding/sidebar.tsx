import { cn } from "@/lib/utils";
import { Check, LucideIcon } from "lucide-react";

interface StepConfig {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

interface SidebarProps {
  steps: StepConfig[];
  currentStep: number;
}

export const OnboardingSidebar = ({ steps, currentStep }: SidebarProps) => {
  return (
    <aside className="hidden lg:flex w-2/5 max-w-xl flex-col justify-between border-r border-slate-100 relative overflow-hidden rounded-4xl">
      <img
        src="/images/howitworks/bg.png"
        alt="Onboarding Background"
        className="w-full h-full object-cover absolute top-0"
        loading="lazy"
      />

      <div className="relative z-10 p-12">
        <div className="mb-12">
          <div className="flex gap-3 items-center mb-10">
            <img
              src="/images/logo/logo-icon.png"
              alt="Project-1 Logo"
              className="h-10 w-10 md:h-12 md:w-12 rounded-xl"
              onError={(e) =>
                (e.currentTarget.src = "https://placehold.co/48x48?text=L")
              }
              loading="lazy"
            />
            <img
              src="/images/logo/logo-name-light.png"
              alt="Project-1 Brand"
              className="h-6 md:h-8"
              onError={(e) => (e.currentTarget.style.display = "none")}
              loading="lazy"
            />
          </div>
          <h1 className="text-4xl font-semibold text-white">
            Creator Onboarding
          </h1>
          <p className="text-zinc-400 mt-2 font-semibold">
            Set up your profile and token in minutes.
          </p>
        </div>

        <div className="space-y-0">
          {steps.map((step, index) => {
            const isActive = step.id === currentStep;
            const isCompleted = step.id < currentStep;
            const isLast = index === steps.length - 1;

            return (
              <div key={step.id} className="relative pl-12 pb-12 last:pb-0">
                {/* Connector Line */}
                {!isLast && (
                  <div
                    className={cn(
                      "absolute left-[19px] top-10 w-[2px] h-[calc(100%-16px)]",
                      isCompleted ? "bg-[#faa580]" : "bg-zinc-200"
                    )}
                  />
                )}

                {/* Icon Circle */}
                <div
                  className={cn(
                    "absolute left-0 top-0 w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all",
                    isActive
                      ? "border-[#faa580] bg-white text-[#F3733C] shadow-md scale-110"
                      : isCompleted
                        ? "border-[#faa580] bg-[#F3733C] text-white"
                        : "border-zinc-200 bg-zinc-50 text-zinc-300"
                  )}
                >
                  {isCompleted ? <Check size={18} /> : <step.icon size={18} />}
                </div>

                {/* Text Content */}
                <div
                  className={cn(
                    "transition-opacity",
                    isActive ? "opacity-100" : "opacity-60"
                  )}
                >
                  <h3
                    className={cn(
                      "font-bold text-md",
                      isActive ? "text-[#f98d5f]" : "text-zinc-400"
                    )}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm text-zinc-500 mt-1">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
