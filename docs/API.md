# مستندات API

## معرفی

این سند لایه یکپارچه‌سازی API و نحوه تعامل با DummyJSON API را شرح می‌دهد.

## پیکربندی پایه

### متغیرهای محیطی

```env
NEXT_PUBLIC_API_BASE_URL=https://dummyjson.com
```

### کلاینت API

اپلیکیشن از یک کلاینت API سفارشی استفاده می‌کند که بر روی API بومی `fetch` با پشتیبانی کش Next.js ساخته شده است.

**مکان**: `shared/lib/apiClient.ts`

## استفاده از کلاینت API

### درخواست‌های GET

```typescript
import { apiClient } from '@/shared/lib/apiClient';

// درخواست GET ساده
const users = await apiClient.get<UsersResponse>('users');

// GET با پارامترهای query
const users = await apiClient.get<UsersResponse>('users', {
  limit: '10',
  skip: '0'
});

// GET با گزینه‌های کش
const users = await apiClient.get<UsersResponse>('users', params, {
  cache: 'no-store', // داده تازه اجباری
  next: {
    revalidate: 60 // Revalidate بعد از 60 ثانیه
  }
});
```

### درخواست‌های POST

```typescript
// درخواست POST
const result = await apiClient.post<LoginResponse>('auth/login', {
  username: 'emilys',
  password: 'emilyspass'
});

// POST با گزینه‌های کش
const result = await apiClient.post<Response>('endpoint', body, {
  cache: 'no-store'
});
```

### مدیریت پاسخ

تمام پاسخ‌های API تایپ دارند:

```typescript
interface ApiResponse<T> {
  data: T;
  status: number;
  ok: boolean;
}
```

### مدیریت خطا

کلاینت API برای درخواست‌های ناموفق `ApiError` پرتاب می‌کند:

```typescript
try {
  const data = await apiClient.get('users');
} catch (error) {
  if (error instanceof ApiError) {
    console.error('API Error:', error.message, error.status);
  }
}
```

## API احراز هویت

### ورود

**اندپوینت**: `POST /auth/login`

**درخواست**:
```typescript
{
  username: string;
  password: string;
}
```

**پاسخ**:
```typescript
{
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
  refreshToken: string;
}
```

**مثال**:
```typescript
const response = await authService.login({
  username: 'emilys',
  password: 'emilyspass'
});
```

**اطلاعات ورود تستی**:
- نام کاربری: `emilys`
- رمز عبور: `emilyspass`

کاربران تستی بیشتر در: https://dummyjson.com/users

## API کاربران

### دریافت تمام کاربران

**اندپوینت**: `GET /users`

**پارامترهای Query**:
- `limit` (اختیاری): تعداد کاربران برای بازگشت (پیش‌فرض: 30)
- `skip` (اختیاری): تعداد کاربران برای رد شدن (پیش‌فرض: 0)
- `select` (اختیاری): فیلدهای جدا شده با کاما برای شامل کردن

**پاسخ**:
```typescript
{
  users: User[];
  total: number;
  skip: number;
  limit: number;
}
```

**تایپ User**:
```typescript
interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: {
    color: string;
    type: string;
  };
  address: {
    address: string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    country: string;
  };
  // ... فیلدهای اضافی
}
```

**مثال**:
```typescript
// دریافت 10 کاربر اول
const response = await userService.getUsers({
  limit: 10,
  skip: 0
});

// دریافت فقط تعداد کل
const response = await userService.getUsers({
  limit: 0
});
```

### دریافت یک کاربر

**اندپوینت**: `GET /users/{id}`

**پاسخ**: یک شیء `User`

**مثال**:
```typescript
const user = await apiClient.get<User>('users/1');
```

## API محصولات

### دریافت تمام محصولات

**اندپوینت**: `GET /products`

**پارامترهای Query**:
- `limit` (اختیاری): تعداد محصولات برای بازگشت (پیش‌فرض: 30)
- `skip` (اختیاری): تعداد محصولات برای رد شدن (پیش‌فرض: 0)
- `select` (اختیاری): فیلدهای جدا شده با کاما برای شامل کردن

**پاسخ**:
```typescript
{
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
```

**تایپ Product**:
```typescript
interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Array<{
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }>;
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  images: string[];
  thumbnail: string;
}
```

**مثال**:
```typescript
// دریافت 12 محصول اول
const response = await productService.getProducts({
  limit: 12,
  skip: 0
});

// دریافت فقط تعداد کل
const response = await productService.getProducts({
  limit: 0
});
```

### دریافت یک محصول

**اندپوینت**: `GET /products/{id}`

**پاسخ**: یک شیء `Product`

**مثال**:
```typescript
const product = await apiClient.get<Product>('products/1');
```

### جستجوی محصولات

**اندپوینت**: `GET /products/search`

**پارامترهای Query**:
- `q`: عبارت جستجو

**مثال**:
```typescript
const results = await apiClient.get<ProductsResponse>('products/search', {
  q: 'phone'
});
```

### دریافت محصولات بر اساس دسته‌بندی

**اندپوینت**: `GET /products/category/{category}`

**مثال**:
```typescript
const products = await apiClient.get<ProductsResponse>(
  'products/category/smartphones'
);
```

## لایه سرویس

### سرویس احراز هویت

**مکان**: `shared/services/authService.ts`

```typescript
export const authService = {
  // ورود کاربر
  async login(credentials: LoginCredentials): Promise<LoginResponse>
  
  // خروج کاربر
  logout(): void
  
  // دریافت کاربر فعلی
  getCurrentUser(): User | null
  
  // بررسی احراز هویت کاربر
  isAuthenticated(): boolean
}
```

### سرویس کاربر

**مکان**: `shared/services/userService.ts`

```typescript
export const userService = {
  // دریافت کاربران با صفحه‌بندی
  async getUsers(params?: {
    limit?: number;
    skip?: number;
  }): Promise<UsersResponse>
}
```

### سرویس محصول

**مکان**: `shared/services/productService.ts`

```typescript
export const productService = {
  // دریافت محصولات با صفحه‌بندی
  async getProducts(params?: {
    limit?: number;
    skip?: number;
  }): Promise<ProductsResponse>
}
```

## صفحه‌بندی

### پیاده‌سازی

صفحه‌بندی با استفاده از پارامترهای جستجوی URL پیاده‌سازی شده است:

```typescript
// URL: /dashboard/users?page=2&limit=10

const page = Number(searchParams?.page) || 1;
const limit = Number(searchParams?.limit) || 10;
const skip = (page - 1) * limit;

const data = await userService.getUsers({ limit, skip });
```

### کامپوننت صفحه‌بندی

**مکان**: `shared/components/Pagination.tsx`

```typescript
<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  total={total}
  limit={limit}
  itemName="users"
/>
```

**ویژگی‌ها**:
- دکمه‌های قبلی/بعدی
- دکمه‌های شماره صفحه (حداکثر 5 قابل مشاهده)
- نمایش تعداد آیتم
- وضعیت‌های بارگذاری
- وضعیت‌های غیرفعال

## استراتژی کش

### کش سمت سرور

```typescript
// Revalidation سطح صفحه
export const revalidate = 30; // Revalidate هر 30 ثانیه

// کش سطح درخواست
await apiClient.get('users', params, {
  cache: 'no-store', // بدون کش
  // یا
  next: {
    revalidate: 60 // Revalidate بعد از 60 ثانیه
  }
});
```

### گزینه‌های کش

- `cache: 'force-cache'`: کش نامحدود (پیش‌فرض)
- `cache: 'no-store'`: بدون کش، همیشه تازه دریافت کن
- `next: { revalidate: number }`: Revalidate بعد از N ثانیه
- `next: { revalidate: false }`: کش نامحدود
- `next: { tags: ['tag'] }`: Revalidation مبتنی بر تگ

## مدیریت خطا

### کلاس خطای API

```typescript
class ApiError extends Error {
  constructor(public message: string, public status: number) {
    super(message);
    this.name = 'ApiError';
  }
}
```

### الگوی مدیریت خطا

```typescript
try {
  const data = await apiClient.get('endpoint');
  return data;
} catch (error) {
  if (error instanceof ApiError) {
    // مدیریت خطاهای API
    console.error('API Error:', error.message, error.status);
  } else {
    // مدیریت خطاهای دیگر
    console.error('Unexpected error:', error);
  }
  throw error;
}
```

## لاگ‌گذاری

### لاگ درخواست

تمام درخواست‌های API لاگ می‌شوند:

```typescript
console.log('[API Client] Request:', {
  endpoint,
  url,
  method,
  timestamp
});
```

### لاگ پاسخ

تمام پاسخ‌های API لاگ می‌شوند:

```typescript
console.log('[API Client] Response:', {
  endpoint,
  status,
  ok,
  timestamp
});
```

### لاگ داده

کلیدهای داده پاسخ لاگ می‌شوند:

```typescript
console.log('[API Client] Data received:', {
  endpoint,
  dataKeys: Object.keys(data),
  timestamp
});
```

## محدودیت نرخ

DummyJSON محدودیت نرخ ندارد، اما در تولید باید:

1. throttling درخواست را پیاده‌سازی کنید
2. منطق تلاش مجدد با backoff نمایی اضافه کنید
3. پاسخ‌ها را به طور مناسب کش کنید
4. از deduplication درخواست استفاده کنید

## بهترین شیوه‌ها

### 1. همیشه از سرویس‌ها استفاده کنید

```typescript
// ✅ خوب
const users = await userService.getUsers();

// ❌ بد
const users = await apiClient.get('users');
```

### 2. تمام پاسخ‌ها را تایپ کنید

```typescript
// ✅ خوب
const users = await apiClient.get<UsersResponse>('users');

// ❌ بد
const users = await apiClient.get('users');
```

### 3. خطاها را مدیریت کنید

```typescript
// ✅ خوب
try {
  const users = await userService.getUsers();
} catch (error) {
  console.error('Error:', error);
  // نمایش UI خطا
}

// ❌ بد
const users = await userService.getUsers(); // خطای مدیریت نشده
```

### 4. از کش مناسب استفاده کنید

```typescript
// ✅ خوب - داده تازه برای آمار داشبورد
await apiClient.get('users', params, {
  cache: 'no-store'
});

// ✅ خوب - داده کش شده برای محتوای استاتیک
await apiClient.get('categories', params, {
  next: { revalidate: 3600 }
});
```

### 5. وضعیت‌های بارگذاری را پیاده‌سازی کنید

```typescript
// ✅ خوب
const [loading, setLoading] = useState(true);
try {
  const data = await userService.getUsers();
} finally {
  setLoading(false);
}
```

## تست

### Mock کردن فراخوانی‌های API

```typescript
// Mock کردن کلاینت API
jest.mock('@/shared/lib/apiClient', () => ({
  apiClient: {
    get: jest.fn(),
    post: jest.fn()
  }
}));

// Mock کردن سرویس
jest.mock('@/shared/services/userService', () => ({
  userService: {
    getUsers: jest.fn()
  }
}));
```

### مثال تست

```typescript
it('should fetch users', async () => {
  const mockUsers = { users: [], total: 0 };
  (userService.getUsers as jest.Mock).mockResolvedValue(mockUsers);
  
  const result = await userService.getUsers();
  
  expect(result).toEqual(mockUsers);
  expect(userService.getUsers).toHaveBeenCalledTimes(1);
});
```

## منابع اضافی

- [مستندات DummyJSON](https://dummyjson.com/docs)
- [دریافت داده Next.js](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [کش Next.js](https://nextjs.org/docs/app/building-your-application/caching)

