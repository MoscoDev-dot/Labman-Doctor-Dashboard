import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { availableTests } from "@/data/mockData";

export default function SuggestTest() {
  const { toast } = useToast();
  const [patientId, setPatientId] = useState("");
  const [selectedTests, setSelectedTests] = useState<string[]>([]);
  const [notes, setNotes] = useState("");

  const toggleTest = (test: string) => {
    setSelectedTests(prev => prev.includes(test) ? prev.filter(t => t !== test) : [...prev, test]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Suggestion sent to laboratory",
      description: "No action required.",
    });
    setPatientId("");
    setSelectedTests([]);
    setNotes("");
  };

  return (
    <div className="mx-auto max-w-lg">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground">Suggest Test</h1>
        <p className="text-sm text-muted-foreground mt-1">Send a test suggestion to the laboratory</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="patient">Patient Identifier (optional)</Label>
              <Input id="patient" placeholder="Enter patient ID or initials" value={patientId} onChange={e => setPatientId(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label>Suggested Tests</Label>
              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto rounded-md border border-border p-3">
                {availableTests.map(test => (
                  <label key={test} className="flex items-center gap-2 text-sm cursor-pointer">
                    <Checkbox checked={selectedTests.includes(test)} onCheckedChange={() => toggleTest(test)} />
                    {test}
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Clinical Notes (optional)</Label>
              <Textarea id="notes" placeholder="Any relevant clinical information..." value={notes} onChange={e => setNotes(e.target.value)} rows={3} />
            </div>

            <Button type="submit" className="w-full" disabled={selectedTests.length === 0}>
              Submit Suggestion
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
