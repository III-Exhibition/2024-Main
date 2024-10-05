import * as THREE from "three";
import { Font } from "three/examples/jsm/Addons.js";

import { ParticleData } from "@/models/global";

import { particleSystem } from "./particleSystem";

// クラスベースのEnvironmentの定義
export class Environment {
    font: Font;
    particle: THREE.Texture;
    container: HTMLElement;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera | undefined;
    renderer: THREE.WebGLRenderer | undefined;
    particleSystem: particleSystem | undefined;
    particleOptions: ParticleData;
    constructor(
        font: Font,
        particle: THREE.Texture,
        magicRef: React.RefObject<HTMLDivElement>,
        particleOptions: ParticleData
    ) {
        this.font = font;
        this.particle = particle;
        if (magicRef.current) {
            this.container = magicRef.current;
        } else {
            throw new Error("magicRef.current is null");
        }
        this.particleOptions = particleOptions;
        this.scene = new THREE.Scene();
        this.createCamera();
        this.createRenderer();
        this.setup();
        this.bindEvents();
    }

    bindEvents() {
        window.addEventListener("resize", this.onWindowResize.bind(this));
    }

    setup() {
        if (!this.camera || !this.renderer) {
            throw new Error("Camera or Renderer is not initialized");
        }
        this.particleSystem = new particleSystem(
            this.scene,
            this.font,
            this.particle,
            this.camera,
            this.renderer,
            this.particleOptions
        );
    }

    render() {
        if (!this.particleSystem || !this.renderer || !this.camera) {
            throw new Error("ParticleSystem, Renderer, or Camera is not initialized");
        }
        this.particleSystem.render();
        this.renderer.render(this.scene, this.camera);
    }

    createCamera() {
        this.camera = new THREE.PerspectiveCamera(
            65,
            this.container.clientWidth / this.container.clientHeight,
            1,
            10000
        );
        this.camera.position.set(0, 0, 100);
    }

    createRenderer() {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);

        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setClearColor(0x000000, 0);

        this.renderer.outputColorSpace = THREE.SRGBColorSpace;
        this.container.appendChild(this.renderer.domElement);

        this.renderer.setAnimationLoop(() => {
            this.render();
        });
    }

    onWindowResize() {
        if (!this.camera || !this.renderer) {
            throw new Error("Camera or Renderer is not initialized");
        }
        this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    }
}
