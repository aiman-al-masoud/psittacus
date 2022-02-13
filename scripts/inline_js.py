import sys
import os
from bs4 import BeautifulSoup

"""
Last step in the build process, replaces the single link to
the bundle.js file with the inline javascript.
Placing the new script tag at the end of body, because
defer doesn't work with inline scripts.

Dependencies: BeautifulSoup
"""

htmlpath = sys.argv[1]
htmlpath.split("/")[:-1]
htmldir = os.path.join( *  htmlpath.split("/")[:-1])

with open(htmlpath, "r") as f:
    soup = BeautifulSoup(f.read())

script_tag = soup.find_all("script")[0]
pathname = script_tag["src"]

script_tag.extract() #delete

new_script_tag = soup.new_tag("script")

with open(os.path.join(htmldir, pathname), "r") as f:
    new_script_tag.string =  f.read()

soup.html.body.append(new_script_tag)

print(str(soup)) #to stdout