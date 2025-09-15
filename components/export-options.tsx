"use client";
import { DatePickerWithRange } from "@/components/date-picker";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { parseError } from "@/lib/error";
import { orpc } from "@/lib/orpc/client";
import { tryCatch } from "@/lib/try-catch";
import { downloadCsv } from "@/utils/csv";
import { zodResolver } from "@hookform/resolvers/zod";
import { endOfMonth, format, startOfMonth } from "date-fns";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import z from "zod";

const exportFormSchema = z.object({
  from: z.date(),
  to: z.date(),
});

type ExportForm = z.infer<typeof exportFormSchema>;

type ExportType =
  | "products"
  | "vendors"
  | "vendor-inquiries"
  | "seeds-bundling"
  | "damaged-products"
  | "inbound-inventory"
  | "offline-sales"
  | "recovered-products";

interface Props {
  type: ExportType;
}

export function ExportOptions({ type }: Props) {
  const [open, setOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const form = useForm<ExportForm>({
    resolver: zodResolver(exportFormSchema),
    defaultValues: {
      from: startOfMonth(new Date()),
      to: endOfMonth(new Date()),
    },
  });

  const fromDate = form.watch("from");
  const toDate = form.watch("to");

  async function handleExport(values: ExportForm) {
    setIsExporting(true);
    const { data, error } = await tryCatch(exportData({ from: values.from, to: values.to, type }));

    if (error) {
      toast.error(parseError(error).message);
      setIsExporting(false);
      return;
    }

    const fileName = `${type}-${format(values.from!, "yyyy-MM-dd")}-to-${format(values.to!, "yyyy-MM-dd")}.csv`;

    downloadCsv(data?.data ?? "", fileName);
    setIsExporting(false);
    setOpen(false);
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Export</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Download Data</DialogTitle>
            <DialogDescription>Extract order data to a CSV file.</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleExport)} className="space-y-4">
              <FormField
                control={form.control}
                name="from"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date Range</FormLabel>
                    <FormControl>
                      <DatePickerWithRange
                        className="*:w-full"
                        value={{
                          from: fromDate,
                          to: toDate,
                        }}
                        onValueChange={(range) => {
                          form.setValue("from", range?.from!);
                          form.setValue("to", range?.to!);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isExporting} isLoading={isExporting}>
                Export
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface ExportDataOptions {
  from: Date;
  to: Date;
  warehouse?: number;
  type: ExportType;
}

export async function exportData(data: ExportDataOptions) {
  if (data.type === "products") {
    return orpc.products.export(data);
  }
  if (data.type === "vendors") {
    return orpc.vendors.export(data);
  }
  if (data.type === "vendor-inquiries") {
    return orpc.vendors.inquiries.export(data);
  }
  if (data.type === "seeds-bundling") {
    return orpc.records.seedsBundling.export(data);
  }
  if (data.type === "damaged-products") {
    return orpc.records.damagedProducts.export(data);
  }
  if (data.type === "inbound-inventory") {
    return orpc.records.inboundInventory.export(data);
  }
  if (data.type === "offline-sales") {
    return orpc.records.offlineSales.export(data);
  }
  if (data.type === "recovered-products") {
    return orpc.records.recoveredProducts.export(data);
  }
}
