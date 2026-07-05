$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$root = Split-Path -Parent $PSScriptRoot
$dir = Join-Path $root 'public\assets\avatars'
$size = 138  # 46px display x 3 (max device pixel ratio)

Get-ChildItem (Join-Path $dir '*.jpg') | ForEach-Object {
  $src = [System.Drawing.Image]::FromFile($_.FullName)
  $bmp = New-Object System.Drawing.Bitmap($size, $size)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.DrawImage($src, 0, 0, $size, $size)
  $g.Dispose(); $src.Dispose()

  $enc = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
  $p = New-Object System.Drawing.Imaging.EncoderParameters(1)
  $p.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]82)
  $tmp = "$($_.FullName).tmp"
  $bmp.Save($tmp, $enc, $p)
  $bmp.Dispose()
  Move-Item -Force $tmp $_.FullName
  Write-Output ("{0}: {1} bytes" -f $_.Name, (Get-Item $_.FullName).Length)
}
