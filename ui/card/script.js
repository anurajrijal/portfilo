        // Page load animation
        window.addEventListener('load', function() {
            document.body.classList.add('loaded');
        });

        // Three.js Matrix Code Rain Animation
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            alpha: true 
        });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);
        document.getElementById('threejs-bg').appendChild(renderer.domElement);
        
        camera.position.z = 30;
        
        // Fire particles
        const particleCount = 1500;
        const particles = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);
        
        // Initialize particles
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            
            // Create a cone-shaped distribution for fire
            const radius = Math.random() * 20;
            const angle = Math.random() * Math.PI * 2;
            positions[i3] = Math.cos(angle) * radius * 0.5;
            positions[i3 + 1] = -15 + Math.random() * 5;
            positions[i3 + 2] = Math.sin(angle) * radius * 0.5;
            
            // Fire colors - from bright yellow (core) to orange/red (edges)
            const colorIntensity = 0.7 + Math.random() * 0.3;
            colors[i3] = 1.0; // R
            colors[i3 + 1] = 0.3 + Math.random() * 0.7 * colorIntensity; // G
            colors[i3 + 2] = 0.0; // B
            
            // Random sizes - smaller particles at the edges
            sizes[i] = 0.5 + Math.random() * 2;
        }
        
        particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        
        // Particle material
        const particleMaterial = new THREE.PointsMaterial({
            size: 1.5,
            vertexColors: true,
            transparent: true,
            opacity: 0.9,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true,
            depthWrite: false
        });
        
        // Create particle system
        const particleSystem = new THREE.Points(particles, particleMaterial);
        scene.add(particleSystem);
        
        function animate() {
            requestAnimationFrame(animate);
            
            // Update particles
            const positions = particles.attributes.position.array;
            const colors = particles.attributes.color.array;
            
            for (let i = 0; i < particleCount; i++) {
                const i3 = i * 3;
                
                // Fire movement - faster at center, slower at edges
                const distanceFromCenter = Math.sqrt(positions[i3] * positions[i3] + positions[i3 + 2] * positions[i3 + 2]);
                const speedFactor = 1 - (distanceFromCenter / 30);
                
                // Move particles upward with turbulence
                positions[i3 + 1] += 0.1 + speedFactor * 0.3;
                positions[i3] += (Math.random() - 0.5) * 0.3 * speedFactor;
                positions[i3 + 2] += (Math.random() - 0.5) * 0.3 * speedFactor;
                
                // Color transition from yellow to orange to red
                colors[i3] = Math.min(1.0, colors[i3] + 0.01);
                colors[i3 + 1] = Math.max(0.1, colors[i3 + 1] - 0.01);
                
                // Size decreases as fire rises
                sizes[i] = Math.max(0.1, sizes[i] - 0.01);
                
                // Reset particles that reach the top or fade out
                if (positions[i3 + 1] > 25 || sizes[i] <= 0.1) {
                    // Reset to base position
                    const radius = Math.random() * 15;
                    const angle = Math.random() * Math.PI * 2;
                    positions[i3] = Math.cos(angle) * radius * 0.5;
                    positions[i3 + 1] = -15 + Math.random() * 5;
                    positions[i3 + 2] = Math.sin(angle) * radius * 0.5;
                    
                    // Reset to bright yellow
                    colors[i3] = 1.0;
                    colors[i3 + 1] = 0.5 + Math.random() * 0.5;
                    colors[i3 + 2] = 0.0;
                    
                    // Reset size
                    sizes[i] = 0.5 + Math.random() * 2;
                }
            }
            
            // Mark attributes as needing update
            particles.attributes.position.needsUpdate = true;
            particles.attributes.color.needsUpdate = true;
            particles.attributes.size.needsUpdate = true;
            
            renderer.render(scene, camera);
        }
        
        animate();
        
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // Typing effect
        const texts = ["Ashen One", "Elden Lord","Maidenless"];
        let count = 0;
        let index = 0;
        let currentText = "";
        let letter = "";
        
        (function type() {
            if (count === texts.length) {
                count = 0;
            }
            currentText = texts[count];
            letter = currentText.slice(0, ++index);
            
            document.getElementById("typing-text").textContent = letter;
            
            if (letter.length === currentText.length) {
                setTimeout(() => {
                    count++;
                    index = 0;
                    setTimeout(type, 500);
                }, 2000);
                return;
            }
            
            setTimeout(type, 100);
        })();
        
        // Image fallback
        const profileImg = document.querySelector('.profile-img');
        profileImg.addEventListener('error', function() {
            this.src = 'https://via.placeholder.com/256';
            this.alt = 'Profile Image Placeholder';
        });


















































