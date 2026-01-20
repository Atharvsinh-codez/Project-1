import React from "react";

interface FeatureCardProps {
  img: string;
  title: string;
  desc: string;
  icon: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  img,
  title,
  desc,
  icon,
}) => {
  return (
    <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] w-full border border-zinc-800 rounded-2xl sm:rounded-3xl lg:rounded-4xl overflow-hidden">
      {/* Background image */}
      <img
        src={img}
        alt={title}
        className="w-full h-full object-cover"
        loading="lazy"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />

      {/* Text */}
      <div className="absolute bottom-3 sm:bottom-4 lg:bottom-6 left-3 sm:left-4 lg:left-6 text-white p-4 sm:p-6 lg:p-8 xl:p-10 flex flex-col gap-3 sm:gap-4 lg:gap-5">
        <img
          src={icon}
          alt={title}
          className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10"
          loading="lazy"
        />
        <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-semibold leading-tight">
          {title}
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-zinc-400 leading-relaxed">
          {desc}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;
