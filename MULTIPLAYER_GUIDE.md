# Hướng dẫn mở 2 nhân vật cùng lúc

## Mục tiêu
Bạn muốn test multiplayer với 2 nhân vật khác nhau trong cùng 1 room.

Lưu ý quan trọng: vì mỗi trình duyệt lưu `localStorage` riêng, nếu bạn mở 2 tab cùng một trình duyệt thì hệ thống sẽ dùng cùng 1 token/nhân vật. Để có 2 nhân vật thật, hãy dùng 2 cửa sổ/trình duyệt khác nhau.

## Bước 1: Khởi động server
Mở WSL hoặc terminal và chạy:

```bash
cd /mnt/d/project/volamidle.pages.dev/volamidle.pages.dev
PORT=3001 node server/server.js
```

Sau đó mở trình duyệt tại:

```text
http://localhost:3001/
```

## Bước 2: Tạo nhân vật 1
Trên 1 trình duyệt:
- Nhập tên nhân vật 1, ví dụ: `AnhA`
- Nhập room, ví dụ: `room-test-01`
- Nhấn `Join room`

## Bước 3: Tạo nhân vật 2
Dùng cách khác để tạo nhân vật thứ 2:
- Mở trình duyệt khác, hoặc mở tab ẩn danh / Incognito
- Truy cập cùng URL: `http://localhost:3001/`
- Nhập tên nhân vật 2, ví dụ: `AnhB`
- Nhập cùng room: `room-test-01`
- Nhấn `Join room`

## Bước 4: Kiểm tra kết quả
Cả 2 nhân vật cùng room sẽ thấy:
- danh sách người trong phòng
- tin nhắn chat chung room
- quái vật của room
- có thể đánh quái và PvP nếu chọn mục tiêu phù hợp

## Lưu ý khi test
- Dùng tên khác nhau cho từng nhân vật
- Dùng cùng room để 2 người cùng hiển thị trong phòng
- Nếu muốn test nhanh hơn, bạn có thể dùng:
  - Chrome + Incognito
  - Edge + Chrome
  - Firefox + Chrome

## Cách test nhanh nhất
1. Trong Chrome thường: `AnhA` vào room `room-test-01`
2. Trong Chrome Incognito: `AnhB` vào room `room-test-01`
3. Mỗi người click `Đánh quái` hoặc chat

Thành công khi cả 2 tab cùng room đều thấy nhau ở phần "Người trong phòng".
