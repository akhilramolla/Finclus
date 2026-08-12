export type ClusterMandal = "Kuppam" | "Gudupalle" | "Ramakuppam" | "Santhipuram";

export interface ClusterNode {
  id: string;
  mandal: ClusterMandal;
  supplierNumber: number;
  evidenceable: boolean;
  evidenceIndex: number | null;
  newToCredit: boolean;
  woman: boolean;
  evidenceSource: string;
  counterfactualReason: string | null;
}

interface MandalDefinition {
  name: ClusterMandal;
  supplierCount: number;
  evidenceableCount: number;
}

const definitions: MandalDefinition[] = [
  { name: "Kuppam", supplierCount: 81, evidenceableCount: 74 },
  { name: "Gudupalle", supplierCount: 79, evidenceableCount: 73 },
  { name: "Ramakuppam", supplierCount: 76, evidenceableCount: 69 },
  { name: "Santhipuram", supplierCount: 76, evidenceableCount: 71 }
];

const evidenceSources = ["Procurement ledger", "Land record", "Mandi record", "PM-KISAN", "AA consent"];
const counterfactualReasons = ["No digitised land record", "No consent for AA cross-check", "Tenant cultivator without record of rights"];

let evidenceIndex = 0;
export const clusterNodes: ClusterNode[] = definitions.flatMap((definition) =>
  Array.from({ length: definition.supplierCount }, (_, index) => {
    const evidenceable = index < definition.evidenceableCount;
    const currentEvidenceIndex = evidenceable ? evidenceIndex++ : null;
    return {
      id: `${definition.name.toLowerCase()}-${String(index + 1).padStart(3, "0")}`,
      mandal: definition.name,
      supplierNumber: index + 1,
      evidenceable,
      evidenceIndex: currentEvidenceIndex,
      newToCredit: currentEvidenceIndex !== null && currentEvidenceIndex < 196,
      woman: currentEvidenceIndex !== null && currentEvidenceIndex < 171,
      evidenceSource: currentEvidenceIndex === null ? "Not evidenced" : evidenceSources[currentEvidenceIndex % evidenceSources.length],
      counterfactualReason: currentEvidenceIndex === null ? counterfactualReasons[index % counterfactualReasons.length] : null
    } satisfies ClusterNode;
  })
);

export const clusterMandals = definitions.map((definition) => definition.name);

export const clusterSummary = {
  supplierCount: 312,
  evidenceableCount: 287,
  counterfactualCount: 25,
  pipelineCr: 4.68,
  averageTicketLakh: 1.63,
  newToCreditCount: 196,
  womenCount: 171
} as const;
