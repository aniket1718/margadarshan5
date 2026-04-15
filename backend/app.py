import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from supabase import create_client, Client

app = Flask(__name__)
# Allows your React app (likely on port 3000/5173) to talk to this API
CORS(app)

# Use environment variables for security
SUPABASE_URL = "https://dcyjbkczopjjahvipvsf.supabase.co"
SUPABASE_KEY = "YOUR_SUPABASE_SERVICE_ROLE_OR_ANON_KEY"

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

@app.route('/api/quiz/submit', methods=['POST'])
def submit():
    data = request.get_json()
    email = data.get("email")
    scores = data.get("scores", {})
    
    if not email:
        return jsonify({"status": "error", "message": "Email is required"}), 400

    # Logic to determine the stream
    # Sorts the dictionary by value and picks the highest key
    sorted_scores = sorted(scores.items(), key=lambda x: x[1], reverse=True)
    
    # Hybrid logic: If the top two are very close (difference < 2), mark as Hybrid
    if len(sorted_scores) > 1 and (sorted_scores[0][1] - sorted_scores[1][1] < 2):
        top_stream = f"{sorted_scores[0][0]}-{sorted_scores[1][0]} Hybrid"
    else:
        top_stream = sorted_scores[0][0]
    
    try:
        # Update the database
        response = supabase.table("student_reports").update({
            "top_stream": top_stream,
            "science_score": scores.get("Science", 0),
            "commerce_score": scores.get("Commerce", 0),
            "arts_score": scores.get("Arts", 0)
        }).eq("email", email).execute()
        
        return jsonify({
            "status": "success", 
            "top_stream": top_stream,
            "data": response.data[0] if response.data else {}
        })
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    # Default Flask port is 5000
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port, debug=True)