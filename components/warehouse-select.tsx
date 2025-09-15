"use client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUserWarehouses } from "@/hooks/warehouse";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  value?: string | number | null;
  onValueChange: (value: string) => void;
}

export function UserWarehouseSelect({ value, onValueChange, className }: Props) {
  const { data: warehouses } = useUserWarehouses();

  function handleValueChange(newValue: string) {
    if (newValue === "all") {
      onValueChange("");
    } else {
      onValueChange(newValue);
    }
  }

  return (
    <Select value={value ? String(value) : "all"} onValueChange={handleValueChange}>
      <SelectTrigger className={cn("w-[200px]", className)}>
        <SelectValue placeholder="Select warehouse" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Warehouses</SelectItem>
        {warehouses?.map((warehouse) => (
          <SelectItem key={warehouse.id} value={String(warehouse.id)}>
            {warehouse.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
