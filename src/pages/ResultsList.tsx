import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { testResults } from "@/data/mockData";

export default function ResultsList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [sectionFilter, setSectionFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const sections = [...new Set(testResults.map((r) => r.section))];

  const filtered = testResults.filter((r) => {
    const matchSearch =
      search === "" ||
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
        <h1 className="text-xl md:text-2xl font-semibold text-foreground">
          Doctor's Results Portal
        </h1>
        <p className="text-xs md:text-sm text-muted-foreground mt-1">
          Clearly browse all laboratory results associated with your practice
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="relative w-full sm:flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search patient, lab..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 md:h-10 text-sm"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <Select value={sectionFilter} onValueChange={setSectionFilter}>
            <SelectTrigger className="w-full sm:w-[150px] h-9 md:h-10 text-sm">
              <SelectValue placeholder="Section" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sections</SelectItem>
              {sections.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[130px] h-9 md:h-10 text-sm">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Final">Final</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Preliminary">Preliminary</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Table */}
      <Card className="overflow-hidden shadow-none border-border">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Lab Number</TableHead>
                <TableHead className="hidden lg:table-cell">Barcode</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead className="hidden sm:table-cell">Test(s)</TableHead>
                <TableHead className="hidden md:table-cell">Section</TableHead>
                <TableHead>Flag</TableHead>
                <TableHead className="hidden xl:table-cell">TAT</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-mono text-[10px] md:text-xs">
                    {r.labNumber}
                  </TableCell>
                  <TableCell className="font-mono text-[10px] md:text-xs hidden lg:table-cell">
                    {r.barcodeId}
                  </TableCell>
                  <TableCell className="text-xs md:text-sm">
                    <div className="flex flex-col">
                      <span className="font-medium">{r.patient.initials}</span>
                      <span className="text-muted-foreground text-[10px]">
                        {r.patient.age}{r.patient.gender}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs md:text-sm hidden sm:table-cell">{r.testName}</TableCell>
                  <TableCell className="text-muted-foreground text-xs hidden md:table-cell">
                    {r.section}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        r.flag === "Critical"
                          ? "destructive"
                          : r.flag === "Abnormal"
                            ? "outline"
                            : "secondary"
                      }
                      className="text-[10px] px-1.5"
                    >
                      {r.flag}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-[10px] text-muted-foreground hidden xl:table-cell">
                    {r.tat}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-primary h-8 px-2"
                      onClick={() => navigate(`/results/${r.id}`)}
                    >
                      Open
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center text-muted-foreground py-8"
                  >
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
