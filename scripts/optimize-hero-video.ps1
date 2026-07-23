param(
  [Parameter(Mandatory = $true)]
  [string]$InputFile,

  [string]$OutputFile = ".\public\videos\sedi-hisham-factory-demo.mp4",

  [ValidateRange(0, 3600)]
  [double]$StartAt = 0,

  [ValidateRange(5, 60)]
  [int]$Duration = 18,

  [ValidateSet(480, 720, 1080)]
  [int]$Height = 720,

  [ValidateRange(18, 35)]
  [int]$Crf = 28,

  [ValidateSet("veryfast", "faster", "fast", "medium", "slow")]
  [string]$Preset = "medium",

  [ValidateRange(15, 60)]
  [int]$Fps = 30
)

$ErrorActionPreference = "Stop"

function Fail([string]$Message) {
  Write-Host "\nERROR: $Message" -ForegroundColor Red
  exit 1
}

function Format-Bytes([long]$Bytes) {
  if ($Bytes -ge 1GB) { return "{0:N2} GB" -f ($Bytes / 1GB) }
  if ($Bytes -ge 1MB) { return "{0:N2} MB" -f ($Bytes / 1MB) }
  if ($Bytes -ge 1KB) { return "{0:N2} KB" -f ($Bytes / 1KB) }
  return "$Bytes bytes"
}

if (-not (Get-Command ffmpeg -ErrorAction SilentlyContinue)) {
  Fail "FFmpeg is not installed or not available in PATH. Install it first, then reopen PowerShell."
}

if (-not (Get-Command ffprobe -ErrorAction SilentlyContinue)) {
  Fail "ffprobe is not available in PATH. It is normally installed with FFmpeg."
}

$ResolvedInput = Resolve-Path -LiteralPath $InputFile -ErrorAction SilentlyContinue
if (-not $ResolvedInput) {
  Fail "Input file was not found: $InputFile"
}

$InputFullPath = $ResolvedInput.Path
$OutputFullPath = [System.IO.Path]::GetFullPath($OutputFile)

if ($InputFullPath -eq $OutputFullPath) {
  Fail "OutputFile must be different from InputFile."
}

$OutputDirectory = Split-Path -Parent $OutputFullPath
if (-not (Test-Path -LiteralPath $OutputDirectory)) {
  New-Item -ItemType Directory -Path $OutputDirectory -Force | Out-Null
}

$InputDurationRaw = & ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$InputFullPath"
if ($LASTEXITCODE -ne 0 -or -not $InputDurationRaw) {
  Fail "Could not read the input video duration."
}

$InputDuration = 0.0
if (-not [double]::TryParse(
  $InputDurationRaw.Trim(),
  [System.Globalization.NumberStyles]::Float,
  [System.Globalization.CultureInfo]::InvariantCulture,
  [ref]$InputDuration
)) {
  Fail "The input video duration could not be parsed."
}

if ($StartAt -ge $InputDuration) {
  Fail "StartAt ($StartAt seconds) is after the end of the video ($([math]::Round($InputDuration, 2)) seconds)."
}

$AvailableDuration = $InputDuration - $StartAt
$FinalDuration = [math]::Min($Duration, $AvailableDuration)

$InputSize = (Get-Item -LiteralPath $InputFullPath).Length

Write-Host "\nOptimizing hero video..." -ForegroundColor Cyan
Write-Host "Input:      $InputFullPath"
Write-Host "Output:     $OutputFullPath"
Write-Host "Start:      $StartAt sec"
Write-Host "Duration:   $([math]::Round($FinalDuration, 2)) sec"
Write-Host "Resolution: ${Height}p"
Write-Host "Frame rate: $Fps fps"
Write-Host "CRF:        $Crf"
Write-Host "Preset:     $Preset"
Write-Host "Audio:      removed"
Write-Host "Input size: $(Format-Bytes $InputSize)\n"

$VideoFilter = "scale=-2:${Height}:flags=lanczos,fps=${Fps},format=yuv420p"

$FfmpegArgs = @(
  "-hide_banner",
  "-y",
  "-ss", $StartAt.ToString([System.Globalization.CultureInfo]::InvariantCulture),
  "-i", $InputFullPath,
  "-t", $FinalDuration.ToString([System.Globalization.CultureInfo]::InvariantCulture),
  "-map", "0:v:0",
  "-vf", $VideoFilter,
  "-c:v", "libx264",
  "-preset", $Preset,
  "-crf", $Crf.ToString(),
  "-profile:v", "high",
  "-level", "4.0",
  "-pix_fmt", "yuv420p",
  "-movflags", "+faststart",
  "-g", ($Fps * 2).ToString(),
  "-keyint_min", ($Fps * 2).ToString(),
  "-sc_threshold", "0",
  "-an",
  "-map_metadata", "-1",
  $OutputFullPath
)

& ffmpeg @FfmpegArgs

if ($LASTEXITCODE -ne 0 -or -not (Test-Path -LiteralPath $OutputFullPath)) {
  Fail "FFmpeg failed to create the optimized video."
}

$OutputSize = (Get-Item -LiteralPath $OutputFullPath).Length
$SavedPercent = if ($InputSize -gt 0) {
  [math]::Round((1 - ($OutputSize / $InputSize)) * 100, 1)
} else {
  0
}

Write-Host "\nDone." -ForegroundColor Green
Write-Host "Output size: $(Format-Bytes $OutputSize)"
Write-Host "Reduction:   $SavedPercent%"
Write-Host "Saved to:    $OutputFullPath" -ForegroundColor Green