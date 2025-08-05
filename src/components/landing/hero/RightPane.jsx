import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

// Create image pools for each position in the grid
const imagePool = {
  // Large image pool (position 0)
  large: [
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=600&auto=format&fit=crop",
  ],
  // Top-right image pool (position 1)
  topRight: [
    "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=600&auto=format&fit=crop",
  ],
  // Bottom-right image pool (position 2)
  bottomRight: [
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?q=80&w=600&auto=format&fit=crop",
  ],
};

const RightPane = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageIndices, setImageIndices] = useState({
    large: 0,
    topRight: 0,
    bottomRight: 0,
  });

  // Track which images are currently transitioning
  const [transitioning, setTransitioning] = useState({
    large: false,
    topRight: false,
    bottomRight: false,
  });

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Sequential image rotation effect
  useEffect(() => {
    if (isLoading) return; // Don't start rotation until initial loading is complete

    // Define the sequence and timing
    const positions = ["large", "topRight", "bottomRight"];
    let currentIndex = 0;

    const rotateNextImage = () => {
      const position = positions[currentIndex];

      // Start transition for this position
      setTransitioning((prev) => ({ ...prev, [position]: true }));

      // After fade out, update the image
      setTimeout(() => {
        setImageIndices((prev) => ({
          ...prev,
          [position]: (prev[position] + 1) % imagePool[position].length,
        }));

        // After a brief pause, fade back in
        setTimeout(() => {
          setTransitioning((prev) => ({ ...prev, [position]: false }));

          // Move to next position in sequence for next update
          currentIndex = (currentIndex + 1) % positions.length;
        }, 100);
      }, 500);
    };

    // Start rotation with initial delay
    const initialDelay = setTimeout(() => {
      rotateNextImage();

      // Set interval for subsequent rotations
      const intervalId = setInterval(rotateNextImage, 3000); // Rotate next image every 3 seconds

      return () => {
        clearInterval(intervalId);
        clearTimeout(initialDelay);
      };
    }, 2000);

    return () => clearTimeout(initialDelay);
  }, [isLoading]);

  // Create the grid items using current indices
  const gridItems = [
    {
      id: "large",
      src: imagePool.large[imageIndices.large],
      className: "col-span-2",
      ratio: 16 / 9,
    },
    {
      id: "topRight",
      src: imagePool.topRight[imageIndices.topRight],
      className: "",
      ratio: 16 / 9,
    },
    {
      id: "bottomRight",
      src: imagePool.bottomRight[imageIndices.bottomRight],
      className: "",
      ratio: 16 / 9,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 mt-16">
      {gridItems.map((item) => (
        <div
          key={item.id}
          className={`overflow-hidden rounded-xl shadow-sm ${item.className}`}
        >
          <AspectRatio ratio={item.ratio}>
            {isLoading ? (
              <Skeleton className="h-full w-full" />
            ) : (
              <div
                className={`transition-opacity duration-500 ease-in-out ${
                  transitioning[item.id] ? "opacity-0" : "opacity-100"
                }`}
              >
                <img
                  src={item.src}
                  alt={`Career image ${item.id}`}
                  className="h-full w-full object-cover transition-all hover:scale-105 duration-300"
                />
              </div>
            )}
          </AspectRatio>
        </div>
      ))}
    </div>
  );
};

export default RightPane;
