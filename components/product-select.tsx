"use client";
import { useProducts } from "@/hooks/product";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface Props {
  value: number | string;
  onValueChange: (value: string) => void;
}

export function ProductSelect({ value, onValueChange }: Props) {
  const { data, isPending } = useProducts();

  return (
    <Select value={String(value)} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder={isPending ? "Loading..." : "Select product"} />
      </SelectTrigger>
      <SelectContent>
        {data?.map((product) => (
          <SelectItem key={product.id} value={String(product.id)}>
            {product.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
