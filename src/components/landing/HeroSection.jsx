import GradientText from "../custom/GradientText";
import GridBackground from "../custom/GridBackground";
import LeftPane from "./hero/LeftPane";
import RightPane from "./hero/RightPane";

const HeroSection = () => {
  return (
    <div className="relative min-h-screen w-full">
      <GridBackground />
      <div className="h-screen w-full flex items-center">
        <section className="w-full">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Left Column: Text and Buttons */}
              <div className="flex flex-col justify-center space-y-6 animate-in slide-in-from-left duration-200">
                <div className="space-y-4">
                  {/* <GradientText
                    colors={["#7F55B1", "#FFE1E0", "#7F55B1"]}
                    animationSpeed={8}
                    showBorder={false}
                  >
                    CareerPilot
                  </GradientText> */}
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-500">
                    Navigate Your Career Journey
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Unlock professional opportunities tailored to your unique
                    skills and aspirations with our AI-powered career guidance
                    platform.
                  </p>
                </div>
                <LeftPane />
              </div>

              {/* Right Column: Bento Grid of Images */}
              <div className="animate-in slide-in-from-right duration-700 delay-300">
                <RightPane />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HeroSection;
