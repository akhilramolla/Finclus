"use client";

import {create} from "zustand";
import {persist} from "zustand/middleware";

interface ProductState {
  claimed: boolean;
  researchComplete: boolean;
  researchAdded: boolean;
  conflictEscalated: boolean;
  retracted: boolean;
  recommendationSubmitted: boolean;
  sanctioned: boolean;
  ewsAssigned: boolean;
  clusterReviewed: boolean;
  lakshmiCreated: boolean;
  activity: string[];
  act: (event: string, changes?: Partial<ProductState>) => void;
  reset: () => void;
}

const initial = {
  claimed: false,
  researchComplete: false,
  researchAdded: false,
  conflictEscalated: false,
  retracted: false,
  recommendationSubmitted: false,
  sanctioned: false,
  ewsAssigned: false,
  clusterReviewed: false,
  lakshmiCreated: false,
  activity: ["Application received from RCPC Tirupati", "AA consent artefact validated", "AI pre-screen completed"]
};

export const useProductStore = create<ProductState>()(persist((set) => ({
  ...initial,
  act: (event, changes = {}) => set(state => ({...changes, activity: [event, ...state.activity]})),
  reset: () => set(initial)
}), {name: "finclus-product-v2"}));
