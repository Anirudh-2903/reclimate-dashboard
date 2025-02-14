/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { Search, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { AddModal } from "./AddModal";
import { DateRange } from "react-day-picker";

interface SearchBarProps {
  type: string;
  data: any[]; // The dataset coming from the parent page
  onFilter: (filteredData: any[]) => void; // Callback to return filtered data
}

export const SearchBar = ({ type, data, onFilter }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = React.useState<DateRange>({
    from: new Date(2025,1,1),
    to: new Date(2025,2,1)
  })
  // Track if user has selected a date

  // Compute the button label
  const formattedDateRange =
  dateRange.from
    ? dateRange.to
      ? `${format(dateRange.from, "MMM dd, yyyy")} - ${format(dateRange.to, "MMM dd, yyyy")}`
      : `${format(dateRange.from, "MMM dd, yyyy")}` // Show only `from` if `to` is missing
    : "Select Date Range";


  useEffect(() => {
    // Perform filtering
    const filteredData = data.filter((item) => {
      const matchesSearch =
        !searchTerm ||
        item.fpuName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.vehicleType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.biomassDetails.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.biomassDetails.weight.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.date.includes(searchTerm);

        const matchesDate =
        !dateRange.from ||
        !dateRange.to ||
        (new Date(item.date) >= dateRange.from &&
          new Date(item.date) <= dateRange.to);




      return matchesSearch && matchesDate;
    });

    onFilter(filteredData);
  }, [searchTerm, dateRange, data, onFilter]);

  return (
    <div className="container py-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search ..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
                selected={dateRange}
                onSelect={(range) => {
                  if (!range) return; // Ensure range is valid
                  setDateRange((prev) => ({
                    from: range.from,
                    to: range.to || range.from, // Fix: Prevent `undefined` issue
                  }));
                }}
              />
            </DialogContent>
          </Dialog>
          <AddModal type={type} />
        </div>
      </div>
    </div>
  );
};
