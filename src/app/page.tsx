import { features, howItWorks } from "@/components/home/data";
import { ShortnerInput } from "@/components/home/shortner";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div>
      <div className="w-full flex flex-col items-center">
        <ShortnerInput />
      </div>
      <div className="bg-primary-foreground">
        <div className="py-8 flex flex-col gap-8 container">
          <h2 className="text-center text-2xl font-bold">
            Why Choose URL Shortner?
          </h2>
          <ol className="flex flex-col md:grid md:grid-flow-row md:grid-cols-2 gap-8">
            {features.map((feature) => (
              <li key={feature.title}>
                <Card>
                  <CardHeader>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <div>
        <div className="py-8 flex flex-col gap-8 container">
          <h2 className="text-center text-2xl font-bold">How It Works</h2>
          <ol className="flex flex-col md:grid md:grid-rows-4 md:grid-cols-2 gap-8 how-it-works">
            {howItWorks.map((step, idx) => (
              <li className={`item-${idx}`} key={step.title}>
                <Card>
                  <CardHeader>
                    <CardTitle>{step.title}</CardTitle>
                    <CardDescription>{step.description}</CardDescription>
                  </CardHeader>
                </Card>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
