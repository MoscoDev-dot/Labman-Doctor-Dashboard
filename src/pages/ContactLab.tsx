import { Phone, Mail, AlertCircle, HelpCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

const contacts = [
  {
    icon: Phone,
    title: "Call Lab",
    description: "+27 (0)11 555 0123",
    sub: "Mon–Fri, 07:00–18:00",
    href: "tel:+27115550123",
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "support@targetpathology.co.za",
    sub: "Response within 24 hours",
    href: "mailto:support@targetpathology.co.za",
  },
  {
    icon: AlertCircle,
    title: "Report Issue",
    description: "Report a result query or discrepancy",
    sub: "incidents@targetpathology.co.za",
    href: "mailto:incidents@targetpathology.co.za?subject=Result%20Query%20/%20Discrepancy",
  },
  {
    icon: HelpCircle,
    title: "FAQ / Help",
    description: "View frequently asked questions",
    sub: "Common queries and guides",
    action: () => toast.info("FAQ section coming soon."),
  },
];

export default function ContactLab() {
  return (
    <div className="mx-auto max-w-[800px]">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground">Contact Lab</h1>
        <p className="text-sm text-muted-foreground mt-1">Get in touch with Target Pathology Laboratory</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {contacts.map(c => {
          const inner = (
            <CardContent className="flex items-start gap-4 p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <c.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">{c.title}</p>
                <p className="text-sm text-foreground mt-0.5">{c.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{c.sub}</p>
              </div>
            </CardContent>
          );

          if ("href" in c) {
            return (
              <a key={c.title} href={c.href} target="_blank" rel="noopener noreferrer" className="no-underline">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">{inner}</Card>
              </a>
            );
          }

          return (
            <Card key={c.title} className="hover:shadow-md transition-shadow cursor-pointer" onClick={c.action}>
              {inner}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
