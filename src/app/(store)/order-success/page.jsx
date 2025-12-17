"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const orderNumberFromQuery = searchParams.get("order");

  const [storedOrder, setStoredOrder] = useState(null);

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem("lastOrder");
      if (raw) setStoredOrder(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  const orderNumber = useMemo(() => {
    return (
      orderNumberFromQuery ||
      storedOrder?.order_number ||
      storedOrder?.orderNumber ||
      null
    );
  }, [orderNumberFromQuery, storedOrder]);

  return (
    <div className="bg-bG min-h-screen pt-36 pb-12 md:py-24">
      <div className="max-w-3xl mx-auto px-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-10">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-full bg-green-500/15 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-400" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                Order placed successfully
              </h1>
              <p className="text-white/70 mt-2">
                We received your order. You can track it anytime from your dashboard.
              </p>

              {orderNumber && (
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-white/70 text-sm">Order:</span>
                  <Badge className="bg-white/10 text-white border border-white/15">
                    {orderNumber}
                  </Badge>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button asChild className="bg-gradient-to-r from-purple-600 to-blue-600">
              <Link href="/dashboard/my-orders">
                <ShoppingBag className="h-4 w-4 mr-2" />
                View my orders
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white/15 bg-white/5 text-white hover:bg-white/10"
            >
              <Link href="/products">Continue shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}


