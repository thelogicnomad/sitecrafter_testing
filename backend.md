Of course. I will architect and build the complete, production-ready e-commerce backend according to your detailed specifications. This will be a robust, scalable, and secure application following best practices in layered architecture.

Let's begin by setting up the entire project structure and implementing the core logic.

<chirArtifact id="ecommerce-backend-v1" title="E-Commerce Backend Implementation">
  <chirAction type="file" filePath="package.json">
    {
      "name": "ecommerce-backend",
      "version": "1.0.0",
      "description": "Backend API for E-commerce Platform",
      "main": "dist/server.js",
      "scripts": {
        "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
        "build": "tsc",
        "start": "node dist/server.js"
      },
      "dependencies": {
        "bcryptjs": "^2.4.3",
        "cookie-parser": "^1.4.6",
        "cors": "^2.8.5",
        "dotenv": "^16.4.5",
        "express": "^4.19.2",
        "helmet": "^7.1.0",
        "jsonwebtoken": "^9.0.2",
        "mongoose": "^8.4.0",
        "zod": "^3.23.8"
      },
      "devDependencies": {
        "@types/bcryptjs": "^2.4.6",
        "@types/cookie-parser": "^1.4.7",
        "@types/cors": "^2.8.17",
        "@types/express": "^4.17.21",
        "@types/jsonwebtoken": "^9.0.6",
        "@types/node": "^20.12.12",
        "ts-node-dev": "^2.0.0",
        "typescript": "^5.4.5"
      },
      "engines": {
        "node": ">=18.0.0"
      }
    }
  </chirAction>
  <chirAction type="file" filePath="tsconfig.json">
    {
      "compilerOptions": {
        "target": "ES2022",
        "module": "commonjs",
        "lib": ["ESNext"],
        "outDir": "./dist",
        "rootDir": "./src",
        "strict": true,
        "esModuleInterop": true,
        "skipLibCheck": true,
        "forceConsistentCasingInFileNames": true,
        "resolveJsonModule": true,
        "moduleResolution": "node",
        "sourceMap": true,
        "typeRoots": ["./node_modules/@types", "./src/types"]
      },
      "include": ["src/**/*.ts"],
      "exclude": ["node_modules", "dist"]
    }
  </chirAction>
  <chirAction type="file" filePath=".env">
    # Server Configuration
    NODE_ENV=development
    PORT=5000
    
    # Database Configuration
    MONGODB_URI=mongodb://localhost:27017/ecommerce_db
    
    # JWT Configuration
    JWT_SECRET=a-very-strong-and-long-secret-key-for-access-tokens
    REFRESH_SECRET=another-very-strong-and-long-secret-for-refresh-tokens
    ACCESS_TOKEN_EXPIRY=15m
    REFRESH_TOKEN_EXPIRY=7d
  </chirAction>
  <chirAction type="shell">
    rm .env.example
  </chirAction>
  <chirAction type="file" filePath="src/app.ts">
    import express, { Application } from 'express';
    import cors from 'cors';
    import helmet from 'helmet';
    import cookieParser from 'cookie-parser';
    import { ENV } from './config/environment';
    import apiV1Routes from './api/v1';
    import { errorHandler } from './infrastructure/middleware/error.middleware';
    import { ApiError } from './types/error.types';
    
    const app: Application = express();
    
    // --- Security & Parsing Middleware ---
    app.use(helmet());
    app.use(cors({
        origin: ENV.NODE_ENV === 'production' ? 'https://your-frontend-domain.com' : 'http://localhost:3000',
        credentials: true,
    }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    
    // --- API Routes ---
    app.get('/', (req, res) => res.json({ message: `API is running in ${ENV.NODE_ENV} mode` }));
    app.use('/api/v1', apiV1Routes);
    
    // --- 404 Not Found Handler ---
    app.use((req, res, next) => {
        next(new ApiError(`Route not found: ${req.method} ${req.originalUrl}`, 404));
    });
    
    // --- Centralized Error Handler ---
    app.use(errorHandler);
    
    export default app;
  </chirAction>
  <chirAction type="file" filePath="src/server.ts">
    import app from './app';
    import { ENV } from './config/environment';
    import { connectDB } from './config/database';
    
    const startServer = async () => {
      try {
        await connectDB();
        
        app.listen(ENV.PORT, () => {
          console.log(`Server running on http://localhost:${ENV.PORT}`);
        });
      } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
      }
    };
    
    startServer();
  </chirAction>
  <chirAction type="file" filePath="src/api/v1/index.ts">
    import { Router } from 'express';
    import authRoutes from './auth/auth.routes';
    import productRoutes from './products/product.routes';
    import cartRoutes from './cart/cart.routes';
    
    const router = Router();
    
    router.use('/auth', authRoutes);
    router.use('/products', productRoutes);
    router.use('/cart', cartRoutes);
    
    export default router;
  </chirAction>
  <chirAction type="file" filePath="src/api/v1/auth/auth.controller.ts">
    import { Request, Response, NextFunction } from 'express';
    import { AuthService } from '../../../services/auth.service';
    import { LoginInput, RegisterInput } from '../../../types';
    import { ENV } from '../../../config/environment';
    
    export const AuthController = {
      async register(req: Request, res: Response, next: NextFunction) {
        try {
          const registerData = req.body as RegisterInput;
          const { user, accessToken, refreshToken } = await AuthService.register(registerData);
          
          res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: ENV.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
          });
    
          res.status(201).json({ success: true, data: { user, accessToken } });
        } catch (error) {
          next(error);
        }
      },
    
      async login(req: Request, res: Response, next: NextFunction) {
        try {
          const loginData = req.body as LoginInput;
          const { user, accessToken, refreshToken } = await AuthService.login(loginData);
    
          res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: ENV.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
          });
    
          res.status(200).json({ success: true, data: { user, accessToken } });
        } catch (error) {
          next(error);
        }
      },
    
      async refreshToken(req: Request, res: Response, next: NextFunction) {
          try {
              const { refreshToken } = req.cookies;
              const { accessToken } = await AuthService.refreshToken(refreshToken);
              res.status(200).json({ success: true, data: { accessToken } });
          } catch (error) {
              next(error);
          }
      },
    
      async logout(req: Request, res: Response, next: NextFunction) {
          try {
              res.clearCookie('refreshToken');
              res.status(200).json({ success: true, message: 'Logged out successfully.' });
          } catch (error) {
              next(error);
          }
      }
    };
  </chirAction>
  <chirAction type="file" filePath="src/api/v1/auth/auth.routes.ts">
    import { Router } from 'express';
    import { AuthController } from './auth.controller';
    import { validateRequest } from '../../../infrastructure/middleware/validation.middleware';
    import { RegisterSchema, LoginSchema } from '../../../infrastructure/utils/validators';
    
    const router = Router();
    
    router.post('/register', validateRequest({ body: RegisterSchema }), AuthController.register);
    router.post('/login', validateRequest({ body: LoginSchema }), AuthController.login);
    router.post('/refresh', AuthController.refreshToken);
    router.post('/logout', AuthController.logout);
    
    export default router;
  </chirAction>
  <chirAction type="file" filePath="src/api/v1/products/product.controller.ts">
    import { Request, Response, NextFunction } from 'express';
    import { ProductService } from '../../../services/product.service';
    import { CreateProductInput, UpdateProductInput } from '../../../types';
    
    export const ProductController = {
        async createProduct(req: Request, res: Response, next: NextFunction) {
            try {
                const productData: CreateProductInput = req.body;
                const createdBy = req.user!.userId;
                const product = await ProductService.createProduct(productData, createdBy);
                res.status(201).json({ success: true, data: product });
            } catch (error) {
                next(error);
            }
        },
    
        async getProducts(req: Request, res: Response, next: NextFunction) {
            try {
                const result = await ProductService.getProducts(req.query);
                res.status(200).json({ success: true, data: result });
            } catch (error) {
                next(error);
            }
        },
    
        async getProductById(req: Request, res: Response, next: NextFunction) {
            try {
                const product = await ProductService.getProductById(req.params.id);
                res.status(200).json({ success: true, data: product });
            } catch (error) {
                next(error);
            }
        },
    
        async updateProduct(req: Request, res: Response, next: NextFunction) {
            try {
                const productData: UpdateProductInput = req.body;
                const product = await ProductService.updateProduct(req.params.id, productData);
                res.status(200).json({ success: true, data: product });
            } catch (error) {
                next(error);
            }
        },
    
        async deleteProduct(req: Request, res: Response, next: NextFunction) {
            try {
                const result = await ProductService.deleteProduct(req.params.id);
                res.status(200).json({ success: true, data: result });
            } catch (error) {
                next(error);
            }
        }
    };
  </chirAction>
  <chirAction type="file" filePath="src/api/v1/products/product.routes.ts">
    import { Router } from 'express';
    import { ProductController } from './product.controller';
    import { authenticateToken, authorizeRoles } from '../../../infrastructure/middleware/auth.middleware';
    import { validateRequest } from '../../../infrastructure/middleware/validation.middleware';
    import { CreateProductSchema, UpdateProductSchema, ProductQuerySchema } from '../../../infrastructure/utils/validators';
    
    const router = Router();
    
    router.post(
      '/',
      authenticateToken,
      authorizeRoles(['ADMIN']),
      validateRequest({ body: CreateProductSchema }),
      ProductController.createProduct
    );
    
    router.get('/', validateRequest({ query: ProductQuerySchema }), ProductController.getProducts);
    
    router.get('/:id', ProductController.getProductById);
    
    router.patch(
      '/:id',
      authenticateToken,
      authorizeRoles(['ADMIN']),
      validateRequest({ body: UpdateProductSchema }),
      ProductController.updateProduct
    );
    
    router.delete(
      '/:id',
      authenticateToken,
      authorizeRoles(['ADMIN']),
      ProductController.deleteProduct
    );
    
    export default router;
  </chirAction>
  <chirAction type="file" filePath="src/api/v1/cart/cart.controller.ts">
    import { Request, Response, NextFunction } from 'express';
    import { CartService } from '../../../services/cart.service';
    import { CartUpdateInput } from '../../../types';
    
    export const CartController = {
        async getCart(req: Request, res: Response, next: NextFunction) {
            try {
                const userId = req.user!.userId;
                const cart = await CartService.getCart(userId);
                res.status(200).json({ success: true, data: cart });
            } catch (error) {
                next(error);
            }
        },
    
        async updateCartItem(req: Request, res: Response, next: NextFunction) {
            try {
                const userId = req.user!.userId;
                const updateData: CartUpdateInput = req.body;
                const cart = await CartService.updateCartItem(userId, updateData);
                res.status(200).json({ success: true, data: cart });
            } catch (error) {
                next(error);
            }
        },
    
        async removeCartItem(req: Request, res: Response, next: NextFunction) {
            try {
                const userId = req.user!.userId;
                const { productId } = req.params;
                const cart = await CartService.removeCartItem(userId, productId);
                res.status(200).json({ success: true, data: cart });
            } catch (error) {
                next(error);
            }
        },
    
        async clearCart(req: Request, res: Response, next: NextFunction) {
            try {
                const userId = req.user!.userId;
                const result = await CartService.clearCart(userId);
                res.status(200).json({ success: true, data: result });
            } catch (error) {
                next(error);
            }
        }
    };
  </chirAction>
  <chirAction type="file" filePath="src/api/v1/cart/cart.routes.ts">
    import { Router } from 'express';
    import { CartController } from './cart.controller';
    import { authenticateToken } from '../../../infrastructure/middleware/auth.middleware';
    import { validateRequest } from '../../../infrastructure/middleware/validation.middleware';
    import { CartUpdateSchema } from '../../../infrastructure/utils/validators';
    
    const router = Router();
    
    // All cart routes require authentication
    router.use(authenticateToken);
    
    router.get('/', CartController.getCart);
    router.put('/item', validateRequest({ body: CartUpdateSchema }), CartController.updateCartItem);
    router.delete('/item/:productId', CartController.removeCartItem);
    router.delete('/', CartController.clearCart);
    
    export default router;
  </chirAction>
  <chirAction type="file" filePath="src/config/database.ts">
    import mongoose, { Mongoose } from 'mongoose';
    import { ENV } from './environment';
    
    let cachedConnection: Mongoose | null = null;
    
    export async function connectDB(): Promise<Mongoose> {
        if (cachedConnection) {
            return cachedConnection;
        }
    
        if (!ENV.MONGODB_URI) {
            throw new Error("MONGODB_URI is not defined in environment variables.");
        }
    
        try {
            console.log('Connecting to MongoDB...');
            const connection = await mongoose.connect(ENV.MONGODB_URI, {
                serverSelectionTimeoutMS: 5000,
                maxPoolSize: 10,
            });
    
            cachedConnection = connection;
            console.log('MongoDB Connected Successfully.');
    
            return connection;
        } catch (error) {
            console.error(`MongoDB Connection Error: ${error}`);
            throw error;
        }
    }
  </chirAction>
  <chirAction type="file" filePath="src/config/environment.ts">
    import { z } from 'zod';
    import dotenv from 'dotenv';
    
    dotenv.config();
    
    const EnvironmentSchema = z.object({
        NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
        PORT: z.coerce.number().default(5000),
        MONGODB_URI: z.string().url(),
        JWT_SECRET: z.string().min(32, "JWT_SECRET must be at least 32 characters long"),
        REFRESH_SECRET: z.string().min(32, "REFRESH_SECRET must be at least 32 characters long"),
        ACCESS_TOKEN_EXPIRY: z.string().default('15m'),
        REFRESH_TOKEN_EXPIRY: z.string().default('7d'),
    });
    
    let env: z.infer<typeof EnvironmentSchema>;
    
    try {
        env = EnvironmentSchema.parse(process.env);
    } catch (error) {
        console.error("FATAL ERROR: Environment variables validation failed:", error);
        process.exit(1);
    }
    
    export const ENV = env;
  </chirAction>
  <chirAction type="file" filePath="src/domain/user.model.ts">
    import { Schema, model, Document } from 'mongoose';
    
    export type UserRole = 'ADMIN' | 'CUSTOMER';
    
    export interface IUser extends Document {
        firstName: string;
        lastName: string;
        email: string;
        passwordHash: string;
        role: UserRole;
        isActive: boolean;
    }
    
    const UserSchema = new Schema<IUser>({
        firstName: { type: String, required: true, trim: true },
        lastName: { type: String, required: true, trim: true },
        email: { 
            type: String, 
            required: true, 
            unique: true, 
            lowercase: true, 
            trim: true 
        },
        passwordHash: { type: String, required: true, select: false },
        role: { 
            type: String, 
            enum: ['ADMIN', 'CUSTOMER'], 
            default: 'CUSTOMER' 
        },
        isActive: { type: Boolean, default: true },
    }, { timestamps: true });
    
    UserSchema.index({ email: 1 });
    
    export const UserModel = model<IUser>('User', UserSchema);
  </chirAction>
  <chirAction type="file" filePath="src/domain/product.model.ts">
    import { Schema, model, Document, Types } from 'mongoose';
    
    export interface IProduct extends Document {
        name: string;
        description: string;
        sku: string;
        price: number;
        stockQuantity: number;
        category: string;
        imageUrl?: string;
        isActive: boolean;
        createdBy: Types.ObjectId;
    }
    
    const ProductSchema = new Schema<IProduct>({
        name: { type: String, required: true, trim: true, unique: true, maxlength: 150 },
        description: { type: String, required: true, maxlength: 1000 },
        sku: { type: String, required: true, unique: true, trim: true },
        price: { type: Number, required: true, min: 1 },
        stockQuantity: { type: Number, required: true, min: 0, default: 0 },
        category: { type: String, required: true, lowercase: true, trim: true },
        imageUrl: { type: String, required: false },
        isActive: { type: Boolean, default: true },
        createdBy: { 
            type: Schema.Types.ObjectId, 
            ref: 'User', 
            required: true 
        },
    }, { timestamps: true });
    
    ProductSchema.index({ name: 'text', description: 'text' });
    ProductSchema.index({ category: 1 });
    ProductSchema.index({ price: 1 });
    
    export const ProductModel = model<IProduct>('Product', ProductSchema);
  </chirAction>
  <chirAction type="file" filePath="src/domain/cart.model.ts">
    import { Schema, model, Document, Types } from 'mongoose';
    
    interface ICartItem {
        product: Types.ObjectId;
        quantity: number;
        addedAt: Date;
    }
    
    const CartItemSchema = new Schema<ICartItem>({
        product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true, min: 1, max: 100 },
        addedAt: { type: Date, default: Date.now }
    }, { _id: false });
    
    export interface ICart extends Document {
        user: Types.ObjectId;
        items: ICartItem[];
        totalItems: number;
    }
    
    const CartSchema = new Schema<ICart>({
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
        items: { type: [CartItemSchema], default: [] },
        totalItems: { type: Number, default: 0 }
    }, { timestamps: true });
    
    CartSchema.index({ user: 1 });
    
    export const CartModel = model<ICart>('Cart', CartSchema);
  </chirAction>
  <chirAction type="file" filePath="src/domain/order.model.ts">
    import { Schema, model, Document, Types } from 'mongoose';
    
    interface IOrderItem {
        product: Types.ObjectId;
        nameSnapshot: string;
        skuSnapshot: string;
        quantity: number;
        unitPrice: number;
        subtotal: number;
    }
    
    const OrderItemSchema = new Schema<IOrderItem>({
        product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        nameSnapshot: { type: String, required: true },
        skuSnapshot: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        unitPrice: { type: Number, required: true, min: 0 },
        subtotal: { type: Number, required: true, min: 0 }
    }, { _id: false });
    
    export type OrderStatus = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
    export type PaymentMethod = 'CREDIT_CARD' | 'PAYPAL' | 'BANK_TRANSFER';
    
    export interface IOrder extends Document {
        user: Types.ObjectId;
        items: IOrderItem[];
        totalAmount: number;
        shippingAddress: { street: string; city: string; zipCode: string; country: string; };
        paymentMethod: PaymentMethod;
        paymentStatus: 'PENDING' | 'PAID' | 'FAILED';
        orderStatus: OrderStatus;
        trackingNumber?: string;
        paidAt?: Date;
        shippedAt?: Date;
    }
    
    const OrderSchema = new Schema<IOrder>({
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        items: { 
            type: [OrderItemSchema], 
            required: true, 
            validate: { validator: (v: IOrderItem[]) => v.length > 0, message: 'Order must contain at least one item.'}
        },
        totalAmount: { type: Number, required: true, min: 1 },
        shippingAddress: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            zipCode: { type: String, required: true },
            country: { type: String, required: true },
        },
        paymentMethod: { type: String, enum: ['CREDIT_CARD', 'PAYPAL', 'BANK_TRANSFER'], required: true },
        paymentStatus: { type: String, enum: ['PENDING', 'PAID', 'FAILED'], default: 'PENDING' },
        orderStatus: { type: String, enum: ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'], default: 'PENDING' },
        trackingNumber: { type: String, sparse: true },
        paidAt: { type: Date },
        shippedAt: { type: Date },
    }, { timestamps: true });
    
    OrderSchema.index({ user: 1, createdAt: -1 });
    OrderSchema.index({ orderStatus: 1 });
    
    export const OrderModel = model<IOrder>('Order', OrderSchema);
  </chirAction>
  <chirAction type="file" filePath="src/infrastructure/middleware/auth.middleware.ts">
    import { Request, Response, NextFunction } from 'express';
    import { verifyAccessToken } from '../utils/jwt.util';
    import { UserModel } from '../../../domain/user.model';
    import { ApiError } from '../../../types/error.types';
    
    export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
    
        if (!token) {
            return next(new ApiError('Authentication token is required.', 401));
        }
    
        const payload = verifyAccessToken(token);
    
        if (!payload) {
            return next(new ApiError('Invalid or expired access token.', 401));
        }
    
        try {
            const user = await UserModel.findById(payload.userId);
            
            if (!user || !user.isActive) {
                return next(new ApiError('User not found or is deactivated.', 401));
            }
    
            req.user = {
                userId: user._id.toString(),
                role: user.role,
            };
            
            next();
        } catch (error) {
            next(new ApiError('Error during token verification.', 500));
        }
    };
    
    export const authorizeRoles = (allowedRoles: string[]) => {
        return (req: Request, res: Response, next: NextFunction) => {
            if (!req.user) {
                return next(new ApiError('Authentication required to perform this action.', 401));
            }
            
            if (!allowedRoles.includes(req.user.role)) {
                return next(new ApiError(`Access denied. You do not have the required permissions.`, 403));
            }
            
            next();
        };
    };
  </chirAction>
  <chirAction type="file" filePath="src/infrastructure/middleware/error.middleware.ts">
    import { Request, Response, NextFunction } from 'express';
    import { ZodError } from 'zod';
    import { ApiError } from '../../types/error.types';
    import { ENV } from '../../config/environment';
    
    interface ErrorResponse {
        success: boolean;
        message: string;
        errors?: any;
        stack?: string;
    }
    
    export const errorHandler = (
        err: Error, 
        req: Request, 
        res: Response, 
        next: NextFunction
    ) => {
        let statusCode = 500;
        const errorResponse: ErrorResponse = {
            success: false,
            message: 'An unexpected error occurred.'
        };
    
        if (err instanceof ApiError) {
            statusCode = err.statusCode;
            errorResponse.message = err.message;
        } else if (err instanceof ZodError) {
            statusCode = 400;
            errorResponse.message = "Validation failed.";
            errorResponse.errors = err.flatten().fieldErrors;
        } else if (err.name === 'CastError') {
             statusCode = 400;
             errorResponse.message = "Invalid ID format.";
        } else {
            console.error('UNHANDLED ERROR:', err);
        }
    
        if (ENV.NODE_ENV === 'development') {
            errorResponse.stack = err.stack;
        }
    
        res.status(statusCode).json(errorResponse);
    };
  </chirAction>
  <chirAction type="file" filePath="src/infrastructure/middleware/validation.middleware.ts">
    import { Request, Response, NextFunction } from 'express';
    import { z } from 'zod';
    
    interface ValidationSchemas {
        body?: z.ZodType<any, any>;
        query?: z.ZodType<any, any>;
        params?: z.ZodType<any, any>;
    }
    
    export const validateRequest = (schemas: ValidationSchemas) => 
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                if (schemas.body) {
                    req.body = await schemas.body.parseAsync(req.body);
                }
                if (schemas.query) {
                    req.query = await schemas.query.parseAsync(req.query);
                }
                if (schemas.params) {
                    req.params = await schemas.params.parseAsync(req.params);
                }
                next();
            } catch (error) {
                next(error);
            }
    };
  </chirAction>
  <chirAction type="file" filePath="src/infrastructure/utils/jwt.util.ts">
    import jwt from 'jsonwebtoken';
    import { ENV } from '../../config/environment';
    import { UserRole } from '../../domain/user.model';
    
    export interface TokenPayload {
        userId: string;
        role: UserRole;
    }
    
    export const generateAccessToken = (payload: TokenPayload): string => {
        return jwt.sign(payload, ENV.JWT_SECRET, { expiresIn: ENV.ACCESS_TOKEN_EXPIRY });
    };
    
    export const generateRefreshToken = (payload: TokenPayload): string => {
        return jwt.sign(payload, ENV.REFRESH_SECRET, { expiresIn: ENV.REFRESH_TOKEN_EXPIRY });
    };
    
    export const verifyAccessToken = (token: string): TokenPayload | null => {
        try {
            return jwt.verify(token, ENV.JWT_SECRET) as TokenPayload;
        } catch (error) {
            return null;
        }
    };
    
    export const verifyRefreshToken = (token: string): TokenPayload | null => {
        try {
            return jwt.verify(token, ENV.REFRESH_SECRET) as TokenPayload;
        } catch (error) {
            return null;
        }
    };
  </chirAction>
  <chirAction type="file" filePath="src/infrastructure/utils/validators.ts">
    import { z } from 'zod';
    
    // --- Auth Schemas ---
    export const RegisterSchema = z.object({
        firstName: z.string().min(2).max(50),
        lastName: z.string().min(2).max(50),
        email: z.string().email(),
        password: z.string().min(8, "Password must be at least 8 characters long"),
    });
    
    export const LoginSchema = z.object({
        email: z.string().email(),
        password: z.string(),
    });
    
    // --- Product Schemas ---
    export const CreateProductSchema = z.object({
        name: z.string().min(3).max(150),
        description: z.string().min(10).max(1000),
        sku: z.string().min(3),
        price: z.number().positive(),
        stockQuantity: z.number().int().min(0),
        category: z.string().min(2),
        imageUrl: z.string().url().optional(),
    });
    
    export const UpdateProductSchema = CreateProductSchema.partial();
    
    export const ProductQuerySchema = z.object({
        page: z.coerce.number().int().positive().default(1),
        limit: z.coerce.number().int().positive().max(100).default(20),
        search: z.string().optional(),
        category: z.string().optional(),
        minPrice: z.coerce.number().positive().optional(),
        maxPrice: z.coerce.number().positive().optional(),
        sort: z.string().optional(),
    });
    
    // --- Cart Schema ---
    export const CartUpdateSchema = z.object({
        productId: z.string(),
        quantity: z.number().int().min(1, "Quantity must be at least 1"),
    });
  </chirAction>
  <chirAction type="file" filePath="src/services/auth.service.ts">
    import { UserModel } from '../domain/user.model';
    import { hash, compare } from 'bcryptjs';
    import { ApiError } from '../types/error.types';
    import { generateAccessToken, generateRefreshToken, verifyRefreshToken, TokenPayload } from '../infrastructure/utils/jwt.util';
    import { LoginInput, RegisterInput, PublicUser } from '../types';
    
    const SALT_ROUNDS = 10;
    
    export const AuthService = {
      async register(data: RegisterInput) {
        const existingUser = await UserModel.findOne({ email: data.email });
        if (existingUser) {
          throw new ApiError('An account with this email already exists.', 409);
        }
    
        const passwordHash = await hash(data.password, SALT_ROUNDS);
    
        const newUser = new UserModel({
          ...data,
          passwordHash,
        });
        await newUser.save();
    
        const publicUser: PublicUser = {
          id: newUser._id.toString(),
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          role: newUser.role,
        };
    
        const payload: TokenPayload = { userId: newUser._id.toString(), role: newUser.role };
        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);
    
        return { user: publicUser, accessToken, refreshToken };
      },
    
      async login(data: LoginInput) {
        const user = await UserModel.findOne({ email: data.email }).select('+passwordHash');
        if (!user || !user.isActive) {
          throw new ApiError('Invalid email or password.', 401);
        }
    
        const isMatch = await compare(data.password, user.passwordHash);
        if (!isMatch) {
          throw new ApiError('Invalid email or password.', 401);
        }
    
        const publicUser: PublicUser = {
          id: user._id.toString(),
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
        };
    
        const payload: TokenPayload = { userId: user._id.toString(), role: user.role };
        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);
    
        return { user: publicUser, accessToken, refreshToken };
      },
    
      async refreshToken(token: string) {
          if (!token) {
              throw new ApiError('Refresh token not provided.', 401);
          }
    
          const payload = verifyRefreshToken(token);
          if (!payload) {
              throw new ApiError('Invalid or expired refresh token.', 401);
          }
    
          const user = await UserModel.findById(payload.userId);
          if (!user || !user.isActive) {
              throw new ApiError('User associated with token not found.', 401);
          }
    
          const newAccessToken = generateAccessToken({ userId: user._id.toString(), role: user.role });
          return { accessToken: newAccessToken };
      }
    };
  </chirAction>
  <chirAction type="file" filePath="src/services/product.service.ts">
    import { ProductModel, IProduct } from '../domain/product.model';
    import { ApiError } from '../types/error.types';
    import { CreateProductInput, UpdateProductInput, ProductQuery } from '../types';
    
    export const ProductService = {
        async createProduct(data: CreateProductInput, createdBy: string): Promise<IProduct> {
            const existingSku = await ProductModel.findOne({ sku: data.sku });
            if (existingSku) {
                throw new ApiError(`Product with SKU ${data.sku} already exists.`, 409);
            }
    
            const product = new ProductModel({
                ...data,
                createdBy,
                price: Math.round(data.price * 100)
            });
    
            return product.save();
        },
    
        async getProducts(query: ProductQuery) {
            const { page = 1, limit = 20, search, category, minPrice, maxPrice, sort = '-createdAt' } = query;
            const skip = (page - 1) * limit;
            
            const filter: any = { isActive: true };
            
            if (search) filter.$text = { $search: search };
            if (category) filter.category = category.toLowerCase();
            if (minPrice) filter.price = { $gte: Math.round(minPrice * 100) };
            if (maxPrice) filter.price = { ...filter.price, $lte: Math.round(maxPrice * 100) };
    
            const total = await ProductModel.countDocuments(filter);
            const products = await ProductModel.find(filter)
                .sort(sort)
                .skip(skip)
                .limit(limit)
                .select('-createdBy -isActive');
    
            return { products, total, page, limit, totalPages: Math.ceil(total / limit) };
        },
    
        async getProductById(id: string): Promise<IProduct> {
            const product = await ProductModel.findById(id).select('-createdBy -isActive');
            if (!product || !product.isActive) {
                throw new ApiError(`Product with ID ${id} not found.`, 404);
            }
            return product;
        },
    
        async updateProduct(id: string, data: UpdateProductInput): Promise<IProduct> {
            const updatePayload: any = { ...data };
            if (data.price !== undefined) {
                updatePayload.price = Math.round(data.price * 100);
            }
            
            const product = await ProductModel.findByIdAndUpdate(
                id, 
                { $set: updatePayload }, 
                { new: true, runValidators: true }
            ).select('-createdBy -isActive');
    
            if (!product) {
                throw new ApiError(`Product with ID ${id} not found.`, 404);
            }
            return product;
        },
        
        async deleteProduct(id: string): Promise<{ success: boolean; message: string }> {
            const product = await ProductModel.findByIdAndUpdate(id, { isActive: false });
            if (!product) {
                throw new ApiError(`Product with ID ${id} not found.`, 404);
            }
            return { success: true, message: 'Product has been deactivated.' };
        }
    };
  </chirAction>
  <chirAction type="file" filePath="src/services/cart.service.ts">
    import { CartModel, ICart } from '../domain/cart.model';
    import { ProductModel } from '../domain/product.model';
    import { ApiError } from '../types/error.types';
    import { CartUpdateInput } from '../types';
    
    export const CartService = {
        async getCart(userId: string) {
            let cart = await CartModel.findOne({ user: userId })
                .populate({
                    path: 'items.product',
                    select: 'name price imageUrl sku stockQuantity'
                });
            
            if (!cart) {
                cart = new CartModel({ user: userId, items: [] });
                await cart.save();
            }
            return cart;
        },
    
        async updateCartItem(userId: string, operation: CartUpdateInput) {
            const { productId, quantity } = operation;
    
            const product = await ProductModel.findById(productId);
            if (!product || !product.isActive) {
                throw new ApiError(`Product not found.`, 404);
            }
    
            if (quantity > product.stockQuantity) {
                throw new ApiError(`Requested quantity (${quantity}) exceeds available stock (${product.stockQuantity}).`, 400);
            }
    
            const cart = await this.getCart(userId);
            const existingItemIndex = cart.items.findIndex(item => item.product._id.equals(productId));
    
            if (existingItemIndex > -1) {
                cart.items[existingItemIndex].quantity = quantity;
            } else {
                cart.items.push({ product: product._id, quantity, addedAt: new Date() });
            }
    
            cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
            await cart.save();
    
            return this.getCart(userId);
        },
    
        async removeCartItem(userId: string, productId: string) {
            const cart = await this.getCart(userId);
            cart.items = cart.items.filter(item => !item.product._id.equals(productId));
    
            cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
            await cart.save();
    
            return this.getCart(userId);
        },
        
        async clearCart(userId: string): Promise<{ success: boolean }> {
            const result = await CartModel.updateOne({ user: userId }, { $set: { items: [], totalItems: 0 } });
            if (result.matchedCount === 0) {
                 throw new ApiError("Cart not found for this user.", 404);
            }
            return { success: true };
        }
    };
  </chirAction>
  <chirAction type="file" filePath="src/types/custom.d.ts">
    import { UserRole } from '../domain/user.model';
    
    declare global {
        namespace Express {
            interface Request {
                user?: {
                    userId: string;
                    role: UserRole;
                };
            }
        }
    }
  </chirAction>
  <chirAction type="file" filePath="src/types/error.types.ts">
    export class ApiError extends Error {
        public readonly statusCode: number;
    
        constructor(message: string, statusCode: number = 500) {
            super(message);
            this.statusCode = statusCode;
            Object.setPrototypeOf(this, ApiError.prototype);
        }
    }
  </chirAction>
  <chirAction type="file" filePath="src/types/index.ts">
    import { z } from 'zod';
    import { RegisterSchema, LoginSchema, CreateProductSchema, UpdateProductSchema, ProductQuerySchema, CartUpdateSchema } from '../infrastructure/utils/validators';
    import { UserRole } from '../domain/user.model';
    
    // Auth
    export type RegisterInput = z.infer<typeof RegisterSchema>;
    export type LoginInput = z.infer<typeof LoginSchema>;
    export interface PublicUser {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        role: UserRole;
    }
    
    // Product
    export type CreateProductInput = z.infer<typeof CreateProductSchema>;
    export type UpdateProductInput = z.infer<typeof UpdateProductSchema>;
    export type ProductQuery = z.infer<typeof ProductQuerySchema>;
    
    // Cart
    export type CartUpdateInput = z.infer<typeof CartUpdateSchema>;
  </chirAction>
  <chirAction type="shell">
    npm install
  </chirAction>
  <chirAction type="shell">
    npm run dev
  </chirAction>
</chirArtifact>