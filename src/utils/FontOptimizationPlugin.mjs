import fs from "fs";
import zlib from "zlib";

export class FontOptimizationPlugin {
    options;
    constructor({ fontPath, outputPath, chars }) {
        this.options = { fontPath, outputPath, chars };
    }

    apply(compiler) {
        compiler.hooks.emit.tapAsync("FontOptimizationPlugin", (compilation, callback) => {
            const fontPath = this.options.fontPath;
            const neededChars = new Set(this.options.chars);

            // 读取并解压 gzip 字体文件
            const compressedData = fs.readFileSync(fontPath);
            zlib.gunzip(compressedData, (err, buffer) => {
                if (err) {
                    return callback(err);
                }

                const fontData = JSON.parse(buffer.toString("utf8"));

                // 筛选需要的字符
                fontData.glyphs = Object.fromEntries(
                    Object.entries(fontData.glyphs).filter(([char]) => neededChars.has(char))
                );

                // 写回精简后的字体文件
                fs.writeFileSync(this.options.outputPath, JSON.stringify(fontData));

                callback();
            });
        });
    }
}
