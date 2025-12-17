"use client";

import useProducts from "@/app/hooks/store/useProducts";
import ProductCard from "@/app/modules/custom/ProductCard";
import CTitle from "@/app/modules/custom/CTitle";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Search, RefreshCcw } from "lucide-react";
import { useMemo, useState } from "react";

export default function ProductsPage() {
  const { products, loading, error, refresh } = useProducts();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => {
      const title = (p.title || "").toLowerCase();
      const category = (p.category || "").toLowerCase();
      return title.includes(q) || category.includes(q);
    });
  }, [products, query]);

  return (
    <div className="bg-bG min-h-screen pt-28 md:pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <CTitle title="Products" />

          <div className="flex w-full md:w-auto gap-2">
            <div className="relative w-full md:w-[360px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title or category…"
                className="pl-9 border-white/10 bg-white/5 text-white placeholder:text-white/40"
              />
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={refresh}
              className="border-white/15 bg-white/5 text-white hover:bg-white/10"
            >
              <RefreshCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24 text-white/70">
            <Loader2 className="h-5 w-5 animate-spin mr-2" />
            Loading products…
          </div>
        ) : error ? (
          <div className="mt-10 rounded-xl border border-red-500/30 bg-red-500/10 p-6 text-red-100">
            <div className="font-semibold mb-2">Failed to load products</div>
            <div className="text-sm text-red-100/80">{String(error)}</div>
            <Button
              type="button"
              onClick={refresh}
              className="mt-4 bg-red-600 hover:bg-red-700"
            >
              Try again
            </Button>
          </div>
        ) : (
          <>
            {filtered.length === 0 ? (
              <div className="py-24 text-center text-white/70">
                No products found.
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-8 mt-10">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}


