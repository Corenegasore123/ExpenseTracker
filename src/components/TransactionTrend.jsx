import React from "react";
import { Activity } from "lucide-react";

const TransactionTrend = ({ amount, average }) => {
  const getStatus = () => {
    const percentDiff = ((amount - average) / average) * 100;

    if (percentDiff < -10) {
      return {
        icon: <Activity className="text-green-500" size={24} />,
        text: "Just under control compared to others",
        description: "Spending is well under control",
        color: "text-green-600",
      };
    }
    if (percentDiff > 10) {
      return {
        icon: <Activity className="text-red-500" size={24} />,
        text: "Notable Increase",
        description: "Consider reviewing expenses",
        color: "text-red-600",
      };
    }
    return {
      icon: <Activity className="text-blue-500" size={24} />,
      text: "Stable Spending",
      description: "Maintaining consistent levels",
      color: "text-blue-600",
    };
  };

  const status = getStatus();

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        {status.icon}
        <span className={`text-sm font-semibold ${status.color}`}>
          {status.text}
        </span>
      </div>
      <p className="text-xs text-gray-600">{status.description}</p>
    </div>
  );
};

export default TransactionTrend;
