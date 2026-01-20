import React from "react";

interface MiniCardProps {
  images: string[];
  rotation?: string;
  title: string;
}

const MiniCard: React.FC<MiniCardProps> = ({
  images,
  rotation = "",
  title,
}) => {
  return (
    <div
      className={`p-4 sm:p-6 lg:p-8 xl:p-10 flex flex-col gap-6 sm:gap-8 lg:gap-12 xl:gap-16 h-fit w-full sm:w-1/2 lg:w-1/3 bg-zinc-900/80 rounded-2xl sm:rounded-3xl lg:rounded-4xl border border-zinc-800 shadow-2xl shadow-black ${rotation}`}
    >
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {images.map((img, idx) => {
          const randomRotation = Math.random() * 20 - 10;
          return (
            <img
              key={idx}
              src={img}
              style={{
                transform: `rotate(${randomRotation}deg)`,
              }}
              alt={title || "Mini Card Image"}
              className="h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 rounded-lg sm:rounded-xl border border-zinc-400 shadow-lg shadow-black rotate-2"
              loading="lazy"
            />
          );
        })}
      </div>

      <p className="text-lg sm:text-xl lg:text-2xl font-medium text-white leading-tight">
        {title}
      </p>
    </div>
  );
};

export default MiniCard;
