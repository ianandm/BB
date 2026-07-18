import { CheckCircle2, CircleDashed, Settings } from "lucide-react";

export const metadata = {
  title: "Settings",
};

export const dynamic = "force-dynamic";

type IntegrationRow = {
  name: string;
  detail: string;
  configured: boolean;
};

export default function AdminSettingsPage() {
  const integrations: IntegrationRow[] = [
    {
      name: "Database (Neon PostgreSQL)",
      detail: "Prisma via DATABASE_URL",
      configured: Boolean(process.env.DATABASE_URL),
    },
    {
      name: "Stripe payments",
      detail: "STRIPE_SECRET_KEY",
      configured: Boolean(process.env.STRIPE_SECRET_KEY),
    },
    {
      name: "Clerk customer auth",
      detail: "CLERK_SECRET_KEY",
      configured: Boolean(process.env.CLERK_SECRET_KEY),
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-10">
        <h1 className="font-heading text-3xl text-white">Settings</h1>
        <p className="mt-2 text-white/60">
          Store configuration and integration status
        </p>
      </div>

      <div className="max-w-2xl space-y-6">
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F28C28]/20">
              <Settings className="h-5 w-5 text-[#F28C28]" />
            </div>
            <h2 className="font-heading-secondary text-xl text-white">
              Store
            </h2>
          </div>
          <dl className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-white/60">Store name</dt>
              <dd className="text-white">BluishBoy Bookstore</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-white/60">App URL</dt>
              <dd className="text-white">
                {process.env.NEXT_PUBLIC_APP_URL ?? "Not set"}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-white/60">Currency</dt>
              <dd className="text-white">USD</dd>
            </div>
          </dl>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="font-heading-secondary mb-4 text-xl text-white">
            Integrations
          </h2>
          <ul className="space-y-3">
            {integrations.map((integration) => (
              <li
                key={integration.name}
                className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3"
              >
                <div>
                  <p className="text-sm text-white">{integration.name}</p>
                  <p className="text-xs text-white/50">{integration.detail}</p>
                </div>
                {integration.configured ? (
                  <span className="flex items-center gap-1.5 text-xs text-[#3AA7FF]">
                    <CheckCircle2 className="h-4 w-4" /> Configured
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-xs text-white/40">
                    <CircleDashed className="h-4 w-4" /> Not configured
                  </span>
                )}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-white/40">
            Values are read from environment variables and never displayed.
            Update them in .env locally or in the Vercel dashboard.
          </p>
        </section>
      </div>
    </div>
  );
}
