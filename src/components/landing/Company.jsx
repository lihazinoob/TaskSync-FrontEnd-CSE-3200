import { Container } from "@/components/ui/container";
import CompanyLogos from "./company/CompanyLogos";

const Company = () => {
  return (
    <section className="py-12 bg-muted/30">
      <Container>
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">
            Trusted by Top Companies
          </h2>
          <p className="text-muted-foreground mt-2">
            Connecting top talent with industry leaders
          </p>
        </div>
        <CompanyLogos />
      </Container>
    </section>
  );
};

export default Company;
