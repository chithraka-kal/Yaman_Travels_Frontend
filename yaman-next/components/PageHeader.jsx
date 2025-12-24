"use client";

export default function PageHeader({ title, subtitle, image }) {
  return (
    <div className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60" /> {/* Dark Overlay */}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 animate-fade-in-up">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-light">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
