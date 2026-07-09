# Generate Google Search–friendly favicon sizes from favicon-512.png
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$root = Split-Path $PSScriptRoot -Parent
$public = Join-Path $root 'public'
$src = Join-Path $public 'assets\favicon-512.png'

function Resize-Png([string]$source, [string]$dest, [int]$size) {
  $img = [System.Drawing.Image]::FromFile($source)
  $bmp = New-Object System.Drawing.Bitmap($size, $size)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.DrawImage($img, 0, 0, $size, $size)
  $bmp.Save($dest, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose(); $bmp.Dispose(); $img.Dispose()
}

Resize-Png $src (Join-Path $public 'assets\favicon-48.png') 48
Resize-Png $src (Join-Path $public 'assets\favicon-192.png') 192

# Root favicon.ico (48px) — crawlers and Google check /favicon.ico first
$img48 = [System.Drawing.Image]::FromFile((Join-Path $public 'assets\favicon-48.png'))
$bmp48 = New-Object System.Drawing.Bitmap($img48)
$icon = [System.Drawing.Icon]::FromHandle($bmp48.GetHicon())
$fs = [System.IO.File]::Create((Join-Path $public 'favicon.ico'))
$icon.Save($fs)
$fs.Close()
$icon.Dispose(); $bmp48.Dispose(); $img48.Dispose()

Get-ChildItem $public, (Join-Path $public 'assets') -Filter '*favicon*' |
  Select-Object Name, Length, FullName
