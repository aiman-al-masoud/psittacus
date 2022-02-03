import os
from flask import Flask, render_template, request, redirect, url_for
from flask_cors import CORS

app = Flask(__name__)
app.config["DEBUG"] = True
CORS(app)


@app.route("/", methods=["GET"])
def on_index():
    return render_template("index.html", script=concatJs(), style=concatCss())


def concatJs():
     root = os.path.join(app.root_path, "static", "scripts")
     model = os.path.join(root, "model")
     view = os.path.join(root, "view")
     script = ""
     for path in [os.path.join(model, f) for f in os.listdir(model)]:
         with open(path, "r") as f:
             script+=f.read()+"\n"
     for path in [os.path.join(view, f) for f in os.listdir(view)]:
        with open(path, "r") as f:
            script+=f.read()+"\n"
    
     return script

def concatCss():
    with open(os.path.join(app.root_path, "static", "stylesheets", "style.css"), "r") as f:
        return f"<style>{f.read()}</style>"

