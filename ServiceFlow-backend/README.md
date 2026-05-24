# Schneider Smart Service Platform — Backend

Laravel API with Sanctum auth, Reverb websockets, bookings, dispatch, chat, payments, and admin analytics.

## Requirements

- PHP 8.3+
- Composer
- SQLite (default) or MySQL

## Setup

```bash
cd Schneider-backend
composer install
cp .env.example .env   # if needed
php artisan key:generate
php artisan migrate:fresh --seed
php artisan serve
```

In a second terminal, start Reverb:

```bash
php artisan reverb:start
# Uses port 8081 (8080 is often taken by Oracle/other apps on Windows)
```

Optional queue worker:

```bash
php artisan queue:work
```

## Demo accounts

| Role       | Email                   | Password  |
|------------|-------------------------|-----------|
| Admin      | admin@schneider.com     | password  |
| Customer   | customer@schneider.com  | password  |
| Technician | john@schneider.com      | password  |

## API

Base URL: `http://localhost:8000/api/v1`

- `POST /auth/login`, `/auth/register`, `/auth/logout`
- `GET /services`, `/technicians`
- `GET|POST /bookings` (authenticated)
- `GET /admin/*` (admin role)
- `GET /technician/*` (technician role)

Use `Authorization: Bearer {token}` from login response.

## Frontend

Set `NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1` in `Schneider-frontend/.env.local`.
