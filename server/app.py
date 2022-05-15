from flask import Flask, request  
import json
import os

app = Flask(__name__)                                                                                                                                                                                                           
webapp_path = app.root_path+"/../psittacus/dist/index.html"    
lessons_path = app.root_path+"/lessons"
                                                                                       
                                                                                                                
def index_lesson(lesson_json):
    m = lesson_json["metadata"]
    return f"author={m['author']};target_language={m['target_language']};source_language={m['source_language']};title={m['title']};"

def index_lessons():
    indeces = []
    paths = [os.path.join(lessons_path, p) for p in os.listdir(lessons_path)]
    for p in paths:
        with open(p) as f:
            indeces.append(index_lesson(json.loads(f.read())))
    return dict(zip(indeces, paths))

with open(webapp_path, "r") as f:                                                                                      
    homepage=f.read()        



less_dict = index_lessons()
lesson_indeces = less_dict.keys()


@app.route('/')                                                                                                 
def index():                                                                                                    
    return homepage  

@app.route('/get-lesson-indeces')
def get_lesson_indeces(): 
    return json.dumps(lesson_indeces)


@app.route('/download-lesson', methods=["GET", "POST"])
def download_lesson(): 

    if request.json is None:
        return "error: must include json in request", 400
    
    if "lesson-index" not in request.json.keys():
        return "error: lesson index not specified", 400

    try:
        path = less_dict[request.json["lesson-index"]]
    except:
        return "error: no such lesson", 400
        
    with open(path) as f:
        lesson = f.read()

    return lesson