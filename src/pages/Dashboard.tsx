import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { criticalAlerts, testResults } from "@/data/mockData";

export default function Dashboard() {
  const navigate = useNavigate();
  const recentResults = testResults.slice(0, 6);

  return (
    <div className="mx-auto max-w-[1200px] space-y-6 md:space-y-8">
      <div>
        <h1 className="text-xl md:text-2xl font-semibold text-foreground">Dashboard</h1>
        <p className="text-xs md:text-sm text-muted-foreground mt-1">Overview of critical alerts and recent results</p>
      </div>

      {/* Critical Alerts */}
      {criticalAlerts.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <h2 className="text-xs font-semibold uppercase tracking-wide text-destructive">
              Critical Results Requiring Attention
            </h2>
          </div>
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {criticalAlerts.map(alert => (
              <Card key={alert.id} className="border-destructive/30 bg-destructive/5 shadow-none">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-sm md:text-base text-foreground">{alert.testName}</p>
                      <p className="text-lg font-bold text-destructive">{alert.criticalValue}</p>
                    </div>
                    <Badge variant="destructive" className="text-[10px] px-1.5 py-0">CRITICAL</Badge>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      {alert.patient.initials}, {alert.patient.age}{alert.patient.gender}
                    </p>
                    <p className="text-xs text-muted-foreground">{alert.timeFlagged}</p>
                  </div>
                  <Button
                    variant="link"
                    className="mt-2 h-auto p-0 text-xs text-primary"
                    onClick={() => navigate(`/results/${alert.resultId}`)}
                  >
                    View Result →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Recent Results */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
          Recent Results
        </h2>
        <Card className="overflow-hidden shadow-none border-border">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Lab Number</TableHead>
                  <TableHead className="hidden md:table-cell">Barcode</TableHead>
                  <TableHead>Test</TableHead>
                  <TableHead className="hidden sm:table-cell">Section</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden lg:table-cell">TAT</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentResults.map(result => (
                  <TableRow key={result.id}>
                    <TableCell className="font-mono text-[10px] md:text-xs">{result.labNumber}</TableCell>
                    <TableCell className="font-mono text-[10px] md:text-xs hidden md:table-cell">{result.barcodeId}</TableCell>
                    <TableCell className="text-xs md:text-sm">{result.testName}</TableCell>
                    <TableCell className="text-muted-foreground text-xs hidden sm:table-cell">{result.section}</TableCell>
                    <TableCell>
                      <Badge variant={result.status === "Final" ? "secondary" : "outline"} className="text-[10px] md:text-xs px-1.5">
                        {result.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-[10px] md:text-xs hidden lg:table-cell">{result.tat}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 text-xs text-primary"
                        onClick={() => navigate(`/results/${result.id}`)}
                      >
                        Review
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </section>
    </div>
  );
}
