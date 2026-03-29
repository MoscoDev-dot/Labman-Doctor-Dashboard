import { useParams, useNavigate } from "react-router-dom";
import { Download, TrendingUp, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getResultById, getResultsByPatient } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

export default function ResultViewer() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const result = getResultById(id || "");

  if (!result) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Result not found.</p>
      </div>
    );
  }

  const patientResults = getResultsByPatient(result.patient.id).filter(
    (r) => r.id !== result.id,
  );

  return (
    <div className="mx-auto max-w-[1200px] space-y-4 md:space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl md:text-2xl font-semibold text-foreground">
          Result Review
        </h1>
        <p className="text-xs md:text-sm text-muted-foreground">
          {result.labNumber} · {result.testName}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr_200px]">
        {/* Left — Patient Context */}
        <div className="space-y-4 order-2 lg:order-1">
          <Card className="shadow-none border-border">
            <CardHeader className="pb-3 pt-4 px-4">
              <CardTitle className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                Patient
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 px-4 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {result.patient.initials}
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-sm text-foreground truncate">
                    {result.patient.initials}
                  </p>
                  <p className="text-[10px] text-muted-foreground truncate">
                    {result.patient.age}y · {result.patient.gender} · ID{" "}
                    {result.patient.maskedId}
                  </p>
                </div>
              </div>
              {result.patient.clinicalNotes && (
                <div className="rounded-md bg-muted/50 p-2.5 border border-border/40">
                  <p className="text-[10px] font-semibold text-muted-foreground mb-1 uppercase tracking-tight">
                    Clinical Notes
                  </p>
                  <p className="text-xs text-foreground leading-relaxed italic">
                    "{result.patient.clinicalNotes}"
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {patientResults.length > 0 && (
            <Card className="shadow-none border-border">
              <CardHeader className="pb-2 pt-4 px-4">
                <CardTitle className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                  Previous Results
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Accordion type="single" collapsible>
                  {patientResults.map((pr) => (
                    <AccordionItem
                      key={pr.id}
                      value={pr.id}
                      className="border-b-0 px-4 last:pb-2"
                    >
                      <AccordionTrigger className="py-2.5 text-xs hover:no-underline">
                        <div className="flex flex-col items-start text-left">
                          <span className="font-medium">{pr.testName}</span>
                          <span className="text-[10px] text-muted-foreground">
                            {new Date(pr.dateTime).toLocaleDateString()}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="text-[11px] space-y-1.5 pb-2">
                          <p>
                            Result:{" "}
                            <span className="font-bold">
                              {pr.run1} {pr.unit}
                            </span>
                          </p>
                          <p className="text-muted-foreground">
                            Ref: {pr.referenceRange} {pr.unit}
                          </p>
                          <Button
                            className="h-auto p-0 text-[11px] text-white bg-primary px-2 py-1 rounded hover:bg-primary/90"
                            onClick={() => navigate(`/results/${pr.id}`)}
                          >
                            View Full Result →
                          </Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Center — Test Results */}
        <div className="order-1 lg:order-2">
          <Card className="shadow-none border-border">
            <CardHeader className="pb-4 pt-6 px-4 md:px-6">
              <div className="flex items-center justify-between gap-4">
                <CardTitle className="text-lg md:text-xl font-bold">{result.testName}</CardTitle>
                <Badge
                  variant={
                    result.flag === "Critical"
                      ? "destructive"
                      : result.flag === "Abnormal"
                        ? "outline"
                        : "secondary"
                  }
                  className="px-2"
                >
                  {result.flag}
                </Badge>
              </div>
              <p className="text-[10px] md:text-xs text-muted-foreground">
                {result.section} · {result.analyzer}
              </p>
            </CardHeader>
            <CardContent className="space-y-6 px-4 md:px-6 pb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-border p-4 bg-muted/5">
                  <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground mb-1">Current Result</p>
                  <div className="flex items-baseline gap-1">
                    <p
                      className={`text-3xl font-black tracking-tight ${result.flag === "Critical" ? "text-destructive" : "text-foreground"}`}
                    >
                      {result.run1}
                    </p>
                    <span className="text-xs font-semibold text-muted-foreground lowercase">
                      {result.unit}
                    </span>
                  </div>
                </div>
                {result.run2 && (
                  <div className="rounded-xl border border-border p-4 bg-muted/5">
                    <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground mb-1">Repeat Run</p>
                    <div className="flex items-baseline gap-1">
                      <p className="text-3xl font-black tracking-tight text-foreground">
                        {result.run2}
                      </p>
                      <span className="text-xs font-semibold text-muted-foreground lowercase">
                        {result.unit}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="rounded-lg bg-primary/5 p-4 border border-primary/10">
                <p className="text-[10px] uppercase font-bold tracking-wider text-primary mb-1">
                  Reference Range
                </p>
                <p className="text-sm font-bold text-foreground">
                  {result.referenceRange} {result.unit}
                </p>
              </div>

              {result.qcFlag && (
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-muted-foreground font-medium">Quality Control Status:</span>
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-green-100 text-green-800 hover:bg-green-100 border-none">
                    {result.qcFlag}
                  </Badge>
                </div>
              )}

              {result.pathologistComment && (
                <div className="rounded-lg border-l-4 border-primary bg-primary/5 p-4 shadow-sm">
                  <p className="text-[10px] font-bold text-primary mb-1 uppercase tracking-wider">
                    Pathologist Interpretation
                  </p>
                  <p className="text-sm text-foreground leading-relaxed">
                    {result.pathologistComment}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 pt-4 border-t border-border mt-4">
                <div className="flex flex-col gap-1">
                   <span className="text-[10px] uppercase text-muted-foreground font-semibold">Collected</span>
                   <span className="text-xs font-medium">{new Date(result.dateTime).toLocaleString()}</span>
                </div>
                {result.releasedAt && (
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] uppercase text-muted-foreground font-semibold">Validated & Released</span>
                    <span className="text-xs font-medium">{new Date(result.releasedAt).toLocaleString()}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 mt-2">
                   <span className="text-[10px] uppercase text-muted-foreground font-semibold">Report Status:</span>
                   <Badge className="text-[10px] bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-100">
                    {result.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right — Actions */}
        <div className="space-y-2 order-3">
          <Button
            className="w-full justify-start gap-3 h-10 text-sm font-medium bg-primary text-white hover:bg-primary/90"
            onClick={() => toast({ title: "PDF downloading..." })}
          >
            <Download className="h-4 w-4" /> Download PDF
          </Button>
          <Button
            className="w-full justify-start gap-3 h-10 text-sm font-medium bg-primary text-white hover:bg-primary/90"
            onClick={() => navigate(`/patients?highlight=${result.patient.id}`)}
          >
            <TrendingUp className="h-4 w-4" /> View Trend
          </Button>
          <Button
            className="w-full justify-start gap-3 h-10 text-sm font-medium bg-primary text-white hover:bg-primary/90"
            onClick={() =>
              toast({
                title: "Result acknowledged",
                description: "Thank you for reviewing.",
              })
            }
          >
            <CheckCircle className="h-4 w-4" /> Acknowledge
          </Button>

          <ReferralModal patientName={result.patient.initials} />
        </div>
      </div>
    </div>
  );
}

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { useState } from "react";
import { UserPlus } from "lucide-react";

function ReferralModal({ patientName }: { patientName: string }) {
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const doctors = [
    { id: "D001", name: "Dr. Sarah Jenkins", specialty: "Cardiology" },
    { id: "D002", name: "Dr. Michael Chen", specialty: "Endocrinology" },
    { id: "D003", name: "Dr. Elena Rodriguez", specialty: "Nephrology" },
  ];

  const handleRefer = () => {
    const doctor = doctors.find((d) => d.id === selectedDoctor);
    setOpen(false);
    toast({
      title: "Patient Referred Successfully",
      description: `Referred ${patientName} to ${doctor?.name}.`,
    });

    // Redirect to patient history
    navigate("/patients");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full justify-start gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
          <UserPlus className="h-4 w-4" /> Refer Patient
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Refer Patient</DialogTitle>
          <DialogDescription>
            Select a doctor to refer {patientName} to. You can only select one
            doctor.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                onClick={() => setSelectedDoctor(doctor.id)}
                className={`flex items-center justify-between p-3 rounded-md border cursor-pointer transition-colors ${
                  selectedDoctor === doctor.id
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border hover:bg-muted"
                }`}
              >
                <div>
                  <p className="font-medium text-sm">{doctor.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {doctor.specialty}
                  </p>
                </div>
                {selectedDoctor === doctor.id && (
                  <CheckCircle className="h-4 w-4 text-primary" />
                )}
              </div>
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button className="bg-white text-primary hover:bg-gray-100 border border-primary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleRefer} disabled={!selectedDoctor}>
            Complete Referral
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
