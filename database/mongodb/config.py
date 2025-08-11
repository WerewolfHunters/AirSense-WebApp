from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()
mongo_db_uri = os.getenv("MONGO_DB_URI")
DB_NAME = "airsense_db_user"

client = MongoClient(mongo_db_uri)
db = client[DB_NAME]