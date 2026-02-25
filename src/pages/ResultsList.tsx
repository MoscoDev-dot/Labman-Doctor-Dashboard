import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { testResults } from "@/data/mockData";

export default function ResultsList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [sectionFilter, setSectionFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const sections = [...new Set(testResults.map(r => r.section))];

  const filtered = testResults.filter(r => {
    const matchSearch = search === "" ||
      r.patient.initials.toLowerCase().includes(search.toLowerCase()) ||
      r.labNumber.toLowerCase().includes(search.toLowerCase()) ||
      r.testName.toLowerCase().includes(search.toLowerCase());
    const matchSection = sectionFilter === "all" || r.section === sectionFilter;
    const matchStatus = statusFilter === "all" || r.status === statusFilter;
    return matchSearch && matchSection && matchStatus;
  });

  return (
    <div className="mx-auto max-w-[1200px] space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Results</h1>
        <p className="text-sm text-muted-foreground mt-1">Browse all laboratory results</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search patient, lab number, test..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={sectionFilter} onValueChange={setSectionFilter}>
          <SelectTrigger className="w-[160px]"><SelectValue placeholder="Section" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sections</SelectItem>
            {sections.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[140px]"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Final">Final</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Preliminary">Preliminary</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Lab Number</TableHead>
              <TableHead>Barcode</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Test(s)</TableHead>
              <TableHead>Section</TableHead>
              <TableHead>Flag</TableHead>
              <TableHead>TAT</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(r => (
              <TableRow key={r.id}>
                <TableCell className="font-mono text-xs">{r.labNumber}</TableCell>
                <TableCell className="font-mono text-xs">{r.barcodeId}</TableCell>
                <TableCell>
                  <span className="font-medium">{r.patient.initials}</span>
                  <span className="text-muted-foreground text-xs ml-1">{r.patient.age}{r.patient.gender}</span>
                </TableCell>
                <TableCell>{r.testName}</TableCell>
                <TableCell className="text-muted-foreground">{r.section}</TableCell>
                <TableCell>
                  <Badge
                    variant={r.flag === "Critical" ? "destructive" : r.flag === "Abnormal" ? "outline" : "secondary"}
                    className="text-xs"
                  >
                    {r.flag}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">{r.tat}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="text-xs text-primary" onClick={() => navigate(`/results/${r.id}`)}>
                    Open
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
