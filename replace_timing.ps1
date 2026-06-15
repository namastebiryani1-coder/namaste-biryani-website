$path = Join-Path $PSScriptRoot 'src\App.tsx'
$content = Get-Content -Path $path -Raw
$content = $content -replace '<span className="font-serif-lux text-[#e8dfc6]/70 leading-snug">', '<span className="font-serif-lux text-[#e8dfc6]/70 leading-snug text-lg sm:text-xl font-semibold">'
Set-Content -Path $path -Value $content -Encoding utf8
