## Laravel - Reactjs Project 
- Descripttion: Project Laravel + ReactJs for fullstack web.
- Purpose: Create CMS system

## Technology in project:
- Language: HTML, CSS, PHP, JS
- Tailwind
- Docker
- Laravel
- Reactjs

## How to start and testing project
### Start with docker (don't need install xampp, wamp)
- Install docker desktop first
- Create dir ./mysql first
- Use cmd in this path
- Start project with the command below (just the first time): 
```
docker-compose up -d --build
docker exec Laravel-React-Web php artisan serve --host=0.0.0.0 --port=80
```
- On Window, start project 2nd time onwards with the command below:
```
.\start-laravel.bat
```
- On Linux & MacOS:
```
.\start-laravel.sh
```
- Use terminal in docker:
```
docker exec -it Laravel-React-Web bash
```

## Project structure 
- project
    - docker-compose
    - .env
    - nginx
        + default.conf
    - php
        + php.ini
    - www (laravel project) 
        + Dockerfile
    - react (react project) 
        + Dockerfile

The source was set up by KhangNguyen — do not copy