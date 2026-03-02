import { useState } from "react";
import { Phone, Mail, AlertCircle, HelpCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
    title: "Lab Report Issue",
    description: "Report a result query or discrepancy",
    sub: "incidents@targetpathology.co.za",
    href: "mailto:incidents@targetpathology.co.za?subject=Result%20Query%20/%20Discrepancy",
  },
  {
    icon: HelpCircle,
    title: "FAQ",
    description: "View frequently asked questions",
    sub: "Common queries and guides",
  },
];

const faqs = [
  {
    question: "How long does it take to get results?",
    answer:
      "Most routine tests are completed within 24 hours. Specialized tests may take 3-5 working days.",
  },
  {
    question: "How are critical results handled?",
    answer:
      "Critical results are immediately flagged in the system and we attempt to notify the referring doctor via phone call and SMS.",
  },
  {
    question: "What should I do if a result seems incorrect?",
    answer:
      "Please use the 'Lab Report Issue' contact option to report any discrepancies. Our QA team will investigate and arrange a rerun if necessary.",
  },
  {
    question: "Can I request add-on tests?",
    answer:
      "Yes, provided the original sample is viable and sufficient. Contact the lab with the patient's lab number to request add-on tests.",
  },
  {
    question: "How long are samples kept?",
    answer:
      "Routine blood samples are stored for 7 days. Specialized samples (like histology) may be kept longer according to regulatory guidelines.",
  },
];

export default function ContactLab() {
  const [isFaqOpen, setIsFaqOpen] = useState(false);

  return (
    <div className="mx-auto max-w-[800px]">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground">Contact Lab</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Get in touch with Target Pathology Laboratory
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {contacts.map((c) => {
          const inner = (
            <CardContent className="flex items-start gap-4 p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <c.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">{c.title}</p>
                <p className="text-sm text-foreground mt-0.5">
                  {c.description}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{c.sub}</p>
              </div>
            </CardContent>
          );

          if ("href" in c) {
            return (
              <a
                key={c.title}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline"
              >
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  {inner}
                </Card>
              </a>
            );
          }

          return (
            <Card
              key={c.title}
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={c.title === "FAQ" ? () => setIsFaqOpen(true) : undefined}
            >
              {inner}
            </Card>
          );
        })}
      </div>
      {/* faq wuestions */}
      <Dialog open={isFaqOpen} onOpenChange={setIsFaqOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Frequently Asked Questions</DialogTitle>
            <DialogDescription>
              Common queries and guides for using the laboratory services.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="flex-1 pr-4  mt-4">
            <Accordion type="single" collapsible className="w-full ">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  className="border-0"
                  value={`item-${index}`}
                >
                  <AccordionTrigger className="text-left font-medium hover:no-underline focus:outline-none">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
