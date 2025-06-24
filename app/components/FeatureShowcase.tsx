import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function FeatureShowcase({
  videoSrc,
  headline,
  subheadline,
  reverse = false,
  cta,
}: {
  videoSrc: string;
  headline: string;
  subheadline: React.ReactNode;
  reverse?: boolean;
  cta?: { label: string; href: string };
}) {
  return (
    <section className="w-full py-20 font-[Satoshi,Inter,sans-serif] bg-black">
      <div className={`flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} items-center max-w-7xl mx-auto gap-16 px-4`}>
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="rounded-3xl shadow-2xl border-2 border-blue-700 bg-gray-900/80 backdrop-blur-lg transition-transform duration-300 hover:scale-[1.025] hover:shadow-3xl overflow-hidden">
            <video
              src={videoSrc}
              controls
              className="w-[480px] h-[270px] md:w-[600px] md:h-[338px] object-cover"
              style={{ background: "#111" }}
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-start justify-center">
          <Card className="bg-gray-900/80 shadow-xl border-0 p-0 w-full">
            <CardContent className="p-8 md:p-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400" style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}>
                {headline}
              </h2>
              <div className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 font-medium" style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}>
                {subheadline}
              </div>
              {cta && (
                <Button asChild size="lg" className="mt-2 text-lg font-bold px-8 py-4 rounded-xl shadow-lg">
                  <a href={cta.href} target="_blank" rel="noopener noreferrer">
                    {cta.label}
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
} 