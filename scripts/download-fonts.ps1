$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$fontDir = Join-Path $root 'public\fonts'
New-Item -ItemType Directory -Force -Path $fontDir | Out-Null

$files = @{
  'satoshi-400.woff2' = 'https://cdn.fontshare.com/wf/TTX2Z3BF3P6Y5BQT3IV2VNOK6FL22KUT/7QYRJOI3JIMYHGY6CH7SOIFRQLZOLNJ6/KFIAZD4RUMEZIYV6FQ3T3GP5PDBDB6JY.woff2'
  'satoshi-500.woff2' = 'https://cdn.fontshare.com/wf/P2LQKHE6KA6ZP4AAGN72KDWMHH6ZH3TA/ZC32TK2P7FPS5GFTL46EU6KQJA24ZYDB/7AHDUZ4A7LFLVFUIFSARGIWCRQJHISQP.woff2'
  'satoshi-700.woff2' = 'https://cdn.fontshare.com/wf/LAFFD4SDUCDVQEXFPDC7C53EQ4ZELWQI/PXCT3G6LO6ICM5I3NTYENYPWJAECAWDD/GHM6WVH6MILNYOOCXHXB5GTSGNTMGXZR.woff2'
  'satoshi-900.woff2' = 'https://cdn.fontshare.com/wf/NHPGVFYUXYXE33DZ75OIT4JFGHITX5PE/PSUTMASCDJTVPERDYJZPN23BVUFUCQIF/J64QX5IPOHK56I2KYUNBQ5M2XWZEYKYX.woff2'
  'jetbrains-mono-latin.woff2' = 'https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPxDcwg.woff2'
  'jetbrains-mono-latin-ext.woff2' = 'https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPx7cwhsk.woff2'
}

foreach ($name in $files.Keys) {
  $dest = Join-Path $fontDir $name
  Invoke-WebRequest -Uri $files[$name] -OutFile $dest -UseBasicParsing
  $size = (Get-Item $dest).Length
  Write-Output ("{0}  {1} bytes" -f $name, $size)
}
