import Link from "next/link";

export default function RecentMembers() {
  const members = [
    {
      name: "Budi Santoso",
      role: "Anggota Biasa",
      avatar: "BS",
      bgColor: "bg-blue-500",
    },
    {
      name: "Siti Aminah",
      role: "Seksi Humas",
      avatar: "SA",
      bgColor: "bg-pink-500",
    },
    {
      name: "Ahmad Rizki",
      role: "Anggota Biasa",
      avatar: "AR",
      bgColor: "bg-green-500",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Anggota Terbaru</h2>

      <div className="space-y-4">
        {members.map((member, index) => (
          <div
            key={index}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div
              className={`w-12 h-12 rounded-full ${member.bgColor} flex items-center justify-center text-white font-bold`}
            >
              {member.avatar}
            </div>
            <div>
              <p className="font-medium text-gray-900">{member.name}</p>
              <p className="text-sm text-gray-600">{member.role}</p>
            </div>
          </div>
        ))}
      </div>

      <Link
        href="/dashboard/anggota"
        className="block text-center mt-6 text-amber-700 hover:text-amber-800 font-medium text-sm"
      >
        Lihat Semua Anggota →
      </Link>
    </div>
  );
}
