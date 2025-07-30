# Script de migración para Windows PowerShell
# Ejecutar desde el directorio nextjs-migration

Write-Host "🚀 Iniciando migración de archivos públicos..." -ForegroundColor Green

# Crear directorio public si no existe
if (!(Test-Path "public")) {
    New-Item -ItemType Directory -Path "public"
    Write-Host "✅ Directorio public creado" -ForegroundColor Green
}

# Copiar archivos públicos del proyecto original
$originalPublicPath = "..\public\*"
if (Test-Path $originalPublicPath) {
    Copy-Item -Path $originalPublicPath -Destination "public\" -Recurse -Force
    Write-Host "✅ Archivos públicos copiados" -ForegroundColor Green
} else {
    Write-Host "⚠️  No se encontró la carpeta public del proyecto original" -ForegroundColor Yellow
    Write-Host "   Asegúrate de ejecutar este script desde nextjs-migration/" -ForegroundColor Yellow
}

# Verificar archivos críticos
$criticalFiles = @(
    "public\BackHero.jpg",
    "public\Logo INLAAB.svg",
    "public\Logo InlaabNav.svg",
    "public\favicon.svg",
    "public\fonts",
    "public\assets\ISA_Avatar.jpg"
)

Write-Host "\n🔍 Verificando archivos críticos..." -ForegroundColor Cyan
foreach ($file in $criticalFiles) {
    if (Test-Path $file) {
        Write-Host "✅ $file" -ForegroundColor Green
    } else {
        Write-Host "❌ $file - FALTANTE" -ForegroundColor Red
    }
}

# Instalar dependencias si no existen
if (!(Test-Path "node_modules")) {
    Write-Host "\n📦 Instalando dependencias..." -ForegroundColor Cyan
    npm install
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Dependencias instaladas" -ForegroundColor Green
    } else {
        Write-Host "❌ Error instalando dependencias" -ForegroundColor Red
    }
}

Write-Host "\n🎉 Migración completada!" -ForegroundColor Green
Write-Host "\nPróximos pasos:" -ForegroundColor Cyan
Write-Host "1. npm run dev - para ejecutar en desarrollo" -ForegroundColor White
Write-Host "2. npm run build - para construir para producción" -ForegroundColor White
Write-Host "3. npm run start - para ejecutar en producción" -ForegroundColor White
Write-Host "\n🌐 El sitio estará disponible en http://localhost:3000" -ForegroundColor Yellow