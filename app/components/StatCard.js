export default function StatCard({ title, value, subtitle, trend }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-gray-600 text-sm font-medium mb-2">{title}</h3>
      <div className="flex items-end justify-between">
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        {trend && (
          <span className="text-green-600 text-sm font-medium">{trend}</span>
        )}
      </div>
      {subtitle && (
        <p className="text-gray-500 text-sm mt-2">{subtitle}</p>
      )}
    </div>
  );
}
