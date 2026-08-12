"use client";

import {create} from "zustand";
import {persist} from "zustand/middleware";

export interface RecommendationSnapshot {
  facilityCr: number;
  revenueStress: boolean;
  materialStress: boolean;
  grantDelayed: boolean;
  minDscr: number;
  recommendation: string;
  submittedAt: string;
}

export interface AttachmentRecord {
  name: string;
  size: number;
  attachedAt: string;
}

interface ApplicationWorkflowState {
  evidenceReviewed: string[];
  documentsOpened: string[];
  requestedDocuments: string[];
  facilityCr: number;
  revenueStress: boolean;
  materialStress: boolean;
  grantDelayed: boolean;
  recommendation: RecommendationSnapshot | null;
  exceptionNote: string;
  correctionChallenged: boolean;
  correctionReason: string;
  correctionAttachment: AttachmentRecord | null;
  cpVerified: string[];
  checkerApproved: boolean;
  toggleEvidence: (id: string) => void;
  openDocument: (id: string) => void;
  requestDocument: (id: string) => void;
  setAppraisal: (changes: Partial<Pick<ApplicationWorkflowState, "facilityCr" | "revenueStress" | "materialStress" | "grantDelayed">>) => void;
  saveRecommendation: (recommendation: RecommendationSnapshot) => void;
  setExceptionNote: (note: string) => void;
  setCorrectionReason: (reason: string) => void;
  recordChallenge: (reason: string) => void;
  attachCorrection: (attachment: AttachmentRecord) => void;
  toggleCp: (id: string) => void;
  approveChecker: () => void;
}

function toggle(list: string[], id: string) {
  return list.includes(id) ? list.filter(item => item !== id) : [...list, id];
}

export const useApplicationWorkflow = create<ApplicationWorkflowState>()(persist(set => ({
  evidenceReviewed: [],
  documentsOpened: [],
  requestedDocuments: [],
  facilityCr: 3.25,
  revenueStress: false,
  materialStress: false,
  grantDelayed: false,
  recommendation: null,
  exceptionNote: "",
  correctionChallenged: false,
  correctionReason: "Field inspection and the later revenue record contradict the original land-use assertion.",
  correctionAttachment: null,
  cpVerified: [],
  checkerApproved: false,
  toggleEvidence: id => set(state => ({evidenceReviewed: toggle(state.evidenceReviewed, id)})),
  openDocument: id => set(state => ({documentsOpened: state.documentsOpened.includes(id) ? state.documentsOpened : [...state.documentsOpened, id]})),
  requestDocument: id => set(state => ({requestedDocuments: state.requestedDocuments.includes(id) ? state.requestedDocuments : [...state.requestedDocuments, id]})),
  setAppraisal: changes => set(changes),
  saveRecommendation: recommendation => set({recommendation, checkerApproved: false}),
  setExceptionNote: exceptionNote => set({exceptionNote}),
  setCorrectionReason: correctionReason => set({correctionReason}),
  recordChallenge: correctionReason => set({correctionReason, correctionChallenged: true}),
  attachCorrection: correctionAttachment => set({correctionAttachment}),
  toggleCp: id => set(state => ({cpVerified: toggle(state.cpVerified, id)})),
  approveChecker: () => set({checkerApproved: true}),
}), {name: "finclus-application-03417-v2"}));
