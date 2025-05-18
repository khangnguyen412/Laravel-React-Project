@REM Vào đường dẫn
cd "%USERPROFILE%\Desktop\Laravel React Project"

@REM Chạy docker-compose (chỉ lần cài đặt đầu tiên)
@REM docker-compose up -d --build

@REM Khởi động project 
docker-compose -p laravel-reactjs-project restart
docker exec Laravel-React-Web php artisan serve --host=0.0.0.0 --port=80

@REM The source was set up by KhangNguyen — do not copy :)
@REM Source được setup bởi GPT và KhangNguyen, cấm cop dưới mọi hình thức :)