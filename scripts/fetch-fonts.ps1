$ErrorActionPreference = 'Stop'
$ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36'
$root = Split-Path -Parent $PSScriptRoot
$fontDir = Join-Path $root 'public\fonts'
New-Item -ItemType Directory -Force -Path $fontDir | Out-Null

# --- Satoshi (Fontshare) ---
$satoshiCss = (Invoke-WebRequest -Uri 'https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap' -Headers @{ 'User-Agent' = $ua } -UseBasicParsing).Content
$satoshiCss | Out-File -Encoding utf8 (Join-Path $PSScriptRoot 'satoshi-src.css')

# --- JetBrains Mono (Google Fonts) ---
$jbCss = (Invoke-WebRequest -Uri 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap' -Headers @{ 'User-Agent' = $ua } -UseBasicParsing).Content
$jbCss | Out-File -Encoding utf8 (Join-Path $PSScriptRoot 'jbmono-src.css')

Write-Output '--- SATOSHI CSS ---'
Write-Output $satoshiCss
Write-Output '--- JBMONO CSS ---'
Write-Output $jbCss
