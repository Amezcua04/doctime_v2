#!/bin/bash

echo "Desplegando aplicación Laravel..."

# Actualiza el código desde Git
git pull origin main

# Instala dependencias
composer install --no-dev --optimize-autoloader

# Ejecuta migraciones si aplica
php artisan migrate --force

# Copia archivos de storage
php artisan storage:copy

# Limpia cachés
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "¡Despliegue completo!"