<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class CopyPublicStorage extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'storage:copy';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Copia los archivos desde storage/app/public a public/storage';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $source = storage_path('app/public');
        $destination = public_path('storage');

        if(!File::exists($source)) {
            $this->error('La carpeta de origen no existe: ' . $source);
            return 1;
        }

        File::ensureDirectoryExists($destination);

        File::copyDirectory($source, $destination);

        $this->info('Archivos copiados de ' . $source . ' a ' . $destination);
        return 0;
    }
}
