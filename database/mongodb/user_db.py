from bson.objectid import ObjectId
from database.mongodb.config import db
from utils.common import hash_password

users_collection = db["users"]

def add_user(first_name, last_name, email, password):
    hashed_pw = hash_password(password)
    user = {
        "first_name": first_name,
        "last_name": last_name,
        "email": email,
        "password": hashed_pw
    }
    users_collection.insert_one(user)

def get_user_by_email(email):
    """Find a user by email"""
    return users_collection.find_one({"email": email})

def get_user_by_id(user_id):
    """Find a user by ID"""
    return users_collection.find_one({"_id": ObjectId(user_id)})

def update_user(email, update_data):
    """Update user fields by email"""
    return users_collection.update_one({"email": email}, {"$set": update_data})

def delete_user(email):
    """Delete a user by email"""
    return users_collection.delete_one({"email": email})

def get_all_users():
    """Return list of all users"""
    return list(users_collection.find({}, {"password": 0}))  # Hide password
