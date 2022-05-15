from flask import Flask    

app = Flask(__name__)                                                                                                                                                                                                           
webapp_path = app.root_path+"/../psittacus/dist/index.html"    

with open(webapp_path, "r") as f:                                                                                      
    homepage=f.read()                                                                                               
                                                                                                                
@app.route('/')                                                                                                 
def index():                                                                                                    
    return homepage  

