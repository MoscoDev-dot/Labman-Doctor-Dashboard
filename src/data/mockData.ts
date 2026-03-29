// Mock data for LABMAN3 Doctor Web App

export interface Patient {
  id: string;
  initials: string;
  age: number;
  gender: "M" | "F";
  maskedId: string;
  clinicalNotes?: string;
  referral?: {
    doctorName: string;
    date: string;
  };
}

export interface TestResult {
  id: string;
  labNumber: string;
  barcodeId: string;
  patient: Patient;
  testName: string;
  section: string;
  analyzer: string;
  run1: string;
  run2?: string;
  referenceRange: string;
  unit: string;
  flag: "Critical" | "Normal" | "Abnormal";
  qcFlag?: string;
  pathologistComment?: string;
  status: "Final" | "Pending" | "Preliminary";
  tat: string;
  dateTime: string;
  releasedAt?: string;
}

export interface CriticalAlert {
  id: string;
  patient: Patient;
  testName: string;
  criticalValue: string;
  unit: string;
  timeFlagged: string;
  resultId: string;
}

export const patients: Patient[] = [
  {
    id: "P001",
    initials: "JM",
    age: 54,
    gender: "M",
    maskedId: "****4521",
    clinicalNotes: "Hypertension, Type 2 DM",
    referral: { doctorName: "Dr. Sarah Jenkins", date: "2026-02-25" },
  },
  {
    id: "P002",
    initials: "AS",
    age: 32,
    gender: "F",
    maskedId: "****7834",
    clinicalNotes: "Pregnancy — 28 weeks",
  },
  {
    id: "P003",
    initials: "RK",
    age: 67,
    gender: "M",
    maskedId: "****1298",
    clinicalNotes: "CKD Stage 3, on dialysis",
  },
  { id: "P004", initials: "TN", age: 45, gender: "F", maskedId: "****5567" },
  {
    id: "P005",
    initials: "BW",
    age: 78,
    gender: "M",
    maskedId: "****9012",
    clinicalNotes: "Post-CABG, on warfarin",
  },
  { id: "P006", initials: "LG", age: 29, gender: "F", maskedId: "****3345" },
  {
    id: "P007",
    initials: "DH",
    age: 61,
    gender: "M",
    maskedId: "****6678",
    clinicalNotes: "Liver cirrhosis",
  },
  {
    id: "P008",
    initials: "MP",
    age: 41,
    gender: "F",
    maskedId: "****2201",
    clinicalNotes: "SLE, on immunosuppression",
  },
];

export const testResults: TestResult[] = [
  {
    id: "R001",
    labNumber: "LAB-2026-0451",
    barcodeId: "BC00451",
    patient: patients[0],
    testName: "Potassium",
    section: "Chemistry",
    analyzer: "Cobas c702",
    run1: "6.8",
    run2: "6.9",
    referenceRange: "3.5–5.1",
    unit: "mmol/L",
    flag: "Critical",
    qcFlag: "Pass",
    pathologistComment:
      "Confirmed on repeat. Suggest urgent clinical correlation.",
    status: "Final",
    tat: "45 min",
    dateTime: "2026-02-19T08:30:00",
    releasedAt: "2026-02-19T09:15:00",
  },
  {
    id: "R002",
    labNumber: "LAB-2026-0452",
    barcodeId: "BC00452",
    patient: patients[1],
    testName: "Haemoglobin",
    section: "Haematology",
    analyzer: "Sysmex XN-1000",
    run1: "8.2",
    referenceRange: "12.0–16.0",
    unit: "g/dL",
    flag: "Abnormal",
    status: "Final",
    tat: "30 min",
    dateTime: "2026-02-19T07:45:00",
    releasedAt: "2026-02-19T08:15:00",
  },
  {
    id: "R003",
    labNumber: "LAB-2026-0453",
    barcodeId: "BC00453",
    patient: patients[2],
    testName: "Creatinine",
    section: "Chemistry",
    analyzer: "Cobas c702",
    run1: "8.4",
    run2: "8.6",
    referenceRange: "0.7–1.3",
    unit: "mg/dL",
    flag: "Critical",
    qcFlag: "Pass",
    pathologistComment: "Markedly elevated. Consistent with known CKD.",
    status: "Final",
    tat: "50 min",
    dateTime: "2026-02-19T09:00:00",
    releasedAt: "2026-02-19T09:50:00",
  },
  {
    id: "R004",
    labNumber: "LAB-2026-0454",
    barcodeId: "BC00454",
    patient: patients[3],
    testName: "TSH",
    section: "Immunology",
    analyzer: "Cobas e801",
    run1: "4.2",
    referenceRange: "0.27–4.20",
    unit: "mIU/L",
    flag: "Normal",
    status: "Final",
    tat: "1h 20min",
    dateTime: "2026-02-19T06:30:00",
    releasedAt: "2026-02-19T07:50:00",
  },
  {
    id: "R005",
    labNumber: "LAB-2026-0455",
    barcodeId: "BC00455",
    patient: patients[4],
    testName: "INR",
    section: "Haematology",
    analyzer: "Stago STA-R Max",
    run1: "4.8",
    referenceRange: "2.0–3.0",
    unit: "",
    flag: "Critical",
    qcFlag: "Pass",
    pathologistComment: "Supratherapeutic. Consider dose adjustment.",
    status: "Final",
    tat: "35 min",
    dateTime: "2026-02-19T10:00:00",
    releasedAt: "2026-02-19T10:35:00",
  },
  {
    id: "R006",
    labNumber: "LAB-2026-0456",
    barcodeId: "BC00456",
    patient: patients[5],
    testName: "Glucose (Fasting)",
    section: "Chemistry",
    analyzer: "Cobas c702",
    run1: "5.1",
    referenceRange: "3.9–5.8",
    unit: "mmol/L",
    flag: "Normal",
    status: "Final",
    tat: "25 min",
    dateTime: "2026-02-19T07:00:00",
    releasedAt: "2026-02-19T07:25:00",
  },
  {
    id: "R007",
    labNumber: "LAB-2026-0457",
    barcodeId: "BC00457",
    patient: patients[6],
    testName: "ALT",
    section: "Chemistry",
    analyzer: "Cobas c702",
    run1: "112",
    referenceRange: "7–56",
    unit: "U/L",
    flag: "Abnormal",
    status: "Pending",
    tat: "—",
    dateTime: "2026-02-19T11:00:00",
  },
  {
    id: "R008",
    labNumber: "LAB-2026-0458",
    barcodeId: "BC00458",
    patient: patients[7],
    testName: "CRP",
    section: "Immunology",
    analyzer: "Cobas c702",
    run1: "48",
    referenceRange: "0–5",
    unit: "mg/L",
    flag: "Abnormal",
    pathologistComment: "Elevated. Suggest monitoring.",
    status: "Final",
    tat: "40 min",
    dateTime: "2026-02-18T14:00:00",
    releasedAt: "2026-02-18T14:40:00",
  },
  {
    id: "R009",
    labNumber: "LAB-2026-0459",
    barcodeId: "BC00459",
    patient: patients[0],
    testName: "Sodium",
    section: "Chemistry",
    analyzer: "Cobas c702",
    run1: "138",
    referenceRange: "136–145",
    unit: "mmol/L",
    flag: "Normal",
    status: "Final",
    tat: "45 min",
    dateTime: "2026-02-19T08:30:00",
    releasedAt: "2026-02-19T09:15:00",
  },
  {
    id: "R010",
    labNumber: "LAB-2026-0460",
    barcodeId: "BC00460",
    patient: patients[2],
    testName: "Urea",
    section: "Chemistry",
    analyzer: "Cobas c702",
    run1: "42",
    referenceRange: "7–20",
    unit: "mg/dL",
    flag: "Abnormal",
    status: "Final",
    tat: "50 min",
    dateTime: "2026-02-18T09:00:00",
    releasedAt: "2026-02-18T09:50:00",
  },
];

export const criticalAlerts: CriticalAlert[] = [
  {
    id: "CA1",
    patient: patients[0],
    testName: "Potassium",
    criticalValue: "6.8 mmol/L",
    unit: "mmol/L",
    timeFlagged: "15 min ago",
    resultId: "R001",
  },
  {
    id: "CA2",
    patient: patients[2],
    testName: "Creatinine",
    criticalValue: "8.4 mg/dL",
    unit: "mg/dL",
    timeFlagged: "32 min ago",
    resultId: "R003",
  },
  {
    id: "CA3",
    patient: patients[4],
    testName: "INR",
    criticalValue: "4.8",
    unit: "",
    timeFlagged: "1h ago",
    resultId: "R005",
  },
];


export function getResultsByPatient(patientId: string): TestResult[] {
  return testResults.filter((r) => r.patient.id === patientId);
}

export function getResultById(resultId: string): TestResult | undefined {
  return testResults.find((r) => r.id === resultId);
}
