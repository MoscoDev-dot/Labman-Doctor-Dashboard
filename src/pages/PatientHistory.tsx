import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { patients, getResultsByPatient } from "@/data/mockData";

export default function PatientHistory() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const highlightId = searchParams.get("highlight");
  const [search, setSearch] = useState("");
  const [selectedPatientId, setSelectedPatientId] = useState<string>(
    highlightId || patients[0].id,
  );

  const filteredPatients = patients.filter(
    (p) =>
      search === "" ||
      p.initials.toLowerCase().includes(search.toLowerCase()) ||
      p.maskedId.includes(search),
  );

  const selectedPatient = patients.find((p) => p.id === selectedPatientId);
  const patientResults = selectedPatientId
    ? getResultsByPatient(selectedPatientId)
    : [];

  return (
    <div className="mx-auto max-w-[1200px] space-y-4 md:space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-semibold text-foreground">
          Patient History
        </h1>
        <p className="text-xs md:text-sm text-muted-foreground mt-1">
          View patient test timeline
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
        {/* Left — Patient List */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search patients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 text-sm"
            />
          </div>
          <div className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-y-auto lg:max-h-[calc(100vh-220px)] pb-2 lg:pb-0 scrollbar-none">
            {filteredPatients.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPatientId(p.id)}
                className={`flex shrink-0 w-[200px] lg:w-full items-center gap-3 rounded-md px-3 py-2 text-left transition-colors border lg:border-0 ${
                  selectedPatientId === p.id
                    ? "bg-primary/10 text-primary border-primary/20 lg:bg-primary/10"
                    : "hover:bg-muted border-transparent"
                }`}
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-semibold">
                  {p.initials}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{p.initials}</p>
                  <p className="text-[10px] text-muted-foreground truncate">
                    {p.age}y · {p.gender} · {p.maskedId}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right — Timeline */}
        <div className="min-w-0">
          {selectedPatient && (
            <Card className="mb-6 shadow-none border-border">
              <CardContent className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
                  {selectedPatient.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-foreground">
                    {selectedPatient.initials}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {selectedPatient.age}y · {selectedPatient.gender} · ID{" "}
                    {selectedPatient.maskedId}
                  </p>
                  {selectedPatient.clinicalNotes && (
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {selectedPatient.clinicalNotes}
                    </p>
                  )}
                  {selectedPatient.referral && (
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <Badge
                        variant="outline"
                        className="text-[10px] bg-primary/5 text-primary border-primary/20 px-1.5 py-0"
                      >
                        REFERRED
                      </Badge>
                      <p className="text-xs font-medium text-foreground">
                        to {selectedPatient.referral.doctorName}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {patientResults.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-sm text-muted-foreground">
                No results for this patient.
              </p>
            </div>
          ) : (
            <div className="relative space-y-0 pl-6 pr-2">
              <div className="absolute left-[11px] top-2 bottom-2 w-px bg-border" />
              {patientResults.map((r) => (
                <div key={r.id} className="relative flex gap-4 pb-8 last:pb-2">
                  <div className="absolute left-[-17px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-primary bg-card" />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <p className="text-sm font-semibold text-foreground">
                        {r.testName}
                      </p>
                      <Badge
                        variant={
                          r.flag === "Critical"
                            ? "destructive"
                            : r.flag === "Abnormal"
                              ? "outline"
                              : "secondary"
                        }
                        className="text-[10px] px-1.5 py-0"
                      >
                        {r.flag}
                      </Badge>
                    </div>
                    <p className="text-[10px] text-muted-foreground">
                      {new Date(r.dateTime).toLocaleString(undefined, {
                        dateStyle: 'medium',
                        timeStyle: 'short'
                      })}
                    </p>
                    <div className="mt-2 bg-muted/30 rounded-md p-2 border border-border/40">
                      <p className="text-xs md:text-sm">
                        Result:{" "}
                        <span className="font-bold text-foreground">
                          {r.run1} {r.unit}
                        </span>
                        <span className="text-muted-foreground ml-2 italic text-[10px] md:text-xs">
                          (Ref: {r.referenceRange})
                        </span>
                      </p>
                    </div>
                    <Button
                      variant="link"
                      className="h-auto p-0 text-xs mt-2 text-primary font-medium"
                      onClick={() => navigate(`/results/${r.id}`)}
                    >
                      View Full Result →
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
