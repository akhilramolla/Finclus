export type EwsSeverity = "amber" | "red";

export interface EwsSignal {
  id: string;
  label: string;
  value: string;
  source: string;
  artefact: string;
  sanctionAssumption: string;
  violation: string;
  action: string;
  severity: EwsSeverity;
}

export const ewsSignals: EwsSignal[] = [
  {
    id: "gstr3b-delay",
    label: "GSTR-3B filing delayed",
    value: "Filing cadence broken",
    source: "GSTN",
    artefact: "GST-3B-FY26-06",
    sanctionAssumption: "Statutory filings remain timely",
    violation: "A filing control that supported the sanction-time operating case is no longer holding.",
    action: "RM asks for filing status and ageing",
    severity: "amber"
  },
  {
    id: "turnover-drop",
    label: "Turnover down QoQ",
    value: "-14% quarter on quarter",
    source: "GSTN",
    artefact: "GST-ROLLUP-FY26-Q2",
    sanctionAssumption: "Revenue ramps toward the projected turnover path",
    violation: "The observed run-rate is below the revenue trajectory used in repayment capacity.",
    action: "Re-spread current quarter and test DSCR",
    severity: "red"
  },
  {
    id: "gstr-mismatch",
    label: "GSTR-1 vs GSTR-3B mismatch",
    value: "Invoiced > tax paid",
    source: "GSTN",
    artefact: "GST-CROSSCHECK-FY26-06",
    sanctionAssumption: "Reported sales reconcile to tax-paid sales",
    violation: "Invoicing is running ahead of tax-paid turnover, weakening the source agreement.",
    action: "Route reconciliation to credit review",
    severity: "red"
  },
  {
    id: "aa-credits",
    label: "AA bank credits below plan",
    value: "-19% vs sanction projection",
    source: "Account Aggregator",
    artefact: "AA-03417-MONTHLY-06",
    sanctionAssumption: "Bank credits track the sanctioned cash-flow projection",
    violation: "Actual cash inflows are below the level underwriting the debt-service case.",
    action: "Inspect collections and working-capital cycle",
    severity: "red"
  },
  {
    id: "mca-charge",
    label: "MCA: new charge registered",
    value: "Fresh borrowing / security dilution",
    source: "MCA",
    artefact: "MCA-CHARGE-2026-09",
    sanctionAssumption: "Existing security remains available and undisclosed borrowing is absent",
    violation: "A new charge changes the security and priority picture after sanction.",
    action: "Obtain charge documents and security position",
    severity: "red"
  },
  {
    id: "buyer-concentration",
    label: "Buyer concentration increased",
    value: "31% → 58% of receipts",
    source: "AA bank credits",
    artefact: "AA-03417-BUYER-MIX-06",
    sanctionAssumption: "Receipts remain diversified across buyers",
    violation: "One buyer now represents materially more of observed receipts than the sanction case assumed.",
    action: "Validate buyer contract and receivable ageing",
    severity: "amber"
  }
];
