window.onload = function() {

    var scene, camera, renderer, mill,
        model, controls, manualRender;

    function init() {

        /**
         * scene
         * camera 
         * renderer
         */
        {
            scene = new THREE.Scene();

            const width = window.innerWidth;
            const height = window.innerHeight;
            camera = new THREE.PerspectiveCamera(90, width / height, .1, 1000);
            // camera = new THREE.PerspectiveCamera(90, width / height, .1, 100000);
            camera.position.set(20, 5, 2);
            // camera.position.set(-5000, 5000, 0);
            camera.lookAt(scene.position);

            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(width, height);
            renderer.setClearColor(0xb9d3ff, 1);
            document.body.appendChild(renderer.domElement);
        }

        /**
         * sky box
         */
        scene.background = new THREE.CubeTextureLoader()
            .setPath('./assets/img/skybox/')
            .load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']);

        /**
         * obj loader
         */
        {
            const objLoader = new THREE.OBJLoader();
            const mtlLoader = new THREE.MTLLoader();
            const objName = './assets/obj/windmill/windmill';
            // const objName = './assets/obj/city/Sity_OBJ_2009';

            mtlLoader.load(objName + '.mtl', mtl => {
                mtl.preload();
                for (const material of Object.values(mtl.materials)) {
                    material.side = THREE.DoubleSide;
                }
                for (const material of Object.values(mtl.materials)) {
                    material.side = THREE.DoubleSide;
                }
                objLoader.setMaterials(mtl);
                objLoader.load(objName + '.obj', obj => {
                        model = obj;
                        var children = obj.children;
                        children.forEach(child => {
                            child.castShadow = true;
                        })
                        console.log(children);
                        scene.add(obj);
                        mill = model.getObjectByName("lopatky_Circle.003");
                    },
                    xhr => {
                        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                    },
                    err => {
                        console.error(err)
                    });
            })


            function resizeRendererToDisplaySize(renderer) {
                const canvas = renderer.domElement;
                const width = canvas.clientWidth;
                const height = canvas.clientHeight;
                const needResize = canvas.width !== width || canvas.height !== height;
                if (needResize) {
                    renderer.setSize(width, height, false);
                }
                return needResize;
            }
        }


        /**
         * light
         */
        {
            const color = 'gold';
            const intensity = 1;
            const light = new THREE.DirectionalLight(color, intensity);
            light.position.set(0, 10, 10);
            // light.position.set(150, 1000, 20);
            scene.add(light);
            scene.add(light.target);
        }


        controls = new THREE.OrbitControls(camera, renderer.domElement);
        manualRender = () => {
            controls.update();

            /**
             * 公转
             */
            {
                // if (mill) mill.rotateX(-Math.PI / 200)
            }

            /**
             * 自转
             */
            {
                mill && rotateSelf(mill, { rx: -Math.PI / 200 });
            }

            // console.log(camera.position)

            if (resizeRendererToDisplaySize(renderer)) {
                const canvas = renderer.domElement;
                camera.aspect = canvas.clientWidth / canvas.clientHeight;
                camera.updateProjectionMatrix();
            }

            renderer.render(scene, camera);
            requestAnimationFrame(manualRender);
        };
        window.onresize = function(r) {
            const width = window.innerWidth;
            const height = window.innerHeight;
            renderer.setSize(width, height);
        };
    }

    init();
    manualRender();
}