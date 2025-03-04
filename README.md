# Task Management App

## Overview
A **Full-Stack Task Management Application** using **Laravel 10 (Backend)** and **Vue  (Frontend)**. It allows users to **create, update, delete, and manage tasks** efficiently.

## Technologies Used
- **Backend**: Laravel 10
- **Frontend**: Vue 
- **Database**: MySQL 
- **HTTP Client**: Axios
- **Styling**: CSS

## Features
- **CRUD operations** for tasks
- **Status toggle** (Pending/Completed)
- **Pagination & Filtering**
- **Validation** (Client & Server-side)
- **RESTful API with Axios integration**

## Setup & Installation
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/ASHLEYMEKOLLE/TASK-MANAGEMENT-APP.git
cd TASK-MANAGEMENT-APP
```

### 2️⃣ Backend Setup (Laravel)
```sh
cd backend
composer install
cp .env.example .env
php artisan key:generate
```
**Configure `.env` file** (Database credentials), then:
```sh
php artisan migrate
php artisan serve
```

### 3️⃣ Frontend Setup (Vue)
```sh
cd ../frontend
npm install
```
**Set API URL in `.env`**:
```sh
VITE_API_URL=http://127.0.0.1:8000/api
```
```sh
npm run dev
```

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| **GET** | `/api/tasks` | List tasks (paginated) |
| **POST** | `/api/tasks` | Create a task |
| **PUT** | `/api/tasks/{id}` | Update a task |
| **DELETE** | `/api/tasks/{id}` | Delete a task |

## Project Structure
```
TASK-MANAGEMENT-APP/
├── backend/ (Laravel API)
├── frontend/ (Vue.js Frontend)
└── README.md
```

## Deployment
### **Frontend (Vue) → Netlify**
```sh
npm run build
```
Upload the `dist/` folder to Netlify.

## Troubleshooting
```sh
php artisan config:clear
php artisan cache:clear
npm run dev
```

## Author
- **Your Name**  
- GitHub: [AshleyMekolle](https://github.com/AshleyMekolle)

