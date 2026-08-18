export default function RecentActivities() {
  const activities = [
    {
      name: "Kerja Bakti Rutin",
      date: "15 Nov 2024",
      status: "Akan Datang",
      statusColor: "bg-blue-100 text-blue-800",
    },
    {
      name: "Rapat Pengurus",
      date: "10 Nov 2024",
      status: "Selesai",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      name: "Turnamen Futsal RT",
      date: "01 Nov 2024",
      status: "Selesai",
      statusColor: "bg-green-100 text-green-800",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Kegiatan Terbaru</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-gray-600 font-medium text-sm">
                Nama Kegiatan
              </th>
              <th className="text-left py-3 px-4 text-gray-600 font-medium text-sm">
                Tanggal
              </th>
              <th className="text-left py-3 px-4 text-gray-600 font-medium text-sm">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-gray-900">{activity.name}</td>
                <td className="py-3 px-4 text-gray-600">{activity.date}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${activity.statusColor}`}
                  >
                    {activity.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
