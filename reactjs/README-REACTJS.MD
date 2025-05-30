# Note react
## Tạo dự án: 
```
npx create-react-app .
```
- Build lại react mỗi lần cài thự viện
```
docker-compose build react
docker-compose up -d react
```

## Các gói cần cài đặt
- Cài đặt tailwindcss
```
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
```

## Trường hợp lỗi
- Lỗi: 157 vulnerabilities (xxx moderate, xx high, xx critical)
- Xử lý: Khi cài đặt npm chạy thêm
```
npm install
npm set audit false
```
- Lỗi: Error: error:0308010C:digital envelope routines::unsupported
- Xử lý: vào package.json cập nhật lại các "scripts" khi khởi động
```
"scripts": {
    "start": "react-scripts --openssl-legacy-provider start",
    "dev": "react-scripts --openssl-legacy-provider start",
    "build": "react-scripts --openssl-legacy-provider build",
    "test": "react-scripts --openssl-legacy-provider test",
    "eject": "react-scripts --openssl-legacy-provider eject"
  },