"use client";

import React, { useState } from 'react';
import { Search, Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle
} from "@/components/ui/dialog";
import { useProcessStore } from '@/store';
import { format } from "date-fns";

export const SearchBar = ({type}: {type: string}) => {
  const { filters, setFilters } = useProcessStore();
  const [hasSelected, setHasSelected] = useState(false); // Track if user has selected a date

  // Compute the button label
  const formattedDateRange =
    hasSelected && filters.dateRange.startDate && filters.dateRange.endDate
      ? `${format(filters.dateRange.startDate, "MMM dd, yyyy")} - ${format(filters.dateRange.endDate, "MMM dd, yyyy")}`
      : "Select Date Range";

  return (
    <div className="container py-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search ..."
            className="pl-10"
            value={filters.search}
            onChange={(e) => setFilters({ search: e.target.value })}
          />
        </div>
        <div className="flex items-center gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="hidden md:inline">{formattedDateRange}</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="w-full max-w-sm">
            <DialogTitle>Select Date Range</DialogTitle>
              <CalendarComponent
                mode="range"
                selected={{
                  from: filters.dateRange.startDate,
                  to: filters.dateRange.endDate,
                }}
                onSelect={(range) => {
                  if (range?.from && range?.to) {
                    setFilters({
                      dateRange: {
                        startDate: range.from,
                        endDate: range.to,
                      },
                    });
                    setHasSelected(true); // Set flag when a date is chosen
                  }
                }}
              />
            </DialogContent>
          </Dialog>
          <Button>Add {type}</Button>
        </div>
      </div>
    </div>
  );
};
