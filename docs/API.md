# مستندات API

## معرفی

این سند لایه یکپارچه‌سازی API و نحوه تعامل با DummyJSON API و RAWG API را شرح می‌دهد.

## پیکربندی پایه

### متغیرهای محیطی

```env
# DummyJSON API
NEXT_PUBLIC_API_BASE_URL=https://dummyjson.com

# RAWG API (Games)
NEXT_PUBLIC_RAWG_API_KEY=your_rawg_api_key_here
```

### کلاینت‌های API

اپلیکیشن از دو کلاینت API استفاده می‌کند:

#### 1. کلاینت عمومی (DummyJSON)
**مکان**: `shared/lib/apiClient.ts`
- بر روی API بومی `fetch` ساخته شده
- پشتیبانی کش Next.js
- برای Users و Products

#### 2. کلاینت بازی‌ها (RAWG)
**مکان**: `shared/lib/gamesApi.ts`
- استفاده از `fetch` API
- مدیریت با React Query
- برای Games

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

## API بازی‌ها (RAWG)

### دریافت تمام بازی‌ها

**اندپوینت**: `GET https://api.rawg.io/api/games`

**پارامترهای Query**:
- `key` (اجباری): API Key
- `page` (اختیاری): شماره صفحه (پیش‌فرض: 1)
- `page_size` (اختیاری): تعداد بازی‌ها (پیش‌فرض: 20)
- `search` (اختیاری): عبارت جستجو
- `genres` (اختیاری): ID ژانر (مثال: 4 برای Action)
- `platforms` (اختیاری): ID پلتفرم (مثال: 4 برای PC)
- `ordering` (اختیاری): نوع مرتب‌سازی (مثال: -rating، -released)

**پاسخ**:
```typescript
{
  count: number;
  next: string | null;
  previous: string | null;
  results: Game[];
}
```

**تایپ Game**:
```typescript
interface Game {
  id: number;
  slug: string;
  name: string;
  released: string;
  background_image: string;
  rating: number;
  metacritic: number | null;
  playtime: number;
  platforms: Platform[];
  genres: Genre[];
}
```

**مثال با React Query**:
```typescript
// استفاده از hook
const { data, isLoading, error } = useGames({
  search: 'zelda',
  genres: '4',
  ordering: '-rating'
});

// یا مستقیماً از API client
const games = await gamesApi.fetchGames({
  page: 1,
  page_size: 20,
  search: 'zelda'
});
```

### دریافت جزئیات بازی

**اندپوینت**: `GET https://api.rawg.io/api/games/{id}`

**پاسخ**: یک شیء `GameDetails`

**تایپ GameDetails**:
```typescript
interface GameDetails extends Game {
  description_raw: string;
  description: string;
  website: string;
  developers: Developer[];
  publishers: Publisher[];
  esrb_rating: EsrbRating | null;
}
```

**مثال**:
```typescript
const { data: game } = useGameDetail(123);
```

### دریافت تصاویر بازی

**اندپوینت**: `GET https://api.rawg.io/api/games/{id}/screenshots`

**پاسخ**:
```typescript
{
  count: number;
  results: Screenshot[];
}
```

**مثال**:
```typescript
const { data: screenshots } = useGameScreenshots(123);
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

### سرویس بازی (React Query)

**مکان**: `shared/hooks/useGames.ts`

```typescript
// هوک‌های React Query
export function useGames(filters?: GameFilters) {
  return useQuery({
    queryKey: ['games', filters],
    queryFn: () => gamesApi.fetchGames(filters),
  });
}

export function useGameDetail(id: number) {
  return useQuery({
    queryKey: ['game', id],
    queryFn: () => gamesApi.fetchGameById(id),
    enabled: !!id,
  });
}

export function useGameScreenshots(id: number) {
  return useQuery({
    queryKey: ['game-screenshots', id],
    queryFn: () => gamesApi.fetchGameScreenshots(id),
    enabled: !!id,
  });
}
```

**API Client**: `shared/lib/gamesApi.ts`

```typescript
export const gamesApi = {
  async fetchGames(filters?: GameFilters): Promise<GamesResponse> {
    const params = new URLSearchParams({
      key: API_KEY,
      page: filters?.page?.toString() || '1',
      page_size: filters?.page_size?.toString() || '20',
    });
    
    if (filters?.search) params.append('search', filters.search);
    if (filters?.genres) params.append('genres', filters.genres);
    if (filters?.platforms) params.append('platforms', filters.platforms);
    if (filters?.ordering) params.append('ordering', filters.ordering);

    const response = await fetch(`${BASE_URL}/games?${params.toString()}`);
    return response.json();
  },
  
  async fetchGameById(id: number): Promise<GameDetails> { },
  async fetchGameScreenshots(id: number): Promise<ScreenshotsResponse> { }
};
```

## استراتژی کش

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

#### Server Components:
- `cache: 'force-cache'`: کش نامحدود (پیش‌فرض)
- `cache: 'no-store'`: بدون کش، همیشه تازه دریافت کن
- `next: { revalidate: number }`: Revalidate بعد از N ثانیه
- `next: { revalidate: false }`: کش نامحدود
- `next: { tags: ['tag'] }`: Revalidation مبتنی بر تگ

#### React Query:
- `staleTime`: مدت زمانی که داده fresh است
- `cacheTime`: مدت زمان نگهداری در cache
- `refetchOnWindowFocus`: refetch وقتی window focus می‌شود
- `refetchOnReconnect`: refetch وقتی اتصال برقرار می‌شود
- `refetchInterval`: refetch با interval مشخص

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

### 1. برای Server State از React Query استفاده کنید

```typescript
// ✅ خوب - برای داده‌های API
const { data, isLoading } = useGames();

// ❌ بد - استفاده از useState برای داده‌های API
const [games, setGames] = useState([]);
useEffect(() => {
  fetch('/api/games').then(r => r.json()).then(setGames);
}, []);
```

### 2. همیشه از سرویس‌ها یا hooks استفاده کنید

```typescript
// ✅ خوب - استفاده از hook
const { data } = useGames();

// ✅ خوب - استفاده از سرویس
const users = await userService.getUsers();

// ❌ بد - فراخوانی مستقیم
const users = await apiClient.get('users');
```

### 3. تمام پاسخ‌ها را تایپ کنید

```typescript
// ✅ خوب
const users = await apiClient.get<UsersResponse>('users');
const { data } = useGames(); // تایپ خودکار

// ❌ بد
const users = await apiClient.get('users');
```

### 4. خطاها را مدیریت کنید

```typescript
// ✅ خوب - با React Query
const { data, error, isLoading } = useGames();

if (error) return <Error message={error.message} />;
if (isLoading) return <Loading />;

// ✅ خوب - با try/catch
try {
  const users = await userService.getUsers();
} catch (error) {
  console.error('Error:', error);
}
```

### 5. از کش مناسب استفاده کنید

```typescript
// ✅ خوب - داده تازه برای آمار داشبورد
await apiClient.get('users', params, {
  cache: 'no-store'
});

// ✅ خوب - داده کش شده با React Query
const { data } = useGames(); // caching خودکار

// ✅ خوب - داده کش شده برای محتوای استاتیک
await apiClient.get('categories', params, {
  next: { revalidate: 3600 }
});
```

### 6. Loading states را پیاده‌سازی کنید

```typescript
// ✅ خوب - با React Query
const { data, isLoading } = useGames();
if (isLoading) return <Spinner />;

// ✅ خوب - با useState
const [loading, setLoading] = useState(true);
try {
  const data = await userService.getUsers();
} finally {
  setLoading(false);
}
```

## تست

### Mock کردن فراخوانی‌های API

#### Mock کردن کلاینت عمومی
```typescript
jest.mock('@/shared/lib/apiClient', () => ({
  apiClient: {
    get: jest.fn(),
    post: jest.fn()
  }
}));
```

#### Mock کردن React Query
```typescript
// Mock کردن hook
jest.mock('@/shared/hooks/useGames', () => ({
  useGames: jest.fn()
}));

// استفاده در تست
(useGames as jest.Mock).mockReturnValue({
  data: mockGames,
  isLoading: false,
  error: null
});
```

#### Mock کردن سرویس
```typescript
jest.mock('@/shared/services/userService', () => ({
  userService: {
    getUsers: jest.fn()
  }
}));
```

### مثال تست

#### تست Server Component
```typescript
it('should fetch users', async () => {
  const mockUsers = { users: [], total: 0 };
  (userService.getUsers as jest.Mock).mockResolvedValue(mockUsers);
  
  const result = await userService.getUsers();
  
  expect(result).toEqual(mockUsers);
  expect(userService.getUsers).toHaveBeenCalledTimes(1);
});
```

#### تست React Query Hook
```typescript
it('should fetch games with React Query', () => {
  const mockGames = { results: [], count: 0 };
  (useGames as jest.Mock).mockReturnValue({
    data: mockGames,
    isLoading: false,
    error: null
  });
  
  const { result } = renderHook(() => useGames());
  
  expect(result.current.data).toEqual(mockGames);
  expect(result.current.isLoading).toBe(false);
});
```

## منابع اضافی

- [مستندات DummyJSON](https://dummyjson.com/docs)
- [مستندات RAWG API](https://rawg.io/apidocs)
- [مستندات React Query](https://tanstack.com/query/latest)
- [دریافت داده Next.js](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [کش Next.js](https://nextjs.org/docs/app/building-your-application/caching)

