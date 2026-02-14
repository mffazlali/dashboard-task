# اپلیکیشن داشبورد

یک اپلیکیشن داشبورد مدرن و آماده برای تولید که با Next.js ساخته شده و شامل احراز هویت، مدیریت کاربران و کاتالوگ محصولات است.

## معرفی

این اپلیکیشن داشبورد بهترین شیوه‌های توسعه وب مدرن را نشان می‌دهد، از جمله معماری مبتنی بر فیچر، رندر سمت سرور و یکپارچه‌سازی API با امنیت تایپ. این پروژه با Next.js 15 و React 19 ساخته شده و پایه‌ای محکم برای اپلیکیشن‌های سطح سازمانی فراهم می‌کند.

## استک فناوری

- **فریمورک**: Next.js 15 (App Router)
- **زبان برنامه‌نویسی**: TypeScript 5
- **کتابخانه UI**: Chakra UI v3
- **استایل‌دهی**: Tailwind CSS 3
- **مدیریت فرم**: React Hook Form + Zod
- **API**: DummyJSON (REST API)
- **مدیریت State**: React Server Components + Client State
- **احراز هویت**: JWT با کوکی‌های HTTP-only

## ساختار پروژه

```
dashboard-task/
├── app/                      # صفحات Next.js App Router
│   ├── dashboard/           # مسیرهای محافظت‌شده داشبورد
│   │   ├── layout.tsx      # لی‌اوت داشبورد با سایدبار
│   │   ├── page.tsx        # صفحه اصلی داشبورد با آمار
│   │   ├── products/       # مدیریت محصولات
│   │   └── users/          # مدیریت کاربران
│   ├── login/              # صفحه عمومی ورود
│   ├── layout.tsx          # لی‌اوت اصلی
│   └── page.tsx            # صفحه لندینگ
│
├── features/                # ماژول‌های فیچر (مبتنی بر دامنه)
│   ├── dashboard/          # فیچر داشبورد
│   │   ├── components/     # کامپوننت‌های مخصوص داشبورد
│   │   ├── hooks/          # هوک‌های مخصوص داشبورد
│   │   └── index.tsx       # کامپوننت اصلی داشبورد
│   ├── login/              # فیچر ورود
│   │   ├── actions.ts      # اکشن‌های سرور
│   │   ├── schema.ts       # اسکیماهای اعتبارسنجی
│   │   └── index.tsx       # کامپوننت فرم ورود
│   ├── products/           # فیچر محصولات
│   │   ├── components/     # کامپوننت‌های محصول
│   │   └── index.tsx       # کامپوننت لیست محصولات
│   └── users/              # فیچر کاربران
│       ├── components/     # کامپوننت‌های کاربر
│       └── index.tsx       # کامپوننت لیست کاربران
│
├── shared/                  # منابع مشترک
│   ├── components/         # کامپوننت‌های قابل استفاده مجدد
│   │   ├── AuthGuard.tsx  # محافظت مسیر
│   │   └── Pagination.tsx # کامپوننت صفحه‌بندی
│   ├── hooks/              # هوک‌های سفارشی React
│   │   └── useAuth.ts     # هوک احراز هویت
│   ├── layout/             # کامپوننت‌های لی‌اوت
│   │   ├── Header.tsx     # نوار بالایی
│   │   └── Sidebar.tsx    # نوار کناری
│   ├── lib/                # توابع کمکی
│   │   ├── apiClient.ts   # کلاینت HTTP
│   │   ├── apiConfig.ts   # پیکربندی API
│   │   ├── cookies.ts     # ابزارهای کوکی
│   │   └── store.ts       # ذخیره‌سازی کلاینت
│   ├── providers/          # پرووایدرهای Context
│   │   └── ChakraProvider.tsx
│   ├── services/           # لایه سرویس API
│   │   ├── authService.ts
│   │   ├── productService.ts
│   │   └── userService.ts
│   └── types/              # تعاریف TypeScript
│       ├── api.ts
│       ├── auth.ts
│       ├── product.ts
│       └── user.ts
│
├── .env.local.example      # قالب متغیرهای محیطی
├── middleware.ts           # میدلور Next.js برای احراز هویت
├── next.config.ts          # پیکربندی Next.js
├── tailwind.config.ts      # پیکربندی Tailwind
└── tsconfig.json           # پیکربندی TypeScript
```

## ویژگی‌های کلیدی

### احراز هویت و مجوزدهی
- احراز هویت مبتنی بر JWT با کوکی‌های امن HTTP-only
- مسیرهای محافظت‌شده با استفاده از میدلور Next.js
- مدیریت وضعیت احراز هویت سمت کلاینت
- تازه‌سازی خودکار توکن
- خروج امن با پاکسازی

### داشبورد
- نمایش آمار به صورت لحظه‌ای
- تازه‌سازی خودکار هر 30 ثانیه
- قابلیت تازه‌سازی دستی
- دریافت داده سمت سرور
- به‌روزرسانی‌های Optimistic UI

### مدیریت کاربران
- لیست کاربران با صفحه‌بندی (10 کاربر در هر صفحه)
- نمایش پروفایل کاربر با آواتار
- قابلیت جستجو و فیلتر
- لی‌اوت جدول واکنش‌گرا
- وضعیت‌های بارگذاری و اسکلتون

### مدیریت محصولات
- گرید محصولات با صفحه‌بندی (12 محصول در هر صفحه)
- کارت‌های محصول با تصاویر
- بج دسته‌بندی
- نمایش امتیاز
- اطلاعات موجودی
- نشانگرهای تخفیف

### ویژگی‌های UI/UX
- طراحی واکنش‌گرا (موبایل، تبلت، دسکتاپ)
- اسکلتون‌های بارگذاری برای تجربه کاربری بهتر
- انتقال‌های صفحه روان
- مدیریت خطا با بازخورد کاربر
- کامپوننت‌های قابل دسترس (سازگار با WCAG)
- پشتیبانی از حالت تاریک (از طریق Chakra UI)

## شروع کار

### پیش‌نیازها

- Node.js نسخه 18 یا بالاتر
- مدیر بسته npm، yarn یا pnpm

### نصب

1. کلون کردن مخزن:
```bash
git clone <repository-url>
cd dashboard-task
```

2. نصب وابستگی‌ها:
```bash
npm install
# یا
yarn install
# یا
pnpm install
```

3. تنظیم متغیرهای محیطی:
```bash
cp .env.local.example .env.local
```

ویرایش `.env.local` و پیکربندی:
```env
NEXT_PUBLIC_API_BASE_URL=https://dummyjson.com
```

4. اجرای سرور توسعه:
```bash
npm run dev
# یا
yarn dev
# یا
pnpm dev
```

5. باز کردن [http://localhost:3000](http://localhost:3000) در مرورگر

### اطلاعات ورود تستی

از این اطلاعات برای تست اپلیکیشن استفاده کنید:

```
نام کاربری: emilys
رمز عبور: emilyspass
```

کاربران تستی اضافی در [DummyJSON Users](https://dummyjson.com/users) موجود است

## توسعه

### اسکریپت‌های موجود

```bash
# سرور توسعه
npm run dev

# بیلد تولید
npm run build

# شروع سرور تولید
npm run start

# بررسی کد
npm run lint
```

### سبک کدنویسی

این پروژه از قوانین سخت‌گیرانه TypeScript و ESLint پیروی می‌کند:
- حالت Strict فعال
- بدون any ضمنی
- قالب‌بندی کد یکنواخت
- سازماندهی import ها

### اضافه کردن فیچرهای جدید

1. یک پوشه جدید در `features/` ایجاد کنید
2. کامپوننت‌های فیچر را در `components/` اضافه کنید
3. سرویس API را در `shared/services/` ایجاد کنید
4. تایپ‌ها را در `shared/types/` تعریف کنید
5. مسیر را در `app/dashboard/` اضافه کنید

مثال ساختار:
```
features/orders/
├── components/
│   ├── OrdersList.tsx
│   └── index.tsx
├── index.tsx
└── types.ts
```

## تصمیمات معماری

### ساختار مبتنی بر فیچر
پروژه از معماری مبتنی بر فیچر استفاده می‌کند که در آن هر فیچر با کامپوننت‌ها، منطق و استایل‌های خود مستقل است. این رویکرد:
- سازماندهی کد را بهبود می‌بخشد
- تست فیچرها را آسان‌تر می‌کند
- تقسیم کد بهتری را فراهم می‌کند
- همکاری تیمی را تسهیل می‌کند

### اولویت با Server Components
ما از React Server Components برای موارد زیر استفاده می‌کنیم:
- عملکرد بهتر (JavaScript کمتر برای کلاینت)
- SEO بهبود یافته
- دریافت داده ساده‌شده
- کاهش مدیریت state سمت کلاینت

### الگوی API Client
کلاینت API سفارشی موارد زیر را فراهم می‌کند:
- مدیریت خطای متمرکز
- لاگ درخواست/پاسخ
- فراخوانی‌های API با امنیت تایپ
- یکپارچه‌سازی کش Next.js
- منطق تلاش مجدد خودکار

### امنیت تایپ
TypeScript در سراسر پروژه با موارد زیر استفاده می‌شود:
- حالت Strict فعال
- تعاریف تایپ جامع
- بدون تایپ `any`
- Zod برای اعتبارسنجی زمان اجرا

## یکپارچه‌سازی API

### URL پایه
```
https://dummyjson.com
```

### اندپوینت‌های استفاده شده

#### احراز هویت
```typescript
POST /auth/login
Body: { username: string, password: string }
Response: { token: string, ...user }
```

#### کاربران
```typescript
GET /users?limit=10&skip=0
Response: { users: User[], total: number, skip: number, limit: number }
```

#### محصولات
```typescript
GET /products?limit=12&skip=0
Response: { products: Product[], total: number, skip: number, limit: number }
```

### استفاده از API Client

```typescript
// درخواست GET
const users = await apiClient.get<UsersResponse>('users', {
  limit: '10',
  skip: '0'
});

// درخواست POST
const result = await apiClient.post<LoginResponse>('auth/login', {
  username: 'emilys',
  password: 'emilyspass'
});
```

## بهینه‌سازی‌های عملکرد

### استراتژی کش
- کش داده سمت سرور با revalidation
- بهینه‌سازی تصویر با Next.js Image
- تولید صفحه استاتیک در صورت امکان
- Incremental Static Regeneration (ISR)

### تقسیم کد
- تقسیم خودکار کد بر اساس مسیر
- import های داینامیک برای کامپوننت‌های سنگین
- بارگذاری تنبل برای تصاویر
- مرزهای Suspense برای کامپوننت‌های async

### اندازه بسته
- Tree shaking فعال
- بیلدهای تولید بهینه‌شده
- وابستگی‌های حداقلی
- تقسیم chunk کارآمد

## تست

### چک‌لیست تست دستی

- [ ] ورود با اطلاعات معتبر
- [ ] ورود با اطلاعات نامعتبر
- [ ] عملکرد خروج
- [ ] نمایش آمار داشبورد
- [ ] تازه‌سازی خودکار داشبورد
- [ ] صفحه‌بندی کاربران
- [ ] صفحه‌بندی محصولات
- [ ] طراحی واکنش‌گرا در موبایل
- [ ] طراحی واکنش‌گرا در تبلت
- [ ] وضعیت‌های بارگذاری
- [ ] مدیریت خطا

### سازگاری مرورگر

تست شده و کار می‌کند در:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## استقرار

### بیلد برای تولید

```bash
npm run build
```

این دستور یک بیلد تولید بهینه‌شده در پوشه `.next` ایجاد می‌کند.

### متغیرهای محیطی

متغیرهای محیطی مورد نیاز برای تولید:

```env
NEXT_PUBLIC_API_BASE_URL=https://dummyjson.com
```

### پلتفرم‌های استقرار

این اپلیکیشن می‌تواند در موارد زیر مستقر شود:
- **Vercel** (توصیه می‌شود) - بدون پیکربندی
- **Netlify** - با پلاگین Next.js
- **AWS Amplify** - یکپارچه‌سازی کامل AWS
- **Docker** - استقرار کانتینری
- **هاستینگ سنتی** - با پشتیبانی Node.js

### استقرار Vercel

1. کد را به GitHub پوش کنید
2. پروژه را در Vercel import کنید
3. متغیرهای محیطی را پیکربندی کنید
4. دیپلوی کنید

### استقرار Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## عیب‌یابی

### مشکلات رایج

**مشکل**: فراخوانی‌های API شکست می‌خورند
- پیکربندی `.env.local` را بررسی کنید
- URL پایه API را تأیید کنید
- اتصال شبکه را بررسی کنید

**مشکل**: احراز هویت کار نمی‌کند
- کوکی‌های مرورگر را پاک کنید
- پیکربندی middleware را بررسی کنید
- ذخیره‌سازی توکن را تأیید کنید

**مشکل**: خطاهای بیلد
- پوشه `.next` را حذف کنید
- node_modules را پاک کنید: `rm -rf node_modules`
- دوباره نصب کنید: `npm install`
- دوباره بیلد کنید: `npm run build`

**مشکل**: خطاهای TypeScript
- `npm run lint` را اجرا کنید
- پیکربندی `tsconfig.json` را بررسی کنید
- تأیید کنید که همه تایپ‌ها به درستی import شده‌اند

## مشارکت

1. مخزن را Fork کنید
2. یک برنچ فیچر ایجاد کنید (`git checkout -b feature/amazing-feature`)
3. تغییرات خود را کامیت کنید (`git commit -m 'Add amazing feature'`)
4. به برنچ پوش کنید (`git push origin feature/amazing-feature`)
5. یک Pull Request باز کنید

### قرارداد Commit

از conventional commits پیروی کنید:
- `feat:` فیچر جدید
- `fix:` رفع باگ
- `docs:` تغییرات مستندات
- `style:` تغییرات سبک کد
- `refactor:` بازنویسی کد
- `test:` اضافه/تغییر تست‌ها
- `chore:` تغییرات فرآیند بیلد یا ابزارهای کمکی

## مجوز

این پروژه تحت مجوز MIT منتشر شده است.

## قدردانی

- [Next.js](https://nextjs.org/) - فریمورک React
- [Chakra UI](https://chakra-ui.com/) - کتابخانه کامپوننت
- [DummyJSON](https://dummyjson.com/) - REST API جعلی
- [TypeScript](https://www.typescriptlang.org/) - امنیت تایپ

## پشتیبانی

برای پشتیبانی، لطفاً یک issue در مخزن GitHub باز کنید یا با تیم توسعه تماس بگیرید.

---

ساخته شده با ❤️ با استفاده از Next.js و TypeScript
