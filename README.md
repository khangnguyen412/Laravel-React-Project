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
- Install docker desktop
- Create dir ./mysql. If you have to rerun docker compose, make sure ./mysql is clear first
- Use cmd in this path
- Start project with the command below (just the first time): 
```
docker-compose down
docker-compose up -d --build
```
- On Window, start project 2nd time onwards with the command below:
```
.\start-project.bat
```
- On Linux & MacOS:
```
.\start-project.sh
```
- Use terminal laravel in docker:
```
docker exec -it Laravel-React-Web bash
```
- Use terminal react in docker:
```
docker exec -it Laravel-React-Frontend sh
```
- Migrate and seeding:
```
docker exec -it Laravel-React-Web bash
php artisan migrate
php artisan db:seed
```

## Project structure 
- project
    - laravel (laravel project) 
        + Dockerfile
    - mysql
    - nginx
        + default.conf
    - php
        + php.ini
    - react (react project) 
        + Dockerfile
        + README-REACTJS.MD
    - dockerignore
    - .env
    - .gitignore
    - docker-compose
    - start-project.bat
    - start-project.sh

The source was set up by KhangNguyen — do not copy