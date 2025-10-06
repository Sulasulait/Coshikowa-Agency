import { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import heroBackground from "@/assets/hero-background.jpg";
import jobSeekersImg from "@/assets/job-seekers.jpg";
import employersImg from "@/assets/employers.jpg";

const carouselImages = [
  { src: heroBackground, alt: "Professional team collaboration" },
  { src: jobSeekersImg, alt: "Job seekers celebrating success" },
  { src: employersImg, alt: "Employers reviewing candidates" },
];

export const HeroCarousel = () => {
  const [api, setApi] = useState<any>();

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <Carousel setApi={setApi} className="w-full h-full">
      <CarouselContent>
        {carouselImages.map((image, index) => (
          <CarouselItem key={index}>
            <img 
              src={image.src} 
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
