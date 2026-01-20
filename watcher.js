const fs = require('fs');
const path = require('path');

const sourceRoot = "c:\\Users\\63596\\Desktop\\Ken_Note\\Ken_Obsidian_Project";
const targetRoot = "c:\\Users\\63596\\Desktop\\Ken_Note\\Ken_Wiki\\docs";

// --- Mappings ---
const folderMap = {
    "00 - 首页与索引": "00-index",
    "01 - 立回与中距离": "01-neutral",
    "02 - 起手与确认": "02-confirm",
    "03 - 连段后的压制": "03-oki",
    "04 - 确反连段": "04-punish",
    "05 - 连段大全": "05-combos",
    "06 - 角色与情景对策": "06-matchups",
    "99 - 模板与术语资源": "99-resources"
};

const fileMap = {
    "首页与索引.md": "index.md",
    "立回基础.md": "neutral-basics.md",
    "基础确认.md": "confirm-basics.md",
    "压制速查.md": "oki-cheat-sheet.md",
    "确反指南.md": "punish-guide.md",
    "版中连段.md": "midscreen-combos.md",
    "版边连段.md": "corner-combos.md",
    "All_In_斩杀.md": "all-in-kill.md",
    "打康与特殊连段.md": "punish-counter.md",
    "特定角色对策.md": "char-matchups.md",
    "迸发与打灰对策.md": "di-burnout.md",
    "距离陷阱.md": "spacing-traps.md",
    "基础术语.md": "terminology.md"
};

// --- Sync Function ---
function syncFile(srcPath) {
    const fileName = path.basename(srcPath);
    const folderName = path.basename(path.dirname(srcPath));

    // Check if folder is mapped
    if (!folderMap[folderName]) return;

    // Check if file is mapped
    if (!fileMap[fileName]) return;

    const targetDir = path.join(targetRoot, folderMap[folderName]);
    const targetFile = path.join(targetDir, fileMap[fileName]);

    try {
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }
        
        const content = fs.readFileSync(srcPath, 'utf8');
        fs.writeFileSync(targetFile, content, 'utf8');
        console.log(`[Synced] ${fileName} -> ${path.basename(targetFile)}`);

        // Special case for root index
        if (fileName === "首页与索引.md") {
            fs.copyFileSync(targetFile, path.join(targetRoot, "index.md"));
            console.log(`[Synced] Root index.md updated.`);
        }

    } catch (e) {
        console.error(`[Error] Failed to sync ${fileName}: ${e.message}`);
    }
}

// --- Initial Full Sync ---
console.log("--- Performing Initial Full Sync ---");
Object.keys(folderMap).forEach(folder => {
    const srcDir = path.join(sourceRoot, folder);
    if (fs.existsSync(srcDir)) {
        fs.readdirSync(srcDir).forEach(file => {
            syncFile(path.join(srcDir, file));
        });
    }
});
console.log("--- Initial Sync Complete ---");

// --- Watch Mode ---
console.log(`\nWatching for changes in: ${sourceRoot}...`);
fs.watch(sourceRoot, { recursive: true }, (eventType, filename) => {
    if (filename && filename.endsWith('.md')) {
        // Construct absolute path (filename from watch is relative)
        // Note: fs.watch behavior varies by platform. On Windows, filename is usually backslashed.
        // We need to find which folder it belongs to.
        // Since watch is recursive, filename might be "02 - 起手与确认\\基础确认.md"
        
        const fullPath = path.join(sourceRoot, filename);
        if (fs.existsSync(fullPath)) {
            console.log(`[Change Detected] ${filename}`);
            syncFile(fullPath);
        }
    }
});

// Keep process alive
setInterval(() => {}, 1000 * 60 * 60);
