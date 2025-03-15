# React + Spring Boot E-Commerce Project

## 🛠 Setup Local Development

### 🔹 Prerequisites
Ensure you have the following installed:
- **Java 17+** (for Spring Boot)
- **Node.js 18+** (for Next.js frontend)
- **PostgreSQL** (for database)
- **Maven** (for building backend)
- **Railway CLI** (optional, for deploying database)
- **Vercel CLI** (optional, for deploying frontend)

---

## 🚀 Backend Setup (Spring Boot)

### 1️⃣ Clone the repository
```sh
 git clone https://github.com/Chulinuwu/Reactjs_Springboot.git
 cd Reactjs_Springboot/backend
```

### 2️⃣ Configure Database
- Create a PostgreSQL database locally or use a Railway-hosted one.
- Set up `application.properties` or use environment variables.

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/mydatabase
spring.datasource.username=postgres
spring.datasource.password=postgres
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
server.port=8080
```

🔹 **If using Railway database**, update `spring.datasource.url` with the Railway connection string.

### 3️⃣ Run the Backend
```sh
 mvn clean install -DskipTests
 mvn spring-boot:run
```
✅ Server should be running at `http://localhost:8080`

---

## 🎨 Frontend Setup (Next.js)

### 1️⃣ Move to the frontend directory
```sh
 cd ../frontend
```

### 2️⃣ Install dependencies
```sh
 npm install
```

### 3️⃣ Configure environment variables
Create `.env.local` file and add:
```
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

### 4️⃣ Run the Frontend
```sh
 npm run dev
```
✅ Frontend should be running at `http://localhost:3000`

---

## 🛠 Deployment (Optional)

### 🚀 Deploy Backend to Railway
```sh
 railway up
```

### 🚀 Deploy Frontend to Vercel
```sh
 vercel
```

---

## 🎯 API Routes

### 🔹 Authentication
| Method | Endpoint          | Description          |
|--------|-----------------|----------------------|
| POST   | `/api/auth/login` | User Login |
| POST   | `/api/auth/register` | User Registration |

### 🔹 Products
| Method | Endpoint          | Description          |
|--------|-----------------|----------------------|
| GET    | `/api/products` | Get All Products |
| POST   | `/api/products/buy` | Buy Product (User) |
| POST   | `/api/products` | Add Product (Admin) |
| PUT    | `/api/products/:id` | Update Product (Admin) |
| DELETE | `/api/products/:id` | Delete Product (Admin) |

✅ **Admin-only routes require authentication with a JWT token.**

---

## 📌 Notes
- If any issues occur, check logs using:
  ```sh
  mvn spring-boot:run
  npm run dev
  ```
- Make sure database is running before starting the backend.

Happy Coding! 🚀

