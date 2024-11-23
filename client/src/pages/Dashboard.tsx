import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 7000 },
  { name: "May", sales: 6000 },
  { name: "Jun", sales: 8000 },
];

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-800 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400">Overview of your business performance</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-700 p-6 rounded-lg shadow-md">
          <h2 className="text-sm text-gray-400">Total Sales</h2>
          <p className="text-2xl font-semibold text-white">₹2,50,000</p>
        </div>
        <div className="bg-gray-700 p-6 rounded-lg shadow-md">
          <h2 className="text-sm text-gray-400">New Customers</h2>
          <p className="text-2xl font-semibold text-white">1,200</p>
        </div>
        <div className="bg-gray-700 p-6 rounded-lg shadow-md">
          <h2 className="text-sm text-gray-400">Pending Orders</h2>
          <p className="text-2xl font-semibold text-white">50</p>
        </div>
        <div className="bg-gray-700 p-6 rounded-lg shadow-md">
          <h2 className="text-sm text-gray-400">Revenue</h2>
          <p className="text-2xl font-semibold text-white">₹10,00,000</p>
        </div>
      </div>

      {/* Graph Section */}
      <div className="bg-gray-700 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-lg font-semibold text-white mb-4">Sales Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <Line type="monotone" dataKey="sales" stroke="#4f46e5" strokeWidth={2} />
            <CartesianGrid stroke="#374151" strokeDasharray="5 5" />
            <XAxis dataKey="name" stroke="#d1d5db" />
            <YAxis stroke="#d1d5db" />
            <Tooltip contentStyle={{ backgroundColor: "#374151", color: "#ffffff" }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Table Section */}
      <div className="bg-gray-700 p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-white mb-4">Recent Orders</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-400">
              <th className="p-3 border-b border-gray-600">Order ID</th>
              <th className="p-3 border-b border-gray-600">Customer</th>
              <th className="p-3 border-b border-gray-600">Status</th>
              <th className="p-3 border-b border-gray-600">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-white hover:bg-gray-600">
              <td className="p-3 border-b border-gray-600">#12345</td>
              <td className="p-3 border-b border-gray-600">John Doe</td>
              <td className="p-3 border-b border-gray-600">
                <span className="bg-green-500 text-white px-2 py-1 rounded">Completed</span>
              </td>
              <td className="p-3 border-b border-gray-600">₹5,000</td>
            </tr>
            <tr className="text-white hover:bg-gray-600">
              <td className="p-3 border-b border-gray-600">#12346</td>
              <td className="p-3 border-b border-gray-600">Jane Smith</td>
              <td className="p-3 border-b border-gray-600">
                <span className="bg-yellow-500 text-white px-2 py-1 rounded">Pending</span>
              </td>
              <td className="p-3 border-b border-gray-600">₹8,000</td>
            </tr>
            <tr className="text-white hover:bg-gray-600">
              <td className="p-3 border-b border-gray-600">#12347</td>
              <td className="p-3 border-b border-gray-600">Alice Johnson</td>
              <td className="p-3 border-b border-gray-600">
                <span className="bg-red-500 text-white px-2 py-1 rounded">Cancelled</span>
              </td>
              <td className="p-3 border-b border-gray-600">₹2,000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
