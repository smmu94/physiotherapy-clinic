import { fetchUsers } from "@/lib/data";

export default async function UsersTable() {
  const users = await fetchUsers();
  const minRows = 5;
  const emptyRowsCount = users.length < minRows ? minRows - users.length : 0;

  if (!users || users.length === 0) {
    return <p className="text-center py-4">No hay usuarios registrados.</p>;
  }
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full overflow-hidden">
        <thead className="bg-primary text-white text-left border-b-2 border-foreground text-preset-5-bold">
          <tr>
            <th className="px-6 py-2">Nombre</th>
            <th className="px-6 py-2">Email</th>
            <th className="px-6 py-2">Admin</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="bg-white hover:bg-neutral-light border-b-2 border-neutral-light text-preset-5">
              <td className="px-6 py-2">{user.name || "-"}</td>
              <td className="px-6 py-2">{user.email}</td>
              <td className="px-6 py-2">{user.is_admin ? "Sí" : "No"}</td>
            </tr>
          ))}
          {Array.from({ length: emptyRowsCount }).map((_, idx) => (
            <tr key={`empty-${idx}`} className="bg-white hover:bg-neutral-light border-b-2 border-neutral-light">
              <td className="px-6 py-2">&nbsp;</td>
              <td className="px-6 py-2">&nbsp;</td>
              <td className="px-6 py-2">&nbsp;</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
