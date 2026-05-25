import { Search } from "lucide-react";

export default function SearchFilters({
  filters,
  setFilters,
}) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-[30px] p-5 backdrop-blur-xl">

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        {/* SEARCH */}

        <div className="relative">

          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            size={18}
          />

          <input
            type="text"
            placeholder="Search notes..."
            value={filters.search}
            onChange={(e) =>
              setFilters({
                ...filters,
                search: e.target.value,
              })
            }
            className="w-full bg-black/30 border border-white/10 rounded-2xl pl-12 pr-4 py-4 outline-none"
          />
        </div>

        {/* COURSE */}

        <select
          className="bg-black/30 border border-white/10 rounded-2xl px-4 py-4 outline-none"
          onChange={(e) =>
            setFilters({
              ...filters,
              course: e.target.value,
            })
          }
        >
          <option value="">All Courses</option>

          <option value="BCA">BCA</option>

          <option value="BTech">BTech</option>
        </select>

        {/* SEM */}

        <select
          className="bg-black/30 border border-white/10 rounded-2xl px-4 py-4 outline-none"
          onChange={(e) =>
            setFilters({
              ...filters,
              semester: e.target.value,
            })
          }
        >
          <option value="">Semester</option>

          <option value="1">Sem 1</option>

          <option value="2">Sem 2</option>

          <option value="3">Sem 3</option>

          <option value="4">Sem 4</option>

          <option value="5">Sem 5</option>

          <option value="6">Sem 6</option>
        </select>

        {/* TYPE */}

        <select
          className="bg-black/30 border border-white/10 rounded-2xl px-4 py-4 outline-none"
          onChange={(e) =>
            setFilters({
              ...filters,
              type: e.target.value,
            })
          }
        >
          <option value="">All Types</option>

          <option value="notes">Notes</option>

          <option value="pyq">PYQ</option>

          <option value="assignment">
            Assignment
          </option>
        </select>
      </div>
    </div>
  );
}