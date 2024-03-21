import sqlite3
import base64
import requests
import os
from datetime import datetime
from dotenv import load_dotenv


load_dotenv()


client_id = os.getenv("client_id")
client_secret = os.getenv("client_secret")

auth_string = f"{client_id}:{client_secret}"
auth_bytes = auth_string.encode("utf-8")
auth_base64 = str(base64.b64encode(auth_bytes), "utf-8")


url = "https://accounts.spotify.com/api/token"


# Connect to the database
conn = sqlite3.connect('../database.db')
c = conn.cursor()

# Query the users table
c.execute("SELECT * FROM users")

# Fetch all the rows
rows = c.fetchall()

# Print each row
for row in rows:
    refresh_token = row[2]
    user_id = row[3]
    spotify_id =row[4]

    headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "Authorization": f"Basic {auth_base64}"
    }
    data = {
        "grant_type": "refresh_token",
        "refresh_token": refresh_token
    }

    response = requests.post(url, headers=headers, data=data)

    if response.status_code == 200:
        response_data = response.json()

        url = f"https://api.spotify.com/v1/users/{spotify_id}/playlists"
        headers = {'Authorization': 'Bearer ' + response_data["access_token"]}
        res = requests.get(url, headers=headers)
        print(res.json()["items"])
        current_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

        insert_query = """
            INSERT INTO user_playlists (userId, spotifyId, date, playlist)
            VALUES (?, ?, ?, ?)
            """
        # playlist_blob = json.dumps(res.json()).encode('utf-8')
        # c.execute(insert_query, (user_id, spotify_id, current_time, playlist_blob))
        # conn.commit()
    else:
        print(f"Request failed with status code: {response.status_code}")
# Close the connection
conn.close()

"""
TODO
extract daily mixes
extract songs from mixes
Save songs with relevent meta data to db

Create crontab schedual on ec2-micro

Create webpage
"""