from flask import Flask, render_template, request, redirect, url_for
from flask_cors import CORS

app = Flask(__name__)
app.config["DEBUG"] = True
CORS(app)
#app.root_path

@app.route("/", methods=["GET"])
def on_index():
    return render_template("index.html")

@app.route("/craft-lesson", methods=["GET", "POST"])
def on_craft_lesson():
    return render_template("craft_lesson.html")

@app.route("/take-lesson", methods=["GET", "POST"])
def on_take_lesson():
    return render_template("take_lesson.html")





