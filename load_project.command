
DB_NAME="ecommerce"

echo "Ensuring MongoDB is running..."
brew services start mongodb/brew/mongodb-community@7.0

sleep 5

echo "Connecting to the MongoDB database $DB_NAME..."
mongo $DB_NAME
echo "Connected to $DB_NAME"

echo "Starting Node.js API..."
cd /Users/jonathan/Desktop/API/Ecommerce-API
npm start