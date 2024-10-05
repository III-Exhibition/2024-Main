import { useEffect } from "react";
import * as THREE from "three";
import { Font, FontLoader } from "three/examples/jsm/loaders/FontLoader.js";

import { ParticleData } from "@/models/global";

import { Environment } from "./internal/environment";

export const useTitle = (magicRef: React.RefObject<HTMLDivElement>) => {
    useEffect(() => {
        let environment: Environment | null = null;
        if (!magicRef.current) return;

        // フォントとテクスチャのプリロード
        const preload = (particleOptions: ParticleData) => {
            const manager = new THREE.LoadingManager();

            let typo: Font | null = null;
            let particle: THREE.Texture | null = null;
            manager.onLoad = () => {
                if (typo && particle) {
                    environment = new Environment(typo, particle, magicRef, particleOptions);
                }
            };

            const fontUrl = "/fonts/KleeOne-Regular.json";
            new FontLoader(manager).load(fontUrl, (font) => {
                typo = font;
            });

            const particleImgUrl =
                "https://res.cloudinary.com/dfvtkoboz/image/upload/v1605013866/particle_a64uzf.png";
            new THREE.TextureLoader(manager).load(particleImgUrl, (texture) => {
                particle = texture;
            });
        };

        const getTextSize = () => {
            if (window.innerWidth > 1024) {
                return 8;
            } else if (window.innerWidth > 768) {
                return 6;
            } else if (window.innerWidth > 500) {
                return 4;
            } else {
                return 4;
            }
        };

        const particleOptions: ParticleData = {
            text: "付いて離れて",
            planeParticleAmount: 300,
            outlineParticleAmount: 10,
            particleSize: 1,
            particleColor: 0xffffff,
            textSize: getTextSize(),
            area: 7,
            ease: 0.05,
        };

        if (
            document.readyState === "complete" ||
            (document.readyState !== "loading" && !document.documentElement.scrollTop)
        ) {
            preload(particleOptions);
        } else {
            document.addEventListener("DOMContentLoaded", () => preload(particleOptions));
        }

        // クリーンアップ
        return () => {
            if (environment) {
                environment = null;
            }
            document.removeEventListener("DOMContentLoaded", () => preload(particleOptions));
        };
    }, [magicRef]);
};
