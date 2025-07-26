// components/edit-button.tsx
import { Link } from '@inertiajs/react';
import { EditIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EditButtonProps {
  href: string;
  title?: string;
  className?: string;
}

export default function EditButton({
  href,
  title = 'Editar',
  className = '',
}: EditButtonProps) {
  return (
    <Link href={href}>
      <Button
        variant="outline"
        size="icon"
        title={title}
        className={`bg-yellow-400 hover:bg-yellow-500  text-white cursor-pointer ${className}`}
      >
        <EditIcon className="w-4 h-4" />
      </Button>
    </Link>
  );
}
