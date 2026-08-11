export interface ProjectionInputs {
  year: number;
  revenueCr: number;
  ebitdaMargin: number;
  depreciationCr: number;
}

export const anchorCase = {
  entity: "Sri Annapurna Foods Private Limited",
  promoter: "K. Venkataramana",
  location: "Kuppam mandal, Chittoor district, Andhra Pradesh",
  projectCostCr: 5,
  promoterContributionCr: 1.25,
  termLoanCr: 3.25,
  workingCapitalCr: 0.5,
  interestRate: 0.099,
  workingCapitalRate: 0.11,
  taxRate: 0.25,
  moratoriumMonths: 12,
  repaymentYears: 7,
  projections: [
    {year: 1, revenueCr: 8.2, ebitdaMargin: 0.17, depreciationCr: 0.25},
    {year: 2, revenueCr: 9.2, ebitdaMargin: 0.17, depreciationCr: 0.25},
    {year: 3, revenueCr: 10.3, ebitdaMargin: 0.18, depreciationCr: 0.25},
    {year: 4, revenueCr: 11.4, ebitdaMargin: 0.18, depreciationCr: 0.25},
    {year: 5, revenueCr: 12.5, ebitdaMargin: 0.18, depreciationCr: 0.25},
    {year: 6, revenueCr: 13.5, ebitdaMargin: 0.19, depreciationCr: 0.25},
    {year: 7, revenueCr: 14.4, ebitdaMargin: 0.19, depreciationCr: 0.25}
  ] satisfies ProjectionInputs[]
};
