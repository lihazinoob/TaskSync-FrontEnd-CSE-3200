import { Brain, Sparkles } from "lucide-react";

const GeneratingAnimation = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <div className="relative">
        <Brain className="h-16 w-16 text-primary animate-pulse" />
        <Sparkles className="h-6 w-6 text-primary absolute -top-2 -right-2 animate-bounce" />
        <Sparkles className="h-5 w-5 text-primary absolute -bottom-1 -left-1 animate-bounce [animation-delay:200ms]" />
      </div>
      <p className="mt-4 font-medium">Generating your roadmap...</p>
      <div className="flex mt-3 space-x-1">
        <div className="w-2 h-2 rounded-full bg-primary animate-bounce"></div>
        <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:200ms]"></div>
        <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:400ms]"></div>
      </div>
    </div>
  );
};

export default GeneratingAnimation;
