import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  LayoutList,
  LayoutGrid,
  Calendar,
  CircleUserRound,
  Filter,
  Plus,
  Settings,
  ChevronDown,
  Check,
  Logs,
  Columns2,
  Grid3X3,
  Grid2X2,
} from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import clsx from 'clsx';

interface User {
  id: number;
  name: string;
}

const users: User[] = [
  { id: 1, name: 'Michael Doe' },
  { id: 2, name: 'Alice Johnson' },
  { id: 3, name: 'Robert Smith' },
  { id: 4, name: 'Emily Davis' },
];

export default function CalendarToolbar() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();

  const visibleInitials = users.slice(0, 3).map((u) => getInitials(u.name));
  const remaining = users.length > 3 ? `+${users.length - 3}` : null;

  return (
    <div className="flex justify-between items-center px-4 py-2 bg-white border-b">
      {/* ICONOS IZQUIERDA */}
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon">
          <Filter className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="icon">
          <LayoutList className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="icon">
          <Logs className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="icon">
          <Columns2 className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="icon">
          <Grid3X3 className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="icon">
          <Grid2X2 className="w-4 h-4" />
        </Button>
      </div>

      {/* SELECCIÓN DE USUARIOS */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex gap-2 items-center px-3">
            <div className="flex -space-x-2">
              {visibleInitials.map((initial, idx) => (
                <div
                  key={idx}
                  className="w-6 h-6 rounded-full bg-gray-200 text-xs font-bold text-gray-700 flex items-center justify-center border border-white shadow"
                >
                  {initial}
                </div>
              ))}
              {remaining && (
                <div className="w-6 h-6 rounded-full bg-gray-500 text-xs font-bold text-white flex items-center justify-center border border-white shadow">
                  {remaining}
                </div>
              )}
            </div>
            <span className="text-sm">All</span>
            <ChevronDown className="w-4 h-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between p-2">
              <div className="flex -space-x-2">
                {visibleInitials.map((initial, idx) => (
                  <div
                    key={idx}
                    className="w-6 h-6 rounded-full bg-gray-200 text-xs font-bold text-gray-700 flex items-center justify-center border border-white shadow"
                  >
                    {initial}
                  </div>
                ))}
                {remaining && (
                  <div className="w-6 h-6 rounded-full bg-gray-500 text-xs font-bold text-white flex items-center justify-center border border-white shadow">
                    {remaining}
                  </div>
                )}
              </div>
              <div className="text-sm text-gray-700 font-medium">All</div>
              {selectedUser === null && <Check className="w-4 h-4 text-gray-700" />}
            </div>
            {users.map((user) => (
              <button
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className={clsx(
                  'flex items-center justify-between px-2 py-1.5 rounded hover:bg-gray-100',
                  selectedUser?.id === user.id && 'bg-gray-100'
                )}
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gray-300 text-xs font-bold text-gray-800 flex items-center justify-center">
                    {getInitials(user.name)}
                  </div>
                  <span className="text-sm text-gray-800">{user.name}</span>
                </div>
                {selectedUser?.id === user.id && <Check className="w-4 h-4 text-gray-700" />}
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      {/* BOTÓN DERECHA */}
      <div className="flex items-center gap-2">
        <Button className="bg-gray-900 text-white hover:bg-gray-800 px-4">
          <Plus className="w-4 h-4 mr-2" />
          Add Event
        </Button>
        <Button variant="outline" size="icon">
          <Settings className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
