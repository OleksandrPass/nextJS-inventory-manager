# 📦 Aplikacja Internetowa do Zarządzania Magazynem  
*(Inventory Management Web Application)*

Ten projekt jest aplikacją **Next.js** przeznaczoną do zarządzania magazynem.  
Wykorzystuje zagnieżdżoną strukturę folderów, **Prisma** jako ORM do interakcji z bazą danych **PostgreSQL/MySQL**, oraz **Stack Auth** do uwierzytelniania użytkowników.

Ten plik **README** zawiera ostateczne kroki wymagane do skonfigurowania i uruchomienia aplikacji, ze szczególnym uwzględnieniem zagnieżdżonej struktury i typowych problemów ze ścieżkami.

---

## ⚙️ Wymagania wstępne *(Prerequisites)*

Zanim zaczniesz, upewnij się, że masz zainstalowane w systemie:

- **Node.js & npm** — zalecana wersja: `v18` lub wyższa

---

## 🚀 Instrukcje konfiguracji *(Setup Instructions)*

Wykonaj poniższe kroki starannie, zaczynając od głównego folderu projektu:  
`nextJS-inventory-manager-master`

Główna aplikacja **Next.js** znajduje się w katalogu `imw`.

```bash
# Zakładając, że znajdujesz się w głównym katalogu projektu:
cd imw
```

---

### 1️⃣ Instalacja zależności *(Install Dependencies)*

Zainstaluj wszystkie wymagane pakiety **zarówno w katalogu aplikacji Next.js, jak i w katalogu głównym**:

```bash
npm install
```

---

### 2️⃣ Konfiguracja zmiennych środowiskowych *(Configure Environment Variables)*

Utwórz plik o nazwie `.env.local` wewnątrz folderu `imw`, np. `imw/.env.local`.

#### 📄 Przykładowa zawartość:

```env
# imw/.env.local

DATABASE_URL="postgresql://user:password@host:port/database_name?schema=public"

# Przykład dla lokalnej bazy danych PostgreSQL:
# DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/inventory_db?schema=public"
```

#### 🔧 Możesz też użyć już działającego środowiska:

```env
NEXT_PUBLIC_STACK_PROJECT_ID='a364f891-a409-4145-86c9-473f4a93fb07'
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY='pck_1t4xjkjnvbebjy8sx5nya6b3ha31ykce50mtfecy7f0sr'
STACK_SECRET_SERVER_KEY='ssk_5k2f091wm9p8r2q01tsh45x8aw4aepnzhjzpm49gyt780'

DATABASE_URL='postgresql://neondb_owner:npg_SeZNHnGVE47W@ep-twilight-mode-agkmlobr-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require'
```

---

### 3️⃣ Generowanie klienta Prisma *(Generate Prisma Client)*

Wygeneruj klienta Prisma — tworzy to kod potrzebny aplikacji do interakcji z modelami bazy danych.

Z poziomu **głównego katalogu** projektu uruchom:

```bash
npx prisma generate
```

---

### 4️⃣ Uruchomienie aplikacji *(Run the Application)*

Uruchom serwer deweloperski Next.js:

```bash
npm run dev
```

Po uruchomieniu aplikacja powinna być dostępna pod adresem wskazanym w terminalu, zwykle:

👉 [http://localhost:3000](http://localhost:3000)

---

## 🌐 EN Version

### Inventory Management Web Application

This project is a **Next.js** application designed for inventory management, utilizing a **nested folder structure**, **Prisma** as the ORM to interact with a **PostgreSQL/MySQL** database, and **Stack Auth** for user authentication.

This **README** contains the definitive steps required to set up and run the application, specifically addressing the nested structure and common path issues.

---

### ⚙️ Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js & npm** (v18 or higher recommended)

---

### 🚀 Setup Instructions

Follow these steps carefully from the project root folder:  
`nextJS-inventory-manager-master`

The core Next.js application lives inside the `imw` directory.

```bash
# Assuming you are in the project root:
cd imw
```

---

#### 1️⃣ Install Dependencies

Install all required Node.js packages both in the **Next.js app and the root folder**:

```bash
npm install
```

---

#### 2️⃣ Configure Environment Variables

Create a file named `.env.local` inside the `imw` folder (e.g., `imw/.env.local`).

```env
# imw/.env.local

DATABASE_URL="postgresql://user:password@host:port/database_name?schema=public"
# Example for a local PostgreSQL database:
# DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/inventory_db?schema=public"
```

You can use an already working environment:

```env
NEXT_PUBLIC_STACK_PROJECT_ID='a364f891-a409-4145-86c9-473f4a93fb07'
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY='pck_1t4xjkjnvbebjy8sx5nya6b3ha31ykce50mtfecy7f0sr'
STACK_SECRET_SERVER_KEY='ssk_5k2f091wm9p8r2q01tsh45x8aw4aepnzhjzpm49gyt780'

DATABASE_URL='postgresql://neondb_owner:npg_SeZNHnGVE47W@ep-twilight-mode-agkmlobr-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require'
```

---

#### 3️⃣ Generate Prisma Client

Generate the Prisma client — this creates the necessary code for the app to interact with your database models.

Run the following command **inside the project root**:

```bash
npx prisma generate
```

---

#### 4️⃣ Run the Application

Start the Next.js development server:

```bash
npm run dev
```

The application should now be accessible at the address indicated in your terminal, usually:

👉 [http://localhost:3000](http://localhost:3000)
