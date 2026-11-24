
/* ==========================================
   PERSONAL SETTINGS
========================================== */

const CORRECT_PASSWORD = "khushii098711";
const GIRLFRIEND_NAME = "Khushii";


/* ==========================================
   INITIALIZE WEBSITE
========================================== */

function initializeBirthdaySite() {

    // Automatically set her name
    const girlName = document.getElementById("girlName");

    if (girlName) {
        girlName.textContent = GIRLFRIEND_NAME;
    }

    document.querySelectorAll(".personName").forEach(element => {
        element.textContent = GIRLFRIEND_NAME;
    });


    // Enter key for password
    const passwordInput = document.getElementById("passwordInput");

    if (passwordInput) {
        passwordInput.addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                checkPassword();
            }
        });
    }


    // Photo gallery click events
    document.querySelectorAll(".photo-card img").forEach(img => {

        img.addEventListener("click", function() {
            openLightbox(this);
        });

    });


    // Close lightbox using Escape
    document.addEventListener("keydown", function(event) {

        if (event.key === "Escape") {
            closeLightbox();
        }

    });

}


// Run initialization after HTML loads
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeBirthdaySite);
} else {
    initializeBirthdaySite();
}



/* ==========================================
   PASSWORD
========================================== */

function checkPassword() {

    const input = document.getElementById("passwordInput");
    const error = document.getElementById("passwordError");

    if (!input) return;

    if (input.value === CORRECT_PASSWORD) {

        document.getElementById("passwordScreen")
            ?.classList.add("hidden");

        document.getElementById("envelopeScreen")
            ?.classList.remove("hidden");

        createHearts(37);

    } else {

        if (error) {
            error.textContent = "Wrong password... try again ❤️";
        }

        input.value = "";

    }

}



/* ==========================================
   PAGE NAVIGATION
========================================== */

function showPage(pageID) {

    const pages = document.querySelectorAll(".page");

    pages.forEach(page => {
        page.classList.remove("active");
    });

    const selectedPage = document.getElementById(pageID);

    if (!selectedPage) {
        console.error("Page not found:", pageID);
        return;
    }

    selectedPage.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    createHearts(25);

}




/* ==========================================
   BACKGROUND MUSIC
========================================== */

// Start music when the envelope opens
function startBirthdayMusic() {

    const music = document.getElementById("backgroundMusic");
    const button = document.getElementById("musicButton");

    if (!music) {
        console.error("Background music element not found!");
        return;
    }

    // Start with sound enabled
    music.muted = false;
    music.volume = 0.65;

    music.play()
        .then(() => {

            if (button) {
                button.textContent = "🔇 Mute Music";
            }

            console.log("Birthday music started!");

        })
        .catch(error => {

            console.error("Music playback failed:", error);

            if (button) {
                button.textContent = "▶ Play Music";
            }

        });
}


// Mute and unmute music whenever she wants


function toggleMusic() {

    const music = document.getElementById("backgroundMusic");
    const button = document.getElementById("musicButton");

    if (!music || !button) {
        console.error("Music element or button not found!");
        return;
    }

    // If music has not started, try starting it
    if (music.paused) {

        music.muted = false;

        music.play()
            .then(() => {
                button.textContent = "🔇 Mute Music";
            })
            .catch(error => {
                console.error("Music playback failed:", error);
            });

        return;
    }

    // Toggle mute without stopping playback
    music.muted = !music.muted;

    if (music.muted) {
        button.textContent = "🔊 Unmute Music";
    } else {
        button.textContent = "🔇 Mute Music";
    }

}




/* ==========================================
   BIRTHDAY WISH
========================================== */

function makeWish() {

    const message = document.getElementById("wishMessage");

    if (message) {

        message.textContent =
            "✨ Your wish has been sent to the universe! ❤️";

    }

    createHearts(51);

}



/* ==========================================
   FLOATING HEARTS
========================================== */

function createHearts(amount = 10) {

    const container = document.getElementById("hearts");

    if (!container) return;

    const emojis = [
        "❤️",
        "💕",
        "💗",
        "💖",
        "✨",
        "🌸"
    ];

    for (let i = 0; i < amount; i++) {

        const heart = document.createElement("span");

        heart.className = "heart";

        heart.textContent =
            emojis[Math.floor(Math.random() * emojis.length)];

        heart.style.left = Math.random() * 100 + "%";

        heart.style.fontSize =
            15 + Math.random() * 25 + "px";

        heart.style.animationDuration =
            3 + Math.random() * 4 + "s";

        heart.style.animationDelay =
            Math.random() * 1.5 + "s";

        container.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 8000);

    }

}



/* ==========================================
   CONTINUOUS SMALL HEARTS
========================================== */

setInterval(() => {

    const website = document.getElementById("website");

    if (
        website &&
        !website.classList.contains("hidden")
    ) {

        createHearts(2);

    }

}, 1800);




/* ==========================================
   OPEN BIRTHDAY ENVELOPE
========================================== */

function openEnvelope() {

    const envelope = document.getElementById("birthdayEnvelope");

    if (!envelope) return;

    envelope.classList.add("opened");

    createHearts(41);

    // Start music directly from the envelope click
    startBirthdayMusic();

    setTimeout(() => {

        document.getElementById("envelopeScreen")
            ?.classList.add("hidden");

        document.getElementById("website")
            ?.classList.remove("hidden");

        showPage("home");

    }, 1200);

}




/* ==========================================
   BLOW OUT BIRTHDAY CANDLES
========================================== */


function blowCandles() {

    const candles = document.getElementById("candles");
    const message = document.getElementById("candleMessage");
    const button = document.getElementById("blowButton");

    if (!candles || !message || !button) return;

    // Prevent repeated clicks
    if (candles.classList.contains("extinguished")) {
        return;
    }

    // Extinguish all candle flames
    candles.classList.add("extinguished");

    // Birthday message
    message.textContent =
        "Happy Birthday, Khushii! May all your dreams come true! ❤️✨";

    // Update existing button
    button.textContent = "Wish Made! 💗";
    button.disabled = true;

    // Magical floating hearts
    createHearts(40);

}



/* ==========================================
   PHOTO LIGHTBOX
========================================== */

function openLightbox(img) {

    const lightbox = document.getElementById("photoLightbox");

    const lightboxImage = document.getElementById("lightboxImage");

    const caption = document.getElementById("lightboxCaption");

    if (!lightbox || !lightboxImage || !caption) {
        console.error("Lightbox HTML elements not found!");
        return;
    }

    lightboxImage.src = img.src;

    const photoCard = img.closest(".photo-card");

    const photoCaption = photoCard
        ? photoCard.querySelector("p")
        : null;

    caption.textContent = photoCaption
        ? photoCaption.textContent
        : "A beautiful memory ❤️";

    lightbox.classList.add("active");

}


function closeLightbox() {

    const lightbox = document.getElementById("photoLightbox");

    if (lightbox) {
        lightbox.classList.remove("active");
    }

}
