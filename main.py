from flask import jsonify,Flask, render_template, url_for, request
from bs4 import BeautifulSoup
import requests
import json

app = Flask(__name__)

# main home page route
@app.route('/')
@app.route('/home')
def home():
    return render_template("index.html")

@app.route('/developer')
def developer():
    return render_template("developer.html")

@app.route('/myattendance',methods=['POST', 'GET'])
def myattendence():

    output = request.form.to_dict()

    student = {}

    user = output["user"]
    pwd = output["password"]

    headers = {"user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36"}

    login = {"__LASTFOCUS":"",
    "__EVENTTARGET":"",
    "__EVENTARGUMENT":"",
    "__VIEWSTATE": "/wEPDwUKMTQzNTE2MzkwNWRkpSEJKweVVWMxVC2IuNsJcC4LZ1WeEWENVBPSW3CCp0M=",
    "__VIEWSTATEGENERATOR": "29EDAEC7",
    "__EVENTVALIDATION": "/wEdAAksyueShGq692DzmT1Jl4ONEHX99fbNOkB7jDZxhdx2HJb1x+FcwYQCzGO62uof1Uhb40aWkResrkT1ejsEDV1HuqJzdLRkOMLOoT0zZmF15MKuxa9nriHe9jO7RhlVlprZLo06Fl6DYP/kYTXPzdB2op4oRunf14dz2Zt2+QKDEHXoT2A5OSqQSW0XQ3USDjEeu6wsRqeRozJygPGhXE/uhHVciy5DM42IdetiqortPw==",
    "tbEmail":"" ,
    "TxtUserName": user,
    "TxtPassword": pwd,
    "btnLogin": "Sign in"
    }

    with requests.Session() as s:
    	url ="https://ecm.smtech.in/ecm/"
    	page = s.post(url,data=login ,headers=headers)
    content = page.content
    soup = BeautifulSoup(content,"html.parser")

    info = soup.find(class_="panel panel-default")

    if info!=None:
        info = info.find_all("span")

        att = soup.find(id="ctl00_ContentPlaceHolder1_gvRecord")
        att = att.find_all("td")

        index = 15
        count = 0

        while True:
            if index<len(att):
                student[ att[index].get_text()[slice(4,len(att[index].get_text())+1)].upper() ] = [ int(att[index+1].get_text()), int(att[index+2].get_text()), int(att[index+3].get_text())]
                index = index+13
                count = count+1
            else:
                break

        student["name"]=info[1].get_text().upper()
        student["section"]=info[4].get_text().upper()
        student["TG"]=info[5].get_text().upper()
        student["tgphno"]=info[6].get_text().upper()
        student["sem"]=info[3].get_text().upper()
        student["course"]=info[2].get_text().upper()
        student["count"]=count

        return render_template('index.html', name = json.dumps(student))

    else:
        return render_template('index.html',name = json.dumps({}))


if __name__ == "__main__":
    app.run(debug=True)
