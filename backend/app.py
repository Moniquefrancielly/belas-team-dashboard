from flask import Flask
from routes.routes import main_routes

app = Flask(__name__)

app.register_blueprint(main_routes)

@app.route('/')
def home():
    return {"message": "Backend BELAS rodando 🚀"}

if __name__ == '__main__':
    app.run(debug=True)