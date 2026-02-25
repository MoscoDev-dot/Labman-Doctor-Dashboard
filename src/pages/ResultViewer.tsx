import { useParams, useNavigate } from "react-router-dom";
import { Download, TrendingUp, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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

  const patientResults = getResultsByPatient(result.patient.id).filter(r => r.id !== result.id);

  return (
    <div className="mx-auto max-w-[1200px]">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground">Result Review</h1>
        <p className="text-sm text-muted-foreground mt-1">{result.labNumber} · {result.testName}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr_200px]">
        {/* Left — Patient Context */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm uppercase tracking-wide text-muted-foreground">Patient</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {result.patient.initials}
                </div>
                <div>
                  <p className="font-medium text-foreground">{result.patient.initials}</p>
                  <p className="text-xs text-muted-foreground">{result.patient.age}y · {result.patient.gender} · ID {result.patient.maskedId}</p>
                </div>
              </div>
              {result.patient.clinicalNotes && (
                <div className="mt-3 rounded-md bg-muted p-3">
                  <p className="text-xs font-medium text-muted-foreground mb-1">Clinical Notes</p>
                  <p className="text-sm text-foreground">{result.patient.clinicalNotes}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {patientResults.length > 0 && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm uppercase tracking-wide text-muted-foreground">Previous Results</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Accordion type="single" collapsible>
                  {patientResults.map(pr => (
                    <AccordionItem key={pr.id} value={pr.id} className="border-b-0 px-4">
                      <AccordionTrigger className="py-3 text-sm hover:no-underline">
                        <div className="flex flex-col items-start text-left">
                          <span className="font-medium">{pr.testName}</span>
                          <span className="text-xs text-muted-foreground">{new Date(pr.dateTime).toLocaleDateString()}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="text-sm space-y-1 pb-2">
                          <p>Result: <span className="font-medium">{pr.run1} {pr.unit}</span></p>
                          <p className="text-xs text-muted-foreground">Ref: {pr.referenceRange} {pr.unit}</p>
                          <Button
                            variant="link"
                            className="h-auto p-0 text-xs"
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
        <div>
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{result.testName}</CardTitle>
                <Badge
                  variant={result.flag === "Critical" ? "destructive" : result.flag === "Abnormal" ? "outline" : "secondary"}
                >
                  {result.flag}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{result.section} · {result.analyzer}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-md border border-border p-3">
                  <p className="text-xs text-muted-foreground mb-1">Run 1</p>
                  <p className={`text-2xl font-bold ${result.flag === "Critical" ? "text-destructive" : result.flag === "Abnormal" ? "text-foreground" : "text-foreground"}`}>
                    {result.run1}
                    <span className="ml-1 text-sm font-normal text-muted-foreground">{result.unit}</span>
                  </p>
                </div>
                {result.run2 && (
                  <div className="rounded-md border border-border p-3">
                    <p className="text-xs text-muted-foreground mb-1">Run 2</p>
                    <p className="text-2xl font-bold text-foreground">
                      {result.run2}
                      <span className="ml-1 text-sm font-normal text-muted-foreground">{result.unit}</span>
                    </p>
                  </div>
                )}
              </div>

              <div className="rounded-md bg-muted p-3">
                <p className="text-xs text-muted-foreground mb-1">Reference Range</p>
                <p className="text-sm font-medium text-foreground">{result.referenceRange} {result.unit}</p>
              </div>

              {result.qcFlag && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">QC:</span>
                  <Badge variant="secondary" className="text-xs">{result.qcFlag}</Badge>
                </div>
              )}

              {result.pathologistComment && (
                <div className="rounded-md border-l-2 border-primary bg-primary/5 p-3">
                  <p className="text-xs font-medium text-muted-foreground mb-1">Pathologist Comment</p>
                  <p className="text-sm text-foreground">{result.pathologistComment}</p>
                </div>
              )}

              <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t border-border">
                <span>Collected: {new Date(result.dateTime).toLocaleString()}</span>
                {result.releasedAt && <span>Released: {new Date(result.releasedAt).toLocaleString()}</span>}
                <Badge variant="secondary" className="text-xs">{result.status}</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right — Actions */}
        <div className="space-y-2">
          <Button variant="outline" className="w-full justify-start gap-2" onClick={() => toast({ title: "PDF downloading..." })}>
            <Download className="h-4 w-4" /> Download PDF
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start gap-2"
            onClick={() => navigate(`/patients?highlight=${result.patient.id}`)}
          >
            <TrendingUp className="h-4 w-4" /> View Trend
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start gap-2"
            onClick={() => toast({ title: "Result acknowledged", description: "Thank you for reviewing." })}
          >
            <CheckCircle className="h-4 w-4" /> Acknowledge
          </Button>
        </div>
      </div>
    </div>
  );
}
