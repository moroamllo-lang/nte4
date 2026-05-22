/* 
========================================================================
   NTE - NEVERNESS TO EVERNESS LANDING PAGE JAVASCRIPT
   Interactions, Custom Cursor tracking, and Video controls
========================================================================
*/

document.addEventListener('DOMContentLoaded', () => {
    // 1. Premium Interactive Custom Cursor
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.custom-cursor-dot');

    if (cursor && cursorDot) {
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;

        // Follow mouse coordinates
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Instantly position the center dot
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        });

        // Custom lerp loop for the trailing outer circle to make it look smooth and "organic"
        const renderCursor = () => {
            // Speed factor for cursor delay
            const delay = 8; 
            cursorX += (mouseX - cursorX) / delay;
            cursorY += (mouseY - cursorY) / delay;

            cursor.style.left = `${cursorX}px`;
            cursor.style.top = `${cursorY}px`;

            requestAnimationFrame(renderCursor);
        };
        renderCursor();

        // 2. Cursor Hover States on Interactive Elements (gaming move feel)
        const hoverables = document.querySelectorAll('a, button, input, .promo-video-container');
        
        hoverables.forEach((el) => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
                cursorDot.classList.add('hover');
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
                cursorDot.classList.remove('hover');
            });
        });

        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
            cursorDot.style.opacity = '0';
        });

        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = '1';
            cursorDot.style.opacity = '1';
        });
    }

    // 3. Fallback looping control for video (force loop if browser delays it)
    const video = document.getElementById('bg-video');
    if (video) {
        // Attempt to play immediately
        video.play().catch(error => {
            console.log("Autoplay blocked by browser. Awaiting user interaction.", error);
            // In case autoplay is blocked, trigger on first touch/click
            document.body.addEventListener('click', () => {
                video.play();
            }, { once: true });
        });
    }

    // 4. Promo Video Player Interactivity (Play & Affiliate Redirect)
    const promoVideoContainer = document.getElementById('promo-video-container');
    const promoVideo = document.getElementById('promo-video');
    const videoOverlay = document.querySelector('.video-overlay-play');

    if (promoVideoContainer && promoVideo && videoOverlay) {
        promoVideoContainer.addEventListener('click', (e) => {
            e.stopPropagation();

            if (promoVideo.paused) {
                // Play and hide the neon overlay button
                promoVideo.play().catch(error => {
                    console.log("Promo video playback failed:", error);
                });
                videoOverlay.classList.add('playing');
                
                // Redirect user to the affiliate offer page in a new tab only when playing
                window.open('https://to.dordir.com/5A0I/2J2B7/', '_blank');
            } else {
                // Pause and show the neon overlay button
                promoVideo.pause();
                videoOverlay.classList.remove('playing');
            }
        });
    }

    // 5. Console greeting easter egg
    console.log(
        "%c Neverness to Everness (NTE) %c Affiliate Lander Loaded Successfully! ",
        "background:#FB5692;color:#FFF9FB;font-weight:bold;padding:5px;border-radius:3px 0 0 3px;",
        "background:#08080c;color:#FFF9FB;padding:5px;border-radius:0 3px 3px 0;"
    );
});
