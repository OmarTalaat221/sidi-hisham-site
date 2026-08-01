const { spawnSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const projectRoot = path.resolve(__dirname, "..");
const videosDirectory = path.join(projectRoot, "public", "videos");

const defaultInputPath = path.join(videosDirectory, "sidi-hisham-banner.mp4");

const inputPath = process.argv[2]
  ? path.resolve(projectRoot, process.argv[2])
  : defaultInputPath;

const outputName = process.argv[3] || "sidi-hisham-banner-optimized.mp4";

const outputPath = path.join(videosDirectory, outputName);

function formatMegabytes(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

if (!fs.existsSync(inputPath)) {
  console.error("\nلم يتم العثور على الفيديو الأصلي:");
  console.error(inputPath);
  process.exit(1);
}

fs.mkdirSync(videosDirectory, {
  recursive: true,
});

if (path.resolve(inputPath) === path.resolve(outputPath)) {
  console.error("\nاسم ملف الإخراج لا يمكن أن يكون نفس اسم الفيديو الأصلي.");
  process.exit(1);
}

console.log("\nبدء ضغط فيديو البانر...");
console.log(`\nInput:\n${inputPath}`);
console.log(`\nOutput:\n${outputPath}\n`);

const ffmpegArguments = [
  "-y",

  "-i",
  inputPath,

  "-an",

  "-vf",
  "scale=1600:900:force_original_aspect_ratio=decrease:force_divisible_by=2,fps=24",

  "-c:v",
  "libx264",

  "-preset",
  "slow",

  "-crf",
  "25",

  "-profile:v",
  "high",

  "-level",
  "4.1",

  "-pix_fmt",
  "yuv420p",

  "-movflags",
  "+faststart",

  "-map_metadata",
  "-1",

  outputPath,
];

const result = spawnSync("ffmpeg", ffmpegArguments, {
  cwd: projectRoot,
  stdio: "inherit",
  windowsHide: false,
});

if (result.error) {
  if (result.error.code === "ENOENT") {
    console.error("\nFFmpeg غير مثبت أو غير مضاف إلى PATH.");
    console.error("اختبره باستخدام: ffmpeg -version\n");
  } else {
    console.error(`\nخطأ أثناء تشغيل FFmpeg: ${result.error.message}\n`);
  }

  process.exit(1);
}

if (result.status !== 0) {
  console.error(`\nفشل ضغط الفيديو. Exit code: ${result.status}\n`);
  process.exit(result.status || 1);
}

if (!fs.existsSync(outputPath)) {
  console.error("\nانتهى FFmpeg لكن ملف الإخراج لم يتم إنشاؤه.\n");
  process.exit(1);
}

const originalSize = fs.statSync(inputPath).size;
const optimizedSize = fs.statSync(outputPath).size;

const savingPercentage =
  originalSize > 0
    ? Math.max(
        0,
        ((originalSize - optimizedSize) / originalSize) * 100,
      ).toFixed(1)
    : "0.0";

console.log("\nتم ضغط الفيديو بنجاح.");
console.log(`الحجم الأصلي: ${formatMegabytes(originalSize)}`);
console.log(`الحجم الجديد: ${formatMegabytes(optimizedSize)}`);
console.log(`نسبة التوفير: ${savingPercentage}%`);
console.log(`\nالملف الجديد:\n${outputPath}\n`);
