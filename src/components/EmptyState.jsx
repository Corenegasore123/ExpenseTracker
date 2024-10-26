import React from "react";
import { DollarSign } from "lucide-react";

const EmptyState = () => (
  <div className="text-center py-12 bg-white rounded-lg shadow-md">
    <DollarSign className="mx-auto h-12 w-12 text-gray-400" />
    <h3 className="mt-2 text-lg font-medium text-gray-900">No Expenses Added</h3>
    <p className="mt-1 text-sm text-gray-500">Get started by adding your first expense!</p>
  </div>
);

export default EmptyState;
