import { Input } from "./ui/input";

interface DateRangeFilterProps {
  dateFrom: string | undefined;
  dateTo: string | undefined;
  onDateFromChange: (date: string | undefined) => void;
  onDateToChange: (date: string | undefined) => void;
}

export function DateRangeFilter({
  dateFrom,
  dateTo,
  onDateFromChange,
  onDateToChange,
}: DateRangeFilterProps) {
  return (
    <div className="flex items-center gap-2">
      <Input
        type="date"
        value={dateFrom || ""}
        onChange={(e) => onDateFromChange(e.target.value || undefined)}
        className="w-[140px]"
        placeholder="From"
      />
      <span className="text-muted-foreground">-</span>
      <Input
        type="date"
        value={dateTo || ""}
        onChange={(e) => onDateToChange(e.target.value || undefined)}
        className="w-[140px]"
        placeholder="To"
      />
    </div>
  );
}