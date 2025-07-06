# 🚀 Test Guide: Login + Register với Role Selection

## ✅ HOÀN THÀNH

### Đã thêm vào LoginPage:
1. **Tab switching** giữa Login và Register
2. **Register form** với đầy đủ fields:
   - Tên đăng nhập (username)
   - Họ tên (full_name)
   - Email
   - Số điện thoại (phone_number)
   - Địa chỉ (tùy chọn)
   - Vai trò (staff/agent) - **DROPDOWN**
   - Mật khẩu 
   - Xác nhận mật khẩu
3. **Validation** phù hợp với backend
4. **Auto-redirect** sau đăng ký thành công

### Backend API:
- ✅ `/api/v1/auth/register/` có sẵn
- ✅ Validation: username ≥3, password ≥8 + uppercase + lowercase + number
- ✅ Auto-login sau register

## 🧪 CÁCH TEST

### Test 1: Tab switching
1. Mở `http://localhost:5173/login`
2. Click tab "Đăng ký" → Form đăng ký hiện ra
3. Click tab "Đăng nhập" → Form đăng nhập hiện ra
4. **Expected**: Tab switching mượt mà

### Test 2: Register Staff
1. Tab "Đăng ký" → Điền form:
   - Username: `staff001`
   - Họ tên: `Nguyễn Văn A`
   - Email: `staff001@test.com`
   - SĐT: `0901234567`
   - Địa chỉ: `123 ABC Street`
   - **Vai trò: Staff**
   - Mật khẩu: `StaffPassword123`
   - Xác nhận: `StaffPassword123`
2. Click "Đăng ký"
3. **Expected**: Success message → Auto redirect về staff app (`http://localhost:5176/`)

### Test 3: Register Agent
1. Tab "Đăng ký" → Điền form:
   - Username: `agent001`
   - Họ tên: `Trần Thị B`
   - Email: `agent001@test.com`
   - SĐT: `0907654321`
   - Địa chỉ: `456 XYZ Street`
   - **Vai trò: Agent**
   - Mật khẩu: `AgentPassword123`
   - Xác nhận: `AgentPassword123`
2. Click "Đăng ký"
3. **Expected**: Success message → Auto redirect về agency app (`http://localhost:5174/`)

### Test 4: Login với tài khoản vừa tạo
1. Tab "Đăng nhập"
2. Username: `staff001`, Password: `StaffPassword123`
3. **Expected**: Auto redirect về `http://localhost:5176/`

### Test 5: Validation errors
1. Tab "Đăng ký" → Test các trường hợp:
   - Username < 3 ký tự
   - Password < 8 ký tự hoặc thiếu uppercase/lowercase/number
   - Email sai format
   - Mật khẩu xác nhận không khớp
   - Username đã tồn tại
2. **Expected**: Error messages rõ ràng

## 🎯 ROLE-BASED REDIRECT LOGIC

### Sau Login/Register:
```
admin → http://localhost:5173/admin
staff → http://localhost:5176/
agent → http://localhost:5174/
```

### Protected Routes:
- **Admin app**: Chỉ cho phép role = `admin`
- **Staff app**: Chỉ cho phép role = `staff`  
- **Agency app**: Chỉ cho phép role = `agent`

## 📊 EXPECTED RESULTS

### ✅ PASS khi:
- Tab switching hoạt động mượt mà
- Register thành công với validation đúng
- Auto-redirect đúng app theo role
- Login với tài khoản mới tạo OK
- Protected routes hoạt động đúng

### ❌ FAIL khi:
- Form validation không hoạt động
- Register không thành công
- Redirect sai app
- Protected route cho phép sai role

## 🔧 TROUBLESHOOTING

### Lỗi: 400 Bad Request khi register
- Check backend có chạy không: `http://localhost:8000`
- Check validation requirements (password phức tạp)

### Lỗi: Redirect không đúng
- Check console log xem role detect đúng không
- Check ProtectedRoute của từng app

### Lỗi: CORS
- Check backend settings.py có CORS đúng không

## 🚀 DEMO FLOW

1. **Start servers**: `start_all_servers.bat`
2. **Open**: `http://localhost:5173/login`
3. **Register Staff**: Tab "Đăng ký" → Fill form → Role = Staff
4. **Auto redirect**: `http://localhost:5176/` (Staff dashboard)
5. **Logout** và **Register Agent**: Role = Agent  
6. **Auto redirect**: `http://localhost:5174/` (Agency dashboard)

**System bây giờ hoàn chỉnh với login + register + role-based routing!** 🎉
