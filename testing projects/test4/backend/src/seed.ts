import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { User, IUser } from './database/models/User';
import { Account, IAccount } from './database/models/Account';
import { Category, ICategory } from './database/models/Category';
import { Transaction } from './database/models/Transaction';
import { AccountService } from './services/accountService';

const MONGODB_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/finance_tracker_db_seed";

const systemCategories = [
    { name: "Salary", type: "INCOME", iconName: "briefcase", isSystemDefault: true },
    { name: "Investment", type: "INCOME", iconName: "trending-up", isSystemDefault: true },
    { name: "Groceries", type: "EXPENSE", iconName: "shopping-cart", isSystemDefault: true },
    { name: "Rent", type: "EXPENSE", iconName: "home", isSystemDefault: true },
    { name: "Utilities", type: "EXPENSE", iconName: "zap", isSystemDefault: true },
    { name: "Transport", type: "EXPENSE", iconName: "bus", isSystemDefault: true },
    { name: "Dining Out", type: "EXPENSE", iconName: "utensils", isSystemDefault: true },
    { name: "Entertainment", type: "EXPENSE", iconName: "film", isSystemDefault: true },
    { name: "Shopping", type: "EXPENSE", iconName: "tag", isSystemDefault: true },
    { name: "Health", type: "EXPENSE", iconName: "heart-pulse", isSystemDefault: true },
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB for seeding.");

        console.log("Clearing existing data...");
        await Promise.all([
            User.deleteMany(),
            Account.deleteMany(),
            Category.deleteMany(),
            Transaction.deleteMany(),
        ]);
        console.log("Data cleared.");

        console.log("Seeding system categories...");
        const seededSysCategories = await Category.insertMany(systemCategories);
        console.log(`${seededSysCategories.length} system categories seeded.`);

        console.log("Seeding users...");
        const users = await User.insertMany([
            { email: 'john.doe@example.com', passwordHash: 'password123', firstName: 'John', lastName: 'Doe' },
            { email: 'jane.smith@example.com', passwordHash: 'password123', firstName: 'Jane', lastName: 'Smith' },
        ]);
        const [john, jane] = users;
        console.log(`${users.length} users seeded.`);

        console.log("Seeding user-specific categories for Jane...");
        const janesCategories = await Category.insertMany([
            { userId: jane._id, name: 'Freelance Work', type: 'INCOME', iconName: 'pen-tool' },
            { userId: jane._id, name: 'Pet Supplies', type: 'EXPENSE', iconName: 'paw-print' }
        ]);
        console.log("Jane's custom categories seeded.");

        const allCategories = [...seededSysCategories, ...janesCategories];

        console.log("Seeding accounts...");
        const accounts = await Account.insertMany([
            // John's accounts
            { userId: john._id, name: 'Chase Checking', type: 'CHECKING', initialBalance: 1500 },
            { userId: john._id, name: 'Amex Gold', type: 'CREDIT_CARD', initialBalance: 0 },
            // Jane's accounts
            { userId: jane._id, name: 'BoA Savings', type: 'SAVINGS', initialBalance: 12000 },
            { userId: jane._id, name: 'Fidelity Investments', type: 'INVESTMENT', initialBalance: 25000 },
        ]);
        const [johnChecking, johnCredit, janeSavings, janeInvest] = accounts;
        console.log(`${accounts.length} accounts seeded.`);

        console.log("Seeding transactions...");
        const getCat = (name: string) => allCategories.find(c => c.name === name)!._id;

        const transactions = [
            // John's transactions
            { userId: john._id, accountId: johnChecking._id, categoryId: getCat('Salary'), amount: 4500, type: 'INCOME', date: new Date('2024-05-01'), description: 'May Salary' },
            { userId: john._id, accountId: johnChecking._id, categoryId: getCat('Rent'), amount: 1800, type: 'EXPENSE', date: new Date('2024-05-01'), description: 'May Rent' },
            { userId: john._id, accountId: johnCredit._id, categoryId: getCat('Groceries'), amount: 120.50, type: 'EXPENSE', date: new Date('2024-05-03'), description: 'Trader Joes' },
            { userId: john._id, accountId: johnCredit._id, categoryId: getCat('Dining Out'), amount: 45.75, type: 'EXPENSE', date: new Date('2024-05-05'), description: 'Pizza night' },
            { userId: john._id, accountId: johnChecking._id, categoryId: getCat('Utilities'), amount: 85.20, type: 'EXPENSE', date: new Date('2024-05-10'), description: 'Electricity Bill' },
            { userId: john._id, accountId: johnCredit._id, categoryId: getCat('Transport'), amount: 50, type: 'EXPENSE', date: new Date('2024-05-12'), description: 'Gas' },
            { userId: john._id, accountId: johnCredit._id, categoryId: getCat('Shopping'), amount: 250.00, type: 'EXPENSE', date: new Date('2024-05-15'), description: 'New shoes' },
            { userId: john._id, accountId: johnChecking._id, categoryId: getCat('Entertainment'), amount: 30.00, type: 'EXPENSE', date: new Date('2024-05-18'), description: 'Movie tickets' },
            { userId: john._id, accountId: johnChecking._id, categoryId: getCat('Health'), amount: 75.00, type: 'EXPENSE', date: new Date('2024-05-20'), description: 'Pharmacy' },
            // Jane's transactions
            { userId: jane._id, accountId: janeSavings._id, categoryId: getCat('Freelance Work'), amount: 1200, type: 'INCOME', date: new Date('2024-05-05'), description: 'Project A payment' },
            { userId: jane._id, accountId: janeSavings._id, categoryId: getCat('Investment'), amount: 500, type: 'INCOME', date: new Date('2024-05-10'), description: 'Dividend payout' },
            { userId: jane._id, accountId: janeSavings._id, categoryId: getCat('Pet Supplies'), amount: 80, type: 'EXPENSE', date: new Date('2024-05-11'), description: 'Dog food and toys' },
            { userId: jane._id, accountId: janeInvest._id, categoryId: getCat('Investment'), amount: 1000, type: 'EXPENSE', date: new Date('2024-05-15'), description: 'Buy VOO stocks' },
            { userId: jane._id, accountId: janeSavings._id, categoryId: getCat('Groceries'), amount: 210.45, type: 'EXPENSE', date: new Date('2024-05-18'), description: 'Whole Foods run' },
            { userId: jane._id, accountId: janeSavings._id, categoryId: getCat('Dining Out'), amount: 150, type: 'EXPENSE', date: new Date('2024-05-22'), description: 'Dinner with friends' },
        ];
        await Transaction.insertMany(transactions);
        console.log(`${transactions.length} transactions seeded.`);
        
        console.log("Recalculating account balances...");
        const accountService = new AccountService();
        for (const account of accounts) {
            await accountService.recalculateAccountBalance(account._id);
        }
        console.log("Account balances updated.");


        console.log("Database seeding completed successfully!");
    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB.");
    }
};

seedDatabase();