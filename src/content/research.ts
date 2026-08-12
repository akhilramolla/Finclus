import type { Confidence } from "@/content/facts";

export type ResearchStreamId =
  | "regulation"
  | "schemes"
  | "lender-products"
  | "eligibility"
  | "sector"
  | "risk";

export interface ResearchFinding {
  id: string;
  label: string;
  detail: string;
  source: string;
  confidence: Confidence;
  factId?: string;
}

export interface ResearchStream {
  id: ResearchStreamId;
  title: string;
  question: string;
  findings: ResearchFinding[];
}

export const researchStreams: ResearchStream[] = [
  {
    id: "regulation",
    title: "Regulation",
    question: "Which constraints govern a safe recommendation?",
    findings: [
      { id: "reg-1", label: "Human decision boundary", detail: "The facility movement remains an explicit, evaluated borrower request and a recorded human action.", source: "RBI Digital Lending Directions 2025", confidence: "verified", factId: "rbi.dl2025.limit" },
      { id: "reg-2", label: "Model risk posture", detail: "Material decisions need oversight, validation, explainability and third-party accountability.", source: "RBI draft MRM guidance", confidence: "verified", factId: "rbi.mrm.draft" },
    ],
  },
  {
    id: "schemes",
    title: "Government schemes",
    question: "Which support is plausible, and which is a rule-out?",
    findings: [
      { id: "sch-1", label: "CEFPPC pathway", detail: "Project size and food-processing activity make the CEFPPC pathway worth verifying before sanction.", source: "MoFPI scheme record", confidence: "verified", factId: "pmksy.cefppc" },
      { id: "sch-2", label: "PMFME rule-out", detail: "The anchor is outside the micro-enterprise pathway; do not present this subsidy as available.", source: "MoFPI scheme record", confidence: "verified", factId: "pmfme.ruleout" },
    ],
  },
  {
    id: "lender-products",
    title: "Lender products",
    question: "What bank facility structure matches the need?",
    findings: [
      { id: "prod-1", label: "Recommended structure", detail: "Term finance for plant and cold room, paired with a working-capital line for the operating cycle.", source: "LOS application · ARN LOS-03417", confidence: "simulated" },
      { id: "prod-2", label: "Credit enhancement", detail: "The guarantee route is a product option to verify alongside security and documentation.", source: "CGTMSE product screen", confidence: "verified", factId: "cgtmse.ceiling" },
    ],
  },
  {
    id: "eligibility",
    title: "Eligibility",
    question: "What must be true before the file can move?",
    findings: [
      { id: "elig-1", label: "Operating evidence", detail: "Nine years of operations, an existing 6 TPD line and a documented procurement footprint support the next review.", source: "DPR and borrower declaration", confidence: "simulated" },
      { id: "elig-2", label: "Open dependencies", detail: "Land-use conversion, HT load sanction, FSSAI and subsidy conditions remain visible actions.", source: "Application checklist", confidence: "simulated" },
    ],
  },
  {
    id: "sector",
    title: "Sector",
    question: "What does the local operating context add?",
    findings: [
      { id: "sector-1", label: "Input network", detail: "Procurement spans Kuppam, Gudupalle, Ramakuppam and Santhipuram, creating a traceable offtake signal.", source: "Procurement ledger", confidence: "simulated" },
      { id: "sector-2", label: "Policy fit", detail: "Andhra Pradesh food-processing support is a lead, not a final eligibility opinion.", source: "Government of Andhra Pradesh", confidence: "illustrative", factId: "ap.foodproc4" },
    ],
  },
  {
    id: "risk",
    title: "Risk",
    question: "Which uncertainty must be carried into appraisal?",
    findings: [
      { id: "risk-1", label: "Turnover conflict", detail: "Audited, GSTN and AA-derived turnover disagree. The fabric carries the conflict to credit review.", source: "Audited financials · GSTN · AA", confidence: "simulated" },
      { id: "risk-2", label: "Land record freshness", detail: "A later record may change the approval path; source date and challenge history stay attached.", source: "District land-record extract", confidence: "simulated" },
    ],
  },
];

export const researchPlanner = ["Regulation", "Government schemes", "Lender products", "Eligibility", "Sector", "Risk"] as const;
