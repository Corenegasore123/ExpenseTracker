import React , { useState, useEffect } from "react";
import TransactionTrend from "./components/TransactionTrend";
import MilestoneTracker from "./components/MilestoneTracker";
import Card from "./components/Card";
import Modal from "./components/Modal";
import ExpenseForm from "./components/ExpenseForm";
import EmptyState from "./components/EmptyState";
import SearchEmptyState from "./components/SearchEmptyState";
import {PieChart,Pie,Cell,BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer,Legend} from "recharts";
import { TrendingUp,TrendingDown,DollarSign,Gift,ArrowUp,ArrowDown,Target,Activity,Award,} from "lucide-react";

const COLORS = [
  "#CF5733","#33FF57","#3357FF","#FF33A1","#FFC300","#DAF7A6",
  "#900C3F","#581845","#FFC0CB","#2E8B57","#FF8D33","#33FFF8",
  "#C70039","#FF33D1","#BFFF33","#FF33B8","#DFFF33","#33B8FF",
  "#5C33FF","#FFB433","#FFD700","#FF1493","#ADFF2F","#1E90FF",
  "#8A2BE2","#FF4500","#2E8B57","#FFDAB9","#20B2AA","#FF69B4",
];

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [groupBy, setGroupBy] = useState("category");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);

  const MILESTONES = [
    { name: "Budget Beginner", amount: 1000 },
    { name: "Expense Explorer", amount: 5000 },
    { name: "Savings Superstar", amount: 10000 },
    { name: "Financial Freedom", amount: 20000 },
  ];

  useEffect(() => {
    const savedExpenses = localStorage.getItem("expenses");
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }
  }, []);

  useEffect(() => {
    if (expenses.length > 0) {
      localStorage.setItem("expenses", JSON.stringify(expenses));
    } else {
      localStorage.removeItem("expenses"); 
    }
  }, [expenses]);

  const handleOpenModal = (expense = null) => {
    setEditingExpense(expense);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingExpense(null);
  };

  const handleSubmitExpense = (newExpense) => {
    if (editingExpense) {
      setExpenses(
        expenses.map((exp) => (exp.id === editingExpense.id ? newExpense : exp))
      );
    } else {
      setExpenses([...expenses, newExpense]);
    }
    handleCloseModal();
  };

  const handleOpenDeleteModal = (expense) => {
    setExpenseToDelete(expense);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setExpenseToDelete(null);
  };

  const confirmDelete = () => {
    setExpenses(
      expenses.filter((expense) => expense.id !== expenseToDelete.id)
    );
    handleCloseDeleteModal();
  };

  const totalExpenses = expenses.reduce(
    (acc, expense) => acc + expense.amount,
    0
  );
  const averageExpense = totalExpenses / (expenses.length || 1);

  // Calculate daily average
  const uniqueDates = new Set(expenses.map((exp) => exp.date)).size;
  const dailyAverage = totalExpenses / (uniqueDates || 1);

  // Find highest expense
  const highestExpense =
    expenses.length > 0
      ? expenses.reduce(
          (max, exp) => (exp.amount > max.amount ? exp : max),
          expenses[0]
        )
      : null;

  // Calculate this month's total
  const currentMonth = new Date().toISOString().slice(0, 7);
  const thisMonthTotal = expenses
    .filter((exp) => exp.date.startsWith(currentMonth))
    .reduce((sum, exp) => sum + exp.amount, 0);

  // Previous month's total for comparison
  const lastMonth = new Date(new Date().setMonth(new Date().getMonth() - 1))
    .toISOString()
    .slice(0, 7);
  const lastMonthTotal = expenses
    .filter((exp) => exp.date.startsWith(lastMonth))
    .reduce((sum, exp) => sum + exp.amount, 0);

  const monthOverMonthChange =
    lastMonthTotal !== 0
      ? ((thisMonthTotal - lastMonthTotal) / lastMonthTotal) * 100
      : 0;

  const pieChartData = Object.entries(
    expenses.reduce((acc, expense) => {
      const category = expense.category.toLowerCase();
      acc[category] = (acc[category] || 0) + expense.amount;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const barChartData = Object.entries(
    expenses.reduce((acc, expense) => {
      acc[expense.date] = (acc[expense.date] || 0) + expense.amount;
      return acc;
    }, {})
  )
    .map(([date, amount]) => ({ date, amount }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const filteredExpenses = expenses.filter(
    (expense) =>
      expense.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expense.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return(
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          ExpenseTracker
          <DollarSign className="text-green-500" size={32} />
        </h1>
        <button
          onClick={() => handleOpenModal()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
        >
          Add New Expense
          <Gift size={16} />
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingExpense ? "Edit Expense" : "Add New Expense"}
      >
        <ExpenseForm
          expense={editingExpense}
          onSubmit={handleSubmitExpense}
          onCancel={handleCloseModal}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        title="Confirm Deletion"
      >
        <p>Are you sure you want to delete this expense?</p>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            type="button"
            onClick={handleCloseDeleteModal}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={confirmDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </Modal>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                Total Expenses: ${totalExpenses.toFixed(2)}
              </h2>
              <TransactionTrend
                amount={totalExpenses}
                average={averageExpense}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-600 mb-2">
                  Daily Average
                </h3>
                <p className="text-lg font-bold text-gray-900">
                  ${dailyAverage.toFixed(2)}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-600 mb-2">
                  Monthly Average
                </h3>
                <p className="text-lg font-bold text-gray-900">
                  ${averageExpense.toFixed(2)}
                </p>
              </div>

              {highestExpense && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">
                    Highest Expense
                  </h3>
                  <p className="text-lg font-bold text-gray-900">
                    ${highestExpense.amount.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {highestExpense.category} - {highestExpense.date}
                  </p>
                </div>
              )}

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-600 mb-2">
                  Month over Month
                </h3>
                <div className="flex items-center gap-1">
                  <p className="text-lg font-bold text-gray-900">
                    {Math.abs(monthOverMonthChange).toFixed(1)}%
                  </p>
                  {monthOverMonthChange !== 0 &&
                    (monthOverMonthChange > 0 ? (
                      <ArrowUp className="text-red-500" size={16} />
                    ) : (
                      <ArrowDown className="text-green-500" size={16} />
                    ))}
                </div>
                <p className="text-xs text-gray-500">vs Last Month</p>
              </div>
            </div>

            <MilestoneTracker
              totalExpenses={totalExpenses}
              milestones={MILESTONES}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Group By
              </label>
              <select
                value={groupBy}
                onChange={(e) => setGroupBy(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="category">Category</option>
                <option value="date">Date</option>
              </select>
            </div>
            <div className="p-6 max-w-xl">
              <p className="text-red-600 italic font-normal mb-6">
                Remember:
              </p>
              <ul className="ml-5">
                <li className="text-sm font-medium mb-7 text-gray-600">
                  1. Your expense tracker is the first step toward financial
                  freedom
                </li>
                <li className="text-sm font-medium mb-7 text-gray-600">
                  2. Stay organized, stay mindful, and let your expense
                  tracker do the work
                </li>
                <li className="text-sm font-medium mb-7 text-gray-600">
                  3. Every penny tracked brings you closer to your financial
                  goals
                </li>
              </ul>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            Expense Charts
            <TrendingUp className="text-blue-500" size={20} />
          </h2>
          <div className="space-y-10">
            <div>
              <h3 className="text-lg font-semibold mb-4">By Category</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      dataKey="value"
                      data={pieChartData}
                      innerRadius={60}
                      outerRadius={100}
                      fill="#8884d8"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">By Date</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${value}`} />
                    <Bar dataKey="amount" fill="#36A2EB" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search expenses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mt-8"
        />
      </div>

      <div className="mt-8">
        {expenses.length === 0 ? ( <EmptyState />): filteredExpenses.length === 0 ? (
  <SearchEmptyState searchQuery={searchQuery} />
)  : (
        (Object.entries(
          filteredExpenses.reduce((groups, expense) => {
            const key =
              groupBy === "category"
                ? expense.category.toLowerCase()
                : expense.date;
            if (!groups[key]) groups[key] = [];
            groups[key].push(expense);
            return groups;
          }, {})
        ).map(([key, groupExpenses]) => (
          <Card key={key} className="mb-6" hoverable>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              {groupBy === "category" ? (
                <>
                  Category: {key}
                  <Gift size={20} className="text-purple-500" />
                </>
              ) : (
                <>
                  Date: {key}
                  <TrendingUp size={20} className="text-blue-500" />
                </>
              )}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {groupExpenses.map((expense) => (
                <div
                  key={expense.id}
                  className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-lg font-semibold flex items-center gap-2">
                      <DollarSign size={16} className="text-green-500" />
                      {expense.amount}
                    </span>
                    <div className="space-x-2">
                      <button
                        onClick={() => handleOpenModal(expense)}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleOpenDeleteModal(expense)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <Gift size={14} />
                    Category: {expense.category}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <TrendingUp size={14} />
                    Date: {expense.date}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    {expense.description}
                  </p>
                  <TransactionTrend
                    amount={expense.amount} 
                    average={averageExpense} 
                  />
                </div>
              ))}
            </div>
          </Card>
        ))) )}

        <div className=" bg-transparent py-3 mt-3 -mb-8">
          <p className="text-center">Made with ❤️ by Corene</p>
        </div>
      </div>
    </div>
  </div>
  );
};

export default App;