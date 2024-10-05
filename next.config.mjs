import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";
import { FontOptimizationPlugin } from "./src/utils/FontOptimizationPlugin.mjs";

const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig = {
    reactStrictMode: true,
    webpack: (config) => {
        config.plugins.push(
            new FontOptimizationPlugin({
                fontPath: "./public/fonts/KleeOne-Regular-Master.json.gz",
                outputPath: "./public/fonts/KleeOne-Title.json",
                chars: "付いて離れて",
            })
        );
        config.module.rules.push({
            test: /.(vert|frag)$/,
            use: "raw-loader",
        });
        return config;
    },
    images: {
        // FIXME: テスト用の設定追加なので、本番環境では削除する
        remotePatterns: [
            {
                protocol: "https",
                hostname: "placehold.jp",
                port: "",
            },
        ],
    },
};

export default withVanillaExtract(nextConfig);
