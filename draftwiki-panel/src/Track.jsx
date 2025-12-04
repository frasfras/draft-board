<div class="min-h-screen bg-gray-100 flex">
  {/* <!-- Sidebar --> */}
  <aside class="w-64 bg-white shadow-md">
    <div class="p-4 text-xl font-bold border-b">
      Track Caddie
    </div>
    <nav class="p-4 space-y-2">
      <a href="#" class="block px-3 py-2 rounded hover:bg-gray-200">Dashboard</a>
      <a href="#" class="block px-3 py-2 rounded hover:bg-gray-200">Sessions</a>
      <a href="#" class="block px-3 py-2 rounded hover:bg-gray-200">Drivers</a>
      <a href="#" class="block px-3 py-2 rounded hover:bg-gray-200">Tracks</a>
      <a href="#" class="block px-3 py-2 rounded hover:bg-gray-200">Telemetry</a>
    </nav>
  </aside>

  {/* <!-- Main --> */}
  <main class="flex-1 p-6 space-y-6">
   
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-semibold">Session Overview</h1>
      <select class="border p-2 rounded">
        <option>R1 – Barber 2025-09-07</option>
        <option>R2 – Road Atlanta</option>
      </select>
    </div>

    {/* <!-- Stats Cards --> */}
    <div class="grid grid-cols-4 gap-4">
      <div class="bg-white p-4 rounded shadow">
        <div class="text-sm text-gray-500">Laps Analyzed</div>
        <div class="text-2xl font-bold">7</div>
      </div>
      <div class="bg-white p-4 rounded shadow">
        <div class="text-sm text-gray-500">Duration (s)</div>
        <div class="text-2xl font-bold">1476.2</div>
      </div>
      <div class="bg-white p-4 rounded shadow">
        <div class="text-sm text-gray-500">Mean Throttle</div>
        <div class="text-2xl font-bold">80.1%</div>
      </div>
      <div class="bg-white p-4 rounded shadow">
        <div class="text-sm text-gray-500">Composite Score</div>
        <div class="text-2xl font-bold">0.77</div>
      </div>
    </div>

    {/* <!-- Charts Area --> */}
    <div class="grid grid-cols-2 gap-6">
      <div class="bg-white p-4 rounded shadow h-72">
        <h2 class="font-semibold mb-2">Driver Profile Radar</h2>
        <div class="h-full flex items-center justify-center text-gray-400">
          (Radar Chart Here)
        </div>
      </div>
      <div class="bg-white p-4 rounded shadow h-72">
        <h2 class="font-semibold mb-2">Lap Time Trend</h2>
        <div class="h-full flex items-center justify-center text-gray-400">
          (Line Chart Here)
        </div>
      </div>
    </div>

    {/* <!-- Table --> */}
    <div class="bg-white rounded shadow overflow-hidden">
      <table class="table-auto w-full text-left">
        <thead class="bg-gray-50 border-b">
          <tr>
            <th class="p-3">Lap #</th>
            <th class="p-3">Sector Time</th>
            <th class="p-3">Throttle Avg</th>
            <th class="p-3">Brake Avg</th>
            <th class="p-3">Variance</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b">
            <td class="p-3">1</td>
            <td class="p-3">91.3s</td>
            <td class="p-3">82.1%</td>
            <td class="p-3">0.18%</td>
            <td class="p-3">Low</td>
          </tr>
          {/* <!-- More rows --> */}
        </tbody>
      </table>
    </div>
  </main>
</div>
