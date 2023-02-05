from html2image import Html2Image
import hashlib
from concurrent.futures import ThreadPoolExecutor
import os
import time

executor = ThreadPoolExecutor(max_workers=2)
hti = Html2Image()

def get_file_name(html,css):
    sha_html = hashlib.sha256(html.encode('utf-8')).hexdigest()
    sha_css = hashlib.sha256(css.encode('utf-8')).hexdigest()
    sha_html_css = hashlib.sha256((sha_html + sha_css).encode('utf-8')).hexdigest()
    return sha_html_css

def _remove_file(filename):
    time.sleep(5)
    os.remove(filename)

def screenshoot(filename,html,css = None):
    hti.screenshot(html_str=html, css_str=css, save_as=filename)
    
def remove_file(filename):
    executor.submit(_remove_file,filename)