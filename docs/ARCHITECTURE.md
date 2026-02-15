# مستندات معماری

## معرفی

این سند تصمیمات معماری و الگوهای استفاده شده در اپلیکیشن داشبورد را شرح می‌دهد.

## الگوی معماری

### معماری مبتنی بر فیچر

اپلیکیشن از معماری مبتنی بر فیچر (vertical slice) پیروی می‌کند که در آن کد بر اساس فیچرهای کسب‌وکار به جای لایه‌های فنی سازماندهی می‌شود. این رویکرد مزایای متعددی دارد:

**مزایا:**
- **انسجام**: کدهای مرتبط کنار هم می‌مانند
- **مقیاس‌پذیری**: اضافه کردن فیچرهای جدید بدون تأثیر بر موارد موجود آسان است
- **همکاری تیمی**: تیم‌های مختلف می‌توانند به طور مستقل روی فیچرهای مختلف کار کنند
- **کشف کد**: یافتن و درک کد مخصوص فیچر آسان‌تر است
- **تست**: فیچرها می‌توانند به صورت جداگانه تست شوند

**ساختار:**
```
features/
├── dashboard/          # فیچر داشبورد
│   ├── components/    # کامپوننت‌های مخصوص فیچر
│   ├── hooks/         # هوک‌های مخصوص فیچر
│   └── index.tsx      # نقطه ورود فیچر
├── games/             # فیچر بازی‌ها (React Query)
│   ├── general/       # لیست بازی‌ها
│   └── details/       # جزئیات بازی
├── login/             # فیچر ورود
├── products/          # فیچر محصولات
└── users/             # فیچر کاربران
```

### لایه مشترک

عملکردهای مشترک به دایرکتوری `shared/` استخراج می‌شوند:

```
shared/
├── components/        # کامپوننت‌های قابل استفاده مجدد
├── hooks/             # هوک‌های قابل استفاده مجدد React
│   ├── useAuth.ts    # هوک احراز هویت
│   └── useGames.ts   # هوک‌های React Query برای بازی‌ها
├── layout/            # کامپوننت‌های لی‌اوت (Header، Sidebar)
├── lib/               # توابع کمکی و helper ها
│   ├── apiClient.ts  # کلاینت HTTP عمومی
│   └── gamesApi.ts   # کلاینت API بازی‌ها (fetch)
├── providers/         # پرووایدرهای React context
│   ├── ChakraProvider.tsx
│   └── QueryProvider.tsx  # React Query Provider
├── services/          # لایه سرویس API
└── types/             # تعاریف تایپ TypeScript
    ├── game.ts       # تایپ‌های بازی
    └── ...
```

## معماری کامپوننت

### اولویت با Server Components

ما React Server Components (RSC) را برای موارد زیر در اولویت قرار می‌دهیم:
- **عملکرد**: JavaScript کمتری به کلاینت ارسال می‌شود
- **SEO**: بهینه‌سازی موتور جستجو بهتر
- **دریافت داده**: دریافت داده سمت سرور ساده‌شده
- **امنیت**: منطق حساس در سرور باقی می‌ماند

**مثال:**
```typescript
// features/users/index.tsx (Server Component)
async function UsersDataFetcher({ searchParams }: UsersProps) {
  const usersData = await userService.getUsers({ limit, skip });
  return <UsersContent users={usersData?.users || []} />;
}
```

### Client Components

کامپوننت‌های کلاینت فقط در صورت نیاز برای موارد زیر استفاده می‌شوند:
- **تعامل**: تعاملات کاربر، event handler ها
- **API های مرورگر**: localStorage، window، document
- **هوک‌های React**: useState، useEffect، useContext
- **React Query**: برای مدیریت state سرور و caching
- **کتابخانه‌های شخص ثالث**: که نیاز به اجرای سمت کلاینت دارند

**مثال (با React Query)**:
```typescript
// features/games/general/index.tsx (Client Component)
'use client';

export default function GamesFeature() {
  const { data, isLoading } = useGames(filters);
  // تعامل سمت کلاینت با React Query
};
```

### ترکیب کامپوننت

کامپوننت‌ها از یک سلسله مراتب واضح پیروی می‌کنند:

1. **کامپوننت صفحه** (Server): نقطه ورود مسیر
2. **کامپوننت فیچر** (Server): دریافت داده
3. **کامپوننت محتوا** (Client): رندر UI
4. **زیرکامپوننت‌ها** (Client): عناصر خاص UI

## جریان داده

### دریافت داده سمت سرور

```
درخواست کاربر
    ↓
صفحه Next.js (app/dashboard/users/page.tsx)
    ↓
کامپوننت فیچر (features/users/index.tsx)
    ↓
سرویس API (shared/services/userService.ts)
    ↓
کلاینت API (shared/lib/apiClient.ts)
    ↓
API خارجی (DummyJSON)
    ↓
پاسخ به سمت بالا برمی‌گردد
    ↓
HTML رندر شده به کلاینت ارسال می‌شود
```

### تعاملات سمت کلاینت

```
اکشن کاربر (کلیک، ورودی)
    ↓
Event Handler (کامپوننت کلاینت)
    ↓
به‌روزرسانی State (useState، useTransition)
    ↓
رندر مجدد (React)
    ↓
اختیاری: Server Action یا فراخوانی API
    ↓
به‌روزرسانی UI
```

## معماری احراز هویت

### نمودار جریان

```
┌─────────────┐
│   مرورگر    │
└──────┬──────┘
       │
       │ 1. بازدید از /
       ↓
┌─────────────────┐
│   Middleware    │ ← بررسی کوکی
└────────┬────────┘
         │
         │ بدون توکن → هدایت به /login
         ↓
┌─────────────────┐
│  صفحه ورود      │
└────────┬────────┘
         │
         │ 2. ارسال اطلاعات ورود
         ↓
┌─────────────────┐
│  سرویس احراز    │ ← POST /auth/login
└────────┬────────┘
         │
         │ 3. ذخیره توکن در کوکی
         ↓
┌─────────────────┐
│   داشبورد       │ ← مسیر محافظت‌شده
└─────────────────┘
```

### اقدامات امنیتی

1. **کوکی‌های HTTP-only**: توکن‌ها در کوکی‌های HTTP-only ذخیره می‌شوند (از طریق JavaScript قابل دسترسی نیستند)
2. **محافظت Middleware**: تمام مسیرها توسط middleware Next.js محافظت می‌شوند
3. **گاردهای سمت کلاینت**: کامپوننت AuthGuard اضافی برای محافظت UI
4. **اعتبارسنجی توکن**: توکن‌ها در هر درخواست اعتبارسنجی می‌شوند
5. **خروج امن**: پاکسازی کامل وضعیت احراز هویت

## معماری لایه API

### الگوی لایه سرویس

لایه API به سرویس‌ها سازماندهی شده است:

```typescript
// shared/services/userService.ts
export const userService = {
  async getUsers(params) {
    return apiClient.get<UsersResponse>('users', params);
  }
};
```

**مزایا:**
- **جداسازی نگرانی‌ها**: منطق API از کامپوننت‌ها جدا شده
- **قابلیت استفاده مجدد**: سرویس‌ها می‌توانند در فیچرهای مختلف استفاده شوند
- **امنیت تایپ**: پشتیبانی کامل TypeScript
- **قابلیت تست**: آسان برای mock کردن در تست
- **مدیریت خطای متمرکز**: مدیریت خطای یکنواخت

### کلاینت API

کلاینت API سفارشی موارد زیر را فراهم می‌کند:

```typescript
class ApiClient {
  async get<T>(endpoint, params?, options?) { }
  async post<T>(endpoint, body?, options?) { }
}
```

**ویژگی‌ها:**
- لاگ درخواست/پاسخ
- مدیریت و تبدیل خطا
- یکپارچه‌سازی کش Next.js
- پاسخ‌های امن از نظر تایپ
- مدیریت پارامترهای query

## مدیریت State

### State سرور

state سرور از طریق دو رویکرد مدیریت می‌شود:

#### 1. React Server Components (برای Users و Products)
- **React Server Components**: داده در سرور دریافت می‌شود
- **کش Next.js**: کش خودکار با revalidation
- **مرزهای Suspense**: وضعیت‌های بارگذاری

#### 2. React Query (برای Games)
- **Client-side fetching**: درخواست‌ها از مرورگر
- **Automatic Caching**: کش خودکار داده‌ها
- **Smart Refetching**: به‌روزرسانی هوشمند
- **Loading States**: مدیریت خودکار وضعیت‌ها
- **Error Handling**: مدیریت ساده خطاها

**مثال React Query:**
```typescript
// shared/hooks/useGames.ts
export function useGames(filters) {
  return useQuery({
    queryKey: ['games', filters],
    queryFn: () => gamesApi.fetchGames(filters),
  });
}

// استفاده در کامپوننت
const { data, isLoading, error } = useGames({ search: 'zelda' });
```

### State کلاینت

state کلاینت از طریق موارد زیر مدیریت می‌شود:
- **هوک‌های React**: useState، useReducer
- **React Query**: برای state سرور در کلاینت (Games)
- **Context API**: برای state سراسری کلاینت (احراز هویت)
- **State URL**: پارامترهای جستجو برای صفحه‌بندی، فیلترها
- **Local Storage**: برای داده‌های پایدار کلاینت

### بدون Redux

ما عمداً از Redux اجتناب می‌کنیم زیرا:
- Server Components نیاز به state سراسری را کاهش می‌دهند
- React Query مدیریت state سرور را ساده می‌کند
- state URL بیشتر همگام‌سازی داده را مدیریت می‌کند
- Context API برای state احراز هویت کافی است
- مدل ذهنی ساده‌تر
- کد boilerplate کمتر

**مقایسه:**
```typescript
// ❌ Redux (پیچیده)
// - ایجاد slice
// - ایجاد actions
// - ایجاد reducers
// - پیکربندی store
// - استفاده از useDispatch و useSelector
// ~150 خط کد

// ✅ React Query (ساده)
export function useGames(filters) {
  return useQuery({
    queryKey: ['games', filters],
    queryFn: () => gamesApi.fetchGames(filters),
  });
}
// ~30 خط کد
```

## معماری مسیریابی

### ساختار App Router

```
app/
├── layout.tsx              # لی‌اوت اصلی
├── page.tsx                # صفحه اصلی (/)
├── login/
│   └── page.tsx           # صفحه ورود (/login)
└── dashboard/
    ├── layout.tsx         # لی‌اوت داشبورد (با QueryProvider)
    ├── page.tsx           # خانه داشبورد (/dashboard)
    ├── games/
    │   ├── page.tsx       # صفحه بازی‌ها (/dashboard/games)
    │   └── [id]/
    │       └── page.tsx   # جزئیات بازی (/dashboard/games/[id])
    ├── users/
    │   └── page.tsx       # صفحه کاربران (/dashboard/users)
    └── products/
        └── page.tsx       # صفحه محصولات (/dashboard/products)
```

### محافظت مسیر

1. **سطح Middleware**: خط دفاع اول
   ```typescript
   // middleware.ts
   if (!token && !isPublicRoute) {
     return NextResponse.redirect('/login');
   }
   ```

2. **سطح کامپوننت**: محافظت اضافی UI
   ```typescript
   // shared/components/AuthGuard.tsx
   if (!user) {
     redirect('/login');
   }
   ```

## بهینه‌سازی‌های عملکرد

### تقسیم کد

- **خودکار**: Next.js به طور خودکار کد را بر اساس مسیر تقسیم می‌کند
- **Import های داینامیک**: کامپوننت‌های سنگین به صورت on-demand بارگذاری می‌شوند
- **بارگذاری تنبل**: تصاویر و منابع غیرحیاتی

### استراتژی کش

#### 1. کش سمت سرور (Server Components):
```typescript
export const revalidate = 30; // Revalidate هر 30 ثانیه
```

#### 2. کش پاسخ API (Server Components):
```typescript
apiClient.get('users', params, {
  cache: 'no-store' // داده تازه اجباری
});
```

#### 3. کش React Query (Client Components):
```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,        // 1 دقیقه
      refetchOnWindowFocus: false,
    },
  },
});
```

#### 4. بهینه‌سازی تصویر:
```typescript
<Image
  src={product.thumbnail}
  fill
  style={{ objectFit: 'cover' }}
/>
```

### بهینه‌سازی بسته

- Tree shaking فعال
- بیلدهای تولید minify شده
- کد استفاده نشده حذف شده
- تقسیم chunk کارآمد

## مدیریت خطا

### مدیریت خطای لایه‌ای

1. **سطح کلاینت API**:
   ```typescript
   try {
     const response = await fetch(url);
     if (!response.ok) throw new ApiError();
   } catch (error) {
     console.error('[API Client] Error:', error);
     throw error;
   }
   ```

2. **سطح سرویس**:
   ```typescript
   try {
     return await apiClient.get('users');
   } catch (error) {
     console.error('Error fetching users:', error);
     throw error;
   }
   ```

3. **سطح کامپوننت**:
   ```typescript
   try {
     usersData = await userService.getUsers();
   } catch (error) {
     console.error('Error:', error);
     // نمایش UI خطا
   }
   ```

### Error Boundaries

Error Boundaries React خطاهای رندر را می‌گیرند:
```typescript
// app/error.tsx
export default function Error({ error, reset }) {
  return <ErrorUI error={error} onReset={reset} />;
}
```

## امنیت تایپ

### پیکربندی TypeScript

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

### سازماندهی تایپ

```
shared/types/
├── api.ts          # تایپ‌های مرتبط با API
├── auth.ts         # تایپ‌های احراز هویت
├── product.ts      # تایپ‌های دامنه محصول
├── user.ts         # تایپ‌های دامنه کاربر
└── index.ts        # Barrel export
```

### اعتبارسنجی زمان اجرا

اسکیماهای Zod برای بررسی تایپ زمان اجرا:
```typescript
const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(6)
});
```

## استراتژی تست

### تست واحد
- تست توابع و ابزارهای جداگانه
- Mock کردن وابستگی‌های خارجی
- تمرکز بر منطق کسب‌وکار

### تست یکپارچه‌سازی
- تست گردش کار فیچرها
- تست یکپارچه‌سازی API
- تست تعاملات کامپوننت

### تست E2E
- تست جریان‌های کامل کاربر
- تست جریان احراز هویت
- تست عملیات CRUD

## ملاحظات مقیاس‌پذیری

### مقیاس‌بندی افقی
- معماری بدون state
- بدون session سمت سرور
- می‌تواند چندین نمونه اجرا کند

### مقیاس‌بندی عمودی
- تقسیم کد کارآمد
- بارگذاری تنبل
- اندازه بسته بهینه‌شده

### مقیاس‌بندی فیچر
- اضافه کردن فیچرهای جدید آسان
- فیچرها مستقل هستند
- مرزهای واضح

## بهبودهای آینده

### پیشرفت‌های احتمالی
1. **به‌روزرسانی‌های لحظه‌ای**: یکپارچه‌سازی WebSocket
2. **پشتیبانی آفلاین**: Service workers، PWA
3. **کش پیشرفته**: Redis برای کش سمت سرور
4. **نظارت**: ردیابی خطا، نظارت عملکرد
5. **تست**: پوشش تست جامع
6. **CI/CD**: پایپلاین استقرار خودکار
7. **بین‌المللی‌سازی**: پشتیبانی چند زبانه
8. **دسترس‌پذیری**: انطباق پیشرفته WCAG

## نتیجه‌گیری

این معماری پایه‌ای محکم برای ساخت اپلیکیشن‌های وب مقیاس‌پذیر و قابل نگهداری فراهم می‌کند. ساختار مبتنی بر فیچر، همراه با Next.js App Router و React Server Components، یک کدبیس کارآمد و دوستانه برای توسعه‌دهنده ایجاد می‌کند.
