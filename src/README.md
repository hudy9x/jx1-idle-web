# Cấu trúc mã nguồn game Võ Lâm Idle (`src/`)

Toàn bộ mã nguồn từ tệp gộp `app.js` đã được tách thành các mô-đun nguồn độc lập theo từng miền nghiệp vụ và **được nhúng trực tiếp vào `index.html`**, không cần bước build:

## 1. Danh mục mô-đun nhúng trong `index.html`

### 📁 `src/data/` (Bảng dữ liệu tĩnh)
- **`item-sets.js`**: Hàm hỗ trợ quy đổi bộ trang bị Hoàng Kim Môn Phái và Bạch Kim.
- **`equipment-ge.js`**: Bảng dữ liệu trang bị cơ bản (`s.ge`) với hơn 4.400 dòng định nghĩa chỉ số vũ khí, áo, mũ, đai, giày, trang sức.
- **`monsters-zones.js`**: Bảng cấu hình quái vật, bản đồ khu vực dã ngoại, phụ bản (`JW.mon`, `JW.zones`, `JW.anim`).
- **`sound-effects.js`**: Bảng ánh xạ hiệu ứng âm thanh xuất chiêu, trúng đòn, tử thương, nhạc nền map và hiệu ứng chiêu JFX.
- **`skills-jmo.js`**: Bảng dữ liệu chuyển động và hoạt ảnh chiêu thức ma thuật (`window.JMO`) với hơn 51.000 dòng.

---

### 📁 `src/core/` (Lõi toán học & Thuộc tính)
- **`helpers.js`**: Các hàm tiện ích cốt lõi (RNG, clamp, khoảng cách, định dạng text, màu sắc ngũ hành, danh sách môn phái).
- **`attributes.js`**: Hệ thống tính toán chỉ số nhân vật, ngũ hành tương sinh tương khắc, mô tả thuộc tính trang bị, option ngẫu nhiên.

---

### 📁 `src/combat/` (Chiêu thức & Giao tranh)
- **`skills.js`**: Cây kỹ năng môn phái, thời gian hồi chiêu (CD), hình học vùng chưởng (nhiều tia, tỏa tròn, xoay quanh).
- **`battle.js`**: Vòng lặp giao tranh (combat loop), tính toán sát thương thực tế, tỉ lệ chí mạng, kháng thuộc tính, AI quái vật.

---

### 📁 `src/render/` (Đồ họa & Dựng hình)
- **`arena.js`**: Dựng hình sàn đấu Canvas 2D, camera cuộn theo nhân vật, bóng đổ, xác quái vật, hook chưởng lực thế giới `onWorldDrawAfterFx`.
- **`jxlook.js`**: Bộ dựng hình đa tầng JXLOOK (ghép lớp cơ thể, tóc, áo giáp, vũ khí, thú cưỡi, vòng sáng chuyển sinh `Ec`).

---

### 📁 `src/ui/` (Giao diện người dùng)
- **`hud.js`**: Thanh trạng thái đầu trang, thanh máu/năng lượng/kinh nghiệm, 4 ô phím tắt kỹ năng F1-F4, ô thuốc, nút Thổ Địa Phù.
- **`inventory.js`**: Túi đồ hành trang, so sánh trang bị, quản lý ngựa (Mã trường), bộ lọc tự động nhặt rác/bán đồ, thiết lập cắn thuốc tự động, Lò rèn & đúc đồ.

---

### 📁 `src/systems/` (Hệ thống & Tích hợp)
- **`quests-boss.js`**: Hệ thống nhiệm vụ Dã Tẩu, Boss Thế Giới, chiến trường Tống Kim, phụ bản, tổ đội và kênh chat.
- **`storage-ui.js`**: Lưu/tải dữ liệu game qua `localStorage`, bộ phát nhạc BGM, chuyển đổi các tab giao diện, modal thông báo.
- **`gm-tool.js`**: Bảng điều khiển GM Tool (công cụ debug, cheat), tích hợp hook Multiplayer (`renderMultiplayerPlayer`, `triggerGameSkillFx`, `onHeroSkillCast`).

---

## 2. Cách thức hoạt động

Các tệp trên được nhúng trực tiếp bằng thẻ `<script src="src/..."></script>` trong `index.html`. 
Bạn có thể sửa trực tiếp bất kỳ tệp nào trong `src/` và **F5 (Refresh) trình duyệt** để thấy ngay kết quả mà **không cần chạy lệnh build**.
