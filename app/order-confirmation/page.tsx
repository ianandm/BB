import { Suspense } from "react";
import { OrderConfirmationPage } from "@/components/pages/OrderConfirmationPage";

export default function OrderConfirmationRoute() {
  return (
    <Suspense fallback={null}>
      <OrderConfirmationPage />
    </Suspense>
  );
}
