"use client";
import { Button } from "@/components/ui/button";
import { usePaginationSearchParams } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { IconSearch } from "@tabler/icons-react";
import { useQueryState } from "nuqs";

interface Props {
  shallow?: boolean;
}

export function Search({ shallow = true }: Props) {
  const [search, setSearch] = useQueryState("search", {
    defaultValue: "",
    shallow,
  });
  const [_pagination, setPagination] = usePaginationSearchParams({ shallow });

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get("search");
    setSearch(String(search));
    setPagination({
      pageIndex: 0,
    });
  }

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <Input className="w-40" type="text" name="search" placeholder="Search" defaultValue={search} />
      <Button size="icon">
        <IconSearch />
      </Button>
    </form>
  );
}
