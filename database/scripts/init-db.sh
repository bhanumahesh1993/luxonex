#!/bin/bash

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "Starting MongoDB..."
    mongod --dbpath /usr/local/var/mongodb --logpath /usr/local/var/log/mongodb/mongo.log --fork
fi

# Run database setup
echo "Setting up database..."
node setup-db.js

# Run database seeding
echo "Seeding database..."
node seed-data.js

echo "Database initialization completed!" 