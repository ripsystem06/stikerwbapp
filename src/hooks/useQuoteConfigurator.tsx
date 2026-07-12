"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";
import type { Product, ProductCategory, QuoteItem } from "@/lib/schemas";
import products from "@/lib/products";

// ── State ─────────────────────────────────────────────────
export interface QuoteState {
  selectedProductIds: Set<string>;
  quoteItems: Map<string, QuoteItem>;
  activeCategory: ProductCategory | "all";
}

// ── Actions ───────────────────────────────────────────────
export type QuoteAction =
  | { type: "SELECT_PRODUCT"; productId: string }
  | { type: "DESELECT_PRODUCT"; productId: string }
  | { type: "UPDATE_ITEM"; productId: string; updates: Partial<QuoteItem> }
  | { type: "SET_CATEGORY"; category: ProductCategory | "all" }
  | { type: "CLEAR_ALL" };

// ── Initial state ─────────────────────────────────────────
const INITIAL_STATE: QuoteState = {
  selectedProductIds: new Set<string>(),
  quoteItems: new Map<string, QuoteItem>(),
  activeCategory: "all",
};

// ── Reducer ───────────────────────────────────────────────
function quoteReducer(state: QuoteState, action: QuoteAction): QuoteState {
  switch (action.type) {
    case "SELECT_PRODUCT": {
      if (state.selectedProductIds.has(action.productId)) return state;
      const selectedProductIds = new Set(state.selectedProductIds);
      selectedProductIds.add(action.productId);
      const quoteItems = new Map(state.quoteItems);
      quoteItems.set(action.productId, {
        productId: action.productId,
        quantity: 1,
      });
      return { ...state, selectedProductIds, quoteItems };
    }

    case "DESELECT_PRODUCT": {
      if (!state.selectedProductIds.has(action.productId)) return state;
      const selectedProductIds = new Set(state.selectedProductIds);
      selectedProductIds.delete(action.productId);
      const quoteItems = new Map(state.quoteItems);
      quoteItems.delete(action.productId);
      return { ...state, selectedProductIds, quoteItems };
    }

    case "UPDATE_ITEM": {
      const existing = state.quoteItems.get(action.productId);
      if (!existing) return state;
      const quoteItems = new Map(state.quoteItems);
      quoteItems.set(action.productId, { ...existing, ...action.updates });
      return { ...state, quoteItems };
    }

    case "SET_CATEGORY":
      if (state.activeCategory === action.category) return state;
      return { ...state, activeCategory: action.category };

    case "CLEAR_ALL":
      return INITIAL_STATE;

    default:
      return state;
  }
}

// ── Context ───────────────────────────────────────────────
export interface QuoteContextValue {
  state: QuoteState;
  dispatch: Dispatch<QuoteAction>;
  selectedCount: number;
  selectedProducts: Product[];
  isSelected: (productId: string) => boolean;
}

const QuoteContext = createContext<QuoteContextValue | null>(null);

// ── Provider ──────────────────────────────────────────────
export function QuoteProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(quoteReducer, INITIAL_STATE);

  const selectedCount = state.selectedProductIds.size;

  const selectedProducts = useMemo<Product[]>(
    () => products.filter((p) => state.selectedProductIds.has(p.id)),
    [state.selectedProductIds],
  );

  const isSelected = useCallback(
    (productId: string) => state.selectedProductIds.has(productId),
    [state.selectedProductIds],
  );

  const value = useMemo<QuoteContextValue>(
    () => ({ state, dispatch, selectedCount, selectedProducts, isSelected }),
    [state, dispatch, selectedCount, selectedProducts, isSelected],
  );

  return (
    <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>
  );
}

// ── Hook ──────────────────────────────────────────────────
export function useQuoteContext(): QuoteContextValue {
  const ctx = useContext(QuoteContext);
  if (!ctx) {
    throw new Error(
      "useQuoteContext must be used within <QuoteProvider>. " +
        "Wrap your configurator components with <QuoteConfiguratorShell>.",
    );
  }
  return ctx;
}
