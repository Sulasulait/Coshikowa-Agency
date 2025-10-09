import { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";

const carouselImages = [
  { src: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg", alt: "Professional team collaboration" },
  { src: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg", alt: "Job seekers celebrating success" },
  { src: "https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg", alt: "Employers reviewing candidates" },
];

export const HeroCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();

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
