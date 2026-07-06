# Decodes the canvas-rendered 1024px brand icon (from a CDP response file)
# and resizes it to the favicon sizes referenced in index.html.
param([Parameter(Mandatory=$true)][string]$ResponseFile)
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$root = Split-Path $PSScriptRoot -Parent
$json = Get-Content $ResponseFile -Raw | ConvertFrom-Json
$b64  = $json.result.value -replace '^data:image/png;base64,',''
$pngBig = Join-Path $root 'public\assets\favicon-512.png'

# Decode the 1024px master, then resize down.
$tmp = Join-Path $env:TEMP 'cf-icon-1024.png'
[IO.File]::WriteAllBytes($tmp, [Convert]::FromBase64String($b64))

function Resize-Png([string]$src, [string]$dst, [int]$size) {
  $img = [System.Drawing.Image]::FromFile($src)
  $bmp = New-Object System.Drawing.Bitmap($size, $size)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.DrawImage($img, 0, 0, $size, $size)
  $bmp.Save($dst, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose(); $bmp.Dispose(); $img.Dispose()
}

Resize-Png $tmp $pngBig 512
Resize-Png $tmp (Join-Path $root 'public\assets\favicon-180.png') 180
Resize-Png $tmp (Join-Path $root 'public\assets\favicon-32.png') 32
Remove-Item $tmp

Get-ChildItem (Join-Path $root 'public\assets') | Select-Object Name, Length
