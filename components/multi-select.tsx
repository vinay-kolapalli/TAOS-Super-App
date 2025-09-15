import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IconX } from "@tabler/icons-react";
import Image from "next/image";
import { useMemo } from "react";
import { Badge } from "./ui/badge";

type Props = {
  value: (string | number)[];
  onValueChange: (value: (string | number)[]) => void;
  options: { label: string; value: string | number; image?: string }[];
  placeholder: string;
};

export function MultiSelect({ value, onValueChange, options, placeholder }: Props) {
  const selectedOptions = useMemo(() => {
    return options.filter((option) => value.includes(option.value));
  }, [value, options]);

  function handleChange(option: string) {
    const optionValue = options.find((o) => String(o.value) === option)?.value;
    if (optionValue) {
      onValueChange([...value, optionValue]);
    }
  }

  function handleRemove(e: React.MouseEvent<SVGSVGElement>) {
    const option = e.currentTarget.dataset.id;
    onValueChange(value.filter((item) => String(item) !== option));
  }

  return (
    <div className="space-y-2">
      <Select value="" onValueChange={handleChange}>
        <SelectTrigger className="w-full mt-3">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map(
            ({ label, value: optionValue }) =>
              !value?.includes(optionValue) && (
                <SelectItem data-type={typeof optionValue} key={optionValue} value={String(optionValue)}>
                  {label}
                </SelectItem>
              )
          )}
        </SelectContent>
      </Select>
      {!!selectedOptions?.length && (
        <div className="flex flex-wrap gap-3">
          {selectedOptions.map((option) => (
            <Badge key={option.value} className="flex items-center gap-2 text-xs">
              {option.image && <Image src={option.image} alt={option.label} width={16} height={16} />}
              {option.label} <IconX data-id={option.value} onClick={handleRemove} size={16} />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
