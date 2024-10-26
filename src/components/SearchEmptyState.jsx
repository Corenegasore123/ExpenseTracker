import React from "react";
import { Target } from "lucide-react";

const SearchEmptyState = ({ searchQuery }) => (
  <div className="text-center py-12 bg-white rounded-lg shadow-md">
    <div className="mx-auto h-12 w-12 text-gray-400">
      <Target className="h-full w-full" />
    </div>
    <h3 className="mt-2 text-lg font-medium text-gray-900">No matches found</h3>
    <p className="mt-1 text-sm text-gray-500">
      No expenses found matching "{searchQuery}"
    </p>
  </div>
);

export default SearchEmptyState;
