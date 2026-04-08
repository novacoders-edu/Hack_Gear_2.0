# MongoDB Setup Guide

You need MongoDB to use the attendance system and other backend features. Choose one option:

## Option 1: MongoDB Atlas (Cloud - Recommended) ⭐

**Free tier available, no installation needed**

### Steps:

1. **Create Account**
   - Go to https://cloud.mongodb.com
   - Sign up for free account

2. **Create Cluster**
   - Click "Build a Database"
   - Choose "FREE" tier (M0)
   - Select a cloud provider and region (closest to you)
   - Click "Create Cluster"

3. **Create Database User**
   - Go to "Database Access" in left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Username: `hackgear_admin`
   - Password: Generate a secure password (save it!)
   - Database User Privileges: "Read and write to any database"
   - Click "Add User"

4. **Whitelist IP Address**
   - Go to "Network Access" in left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Or add your specific IP address
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" in left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://username:<password>@cluster.mongodb.net/?retryWrites=true&w=majority`

6. **Update .env.local**
   - Open `.env.local` file
   - Replace `<password>` with your actual password
   - Replace `username` with your username
   - Add database name: `mongodb+srv://username:password@cluster.mongodb.net/hackgear?retryWrites=true&w=majority`
   
   Example:
   ```
   MONGODB_URI=mongodb+srv://hackgear_admin:MySecurePass123@cluster0.abc123.mongodb.net/hackgear?retryWrites=true&w=majority
   ```

7. **Restart Dev Server**
   ```bash
   # Stop current server (Ctrl+C)
   npm run dev
   ```

## Option 2: Local MongoDB Installation

### macOS (using Homebrew)
```bash
# Install MongoDB
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB service
brew services start mongodb-community

# Verify it's running
mongosh
```

### Windows
1. Download from https://www.mongodb.com/try/download/community
2. Run installer
3. Choose "Complete" installation
4. Install as Windows Service
5. MongoDB Compass (GUI) will be installed

### Linux (Ubuntu/Debian)
```bash
# Import MongoDB public key
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Install MongoDB
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

### After Local Installation

Update `.env.local`:
```
MONGODB_URI=mongodb://localhost:27017/hackgear
```

## Verify Connection

After setting up MongoDB, test the connection:

```bash
# Restart your dev server
npm run dev

# Try accessing an API endpoint
curl http://localhost:3000/api/attendance
```

If you see a response (not an error), MongoDB is connected!

## Troubleshooting

### Error: "MONGODB_URI not defined"
- Make sure `.env.local` file exists in project root
- Restart dev server after creating/editing `.env.local`

### Error: "MongoServerError: bad auth"
- Check username and password in connection string
- Make sure you created a database user in Atlas
- Password should not contain special characters like @, :, /

### Error: "connect ECONNREFUSED"
- For local MongoDB: Make sure MongoDB service is running
- For Atlas: Check network access whitelist

### Error: "MongooseServerSelectionError"
- For Atlas: Check if IP address is whitelisted
- Check internet connection
- Verify connection string is correct

## Quick Start (Recommended)

**Use MongoDB Atlas** - it's free, fast to set up, and works everywhere:

1. Go to https://cloud.mongodb.com
2. Sign up → Create free cluster (takes 3-5 minutes)
3. Create database user
4. Whitelist IP (0.0.0.0/0 for development)
5. Get connection string
6. Update `.env.local`
7. Restart server

Done! 🎉

## Database Collections

Your app will automatically create these collections:

- `attendances` - QR attendance records
- `apitokens` - API authentication tokens
- `registrations` - Hackathon registrations
- `coreteams` - Team member data
- `judges` - Judge information
- `pastwinners` - Previous winners
- `problemstatements` - Challenge tracks
- `visitors` - Visitor count

## MongoDB Compass (GUI Tool)

To view your data visually:

1. Download MongoDB Compass: https://www.mongodb.com/try/download/compass
2. Connect using your MongoDB URI
3. Browse collections, view documents, run queries

## Need Help?

- MongoDB Atlas Docs: https://docs.atlas.mongodb.com/
- MongoDB Installation: https://docs.mongodb.com/manual/installation/
- Mongoose (Node.js driver): https://mongoosejs.com/

---

**Current Status**: ❌ MongoDB not configured
**Next Step**: Choose Option 1 (Atlas) or Option 2 (Local) above
