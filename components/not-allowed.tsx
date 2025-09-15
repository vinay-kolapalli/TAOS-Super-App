"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export function NotAllowed() {
  return (
    <Card className="w-full h-fit">
      <CardContent className="text-center flex flex-col items-center gap-3 max-w-lg mx-auto px-4 py-14">
        <CardTitle className="text-lg">Uh-oh! You don&apos;t have access to this page.</CardTitle>
        <CardDescription>Please contact your administrator for more information.</CardDescription>
        <Link href="/">
          <Button>Dashboard</Button>
        </Link>
      </CardContent>
    </Card>
  );
}
