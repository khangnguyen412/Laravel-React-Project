# The source was set up by KhangNguyen — do not copy :)
# Source được setup bởi GPT và KhangNguyen, cấm cop dưới mọi hình thức :)

# pull thư viện php
FROM php:8.2-fpm

# Thiết lập thư mục làm việc
WORKDIR /var/www/html

# Copy toàn bộ source code vào container
COPY . .

# Cài đặt các extension thường dùng cho PHP
RUN apt-get update && apt-get install -y libfreetype6-dev libjpeg-dev libpng-dev libzip-dev zip unzip git curl libonig-dev
RUN rm -rf /var/lib/apt/lists/* 
RUN docker-php-ext-configure gd --with-freetype --with-jpeg 
RUN docker-php-ext-install gd mysqli pdo pdo_mysql opcache zip mbstring

# cài thêm xdebug để có thông báo lỗi đẹp hơn trên local
RUN pecl install xdebug && docker-php-ext-enable xdebug

# Cài đặt Composer
RUN curl -sS https://getcomposer.org/installer  | php -- --install-dir=/usr/local/bin --filename=composer

# Tạo autoload file và optimize classmap
RUN composer install
RUN composer dump-autoload --optimize

CMD ["php-fpm"]