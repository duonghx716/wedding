const baseWeddingData = window.WEDDING_DATA;

function getRequestedProfileKey() {
    if (window.WEDDING_PROFILE) {
        return window.WEDDING_PROFILE;
    }

    const params = new URLSearchParams(window.location.search);
    return params.get("profile") || baseWeddingData.defaultProfile || "groom";
}

function dedupeEventsByLocation(events) {
    const eventMap = new Map();

    events.forEach((event) => {
        const locationKey =
            event.lat && event.lng
                ? `${event.lat},${event.lng}`
                : event.mapQuery || event.address || event.id;
        const currentEvent = eventMap.get(locationKey);

        if (!currentEvent || event.highlight) {
            eventMap.set(locationKey, event);
        }
    });

    return [...eventMap.values()];
}

function buildProfileData() {
    const profileKey = getRequestedProfileKey();
    const profile =
        baseWeddingData.profiles[profileKey] ||
        baseWeddingData.profiles[baseWeddingData.defaultProfile];

    return {
        profileKey,
        profile,
        sections: { ...baseWeddingData.sections, ...(profile.sections || {}) },
        site: { ...baseWeddingData.site, ...(profile.site || {}) },
        cover: { ...baseWeddingData.cover, ...(profile.cover || {}) },
        wedding: { ...baseWeddingData.wedding, ...(profile.wedding || {}) },
        media: { ...baseWeddingData.media, ...(profile.media || {}) },
        couple: baseWeddingData.couple,
        story: baseWeddingData.story,
        gallery: baseWeddingData.gallery,
        sampleWishes: baseWeddingData.sampleWishes,
        heroIntro: profile.heroIntro || "Trân trọng kính mời",
        heroMeta: profile.heroMeta || [],
        peopleOrder: profile.peopleOrder || ["groom", "bride"],
        featuredPerson: profile.featuredPerson || "",
        activeEvents: baseWeddingData.events.filter((event) =>
            (profile.eventIds || []).includes(event.id),
        ),
        activeMaps: dedupeEventsByLocation(
            baseWeddingData.events.filter((event) =>
                (profile.mapEventIds || []).includes(event.id),
            ),
        ),
    };
}

const weddingData = buildProfileData();
const weddingDate = weddingData.wedding.countdownISO
    ? new Date(weddingData.wedding.countdownISO)
    : null;
const body = document.body;
const rootStyle = document.documentElement.style;
const openInviteBtn = document.getElementById("openInviteBtn");
const musicToggle = document.getElementById("musicToggle");
const weddingMusic = document.getElementById("weddingMusic");
const rsvpForm = document.getElementById("rsvpForm");
const rsvpFeedback = document.getElementById("rsvpFeedback");
const guestbookForm = document.getElementById("guestbookForm");
const guestbookList = document.getElementById("guestbookList");
const petalsRoot = document.getElementById("petals");
const revealItems = document.querySelectorAll("[data-reveal]");
const quickNav = document.querySelector('[data-section="quickNav"]');

let musicPlaying = false;
let autoScrollRaf = null;
let autoScrollActive = false;

function pad(value) {
    return String(value).padStart(2, "0");
}

function getCoupleNamesHtml() {
    return `${weddingData.couple.groom.shortName} <span>&amp;</span> ${weddingData.couple.bride.shortName}`;
}

function getCoupleFullNamesText() {
    return `${weddingData.couple.groom.fullName} và ${weddingData.couple.bride.fullName}`;
}

function getGuestNameFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const rawName = params.get("name");
    return rawName ? rawName.trim() : weddingData.site.guestDefaultName;
}

function buildMapLink(lat, lng) {
    if (lat && lng) {
        return `https://maps.google.com/?q=${lat},${lng}`;
    }

    return "";
}

function buildMapQueryLink(query) {
    return `https://maps.google.com/?q=${encodeURIComponent(query)}`;
}

function buildMapLinkFromEvent(event) {
    if (event.lat && event.lng) {
        return buildMapLink(event.lat, event.lng);
    }

    if (event.mapQuery) {
        return buildMapQueryLink(event.mapQuery);
    }

    return "";
}

function buildMapEmbedLink(lat, lng) {
    if (lat && lng) {
        return `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
    }

    return "";
}

function buildMapEmbedQueryLink(query) {
    return `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=15&output=embed`;
}

function buildMapEmbedLinkFromEvent(event) {
    if (event.lat && event.lng) {
        return buildMapEmbedLink(event.lat, event.lng);
    }

    if (event.mapQuery) {
        return buildMapEmbedQueryLink(event.mapQuery);
    }

    return "";
}

function isSectionEnabled(key) {
    return weddingData.sections[key] !== false;
}

function toggleSection(key, enabled) {
    const section = document.querySelector(`[data-section="${key}"]`);
    if (section) {
        section.hidden = !enabled;
    }

    document.querySelectorAll(`[data-nav-section="${key}"]`).forEach((link) => {
        link.hidden = !enabled;
    });
}

function applySectionVisibility() {
    Object.keys(weddingData.sections).forEach((key) => {
        toggleSection(key, isSectionEnabled(key));
    });

    if (quickNav) {
        const visibleLinks = [...quickNav.querySelectorAll("a")].filter(
            (link) => !link.hidden,
        );
        quickNav.hidden =
            !isSectionEnabled("quickNav") || visibleLinks.length === 0;
    }
}

function renderSiteMeta() {
    document.title = weddingData.site.title;
    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) {
        descriptionTag.setAttribute("content", weddingData.site.description);
    }
}

function renderCover() {
    document.getElementById("coverEyebrow").textContent =
        weddingData.cover.eyebrow;
    document.getElementById("coverNames").innerHTML = getCoupleNamesHtml();
    document.getElementById("coverDate").textContent =
        `Save the Date • ${weddingData.wedding.solarDateLong}`;
    document.getElementById("coverLunar").textContent =
        weddingData.wedding.lunarDate;
    document.getElementById("coverCopy").textContent =
        weddingData.cover.invitationText;
    document.getElementById("coverNote").textContent = weddingData.cover.note;
    openInviteBtn.textContent = weddingData.cover.openButtonLabel;
}

function renderHero(guestName) {
    const heroImage = document.getElementById("heroImage");
    heroImage.src = weddingData.media.heroImage;
    heroImage.alt = `Ảnh cưới của ${getCoupleFullNamesText()}`;
    heroImage.style.objectPosition = weddingData.media.heroPosition || "";
    heroImage.setAttribute("fetchpriority", "high");
    heroImage.setAttribute("decoding", "sync");

    document.getElementById("heroTitle").innerHTML = getCoupleNamesHtml();
    const heroSubtitle = document.getElementById("heroSubtitle");
    heroSubtitle.textContent = "";
    heroSubtitle.append(`${weddingData.heroIntro} `);
    const guestStrong = document.createElement("strong");
    guestStrong.textContent = guestName;
    heroSubtitle.append(guestStrong, " đến chung vui cùng gia đình hai bên.");

    const heroMeta = weddingData.heroMeta.filter((item) => item.value);
    document.getElementById("heroMeta").innerHTML = heroMeta
        .map(
            (item) => `
                <div>
                    <span>${item.label}</span>
                    <strong>${item.value}</strong>
                </div>
            `,
        )
        .join("");
}

function renderInvitationLetter(guestName) {
    document.getElementById("letterEyebrow").textContent =
        weddingData.wedding.invitationEyebrow;
    document.getElementById("letterHeading").textContent =
        weddingData.wedding.invitationHeading;
    const letterGuestLine = document.getElementById("letterGuestLine");
    letterGuestLine.textContent = "";
    letterGuestLine.append("Kính mời ");
    const guestStrong = document.createElement("strong");
    guestStrong.textContent = guestName;
    letterGuestLine.append(guestStrong);
    document.getElementById("letterCoupleLine").innerHTML =
        `Đến dự lễ thành hôn của <strong>${weddingData.couple.groom.fullName}</strong> và <strong>${weddingData.couple.bride.fullName}</strong>.`;
    document.getElementById("letterBodyLine").textContent =
        weddingData.wedding.invitationBody;
    document.getElementById("letterSignLine").textContent =
        weddingData.wedding.invitationSign;
}

function renderCoupleSection() {
    const people = weddingData.peopleOrder.map((key) => ({
        key,
        ...weddingData.couple[key],
    }));

    document.getElementById("coupleGrid").innerHTML = people
        .map((person) => {
            const imageStyle = person.imagePosition
                ? ` style="object-position: ${person.imagePosition};"`
                : "";
            const imageHtml = person.image
                ? `<img src="${person.image}" alt="${person.imageAlt}"${imageStyle} loading="lazy" decoding="async">`
                : "";
            const infoLines = [
                person.birthYear ? `<p>Sinh năm: ${person.birthYear}</p>` : "",
                person.job ? `<p>Nghề nghiệp: ${person.job}</p>` : "",
                person.father ? `<p>Ông: ${person.father}</p>` : "",
                person.mother ? `<p>Bà: ${person.mother}</p>` : "",
                person.address ? `<p>Địa chỉ: ${person.address}</p>` : "",
                person.quote
                    ? `<blockquote>“${person.quote}”</blockquote>`
                    : "",
            ]
                .filter(Boolean)
                .join("");

            return `
                <article class="person-card ${person.key === weddingData.featuredPerson ? "is-featured" : ""}">
                    ${imageHtml}
                    <div class="person-copy">
                        <p class="person-role">${person.roleLabel}</p>
                        <h4>${person.fullName}</h4>
                        ${infoLines}
                    </div>
                </article>
            `;
        })
        .join("");
}

function renderStorySection() {
    document.getElementById("storyTimeline").innerHTML = weddingData.story
        .map(
            (item) => `
                <article class="timeline-item">
                    <div class="timeline-image">
                        <img src="${item.image}" alt="${item.imageAlt}" loading="lazy" decoding="async">
                    </div>
                    <div class="timeline-copy">
                        <span class="timeline-date">${item.date}</span>
                        <h4>${item.title}</h4>
                        <p>${item.description}</p>
                    </div>
                </article>
            `,
        )
        .join("");
}

function renderEventsSection() {
    document.getElementById("eventGrid").innerHTML = weddingData.activeEvents
        .map(
            (event) => `
                <article class="event-card${event.highlight ? " highlight" : ""}">
                    <p class="event-tag">${event.tag}</p>
                    <h4>${event.title}</h4>
                    <p>${event.datetime}</p>
                    <p>${event.address}</p>
                </article>
            `,
        )
        .join("");
}

function renderMapsSection() {
    document.getElementById("mapGrid").innerHTML = weddingData.activeMaps
        .map((event) => {
            const mapHref = buildMapLinkFromEvent(event);
            const mapEmbed = buildMapEmbedLinkFromEvent(event);
            const mapVisual = mapEmbed
                ? `
                    <iframe
                        class="map-embed"
                        src="${mapEmbed}"
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                        title="${event.mapLabel}"
                    ></iframe>
                `
                : `<div class="map-placeholder">${event.mapLabel}</div>`;

            const mapButton = mapHref
                ? `<a class="secondary-btn" href="${mapHref}" target="_blank" rel="noreferrer">Chỉ đường</a>`
                : "";

            return `
                <article class="map-card">
                    ${mapVisual}
                    <h4>${event.title}</h4>
                    <p>${event.address}</p>
                    ${mapButton}
                </article>
            `;
        })
        .join("");
}

function renderGallerySection() {
    const galleryHighlights = weddingData.gallery.highlights
        .map(
            (item, index) => `
                <figure class="gallery-slide ${index === 0 ? "is-active" : ""}" data-slide-index="${index}">
                    <img src="${item.src}" alt="${item.alt}"${item.position ? ` style="object-position: ${item.position};"` : ""}${index === 0 ? ' fetchpriority="low"' : ' loading="lazy"'} decoding="async">
                </figure>
            `,
        )
        .join("");

    const galleryDots = weddingData.gallery.highlights
        .map(
            (_item, index) => `
                <button
                    class="gallery-dot ${index === 0 ? "is-active" : ""}"
                    type="button"
                    aria-label="Xem ảnh ${index + 1}"
                    data-dot-index="${index}"
                ></button>
            `,
        )
        .join("");

    const albumBlocks = weddingData.gallery.albums
        .map((album) => {
            const images = Array.from(
                { length: album.count },
                (_item, index) => {
                    const number = String(index + 1).padStart(2, "0");
                    const src = `${album.prefix}${number}${album.ext}`;
                    return `
                    <figure class="album-item">
                        <img src="${src}" alt="${album.title} ${number}" loading="lazy">
                    </figure>
                `;
                },
            ).join("");

            return `
                <section class="album-block">
                    <div class="album-head">
                        <div>
                            <p class="eyebrow">Thu muc anh</p>
                            <h4>${album.title}</h4>
                        </div>
                    </div>
                    <p class="album-description">${album.description}</p>
                    <div class="album-grid">${images}</div>
                </section>
            `;
        })
        .join("");

    document.getElementById("galleryGrid").innerHTML = `
        <div class="gallery-showcase">
            <div class="gallery-slider" id="gallerySlider">
                <div class="gallery-slides">${galleryHighlights}</div>
                <div class="gallery-dots">${galleryDots}</div>
            </div>
            <div class="gallery-albums">${albumBlocks}</div>
        </div>
    `;
}

function setupGallerySlider() {
    const slider = document.getElementById("gallerySlider");
    if (!slider) {
        return;
    }

    const slides = [...slider.querySelectorAll(".gallery-slide")];
    const dots = [...slider.querySelectorAll(".gallery-dot")];
    if (slides.length <= 1) {
        return;
    }

    let activeIndex = 0;
    let sliderTimer = null;

    const setActiveSlide = (nextIndex) => {
        slides[activeIndex].classList.remove("is-active");
        dots[activeIndex].classList.remove("is-active");
        activeIndex = nextIndex;
        slides[activeIndex].classList.add("is-active");
        dots[activeIndex].classList.add("is-active");
    };

    const startSlider = () => {
        clearInterval(sliderTimer);
        sliderTimer = setInterval(() => {
            const nextIndex = (activeIndex + 1) % slides.length;
            setActiveSlide(nextIndex);
        }, 3500);
    };

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            setActiveSlide(index);
            startSlider();
        });
    });

    slider.addEventListener("mouseenter", () => clearInterval(sliderTimer));
    slider.addEventListener("mouseleave", startSlider);

    startSlider();
}

function renderVideoSection() {
    const videoCard = document.getElementById("videoCard");
    const renderVideoPlaceholder = () => {
        videoCard.innerHTML = `
            <div class="video-placeholder large">
                <span>${weddingData.media.videoPlaceholderTitle}</span>
                <small>${weddingData.media.videoPlaceholderNote}</small>
            </div>
        `;
    };

    if (weddingData.media.videoEmbedUrl) {
        videoCard.innerHTML = `
            <iframe
                class="video-frame"
                src="${weddingData.media.videoEmbedUrl}"
                title="Video cưới"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
            ></iframe>
        `;
        return;
    }

    if (weddingData.media.videoSrc) {
        videoCard.innerHTML = `
            <video
                class="video-frame"
                controls
                playsinline
                preload="metadata"
                poster="${weddingData.media.videoPoster}"
            >
                <source src="${weddingData.media.videoSrc}" type="video/mp4">
            </video>
        `;

        const videoElement = videoCard.querySelector("video");
        const videoSource = videoCard.querySelector("source");
        videoElement.addEventListener("error", renderVideoPlaceholder, {
            once: true,
        });
        if (videoSource) {
            videoSource.addEventListener("error", renderVideoPlaceholder, {
                once: true,
            });
        }
        return;
    }

    renderVideoPlaceholder();
}

function renderGiftSection() {
    document.getElementById("giftIntro").textContent =
        weddingData.wedding.giftIntro;

    const activeGiftKey = weddingData.profile.side;
    const giftPeople = [weddingData.couple[activeGiftKey]].filter(
        (person) => person && person.gift && person.gift.enabled !== false,
    );
    const giftGrid = document.getElementById("giftGrid");
    giftGrid.classList.toggle("is-single", giftPeople.length === 1);
    giftGrid.innerHTML = giftPeople
        .map((person) => {
            const qrHtml = person.gift.qrImage
                ? `
                    <div class="gift-qr-panel">
                        <img class="qr-image" src="${person.gift.qrImage}" alt="${person.gift.qrLabel}">
                    </div>
                `
                : `<div class="qr-placeholder">${person.gift.qrLabel}</div>`;

            const noteHtml = person.gift.note
                ? `<p class="gift-note">${person.gift.note}</p>`
                : "";

            return `
                <article class="gift-card">
                    <div class="gift-card-layout">
                        <div class="gift-copy">
                            <p class="person-role">${person.gift.title}</p>
                            <h4>${person.fullName}</h4>
                            <div class="gift-detail-list">
                                <div class="gift-detail">
                                    <span class="gift-label">Ngân hàng</span>
                                    <strong class="gift-value">${person.gift.bankName}</strong>
                                </div>
                                <div class="gift-detail">
                                    <span class="gift-label">Số tài khoản</span>
                                    <strong class="gift-value">${person.gift.accountNumber}</strong>
                                </div>
                                <div class="gift-detail">
                                    <span class="gift-label">Chủ tài khoản</span>
                                    <strong class="gift-value">${person.gift.accountName}</strong>
                                </div>
                            </div>
                            ${noteHtml}
                        </div>
                        ${qrHtml}
                    </div>
                </article>
            `;
        })
        .join("");
}

function renderGuestbookSamples() {
    document.getElementById("guestbookList").innerHTML =
        weddingData.sampleWishes
            .map(
                (wish) => `
                <article class="wish-card">
                    <h4>${wish.name}</h4>
                    <p>${wish.message}</p>
                </article>
            `,
            )
            .join("");
}

function renderFooter() {
    document.getElementById("footerEyebrow").textContent =
        weddingData.wedding.footerEyebrow;
    document.getElementById("footerHeading").textContent =
        weddingData.wedding.footerHeading;
    document.getElementById("footerText").textContent =
        weddingData.wedding.footerText;
}

function applyThemeAssets() {
    rootStyle.setProperty(
        "--cover-image",
        `url("${weddingData.media.coverImage}")`,
    );
    rootStyle.setProperty(
        "--cover-position",
        weddingData.media.coverPosition || "center center",
    );
    rootStyle.setProperty(
        "--footer-image",
        `url("${weddingData.media.footerImage}")`,
    );
    weddingMusic.src = weddingData.media.musicSrc;
}

function renderPageContent() {
    const guestName = getGuestNameFromUrl();

    renderSiteMeta();
    applyThemeAssets();
    renderCover();
    renderHero(guestName);
    renderInvitationLetter(guestName);
    renderCoupleSection();
    renderStorySection();
    renderEventsSection();
    renderMapsSection();
    renderGallerySection();
    renderVideoSection();
    renderGiftSection();
    renderGuestbookSamples();
    renderFooter();
    applySectionVisibility();
    setupGallerySlider();
}

function updateCountdown() {
    if (!weddingDate || Number.isNaN(weddingDate.getTime())) {
        document.getElementById("days").textContent = "--";
        document.getElementById("hours").textContent = "--";
        document.getElementById("minutes").textContent = "--";
        document.getElementById("seconds").textContent = "--";
        return;
    }

    const now = new Date();
    const diff = weddingDate.getTime() - now.getTime();

    if (diff <= 0) {
        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";
        return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / (60 * 60 * 24));
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = totalSeconds % 60;

    document.getElementById("days").textContent = pad(days);
    document.getElementById("hours").textContent = pad(hours);
    document.getElementById("minutes").textContent = pad(minutes);
    document.getElementById("seconds").textContent = pad(seconds);
}

function updateMusicButton() {
    musicToggle.textContent = musicPlaying ? "Tắt nhạc" : "Bật nhạc";
    musicToggle.setAttribute("aria-pressed", String(musicPlaying));
}

async function playMusic() {
    try {
        await weddingMusic.play();
        musicPlaying = true;
    } catch (error) {
        musicPlaying = false;
        console.log("Audio playback failed:", error);
    }
    updateMusicButton();
}

function pauseMusic() {
    weddingMusic.pause();
    musicPlaying = false;
    updateMusicButton();
}

function stopAutoScroll() {
    if (autoScrollRaf) {
        cancelAnimationFrame(autoScrollRaf);
        autoScrollRaf = null;
    }
    autoScrollActive = false;
}

function startAutoScroll() {
    // px per second - tốc độ vừa phải
    const speed = 60;
    let lastTime = null;

    function step(timestamp) {
        if (!autoScrollActive) return;

        if (lastTime === null) {
            lastTime = timestamp;
            autoScrollRaf = requestAnimationFrame(step);
            return;
        }

        const elapsed = timestamp - lastTime;
        lastTime = timestamp;

        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const current = window.scrollY;

        if (current >= maxScroll) {
            stopAutoScroll();
            return;
        }

        window.scrollBy(0, (speed * elapsed) / 1000);
        autoScrollRaf = requestAnimationFrame(step);
    }

    autoScrollActive = true;
    autoScrollRaf = requestAnimationFrame(step);
}

function openInvitation() {
    body.classList.add("is-open");

    if (isSectionEnabled("music")) {
        musicToggle.hidden = false;
        updateMusicButton();
        playMusic();
    }

    setTimeout(startAutoScroll, 800);
}

function handleMusicToggle() {
    if (musicPlaying) {
        pauseMusic();
        return;
    }

    playMusic();
}

function handleRsvpSubmit(event) {
    event.preventDefault();
    const formData = new FormData(rsvpForm);
    const guestName = formData.get("guestName");
    const attendance = formData.get("attendance");
    const guestCount = formData.get("guestCount");

    if (attendance === "yes") {
        rsvpFeedback.textContent = `${guestName}, cảm ơn bạn đã xác nhận tham dự với ${guestCount}. Đây là form mẫu, bạn có thể nối Google Sheets hoặc email sau.`;
    } else {
        rsvpFeedback.textContent = `${guestName}, chúng mình đã nhận được lời nhắn. Cảm ơn bạn đã gửi lời chúc đến ngày vui của tụi mình.`;
    }

    rsvpForm.reset();
}

function handleGuestbookSubmit(event) {
    event.preventDefault();
    const formData = new FormData(guestbookForm);
    const wishName = formData.get("wishName");
    const wishMessage = formData.get("wishMessage");

    const wishCard = document.createElement("article");
    wishCard.className = "wish-card";
    const title = document.createElement("h4");
    title.textContent = wishName;
    const message = document.createElement("p");
    message.textContent = wishMessage;
    wishCard.append(title, message);
    guestbookList.prepend(wishCard);
    guestbookForm.reset();
}

function createPetals() {
    if (!isSectionEnabled("petals")) {
        petalsRoot.hidden = true;
        return;
    }

    const petalCount = 18;

    for (let index = 0; index < petalCount; index += 1) {
        const petal = document.createElement("span");
        const duration = 10 + Math.random() * 12;
        const delay = Math.random() * -16;
        const left = Math.random() * 100;
        const scale = 0.7 + Math.random() * 1.2;

        petal.className = "petal";
        petal.style.left = `${left}%`;
        petal.style.animationDuration = `${duration}s`;
        petal.style.animationDelay = `${delay}s`;
        petal.style.transform = `scale(${scale})`;
        petalsRoot.appendChild(petal);
    }
}

function setupRevealAnimation() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.16 },
    );

    revealItems.forEach((item) => {
        if (!item.hidden) {
            observer.observe(item);
        }
    });
}

renderPageContent();

openInviteBtn.addEventListener("click", openInvitation);

["wheel", "touchstart", "keydown"].forEach((event) => {
    window.addEventListener(event, () => { if (autoScrollActive) stopAutoScroll(); }, { passive: true });
});
musicToggle.addEventListener("click", handleMusicToggle);
rsvpForm.addEventListener("submit", handleRsvpSubmit);
guestbookForm.addEventListener("submit", handleGuestbookSubmit);

updateCountdown();
if (isSectionEnabled("countdown") && weddingDate) {
    setInterval(updateCountdown, 1000);
}
createPetals();
setupRevealAnimation();
