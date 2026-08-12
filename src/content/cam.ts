export interface CamEvidence {
  source: string;
  artefact: string;
  timestamp: string;
}

export interface CamSection {
  id: string;
  title: string;
  body: string;
  evidence: CamEvidence;
}

export const camSections: CamSection[] = [
  { id: "identity", title: "Applicant and constitution", body: "Sri Annapurna Foods Private Limited is an operating agri-processing borrower led by K. Venkataramana. Identity and location are carried from the LOS record.", evidence: { source: "LOS application", artefact: "LOS-AP-2026-03417", timestamp: "11 Aug 2026 09:00" } },
  { id: "purpose", title: "Purpose of advance", body: "Expansion of mango and tomato pulp processing with cold storage, including civil work, plant and machinery and working-capital margin.", evidence: { source: "DPR", artefact: "DPR-03417-v3", timestamp: "11 Aug 2026 09:02" } },
  { id: "promoter", title: "Promoter assessment", body: "The promoter is a second-generation agri-trader with an existing unit operating for nine years. Management depth and execution responsibility remain officer questions.", evidence: { source: "Promoter interview", artefact: "RM-NOTE-03417", timestamp: "11 Aug 2026 09:05" } },
  { id: "industry", title: "Industry and market", body: "Procurement is linked to smallholder farmers across four mandals. The offtake and raw-material assumptions require contract and seasonality checks.", evidence: { source: "Procurement ledger", artefact: "PROC-312-2026", timestamp: "11 Aug 2026 09:08" } },
  { id: "site", title: "Site and land", body: "Land is recorded as survey 214/2B, Gudupalle. A later revenue record and field inspection are required before the earlier land-use assertion can be relied upon.", evidence: { source: "Revenue record", artefact: "REV-2142B-2026-06-02", timestamp: "02 Jun 2026 14:00" } },
  { id: "cost", title: "Project cost", body: "The project cost is assembled from civil, plant and machinery, cold room and working-capital margin lines in the DPR.", evidence: { source: "DPR cost sheet", artefact: "DPR-03417-COST", timestamp: "11 Aug 2026 09:10" } },
  { id: "means", title: "Means of finance", body: "The proposed term facility and working capital are assessed alongside promoter contribution and the expected grant pathway. Delayed grant timing is stress-tested separately.", evidence: { source: "Credit spread", artefact: "SPREAD-03417-v1", timestamp: "11 Aug 2026 09:12" } },
  { id: "operations", title: "Operations and capacity", body: "The existing 6 TPD pulping line is the operating baseline. The expansion case adds cold storage and processing capacity subject to approvals.", evidence: { source: "Site visit note", artefact: "SITE-03417-2026", timestamp: "11 Aug 2026 09:15" } },
  { id: "financials", title: "Historical financials", body: "Audited FY25 turnover, GSTN turnover and bank credits do not agree. The conflict is carried into credit review rather than replaced by an average.", evidence: { source: "Three-source comparison", artefact: "CONFLICT-03417", timestamp: "11 Aug 2026 09:18" } },
  { id: "projections", title: "Projected performance", body: "The seven-year projection is calculated by the shared pure credit model. Revenue, EBITDA, interest, principal and DSCR remain visible in the Financials tab.", evidence: { source: "Projection engine", artefact: "credit.ts / anchorCase", timestamp: "11 Aug 2026 09:20" } },
  { id: "working-capital", title: "Working capital assessment", body: "The working-capital requirement is shown as a separate facility and included in the interest calculation. The officer must validate the operating cycle and drawing power.", evidence: { source: "MPBF-style spread", artefact: "WC-03417-v1", timestamp: "11 Aug 2026 09:22" } },
  { id: "security", title: "Security and guarantee", body: "Primary security is the project and eligible collateral package, with charge creation and guarantee eligibility routed as documentation items.", evidence: { source: "Security schedule", artefact: "SEC-03417-v2", timestamp: "11 Aug 2026 09:25" } },
  { id: "compliance", title: "Statutory and scheme compliance", body: "Government approvals and subsidy evidence are not treated as complete until their source documents are attached to the file.", evidence: { source: "Approval tracker", artefact: "APPROVALS-03417", timestamp: "11 Aug 2026 09:28" } },
  { id: "risk-mitigants", title: "Risks and mitigants", body: "Key mitigants are staged drawdown, a raw-material escalation condition, turnover review and explicit land-use and subsidy conditions precedent.", evidence: { source: "Risk register", artefact: "RISK-03417-v1", timestamp: "11 Aug 2026 09:30" } },
  { id: "repayment", title: "Repayment assessment", body: "Repayment capacity is assessed from the projected debt-service coverage table. The minimum year and average are displayed without a consensus score.", evidence: { source: "DSCR schedule", artefact: "DSCR-03417-v1", timestamp: "11 Aug 2026 09:32" } },
  { id: "deviations", title: "Deviations and authority", body: "The projected turnover conflict and any facility movement are deviations requiring human review and maker-checker audit, not autonomous model actions.", evidence: { source: "DoP matrix", artefact: "DOP-03417-v1", timestamp: "11 Aug 2026 09:35" } },
  { id: "recommendation", title: "Recommendation and conditions", body: "Recommendation: proceed subject to conditions precedent, credit review of the turnover conflict and one-up delegation routing. AI recommends. The human decides.", evidence: { source: "Credit committee pack", artefact: "CAM-03417-v1", timestamp: "11 Aug 2026 09:38" } }
];
