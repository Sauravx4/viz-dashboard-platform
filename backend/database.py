from pymongo import MongoClient

# -------------------------
# MongoDB connection
# -------------------------
# Make sure your URI is wrapped in quotes!
client = MongoClient(
    "mongodb+srv://sauravmourya54_db_user:SMsm1012@cluster0.5g1cf4e.mongodb.net/?appName=Cluster0"
)

# -------------------------
# Select database and collections
# -------------------------
db = client["viz_dashboard"]  # replace with your database name
datasets_collection = db["datasets"]
dashboards_collection = db["dashboards"]
users_collection = db["users"]