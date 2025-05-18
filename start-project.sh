# Vào đường dẫn
cd "%USERPROFILE%\Desktop\Laravel React Project"

# Chạy docker-compose (chỉ lần cài đặt đầu tiên)
docker-compose up -d --build

# Khởi động project 
docker-compose -p laravel-reactjs-project restart
docker exec Laravel-React-Web php artisan serve --host=0.0.0.0 --port=80

# The source was set up by KhangNguyen — do not copy :)
# Source được setup bởi GPT và KhangNguyen, cấm cop dưới mọi hình thức :)