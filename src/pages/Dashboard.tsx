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
    <div className="mx-auto max-w-[1200px] space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Overview of critical alerts and recent results</p>
      </div>

      {/* Critical Alerts */}
      {criticalAlerts.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <h2 className="text-sm font-semibold uppercase tracking-wide text-destructive">
              Critical Results Requiring Attention
            </h2>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {criticalAlerts.map(alert => (
              <Card key={alert.id} className="border-destructive/30 bg-destructive/5">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-foreground">{alert.testName}</p>
                      <p className="text-lg font-bold text-destructive">{alert.criticalValue}</p>
                    </div>
                    <Badge variant="destructive" className="text-[10px]">CRITICAL</Badge>
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
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
          Recent Results
        </h2>
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lab Number</TableHead>
                <TableHead>Barcode</TableHead>
                <TableHead>Test</TableHead>
                <TableHead>Section</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>TAT</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentResults.map(result => (
                <TableRow key={result.id}>
                  <TableCell className="font-mono text-xs">{result.labNumber}</TableCell>
                  <TableCell className="font-mono text-xs">{result.barcodeId}</TableCell>
                  <TableCell>{result.testName}</TableCell>
                  <TableCell className="text-muted-foreground">{result.section}</TableCell>
                  <TableCell>
                    <Badge variant={result.status === "Final" ? "secondary" : "outline"} className="text-xs">
                      {result.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs">{result.tat}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-primary"
                      onClick={() => navigate(`/results/${result.id}`)}
                    >
                      Review
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </section>
    </div>
  );
}
