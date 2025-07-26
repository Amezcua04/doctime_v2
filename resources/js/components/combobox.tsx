import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ScrollArea } from "./ui/scroll-area";

interface Paciente {
  id: number;
  nombre: string;
}

interface ComboboxPacienteProps {
  pacientes: Paciente[];
  onChange: (paciente: Paciente) => void;
  value?: Paciente | null;
}

export default function ComboboxPaciente({
  pacientes,
  onChange,
  value = null,
}: ComboboxPacienteProps) {
  const [open, setOpen] = useState(false);
  const [selectedPaciente, setSelectedPaciente] = useState<Paciente | null>(value);
  const handleSelect = (paciente: Paciente) => {
    setSelectedPaciente(paciente);
    onChange(paciente);
    setOpen(false);
  };

  return (
    <div className="space-y-1">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between font-light"
          >
            {selectedPaciente ? selectedPaciente.nombre : "Buscar paciente..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[var(--trigger-width)] z-[50] pointer-events-auto"
          side="bottom"
          align="start"
          asChild
        >
          <div>
            <Command shouldFilter={true}>
              <CommandInput placeholder="Nombre del paciente..." />
              <CommandEmpty>No se encontró paciente</CommandEmpty>
              <ScrollArea className="max-h-60 overflow-auto">
                <CommandGroup>
                  {pacientes.map((paciente) => (
                    <CommandItem
                      key={paciente.id}
                      value={paciente.nombre}
                      onSelect={(value) => {
                        const selected = pacientes.find(p => p.nombre === value);
                        if (selected) {
                          handleSelect(selected);
                        }
                      }}
                      className="cursor-pointer"
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedPaciente?.id === paciente.id
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {paciente.nombre}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </ScrollArea>

            </Command>
          </div>
        </PopoverContent>
      </Popover>

    </div>
  );
}
