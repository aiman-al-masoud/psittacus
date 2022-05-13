from flask import Flask                                                                                         
                                                                                                                
app = Flask(__name__)                                                                                           
                                                                                                                
path=app.root_path+"/../psittacus/dist/index.html"    

with open(path, "r") as f:                                                                                      
    homepage=f.read()                                                                                               
                                                                                                                
@app.route('/')                                                                                                 
def index():                                                                                                    
    return homepage  

