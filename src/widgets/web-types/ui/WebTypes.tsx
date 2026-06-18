import { TypeCard, type WebTypeData } from "./TypeCard";

// TODO: вынести в entities/service и связать с конструктором услуг (v2)
const TYPES: WebTypeData[] = [
  {
    index: "01",
    title: "Landing Page",
    description:
      "One focused page to launch a product or campaign and convert visitors.",
  },
  {
    index: "02",
    title: "Corporate Website",
    description:
      "A credible presence with your services, team, cases and contact.",
  },
  {
    index: "03",
    title: "News / Media Portal",
    description:
      "Content-heavy sites with publishing, categories, search and feeds.",
  },
  {
    index: "04",
    title: "E-commerce",
    description: "Online stores with catalog, cart, payments and an admin panel.",
  },
  {
    index: "05",
    title: "CRM System",
    description: "Client and sales management shaped around your real process.",
  },
  {
    index: "06",
    title: "ERP System",
    description: "Internal systems to run operations, inventory and finance.",
  },
  {
    index: "07",
    title: "Web Portal",
    description: "Role-based portals connecting clients, partners or staff.",
  },
  {
    index: "08",
    title: "Custom Web App",
    description: "Bespoke applications built around a unique workflow.",
  },
];

export const WebTypes = () => (
  <section
    id="build"
    className="w-full bg-gradient-to-b from-[#0a0a0a] to-[#050505] px-6 py-24 md:px-15"
  >
    <div className="mx-auto w-full max-w-7xl">
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-[clamp(48px,11vw,160px)] font-semibold leading-[0.9] text-[#C8FF12]">
          What we build
        </h2>
        <p className="mb-12 max-w-2xl text-lg text-zinc-300 md:text-2xl">
          From a one-page launch to a full custom platform — choose the shape
          that fits and we handle the rest.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {TYPES.map((type) => (
          <TypeCard key={type.index} {...type} />
        ))}
      </div>
    </div>
  </section>
);
