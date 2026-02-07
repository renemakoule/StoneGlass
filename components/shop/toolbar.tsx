"use client";

import { LayoutGrid, List } from "lucide-react";

export function Toolbar() {
  return (
    <div className="flex justify-between items-center bg-white p-2 lg:p-3 rounded-sm shadow-sm mb-6 border border-gray-100">
      <div className="hidden lg:flex space-x-2">
        <LayoutGrid className="w-5 h-5 text-gray-800" />
        <List className="w-5 h-5 text-gray-400" />
      </div>
      <div className="flex flex-1 lg:flex-none justify-between lg:justify-end space-x-4 text-xs text-gray-600 items-center">
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline">Sort by</span>
          <select className="border border-gray-100 p-1.5 rounded text-[11px] min-w-[100px] lg:min-w-[120px] bg-gray-50/50">
            <option>Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <span>Show</span>
          <select className="border border-gray-100 p-1.5 rounded text-[11px] bg-gray-50/50">
            <option>9</option>
            <option>24</option>
          </select>
        </div>
      </div>
    </div>
  );
}
