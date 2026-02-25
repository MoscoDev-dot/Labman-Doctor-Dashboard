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
  const [selectedPatientId, setSelectedPatientId] = useState<string>(highlightId || patients[0].id);

  const filteredPatients = patients.filter(p =>
    search === "" || p.initials.toLowerCase().includes(search.toLowerCase()) || p.maskedId.includes(search)
  );

  const selectedPatient = patients.find(p => p.id === selectedPatientId);
  const patientResults = selectedPatientId ? getResultsByPatient(selectedPatientId) : [];

  return (
    <div className="mx-auto max-w-[1200px]">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground">Patient History</h1>
        <p className="text-sm text-muted-foreground mt-1">View patient test timeline</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[300px_1fr]">
        {/* Left — Patient List */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search patients..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
          </div>
          <div className="space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto">
            {filteredPatients.map(p => (
              <button
                key={p.id}
                onClick={() => setSelectedPatientId(p.id)}
                className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left transition-colors ${
                  selectedPatientId === p.id ? "bg-primary/10 text-primary" : "hover:bg-muted"
                }`}
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-xs font-semibold">
                  {p.initials}
                </div>
                <div>
                  <p className="text-sm font-medium">{p.initials}</p>
                  <p className="text-xs text-muted-foreground">{p.age}y · {p.gender} · {p.maskedId}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right — Timeline */}
        <div>
          {selectedPatient && (
            <Card className="mb-4">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
                  {selectedPatient.initials}
                </div>
                <div>
                  <p className="font-medium text-foreground">{selectedPatient.initials}</p>
                  <p className="text-sm text-muted-foreground">{selectedPatient.age}y · {selectedPatient.gender} · ID {selectedPatient.maskedId}</p>
                  {selectedPatient.clinicalNotes && (
                    <p className="text-xs text-muted-foreground mt-0.5">{selectedPatient.clinicalNotes}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {patientResults.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">No results for this patient.</p>
          ) : (
            <div className="relative space-y-0 pl-6">
              <div className="absolute left-[11px] top-2 bottom-2 w-px bg-border" />
              {patientResults.map(r => (
                <div key={r.id} className="relative flex gap-4 pb-6">
                  <div className="absolute left-[-17px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-primary bg-card" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-foreground">{r.testName}</p>
                      <Badge variant={r.flag === "Critical" ? "destructive" : r.flag === "Abnormal" ? "outline" : "secondary"} className="text-[10px]">
                        {r.flag}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{new Date(r.dateTime).toLocaleString()}</p>
                    <p className="text-sm mt-1">
                      Result: <span className="font-medium">{r.run1} {r.unit}</span>
                      <span className="text-muted-foreground ml-2">(Ref: {r.referenceRange})</span>
                    </p>
                    <Button variant="link" className="h-auto p-0 text-xs mt-1" onClick={() => navigate(`/results/${r.id}`)}>
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
