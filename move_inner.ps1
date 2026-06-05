$src='C:\Users\polly\IESB-PDM-2026\IESB-PDM-2026'
$dst='C:\Users\polly\IESB-PDM-2026'

Write-Host "Source: $src"
Write-Host "Destination: $dst"

$names = Get-ChildItem -Force -Name -Path $src
$conflicts = @()
foreach($n in $names) {
  if (Test-Path (Join-Path $dst $n)) {
    $conflicts += $n
  }
}

if ($conflicts.Count -gt 0) {
  Write-Host "CONFLICTS_FOUND"
  $conflicts | ForEach-Object { Write-Host " - $_" }
  exit 2
} else {
  Write-Host "NO_CONFLICTS"
  Get-ChildItem -Force -Path $src | ForEach-Object { Move-Item -LiteralPath $_.FullName -Destination $dst -Force }
  Remove-Item -LiteralPath $src -Recurse -Force
  Write-Host "MOVED_OK"
}
