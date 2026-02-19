"use client"

import * as React from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type CarouselContextValue = {
  viewportRef: React.RefObject<HTMLDivElement | null>
  orientation: "horizontal" | "vertical"
  scrollPrev: () => void
  scrollNext: () => void
}

const CarouselContext = React.createContext<CarouselContextValue | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)
  if (!context) {
    throw new Error("Carousel components must be used within <Carousel />")
  }
  return context
}

function Carousel({
  orientation = "horizontal",
  className,
  children,
}: React.ComponentProps<"div"> & {
  orientation?: "horizontal" | "vertical"
}) {
  const viewportRef = React.useRef<HTMLDivElement>(null)

  const scrollPrev = React.useCallback(() => {
    const viewport = viewportRef.current
    if (!viewport) return

    const amount =
      orientation === "horizontal"
        ? Math.round(viewport.clientWidth * 0.8)
        : Math.round(viewport.clientHeight * 0.8)

    viewport.scrollBy({
      left: orientation === "horizontal" ? -amount : 0,
      top: orientation === "vertical" ? -amount : 0,
      behavior: "smooth",
    })
  }, [orientation])

  const scrollNext = React.useCallback(() => {
    const viewport = viewportRef.current
    if (!viewport) return

    const amount =
      orientation === "horizontal"
        ? Math.round(viewport.clientWidth * 0.8)
        : Math.round(viewport.clientHeight * 0.8)

    viewport.scrollBy({
      left: orientation === "horizontal" ? amount : 0,
      top: orientation === "vertical" ? amount : 0,
      behavior: "smooth",
    })
  }, [orientation])

  return (
    <CarouselContext.Provider value={{ viewportRef, orientation, scrollPrev, scrollNext }}>
      <div
        data-slot="carousel"
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
      >
        {children}
      </div>
    </CarouselContext.Provider>
  )
}

function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
  const { viewportRef, orientation } = useCarousel()

  return (
    <div
      ref={viewportRef}
      data-slot="carousel-content"
      className={cn(
        "flex gap-4 overflow-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        orientation === "horizontal" ? "snap-x snap-mandatory" : "snap-y snap-mandatory flex-col",
        className
      )}
      {...props}
    />
  )
}

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
  const { orientation } = useCarousel()

  return (
    <div
      data-slot="carousel-item"
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "snap-start" : "snap-center",
        className
      )}
      {...props}
    />
  )
}

function CarouselPrevious({ className, ...props }: React.ComponentProps<typeof Button>) {
  const { scrollPrev } = useCarousel()

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      data-slot="carousel-previous"
      className={cn("absolute -left-4 top-1/2 -translate-y-1/2", className)}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft className="size-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  )
}

function CarouselNext({ className, ...props }: React.ComponentProps<typeof Button>) {
  const { scrollNext } = useCarousel()

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      data-slot="carousel-next"
      className={cn("absolute -right-4 top-1/2 -translate-y-1/2", className)}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight className="size-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  )
}

export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext }
