import { http } from "./http";

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

export interface NewsArticle {
  _id?: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: string;
  publishDate: string;
  status: "draft" | "published" | "archived";
  createdAt?: string;
  updatedAt?: string;
}

export interface ImageUploadResponse {
  images: string[];
  _id: string;
}

// News API
export const newsApi = {
  // Get all news
  getAll: (params?: {
    page?: number;
    limit?: number;
    category?: string;
    status?: string;
  }) => {
    return http.get<ApiResponse<NewsArticle[]>>("/news", { params });
  },

  // Get single news by ID
  getById: (id: string) => {
    return http.get<ApiResponse<NewsArticle>>(`/news/${id}`);
  },

  // Create news
  create: (data: Omit<NewsArticle, "_id" | "createdAt" | "updatedAt">) => {
    return http.post<ApiResponse<NewsArticle>>("/news", data);
  },

  // Update news
  update: (id: string, data: Partial<NewsArticle>) => {
    return http.put<ApiResponse<NewsArticle>>(`/news/${id}`, data);
  },

  // Delete news
  delete: (id: string) => {
    return http.delete<ApiResponse>(`/news/${id}`);
  },
};

// Image Upload API
export const imageApi = {
  // Upload single image
  upload: (file: File, onProgress?: (progress: number) => void) => {
    const formData = new FormData();
    formData.append("image", file);

    return http.uploadFile<ApiResponse<ImageUploadResponse>>(
      "/image/upload",
      formData,
      onProgress
        ? (progressEvent: any) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            onProgress(progress);
          }
        : undefined
    );
  },

  // Upload multiple images
  uploadMultiple: (files: File[], onProgress?: (progress: number) => void) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("images", file);
    });

    return http.uploadFile<ApiResponse<ImageUploadResponse>>(
      "/image/upload-multiple",
      formData,
      onProgress
        ? (progressEvent: any) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            onProgress(progress);
          }
        : undefined
    );
  },

  // Upload by URL
  uploadByUrl: (imageUrl: string) => {
    return http.post<ApiResponse<ImageUploadResponse>>("/image/upload", {
      image: imageUrl,
    });
  },
};

// Auth API (example)
export const authApi = {
  login: (credentials: { email: string; password: string }) => {
    return http.post<ApiResponse<{ token: string; user: any }>>(
      "/auth/login",
      credentials
    );
  },

  logout: () => {
    http.removeAuthToken();
    return Promise.resolve();
  },

  register: (userData: { name: string; email: string; password: string }) => {
    return http.post<ApiResponse<{ token: string; user: any }>>(
      "/auth/register",
      userData
    );
  },

  getCurrentUser: () => {
    return http.get<ApiResponse<any>>("/auth/me");
  },
};

// Events API (example)
export interface Event {
  _id?: string;
  name: string;
  date: string;
  location: string;
  city: string;
  country: string;
  booth: string;
  website: string;
  logo?: string;
  isPast?: boolean;
}

export const eventsApi = {
  getAll: (params?: { isPast?: boolean }) => {
    return http.get<ApiResponse<Event[]>>("/events", { params });
  },

  getById: (id: string) => {
    return http.get<ApiResponse<Event>>(`/events/${id}`);
  },

  create: (data: Omit<Event, "_id">) => {
    return http.post<ApiResponse<Event>>("/events", data);
  },

  update: (id: string, data: Partial<Event>) => {
    return http.put<ApiResponse<Event>>(`/events/${id}`, data);
  },

  delete: (id: string) => {
    return http.delete<ApiResponse>(`/events/${id}`);
  },
};

// Products API (example)
export interface Product {
  _id?: string;
  name: string;
  category: string;
  description: string;
  price?: number;
  images: string[];
  specifications?: Record<string, any>;
}

export const productsApi = {
  getAll: (params?: { category?: string; page?: number; limit?: number }) => {
    return http.get<ApiResponse<Product[]>>("/products", { params });
  },

  getById: (id: string) => {
    return http.get<ApiResponse<Product>>(`/products/${id}`);
  },

  create: (data: Omit<Product, "_id">) => {
    return http.post<ApiResponse<Product>>("/products", data);
  },

  update: (id: string, data: Partial<Product>) => {
    return http.put<ApiResponse<Product>>(`/products/${id}`, data);
  },

  delete: (id: string) => {
    return http.delete<ApiResponse>(`/products/${id}`);
  },
};

// Blog API
export interface BlogSection {
  type: string;
  title: string;
  slug: string;
  content: string;
}

export interface Blog {
  _id?: string;
  title: string;
  slug: string;
  sections: BlogSection[];
  author: string;
  informationId?: string;
  image?: string;
  tags?: string[];
  status: "draft" | "published";
  createdAt?: string;
  updatedAt?: string;
}

export interface Information {
  _id: string;
  name: string;
  slug: string;
  parentId?: string | null;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const blogApi = {
  // Get all blogs
  getAll: (params?: {
    page?: number;
    limit?: number;
    status?: string;
    informationId?: string;
  }) => {
    return http.get<Blog[]>("/blog", { params });
  },

  // Get single blog by ID
  getById: (id: string) => {
    return http.get<Blog>(`/blog/${id}`);
  },

  // Get blog by slug
  getBySlug: (slug: string) => {
    return http.get<Blog>(`/blog/slug/${slug}`);
  },

  // Create blog
  create: (data: Omit<Blog, "_id" | "createdAt" | "updatedAt">) => {
    return http.post<Blog>("/blog", data);
  },

  // Update blog
  update: (id: string, data: Partial<Blog>) => {
    return http.put<Blog>(`/blog/${id}`, data);
  },

  // Delete blog
  delete: (id: string) => {
    return http.delete(`/blog/${id}`);
  },
};

// Information/Category API
export const informationApi = {
  // Get all categories
  getAll: () => {
    return http.get<Information[]>("/information");
  },

  // Get single category by ID
  getById: (id: string) => {
    return http.get<Information>(`/information/${id}`);
  },

  // Get categories by parent ID
  getByParentId: (parentId: string) => {
    return http.get<Information[]>(`/information/parent/${parentId}`);
  },

  // Create new category
  create: (data: Omit<Information, "_id" | "createdAt" | "updatedAt">) => {
    return http.post<Information>("/information", data);
  },

  // Update category
  update: (
    id: string,
    data: Partial<Omit<Information, "_id" | "createdAt" | "updatedAt">>
  ) => {
    return http.put<Information>(`/information/${id}`, data);
  },

  // Delete category
  delete: (id: string) => {
    return http.delete(`/information/${id}`);
  },
};
