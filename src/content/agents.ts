export interface CreditAgent {
  id: string;
  name: string;
  objective: string;
  recommendation: string;
  strongestArgument: string;
  accent: "bank" | "fabric" | "human" | "risk";
}

export const creditAgents: CreditAgent[] = [
  {
    id: "credit",
    name: "Credit",
    objective: "Test repayment capacity and structure.",
    recommendation: "Proceed subject to CPs and credit review of turnover.",
    strongestArgument: "The base projection clears the DSCR floor; the unresolved turnover variance must not be averaged away.",
    accent: "bank"
  },
  {
    id: "project",
    name: "Project",
    objective: "Test completion, operating cycle and execution.",
    recommendation: "Proceed with staged drawdown and approval evidence before subsidy claim.",
    strongestArgument: "The existing 6 TPD line and defined cold-storage scope make the expansion legible, but approvals remain gating items.",
    accent: "fabric"
  },
  {
    id: "policy",
    name: "Policy",
    objective: "Map the request to products, schemes and delegation.",
    recommendation: "Eligible pathway identified; route the deviation one level up.",
    strongestArgument: "A decision record can preserve both the eligible pathway and the explicit rule-outs.",
    accent: "human"
  },
  {
    id: "risk",
    name: "Risk",
    objective: "Find downside cases before sanction.",
    recommendation: "Condition raw-material escalation and land-use evidence.",
    strongestArgument: "Grant delay creates a funding gap and pulls the minimum DSCR below the floor.",
    accent: "risk"
  },
  {
    id: "fraud",
    name: "Fraud",
    objective: "Challenge identity, source integrity and inconsistent signals.",
    recommendation: "Hold the turnover conflict for officer review; do not classify from a model flag.",
    strongestArgument: "Source disagreement is itself evidence. A confident reconciliation would create a new control failure.",
    accent: "risk"
  },
  {
    id: "adversarial",
    name: "Adversarial",
    objective: "Prevent this sanction by making the strongest case against it.",
    recommendation: "Do not sanction until the turnover review and corrected land-use record are attached.",
    strongestArgument: "The most dangerous output is a smooth memo that hides unresolved evidence and stale data.",
    accent: "human"
  }
];
