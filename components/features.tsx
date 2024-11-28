import { Shield, Clock, History } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Secure Data Access",
    description:
      "Your medical data is encrypted and only accessible with your permission.",
  },
  {
    icon: Clock,
    title: "Real-time Permission Control",
    description: "Grant or revoke access to your data instantly, anytime.",
  },
  {
    icon: History,
    title: "Transparent History",
    description:
      "View a complete, immutable history of all data access and changes.",
  },
];

export function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <feature.icon className="mx-auto h-12 w-12 text-black mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
