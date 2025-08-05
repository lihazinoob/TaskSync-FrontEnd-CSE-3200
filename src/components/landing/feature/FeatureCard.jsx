import { Card, CardContent } from "@/components/ui/card";

const FeatureCard = ({ icon, title, description }) => {
  return (
    <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300 h-full">
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className="text-primary mb-4 text-4xl">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
