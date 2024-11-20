import { Button } from "@/components/ui/button";
import { Shield, CheckCircle } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="container flex flex-col items-center gap-8 pt-8 text-center lg:pt-12">
      <div className="flex items-center gap-2 text-primary">
        <Shield className="h-12 w-12" />
        <span className="text-2xl font-bold">InstantVerify.in</span>
      </div>
      <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
        Real-time Background Verification
        <br />
        for Indian Context
      </h1>
      <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
        Instant verification services including Aadhaar verification, criminal record checks,
        and verified police reports.
      </p>
      <div className="flex flex-col gap-4 min-[400px]:flex-row">
        <Link href="/verify">
          <Button size="lg">Start Verification</Button>
        </Link>
        <Link href="/sample-report">
          <Button size="lg" variant="outline">
            View Sample Report
          </Button>
        </Link>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
        {["Real-time ID Verification", "Criminal Background Check", "Police Verification"].map((feature) => (
          <div key={feature} className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-primary" />
            <span className="text-sm">{feature}</span>
          </div>
        ))}
      </div>
    </section>
  );
}