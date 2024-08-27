"use client";

import { Routes } from "@/constants/router";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function StatsActions() {
  const router = useRouter();

  return (
    <>
      <Button onClick={() => router.push(Routes.HOME)} variant="outline">
        Prune another URL
      </Button>
      <Button onClick={() => router.push(Routes.STATS)}>
        Check hits from another pruned URL
      </Button>
    </>
  );
}
