import { create } from "zustand";

import { ProfileType } from "@/features/onboarding/types";

type OnboardingState = {
  profileDraft: Partial<ProfileType>;

  updateDraft: (data: Partial<ProfileType>) => void;
  resetDraft: () => void;
};

export const useOnboardingStore = create<OnboardingState>((set) => ({
  profileDraft: {},

  updateDraft: (data) =>
    set((state) => ({
      profileDraft: {
        ...state.profileDraft,
        ...data,
      },
    })),

  resetDraft: () => set({ profileDraft: {} }),
}));
