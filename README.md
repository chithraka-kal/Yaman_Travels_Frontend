# 🌍 Yaman Travels - AI-Powered Travel Planner

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![Docker](https://img.shields.io/badge/Docker-Containerized-blue)
![AWS](https://img.shields.io/badge/AWS-EC2_Deployed-orange)

**Yaman Travels** is a full-stack modern web application that leverages Generative AI to create personalized travel itineraries. It features a robust architecture deployed on AWS EC2 using Docker containers, ensuring scalability and performance.

---

## 🚀 Key Features

* **🤖 AI Trip Planner:** Generates detailed day-by-day travel itineraries using the **Gemini AI API**.
* **📂 Dynamic Destinations:** Browse and filter destinations stored in **MongoDB Atlas**.
* **🔐 Secure Authentication:** Full user sign-up/login system powered by **NextAuth.js**.
* **⚡ Optimized Performance:** Implements **Next.js Static Generation** and Image Optimization for fast load times.
* **☁️ Cloud Native:** Fully containerized with **Docker** and deployed on **AWS EC2** (Free Tier optimized).

---

## 🛠️ Tech Stack

### **Frontend & Backend**
* **Framework:** Next.js 14 (App Router)
* **Language:** JavaScript / React
* **Styling:** Tailwind CSS
* **Authentication:** NextAuth.js

### **Infrastructure & DevOps**
* **Database:** MongoDB Atlas (Cloud)
* **Containerization:** Docker & Docker Compose
* **Cloud Provider:** AWS EC2 (t2.micro / Ubuntu)
* **Deployment Strategy:** Local Build → Docker Hub Push → AWS Pull

---

## 📸 Screenshots

| AI Planner | Destinations Page |
|:---:|:---:|
| ![AI Planner](https://via.placeholder.com/400x200?text=AI+Planner+Screenshot) | ![Destinations](https://via.placeholder.com/400x200?text=Destinations+Screenshot) |
*(Add your actual screenshots here)*

---

## ⚙️ Installation & Local Setup

Follow these steps to run the project locally on your machine.

### **1. Clone the Repository**
```bash
git clone https://github.com/YOUR_USERNAME/Yaman_Travels_Frontend.git
cd Yaman_Travels_Frontend/yaman-next
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Configure Environment Variables**
Create a `.env.local` file in the `yaman-next` directory and add the following keys:

```env
# Database Connection (MongoDB Atlas)
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/yaman_travels

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_super_secret_key_here

# AI API Key (Gemini)
GEMINI_API_KEY=your_gemini_api_key_here
```

### **4. Run the Development Server**
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🐳 Docker Setup (The "Engineer" Way)

This project is fully containerized. You can run the entire stack with a single command.

**1. Build and Run**
```bash
docker compose up -d --build
```

**2. Seed the Database**
If your database is empty, run the seeding script to populate it with initial data:
* Visit: `http://localhost:3000/api/seed`

---

## ☁️ Deployment Guide (AWS EC2)

This project uses a **"Build Local, Ship to Cloud"** strategy to optimize for AWS Free Tier resources.

### **Phase 1: Build & Push (On Local Machine)**
Instead of building on the limited AWS server, we build the image locally and push it to Docker Hub.

```bash
# 1. Login to Docker Hub
docker login

# 2. Build the optimized image
# Make sure you are inside the 'yaman-next' folder
docker build -t your-dockerhub-username/yaman-travels-app:latest .

# 3. Push to the cloud
docker push your-dockerhub-username/yaman-travels-app:latest
```

### **Phase 2: Pull & Run (On AWS Server)**
On the AWS EC2 instance:

```bash
# 1. Pull the latest image
docker compose pull

# 2. Restart the container
docker compose up -d
```

---

## 🤝 Contributing

Contributions are welcome!
1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📧 Contact

**Your Name** - [Your Email or LinkedIn]
Project Link: [https://github.com/YOUR_USERNAME/Yaman_Travels_Frontend](https://github.com/YOUR_USERNAME/Yaman_Travels_Frontend)