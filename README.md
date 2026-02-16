# اپلیکیشن داشبورد

یک اپلیکیشن داشبورد مدرن و آماده برای تولید که با Next.js ساخته شده و شامل احراز هویت، مدیریت کاربران، کاتالوگ محصولات و کتابخانه بازی‌های ویدیویی است.

## معرفی

این اپلیکیشن داشبورد بهترین شیوه‌های توسعه وب مدرن را نشان می‌دهد، از جمله معماری مبتنی بر فیچر، رندر سمت سرور، React Query برای مدیریت state سرور و یکپارچه‌سازی API با امنیت تایپ. این پروژه با Next.js 15 و React 19 ساخته شده و پایه‌ای محکم برای اپلیکیشن‌های سطح سازمانی فراهم می‌کند.

## استک فناوری

- **فریمورک**: Next.js 15 (App Router)
- **زبان برنامه‌نویسی**: TypeScript 5
- **کتابخانه UI**: Chakra UI v3
- **کامپوننت‌های Headless**: Headless UI (Listbox)
- **استایل‌دهی**: Tailwind CSS 3
- **مدیریت فرم**: React Hook Form + Zod
- **مدیریت State سرور**: React Query (TanStack Query)
- **API**: DummyJSON (REST API) + RAWG API (Games)
- **مدیریت State**: React Server Components + Client State
- **احراز هویت**: JWT با کوکی‌های HTTP-only

## ساختار پروژه

```
dashboard-task/
├── app/                      # صفحات Next.js App Router
│   ├── dashboard/           # مسیرهای محافظت‌شده داشبورد
│   │   ├── layout.tsx      # لی‌اوت داشبورد با سایدبار
│   │   ├── page.tsx        # صفحه اصلی داشبورد با آمار
│   │   ├── games/          # مدیریت بازی‌ها
│   │   ├── products/       # مدیریت محصولات
│   │   ├── users/          # مدیریت کاربران
│   │   └── select-demo/    # صفحه دمو کامپوننت ورود
│   ├── login/              # صفحه عمومی ورود
│   ├── layout.tsx          # لی‌اوت اصلی
│   └── page.tsx            # صفحه لندینگ
│
├── features/                # ماژول‌های فیچر (مبتنی بر دامنه)
│   ├── dashboard/          # فیچر داشبورد
│   │   ├── components/     # کامپوننت‌های مخصوص داشبورد
│   │   ├── hooks/          # هوک‌های مخصوص داشبورد
│   │   └── index.tsx       # کامپوننت اصلی داشبورد
│   ├── games/              # فیچر بازی‌ها (React Query)
│   │   ├── general/        # لیست بازی‌ها
│   │   │   └── index.tsx   # کامپوننت لیست
│   │   └── details/        # جزئیات بازی
│   │       └── index.tsx   # کامپوننت جزئیات
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
│   │   ├── AdvancedSelect/ # کامپوننت Select پیشرفته
│   │   │   ├── AdvancedSelect.tsx  # کامپوننت اصلی
│   │   │   ├── types.ts            # تایپ‌های TypeScript
│   │   │   ├── index.tsx           # Export اصلی
│   │   │   └── README.md           # مستندات کامپوننت
│   │   ├── AuthGuard.tsx  # محافظت مسیر
│   │   └── Pagination.tsx # کامپوننت صفحه‌بندی
│   ├── hooks/              # هوک‌های سفارشی React
│   │   ├── useAuth.ts     # هوک احراز هویت
│   │   └── useGames.ts    # هوک‌های React Query برای بازی‌ها
│   ├── layout/             # کامپوننت‌های لی‌اوت
│   │   ├── Header.tsx     # نوار بالایی
│   │   └── Sidebar.tsx    # نوار کناری
│   ├── lib/                # توابع کمکی
│   │   ├── apiClient.ts   # کلاینت HTTP
│   │   ├── apiConfig.ts   # پیکربندی API
│   │   ├── cookies.ts     # ابزارهای کوکی
│   │   ├── gamesApi.ts    # کلاینت API بازی‌ها (fetch)
│   │   └── store.ts       # ذخیره‌سازی کلاینت
│   ├── providers/          # پرووایدرهای Context
│   │   ├── ChakraProvider.tsx
│   │   └── QueryProvider.tsx  # React Query Provider
│   ├── services/           # لایه سرویس API
│   │   ├── authService.ts
│   │   ├── productService.ts
│   │   └── userService.ts
│   └── types/              # تعاریف TypeScript
│       ├── api.ts
│       ├── auth.ts
│       ├── game.ts        # تایپ‌های بازی
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

### مدیریت بازی‌ها (Games)
- کتابخانه کامل بازی‌های ویدیویی با RAWG API
- جستجوی بازی با نام
- فیلترهای پیشرفته (ژانر، پلتفرم، مرتب‌سازی)
- نمایش جزئیات کامل بازی
- گالری تصاویر (Screenshots)
- اطلاعات سازندگان و ناشران
- امتیازات و Metacritic
- مدیریت state با React Query
- Caching خودکار و Refetching هوشمند

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

### کامپوننت Select پیشرفته (AdvancedSelect)
- استفاده از Headless UI (Listbox) برای Accessibility کامل
- استایل‌دهی با Tailwind CSS
- جستجوی زنده در آیتم‌ها
- انتخاب چندتایی (Multi-select) با نمایش تعداد
- گروه‌بندی آیتم‌ها به صورت خودکار
- دکمه‌های انتخاب همه/حذف همه
- پشتیبانی از RTL (راست به چپ)
- غیرفعال کردن آیتم‌های خاص
- مجازی‌سازی برای لیست‌های بزرگ (بهینه‌سازی عملکرد)
- صفحه دمو جامع در `/dashboard/select-demo`

### کامپوننت‌های قابل استفاده مجدد
- **AuthGuard**: محافظت از مسیرها و بررسی احراز هویت
- **Pagination**: صفحه‌بندی با پشتیبانی کامل
- **AdvancedSelect**: کامپوننت Select پیشرفته با قابلیت‌های کامل
  - انتخاب تکی و چندتایی
  - جستجو و فیلتر
  - گروه‌بندی خودکار
  - مجازی‌سازی برای عملکرد بهتر
  - Accessible (ARIA compliant)

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
git clone https://github.com/mffazlali/dashboard-task.git
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

### استفاده از کامپوننت AdvancedSelect

کامپوننت Select پیشرفته برای انتخاب‌های تکی و چندتایی:

```typescript
import { AdvancedSelect } from '@/shared/components';
import { useState } from 'react';

// انتخاب تکی
function SingleSelectExample() {
  const [value, setValue] = useState<string | number>('');
  
  const options = [
    { value: 1, label: 'گزینه اول' },
    { value: 2, label: 'گزینه دوم' },
    { value: 3, label: 'گزینه سوم' },
  ];

  return (
    <AdvancedSelect
      options={options}
      value={value}
      onChange={setValue}
      placeholder="یک گزینه انتخاب کنید"
      searchable
    />
  );
}

// انتخاب چندتایی با گروه‌بندی
function MultiSelectExample() {
  const [values, setValues] = useState<(string | number)[]>([]);
  
  const options = [
    { value: 1, label: 'سیب', group: 'میوه‌های داخلی' },
    { value: 2, label: 'پرتقال', group: 'میوه‌های داخلی' },
    { value: 3, label: 'موز', group: 'میوه‌های وارداتی' },
    { value: 4, label: 'انبه', group: 'میوه‌های وارداتی' },
  ];

  return (
    <AdvancedSelect
      options={options}
      value={values}
      onChange={setValues}
      multiple
      searchable
      showSelectAll
      placeholder="میوه‌ها را انتخاب کنید"
    />
  );
}

// انتخاب با مجازی‌سازی (برای لیست‌های بزرگ)
function VirtualizedSelectExample() {
  const [values, setValues] = useState<(string | number)[]>([]);
  
  // تولید 1000 آیتم
  const largeOptions = Array.from({ length: 1000 }, (_, i) => ({
    value: i + 1,
    label: `آیتم شماره ${i + 1}`,
    group: i % 3 === 0 ? 'گروه A' : i % 3 === 1 ? 'گروه B' : 'گروه C',
  }));

  return (
    <AdvancedSelect
      options={largeOptions}
      value={values}
      onChange={setValues}
      multiple
      searchable
      showSelectAll
      virtualized
      placeholder="از 1000 آیتم انتخاب کنید"
    />
  );
}
```

#### Props کامپوننت AdvancedSelect

| Prop | Type | Default | توضیحات |
|------|------|---------|---------|
| `options` | `SelectOption[]` | required | آرایه گزینه‌ها |
| `value` | `string \| number \| (string \| number)[]` | - | مقدار انتخاب شده |
| `onChange` | `(value) => void` | required | تابع تغییر مقدار |
| `multiple` | `boolean` | `false` | فعال‌سازی انتخاب چندتایی |
| `searchable` | `boolean` | `true` | نمایش جستجو |
| `placeholder` | `string` | `'انتخاب کنید...'` | متن placeholder |
| `disabled` | `boolean` | `false` | غیرفعال کردن کامپوننت |
| `virtualized` | `boolean` | `false` | مجازی‌سازی برای لیست‌های بزرگ |
| `showSelectAll` | `boolean` | `false` | نمایش دکمه انتخاب همه |
| `className` | `string` | - | کلاس CSS اضافی |

#### تایپ SelectOption

```typescript
interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;  // غیرفعال کردن این گزینه
  group?: string;      // نام گروه برای گروه‌بندی
}
```

برای مشاهده مثال‌های کامل و تعاملی، به صفحه `/dashboard/select-demo` مراجعه کنید.
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
- [ ] صفحه‌بندی بازی‌ها
- [ ] جستجو و فیلتر بازی‌ها
- [ ] نمایش جزئیات بازی
- [ ] کامپوننت AdvancedSelect - انتخاب تکی
- [ ] کامپوننت AdvancedSelect - انتخاب چندتایی
- [ ] کامپوننت AdvancedSelect - جستجو در آیتم‌ها
- [ ] کامپوننت AdvancedSelect - گروه‌بندی
- [ ] کامپوننت AdvancedSelect - انتخاب همه/حذف همه
- [ ] کامپوننت AdvancedSelect - مجازی‌سازی (1000 آیتم)
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
