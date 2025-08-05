import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const placeholders = [
  "Frontend developer career path",
  "Data scientist roadmap",
  "UX designer progression",
  "Full-stack engineer skills",
];

const AiPromptInput = ({ onGenerate }) => {
  const [placeholder, setPlaceholder] = useState(placeholders[0]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  // Animation for typing effect
  useEffect(() => {
    if (!isTyping) return;

    const currentPlaceholder = placeholders[placeholderIndex];

    if (charIndex < currentPlaceholder.length) {
      const timeout = setTimeout(() => {
        setPlaceholder(currentPlaceholder.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 80);

      return () => clearTimeout(timeout);
    } else {
      // Pause at the end of typing
      const timeout = setTimeout(() => {
        setIsTyping(false);

        // After a pause, start erasing
        setTimeout(() => {
          setIsTyping(true);
          setCharIndex(0);
          setPlaceholderIndex((placeholderIndex + 1) % placeholders.length);
        }, 2000);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [charIndex, isTyping, placeholderIndex]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate(inputValue || placeholder);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-lg flex-col sm:flex-row gap-2"
    >
      <div className="relative flex-grow">
        <Input
          type="text"
          className="pr-10 h-11 w-full"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <Sparkles className="h-4 w-4 text-primary animate-pulse" />
        </div>
      </div>
      <Button type="submit" className="h-11 whitespace-nowrap">
        Generate Roadmap
      </Button>
    </form>
  );
};

export default AiPromptInput;
