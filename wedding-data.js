window.WEDDING_DATA = {
    defaultProfile: "groom",
    sections: {
        petals: true,
        music: false,
        quickNav: true,
        invitationLetter: true,
        countdown: true,
        couple: true,
        story: false,
        events: true,
        maps: true,
        gallery: true,
        video: false,
        gift: false,
        rsvp: false,
        guestbook: false,
        footer: true,
    },
    profiles: {
        groom: {
            label: "Nhà trai",
            side: "groom",
            site: {
                title: "Thiệp Cưới Nhà Trai | Xuân Dương & Bích Nga",
            },
            cover: {
                // note: "Phiên bản thiệp mời dành cho phía nhà trai. Khi deploy riêng, hãy dùng link nha-trai.html hoặc ?profile=groom.",
            },
            media: {
                coverImage: "./assets/images/highlights/slide-01.jpg",
                coverPosition: "35% 20%",
                heroImage: "./assets/images/highlights/slide-01.jpg",
                heroPosition: "35% 20%",
                footerImage: "./assets/images/highlights/slide-05.jpg",
            },
            wedding: {
                solarDateLong: "Thứ Hai, 01 tháng 06 năm 2026",
                solarDateShort: "01.06.2026",
                lunarDate: "Nhằm ngày 16 tháng 04 năm Bính Ngọ",
                countdownISO: "2026-06-01T09:00:00+07:00",
                city: "Tư gia nhà trai • Thôn 5 - Xã Ea Ô - Tỉnh Đắk Lắk",
                guestArrivalTime: "10:30",
                ceremonyTime: "11:00",
                footerText:
                    "Thiệp mời phía nhà trai • Xuân Dương & Bích Nga • 01.06.2026",
            },
            sections: {
                countdown: true,
                events: true,
                maps: true,
                gallery: true,
                gift: true,
            },
            heroIntro: "Gia đình nhà trai trân trọng kính mời",
            heroMeta: [
                { label: "Ngày tổ chức", value: "01.06.2026" },
                { label: "Lễ tân hôn", value: "09:00" },
                { label: "Đón tiệc", value: "10:30" },
            ],
            peopleOrder: ["groom", "bride"],
            featuredPerson: "groom",
            eventIds: ["groomCeremony", "party"],
            mapEventIds: ["groomCeremony", "party"],
        },
        bride: {
            label: "Nhà gái",
            side: "bride",
            site: {
                title: "Thiệp Cưới Nhà Gái | Xuân Dương & Bích Nga",
            },
            cover: {
                note: "Phiên bản thiệp mời dành cho phía nhà gái. Khi có giờ cử hành chính xác bên nhà gái, chỉ cần cập nhật trong profile bride.",
            },
            media: {
                coverImage: "./assets/images/profiles/bride-profile.jpg",
                coverPosition: "42% 58%",
                heroImage: "./assets/images/profiles/bride-profile.jpg",
                heroPosition: "42% 58%",
                footerImage: "./assets/images/highlights/slide-06.jpg",
            },
            wedding: {
                solarDateLong: "Thông tin lễ bên nhà gái",
                solarDateShort: "Cập nhật sau",
                lunarDate:
                    "Địa điểm nhà gái: Thôn Quảng Cư 2 - Xã Ea Kar - Tỉnh Đắk Lắk",
                countdownISO: "",
                city: "Tư gia nhà gái • Thôn Quảng Cư 2 - Xã Ea Kar - Tỉnh Đắk Lắk",
                guestArrivalTime: "Cập nhật sau",
                ceremonyTime: "Cập nhật sau",
                footerText: "Thiệp mời phía nhà gái • Xuân Dương & Bích Nga",
            },
            sections: {
                countdown: false,
                events: true,
                maps: true,
                gallery: true,
                gift: true,
            },
            heroIntro: "Gia đình nhà gái trân trọng kính mời",
            heroMeta: [
                { label: "Bên mời", value: "Nhà gái" },
                { label: "Địa điểm", value: "Thôn Quảng Cư 2 - Xã Ea Kar" },
                { label: "Lịch nhà gái", value: "Cập nhật sau" },
            ],
            peopleOrder: ["bride", "groom"],
            featuredPerson: "bride",
            eventIds: ["brideCeremony"],
            mapEventIds: ["brideCeremony"],
        },
    },
    site: {
        title: "Thiệp Cưới Online | Xuân Dương & Bích Nga",
        description:
            "Thiệp cưới online phong cách Việt Nam với đầy đủ thông tin lễ cưới, bản đồ, album, RSVP và lời chúc.",
        guestDefaultName: "Anh/Chị & Gia đình",
    },
    cover: {
        eyebrow: "Trân trọng kính mời",
        openButtonLabel: "Mở thiệp",
        invitationText:
            "Trân trọng kính mời Quý khách đến chung vui cùng gia đình trong lễ thành hôn của chúng tôi.",
        // note: "Toàn bộ ảnh hiện tại đã được thay bằng bộ ảnh mới, chia theo từng thư mục để tiện xem và thay thế về sau.",
    },
    wedding: {
        solarDateLong: "Thứ Hai, 01 tháng 06 năm 2026",
        solarDateShort: "01.06.2026",
        lunarDate: "Nhằm ngày 16 tháng 04 năm Bính Ngọ",
        countdownISO: "2026-06-01T09:00:00+07:00",
        city: "Thôn 5 - Xã Ea Ô - Tỉnh Đắk Lắk",
        guestArrivalTime: "10:30",
        ceremonyTime: "11:00",
        invitationEyebrow: "Lời mời chính thức",
        invitationHeading: "Trân trọng kính mời",
        invitationBody:
            "Sự hiện diện của Quý khách là niềm vinh hạnh cho gia đình chúng tôi.",
        invitationSign: "Hân hạnh kính mời!",
        giftIntro:
            "Nếu bạn không thể đến trực tiếp, có thể gửi lời chúc và món quà nhỏ đến cô dâu chú rể qua thông tin mẫu bên dưới.",
        footerEyebrow: "Thank you",
        footerHeading: "Cảm ơn Quý khách đã dành thời gian xem thiệp mời",
        footerText:
            "Xuân Dương & Bích Nga • 01.06.2026 • Hân hạnh được đón tiếp",
    },
    media: {
        coverImage: "./assets/images/highlights/slide-01.jpg",
        coverPosition: "50% 84%",
        heroImage: "./assets/images/highlights/slide-02.jpg",
        heroPosition: "50% 82%",
        footerImage: "./assets/images/highlights/slide-05.jpg",
        musicSrc: "./assets/music/background-music.mp3",
        videoSrc: "./assets/video/wedding-highlight.mp4",
        videoPoster: "./assets/images/highlights/slide-03.jpg",
        videoEmbedUrl: "",
        videoPlaceholderTitle: "Thêm video highlight của bạn tại đây",
        videoPlaceholderNote:
            "Đặt file video vào assets/video/wedding-highlight.mp4 hoặc dùng videoEmbedUrl.",
    },
    couple: {
        groom: {
            roleLabel: "🤵 Chú rể",
            shortName: "Xuân Dương",
            fullName: "Xuân Dương",
            birthYear: "",
            job: "",
            father: "",
            mother: "",
            address: "Thôn 5 - Xã Ea Ô - Tỉnh Đắk Lắk",
            quote: "",
            image: "./assets/images/profiles/groom-profile.jpg",
            imageAlt: "Thông tin chú rể",
            imagePosition: "35% 18%",
            gift: {
                enabled: true,
                title: "Mừng cưới chú rể",
                bankName: "VPBank",
                accountNumber: "178185338",
                accountName: "HA XUAN DUONG",
                qrLabel: "QR chú rể",
                qrImage: "./assets/images/qr/groom-qr-clean.png",
                qrCardImage: "./assets/images/qr/groom-qr-card.jpg",
                note: "Quét mã QR hoặc chuyển khoản trực tiếp đến chú rể để gửi lời chúc mừng.",
            },
        },
        bride: {
            roleLabel: "👰 Cô dâu",
            shortName: "Bích Nga",
            fullName: "Bích Nga",
            birthYear: "",
            job: "",
            father: "",
            mother: "",
            address: "Thôn Quảng Cư 2 - Xã Ea Kar - Tỉnh Đắk Lắk",
            quote: "",
            image: "./assets/images/profiles/bride-profile.jpg",
            imageAlt: "Thông tin cô dâu",
            imagePosition: "42% 58%",
            gift: {
                enabled: true,
                title: "Mừng cưới cô dâu",
                bankName: "VietinBank",
                accountNumber: "104882875540",
                accountName: "CHU THI BICH NGA",
                qrLabel: "QR cô dâu",
                qrImage: "./assets/images/qr/bride-qr-clean.png",
                qrCardImage: "./assets/images/qr/bride-qr-card.jpg",
                note: "Quét mã QR hoặc chuyển khoản trực tiếp đến cô dâu để gửi lời chúc mừng.",
            },
        },
    },
    story: [
        {
            date: "Khoảnh khắc đầu tiên",
            title: "Bộ ảnh mới",
            description:
                "Website hiện đã chuyển sang dùng toàn bộ ảnh thật từ bộ ảnh bạn cung cấp, không còn dùng ảnh mẫu cũ.",
            image: "./assets/images/highlights/slide-01.jpg",
            imageAlt: "Khoảnh khắc nổi bật 1",
        },
        {
            date: "Album ",
            title: "Ngoại cảnh chính",
            description:
                "Những khung hình nổi bật nhất được đưa lên slider tự động để khách mời xem nhanh ngay trên đầu section ảnh.",
            image: "./assets/images/highlights/slide-02.jpg",
            imageAlt: "Khoảnh khắc nổi bật 2",
        },
        {
            date: "Album",
            title: "Layout thiết kế",
            description:
                "Nhóm ảnh dàn trang và thiết kế sẵn cũng được giữ nguyên thành một album riêng theo đúng thư mục nguồn.",
            image: "./assets/images/highlights/slide-03.jpg",
            imageAlt: "Khoảnh khắc nổi bật 3",
        },
        {
            date: "Nhà trai - Nhà gái",
            title: "Ảnh cá nhân hóa",
            description:
                "Mỗi phiên bản thiệp mời đang dùng ảnh profile riêng để phù hợp với link nhà trai và nhà gái.",
            image: "./assets/images/highlights/slide-04.jpg",
            imageAlt: "Khoảnh khắc nổi bật 4",
        },
    ],
    events: [
        {
            id: "groomCeremony",
            tag: "💍 Lễ tân hôn",
            title: "Tư gia nhà trai",
            datetime:
                "Cử hành vào lúc 09:00, Thứ Hai, ngày 01 tháng 06 năm 2026",
            address: "Thôn 5 - Xã Ea Ô - Tỉnh Đắk Lắk",
            mapLabel: "Map lễ tân hôn",
            lat: "12.708776",
            lng: "108.4845353",
            mapQuery: "Thôn 5 Xa Ea O, Dak Lak",
            highlight: false,
        },
        {
            id: "party",
            tag: "🎉 Tiệc cưới",
            title: "Tư gia nhà trai",
            datetime:
                "Đón khách: 10:30 • Khai tiệc: 11:00 • Thứ Hai, 01 tháng 06 năm 2026",
            address: "Thôn 5 - Xã Ea Ô - Tỉnh Đắk Lắk",
            mapLabel: "Map tiệc cưới",
            lat: "12.708776",
            lng: "108.4845353",
            mapQuery: "Thôn 5 Xa Ea O, Dak Lak",
            highlight: true,
        },
        {
            id: "brideCeremony",
            tag: "🌸 Lễ bên nhà gái",
            title: "Tư gia nhà gái",
            datetime: "Vui lòng cập nhật ngày giờ cử hành bên nhà gái",
            address: "Thôn Quảng Cư 2 - Xã Ea Kar - Tỉnh Đắk Lắk",
            mapLabel: "Map nhà gái",
            lat: "",
            lng: "",
            mapQuery: "Thôn Quang Cu 2 Xa Ea Kar, Dak Lak",
            highlight: false,
        },
    ],
    gallery: {
        highlights: [
            {
                src: "./assets/images/highlights/slide-01.jpg",
                alt: "Highlight 1",
                position: "50% 88%",
            },
            {
                src: "./assets/images/highlights/slide-02.jpg",
                alt: "Highlight 2",
                position: "54% 86%",
            },
            {
                src: "./assets/images/highlights/slide-03.jpg",
                alt: "Highlight 3",
                position: "55% 78%",
            },
            {
                src: "./assets/images/highlights/slide-04.jpg",
                alt: "Highlight 4",
                position: "50% 82%",
            },
            {
                src: "./assets/images/highlights/slide-05.jpg",
                alt: "Highlight 5",
                position: "50% 68%",
            },
            {
                src: "./assets/images/highlights/slide-06.jpg",
                alt: "Highlight 6",
                position: "50% 42%",
            },
        ],
        albums: [
            {
                key: "blend",
                title: "Album",
                description:
                    "Bộ ảnh ngoại cảnh đầy đủ, hiển thị toàn bộ để khách mời có thể xem trọn album.",
                prefix: "./assets/images/albums/blend/blend-",
                count: 31,
                ext: ".jpg",
            },
            {
                key: "aqua",
                title: "Album",
                description:
                    "Bộ ảnh được ghi lại tại Aqua City – nơi những con đường xanh mát và không gian yên bình đã chứng kiến những khoảnh khắc dịu dàng của chúng mình. Giữa thiên nhiên trong lành, từng ánh nhìn, nụ cười đều trở nên thật tự nhiên và trọn vẹn.",
                prefix: "./assets/images/albums/aqua/aqua-",
                count: 11,
                ext: ".jpg",
            },
        ],
    },
    sampleWishes: [
        {
            name: "Chị Mai Anh",
            message:
                "Chúc hai em trăm năm hạnh phúc, luôn yêu thương và đồng hành cùng nhau trong mọi chặng đường.",
        },
        {
            name: "Anh Hoàng Nam",
            message:
                "Mong ngày vui của hai bạn thật trọn vẹn, ấm áp và ngập tràn tiếng cười.",
        },
    ],
};



// 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