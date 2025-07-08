import { Button } from "@/components/ui/button";
import { ArchiveRestoreIcon } from "lucide-react";
import { router } from "@inertiajs/react";
import { toast } from "sonner";
import { useState } from "react";

interface Props {
  resourceName: string;
  restoreUrl: string;
}

export default function RestoreButton({ resourceName, restoreUrl }: Props) {
  const [restoring, setRestoring] = useState(false);

  const handleRestore = () => {
    if (restoring) return;

    setRestoring(true);
    router.put(
      restoreUrl,
      {},
      {
        preserveScroll: true,
        onSuccess: () => {
          toast.info(`${capitalize(resourceName)} restaurado correctamente.`);
        },
        onError: () => {
          toast.error(`No se pudo restaurar el ${resourceName}.`);
        },
        onFinish: () => {
          setRestoring(false);
        },
      }
    );
  };

  const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleRestore}
      disabled={restoring}
      title="Restaurar"
      className="cursor-pointer"
    >
      <ArchiveRestoreIcon className="w-4 h-4" />
    </Button>
  );
}
