import { create } from "zustand";

interface UiState {
  isMobileMenuOpen: boolean;
  isSearchOpen: boolean;
  isCartDrawerOpen: boolean;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleMobileMenu: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  toggleSearch: () => void;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  toggleCartDrawer: () => void;
  closeAll: () => void;
}

export const useUiStore = create<UiState>()((set) => ({
  isMobileMenuOpen: false,
  isSearchOpen: false,
  isCartDrawerOpen: false,

  openMobileMenu: () =>
    set({ isMobileMenuOpen: true, isSearchOpen: false, isCartDrawerOpen: false }),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  toggleMobileMenu: () =>
    set((s) => ({
      isMobileMenuOpen: !s.isMobileMenuOpen,
      isSearchOpen: false,
      isCartDrawerOpen: false,
    })),

  openSearch: () => set({ isSearchOpen: true, isMobileMenuOpen: false, isCartDrawerOpen: false }),
  closeSearch: () => set({ isSearchOpen: false }),
  toggleSearch: () =>
    set((s) => ({
      isSearchOpen: !s.isSearchOpen,
      isMobileMenuOpen: false,
      isCartDrawerOpen: false,
    })),

  openCartDrawer: () =>
    set({ isCartDrawerOpen: true, isMobileMenuOpen: false, isSearchOpen: false }),
  closeCartDrawer: () => set({ isCartDrawerOpen: false }),
  toggleCartDrawer: () =>
    set((s) => ({
      isCartDrawerOpen: !s.isCartDrawerOpen,
      isMobileMenuOpen: false,
      isSearchOpen: false,
    })),

  closeAll: () => set({ isMobileMenuOpen: false, isSearchOpen: false, isCartDrawerOpen: false }),
}));
