Project Banner](public/assets/HomePage.png)

# 🧩 URL Shortener API

A simple and lightweight URL shortener built using Node.js, Express.js, and PostgreSQL.

This application allows users to shorten long URLs into compact short codes, and access the original URL by visiting the shortened one.

---

## 🚀 Features

* Shorten any valid long URL
* Redirect to the original URL using the shortcode
* URLs expire after a defined period (default: 10 minutes)
* Handles invalid/expired links with a custom 404 page
* Frontend developed using HTML, CSS, JS
* PostgreSQL as the database (via Docker Compose)

---

## 📁 Project Structure

```
url-shortener/
├── public/             # Frontend static files
│   ├── index.html
│   ├── style.css
│   └── script.js
├── routes/
│   └── urlshortener.js # Main route handler
├── config/
│   └── db.js           # PostgreSQL DB configuration
├── .env                # Environment variables
├── docker-compose.yml  # PostgreSQL via Docker
├── server.js           # Entry point of the app
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/url-shortener.git
cd url-shortener
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up the PostgreSQL Database (Using Docker Compose)

Instead of installing PostgreSQL manually, we use **Docker Compose** to run the database.

---

#### ✅ Step 1: Start PostgreSQL using Docker Compose

Make sure Docker is installed and running.

In the project folder (where your `docker-compose.yml` is located), open a terminal and run:

```bash
docker-compose up -d
```

This will pull the PostgreSQL image and start the database server in a container.

---

#### ✅ Step 2: Open pgAdmin and Create a Server

Open pgAdmin in your browser:

👉 [http://localhost:5050](http://localhost:5050)

**Login Credentials:**

* **Email:** `admin@admin.com`
* **Password:** `admin`

**After login:**

1. Click **"Add New Server"**
2. Under **General** tab:

   * **Name:** `Local PostgreSQL` (or any name you like)
3. Switch to the **Connection** tab:

   * **Host name/address:** `localhost`
   * **Port:** `5432`
   * **Username:** `postgres` (or the one from your `docker-compose`)
   * **Password:** `postgres` (or the value from `.env` or Docker config)
4. Click **Save** – your server is now connected.

---

#### ✅ Step 3: Create the `urls` Table

After connecting the server:

1. Expand **Servers → Databases → Your database name**
2. Click **Tools → Query Tool**
3. Paste and run the following SQL query:

```sql
CREATE TABLE urls (
  id SERIAL PRIMARY KEY,
  original_url TEXT NOT NULL,
  shortcode VARCHAR(10) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP
);
```

---

#### ✅ Step 4: Add Environment Variables

In the root folder of your project, create a `.env` file and add:

```ini
DATABASE_URL=postgres://<username>:<password>@localhost:5432/<your-db-name>
PORT=5000
```

> 🔁 Replace `<username>`, `<password>`, and `<your-db-name>` with your actual PostgreSQL values.

---

### 4. Start the Server

```bash
node server.js
```

Server will run at: [http://localhost:5000](http://localhost:5000)

---

## 📬 API Endpoints

### POST `/shorten`

**Request Body:**

```json
{
  "url": "https://example.com/some/long/url"
}
```

**Response:**

```json
{
  "shortUrl": "http://localhost:5000/abc123"
}
```

### GET `/:code`

Redirects to the original URL if valid and not expired.

---

## 🧪 Testing

You can use [Postman](https://www.postman.com/) or your frontend form to test the API.

---

## 📦 Deployment

You can deploy this app to any platform (e.g. Render, Railway, Vercel backend).

---

## 🧠 Notes

* URLs are set to expire in **10 minutes** by default (can be changed in code)
* If the short URL is not found or expired, a custom 404 page is shown

---

## 🙋‍♂️ Author

👨‍💻 [Ashok Reddy](https://www.linkedin.com/in/ashokreddycheluri-740603235/)

---

Let me know if you want to include screenshots or setup instructions for deployment.
