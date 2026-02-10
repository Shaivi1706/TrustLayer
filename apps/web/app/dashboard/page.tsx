import RepoConnect from "../components/RepoConnect";

export default function Dashboard() {
  return (
    <div className="flex h-screen">
      
      {/* Sidebar */}
      <div className="w-64 bg-zinc-900 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">
          DataDict AI
        </h2>

        <nav className="space-y-4">
          <p className="cursor-pointer hover:text-zinc-300">
            Dashboard
          </p>
          <p className="cursor-pointer hover:text-zinc-300">
            Connect Repo
          </p>
        </nav>
      </div>

      {/* Main Area */}
      <div className="flex-1 bg-zinc-950 text-white p-10">
        <h1 className="text-3xl font-semibold">
          Welcome 👋
          <RepoConnect />
        </h1>
      </div>

    </div>
  );
}