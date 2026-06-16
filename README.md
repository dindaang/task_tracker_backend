# Backend Setup (Node.js + MySQL)

## 1. Database Setup

Buat database baru dengan nama:

```sql
CREATE DATABASE task_tracker;
```

Import file SQL yang disediakan:

```text
task_tracker.sql
```

ke dalam database `task_tracker`.

---

## 2. Install Dependencies

Jalankan perintah berikut pada folder backend:

```bash
npm install
```

---

## 3. Menjalankan Server

```bash
node index.js
```

Server akan berjalan pada:

```text
http://localhost:3000
```