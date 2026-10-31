"use client";

import { Button } from "@/components/ui/button";

/** Error boundary for the (rooms) group. Must be a Client Component. */
export default function RoomsError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="rounded-md border border-line-danger bg-danger-subtle p-6">
      <h2 className="text-h3 text-fg-danger">Something went wrong</h2>
      <p className="mt-1 text-body-sm text-fg-secondary">Please try again.</p>
      <Button variant="secondary" size="sm" className="mt-4" onClick={reset}>
        Try again
      </Button>
    </div>
  );
}
