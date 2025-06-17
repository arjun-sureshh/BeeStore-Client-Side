# 🐝 Beestore - Fullstack E-Commerce Web Application

**Beestore** is a fullstack e-commerce application designed to provide a seamless shopping experience for users, sellers, and admins. It supports user-friendly product browsing, secure seller listings, and admin platform management — all built with scalability and modularity in mind.

## 🚀 Live Demo

🌐 [Click to Visit Beestore](https://bee-store.up.railway.app)

## ✨ Features

### 👥 User Module
- Register/Login with authentication
- Browse and search products
- Add to wishlist and manage cart
- Real-time cart updates with UI sync
- Secure checkout flow (future enhancement-ready)

### 🛍️ Seller Module
- Seller registration and login
- Create and manage product listings
- Upload product images securely
- Built with TypeScript + Express.js APIs
- Server-side validation for data integrity

### 🛠️ Admin Module
- Admin dashboard with role-based access
- Monitor and manage users, sellers, and products
- Built with Material UI and secured using JWT
- Middleware in Express.js for role-based control

## 🛠️ Tech Stack

| Frontend        | Backend             | Database   | Authentication |
|-----------------|---------------------|------------|----------------|
| React + TS      | Node.js + Express.js| MongoDB    | JWT            |
| Material UI     | RESTful API design  | Mongoose   | Cookies        |

## 🧱 Architecture

- **Frontend:** Built in React with TypeScript and Material UI for clean, responsive design.
- **Backend:** Built using Express.js with RESTful APIs and TypeScript for type safety.
- **Authentication:** JWT-based authentication with user roles (user, seller, admin).
- **Database:** MongoDB for flexible schema design with Mongoose ODM.

## 📁 Project Structure (Simplified)

```
/client
  └── src/
      ├── components/
      ├── pages/
      └── utils/
      
/server
  └── controllers/
  └── routes/
  └── middleware/
  └── models/
  └── config/
```

## 🔐 Security

- Role-based authentication and authorization
- Secure file upload for seller products
- Middleware to validate and protect API routes

## 📦 Installation (Dev Mode)

```bash
# Clone the repository
git clone https://github.com/your-username/beestore.git
cd beestore

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install

# Run the development servers
npm run dev  # For client
# In another terminal
npm run start  # For server
```

## 📌 Future Enhancements

- Payment gateway integration
- Admin analytics dashboard
- Product reviews and ratings
- Responsive PWA version

## 📬 Contact

**Arjun Suresh**  
📧 arjun410@gmail.com  
📍 Perumbavoor, Kerala  
🔗 [LinkedIn](https://www.linkedin.com/in/arjun-suresh)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
