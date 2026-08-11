import {anchorCase, type ProjectionInputs} from "@/content/case";

export interface CreditInputs {
  facilityCr: number;
  revenueStress?: boolean;
  materialStress?: boolean;
  grantDelayed?: boolean;
}

export interface ProjectionYear extends ProjectionInputs {
  ebitdaCr: number;
  interestCr: number;
  principalRepaymentCr: number;
  patCr: number;
  debtServiceCr: number;
  dscr: number;
  closingBalanceCr: number;
}

export interface CreditResult {
  years: ProjectionYear[];
  dscr: number[];
  minDscr: number;
  averageDscr: number;
  fundingGapCr: number;
  debtEquity: number;
  promoterMargin: number;
  policyPass: boolean;
  recommendation: string;
}

export function policyCheck(minDscr: number): boolean {
  return minDscr >= 1.25;
}

export function fundingGap(facilityCr: number, grantDelayed = false): number {
  const eligibleGrantCr = anchorCase.projectCostCr * 0.35;
  const plannedSourcesCr = anchorCase.promoterContributionCr + facilityCr + eligibleGrantCr;
  const gapCr = Math.max(0, anchorCase.projectCostCr - plannedSourcesCr);
  return Number((gapCr + (grantDelayed ? eligibleGrantCr : 0)).toFixed(2));
}

export function debtEquity(facilityCr: number): number {
  return Number((facilityCr / anchorCase.promoterContributionCr).toFixed(2));
}

export function promoterMargin(facilityCr = anchorCase.termLoanCr): number {
  return Number((anchorCase.promoterContributionCr / (anchorCase.promoterContributionCr + facilityCr) * 100).toFixed(1));
}

function quarterlyPrincipal(facilityCr: number): number {
  return facilityCr / (anchorCase.repaymentYears * 4);
}

export function projectCredit(input: CreditInputs): CreditResult {
  const revenueFactor = input.revenueStress ? 0.85 : 1;
  const marginReduction = input.materialStress ? 0.10 : 0;
  const additionalDebtCr = input.grantDelayed ? anchorCase.projectCostCr * 0.35 : 0;
  const fundedFacilityCr = input.facilityCr + additionalDebtCr;
  const quarterlyPaymentCr = quarterlyPrincipal(fundedFacilityCr);
  let openingBalanceCr = fundedFacilityCr;
  const years = anchorCase.projections.map((projection, index) => {
    const revenueCr = projection.revenueCr * revenueFactor;
    const ebitdaMargin = projection.ebitdaMargin - marginReduction;
    const ebitdaCr = revenueCr * ebitdaMargin;
    const principalRepaymentCr = index === 0 ? 0 : Math.min(fundedFacilityCr, quarterlyPaymentCr * 4);
    const averageBalanceCr = openingBalanceCr - principalRepaymentCr / 2;
    const interestCr = averageBalanceCr * anchorCase.interestRate + anchorCase.workingCapitalCr * anchorCase.workingCapitalRate;
    const earningsBeforeTaxCr = ebitdaCr - projection.depreciationCr - interestCr;
    const patCr = earningsBeforeTaxCr * (1 - anchorCase.taxRate);
    const debtServiceCr = interestCr + principalRepaymentCr;
    const dscr = debtServiceCr === 0 ? 0 : (patCr + projection.depreciationCr + interestCr) / debtServiceCr;
    openingBalanceCr -= principalRepaymentCr;
    return {
      ...projection,
      revenueCr: Number(revenueCr.toFixed(2)),
      ebitdaMargin: Number(ebitdaMargin.toFixed(4)),
      ebitdaCr: Number(ebitdaCr.toFixed(2)),
      interestCr: Number(interestCr.toFixed(2)),
      principalRepaymentCr: Number(principalRepaymentCr.toFixed(2)),
      patCr: Number(patCr.toFixed(2)),
      debtServiceCr: Number(debtServiceCr.toFixed(2)),
      dscr: Number(dscr.toFixed(2)),
      closingBalanceCr: Number(Math.max(0, openingBalanceCr).toFixed(2))
    };
  });
  const dscr = years.map(year => year.dscr);
  const minDscr = Math.min(...dscr);
  return {
    years,
    dscr,
    minDscr,
    averageDscr: Number((dscr.reduce((total, value) => total + value, 0) / dscr.length).toFixed(2)),
    fundingGapCr: fundingGap(input.facilityCr, input.grantDelayed),
    debtEquity: debtEquity(fundedFacilityCr),
    promoterMargin: promoterMargin(fundedFacilityCr),
    policyPass: policyCheck(minDscr),
    recommendation: policyCheck(minDscr) ? "Proceed subject to CPs" : "Route to credit review"
  };
}

export function stress(input: CreditInputs): CreditResult {
  return projectCredit(input);
}

export const baseCredit = projectCredit({facilityCr: anchorCase.termLoanCr});
