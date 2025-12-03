"use client";

import React from "react";
import {
  format,
  isToday,
  isYesterday,
  isThisWeek,
  differenceInDays,
} from "date-fns";

interface DateTimeProps {
  date: string | Date;
}

const DateTime: React.FC<DateTimeProps> = ({ date }) => {
  const parsedDate = new Date(date);
  const now = new Date();

  // 1️⃣ Today
  if (isToday(parsedDate)) {
    return <span>Today, {format(parsedDate, "h:mm a")}</span>;
  }

  // 2️⃣ Yesterday
  if (isYesterday(parsedDate)) {
    return <span>Yesterday, {format(parsedDate, "h:mm a")}</span>;
  }

  const daysDiff = differenceInDays(now, parsedDate);

  // 3️⃣ Within last 7 days
  if (daysDiff < 7) {
    return <span>{format(parsedDate, "EEEE, h:mm a")}</span>; // Sunday, 12:07 PM
  }

  // 4️⃣ Within this year
  if (parsedDate.getFullYear() === now.getFullYear()) {
    return <span>{format(parsedDate, "MMM d, h:mm a")}</span>; // Dec 3, 12:07 PM
  }

  // 5️⃣ Older
  return <span>{format(parsedDate, "MMM d, yyyy")}</span>; // Dec 3, 2025
};

export default DateTime;
