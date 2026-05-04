# Asset Guide

Thay media bằng cách giữ nguyên tên file bên dưới và ghi đè file mới vào đúng thư mục.

## 1. Ảnh profile riêng cho nhà trai / nhà gái

- `images/profiles/groom-profile.jpg`
- `images/profiles/bride-profile.jpg`

## 2. Ảnh highlight cho slider

- `images/highlights/slide-01.jpg`
- `images/highlights/slide-02.jpg`
- `images/highlights/slide-03.jpg`
- `images/highlights/slide-04.jpg`
- `images/highlights/slide-05.jpg`
- `images/highlights/slide-06.jpg`

## 3. Album BLEND

- `images/albums/blend/blend-01.jpg`
- `images/albums/blend/blend-02.jpg`
- ...
- `images/albums/blend/blend-31.jpg`

## 4. Album 2525

- `images/albums/aqua/aqua-01.jpg`
- `images/albums/aqua/aqua-02.jpg`
- ...
- `images/albums/aqua/aqua-11.jpg`

## 5. Nhạc nền

- `music/background-music.mp3`

## 6. QR mừng cưới

- `images/qr/groom-qr-clean.png`: mã QR vuông để hiển thị trong card mừng cưới
- `images/qr/groom-qr-card.jpg`: bản crop đầy đủ từ ảnh ngân hàng
- `images/qr/bride-qr.jpg`: file dự phòng cho QR cô dâu khi có sau

## 7. Video cưới

- `video/wedding-highlight.mp4`

Nếu chưa có video, cứ để trống thư mục `video/` và bật/tắt section `video` trong `wedding-data.js`.

## 8. Hai link mời riêng

- Nhà trai: `index.html?profile=groom` hoặc `nha-trai.html`
- Nhà gái: `index.html?profile=bride` hoặc `nha-gai.html`

## 9. Bật tắt từng cụm

Sửa trong `wedding-data.js`:

- `sections`: bật/tắt mặc định toàn site
- `profiles.groom.sections`: bật/tắt riêng cho link nhà trai
- `profiles.bride.sections`: bật/tắt riêng cho link nhà gái

## 10. Lịch riêng từng bên

Sửa trong `wedding-data.js`:

- `profiles.groom.wedding`
- `profiles.bride.wedding`
- `profiles.groom.eventIds`
- `profiles.bride.eventIds`

Chi tiết từng địa điểm nằm trong mảng `events`, có thể đặt:

- `datetime`
- `address`
- `lat`
- `lng`
- hoặc `mapQuery`

## 11. Khu xem ảnh

Gallery hiện có 2 lớp:

- `gallery.highlights`: ảnh cho slider tự chạy
- `gallery.albums`: album đầy đủ theo từng thư mục

Nếu chỉ thay file đúng tên trong `highlights`, `albums/blend`, `albums/aqua` thì giao diện sẽ tự cập nhật.
