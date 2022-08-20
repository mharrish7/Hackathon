
import re
from flask import Flask, redirect, render_template, request,jsonify,session,url_for
import sqlite3
import hashlib
import os
import PyPDF2
import time

con = sqlite3.connect('users.db')
cursor = con.cursor()
cursor.execute('create table if not exists Users(username varchar, password varchar, nickname varchar, email varchar)')
cursor.execute('create table if not exists Todo(realuser varchar,todo varchar)')
cursor.execute('create table if not exists Layout(username varchar, name varchar,style varchar,font varchar, bg varchar)')
cursor.execute('create table if not exists PreLayout(username varchar,style varchar,font varchar, bg varchar)')
con.commit()
con.close()


app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'harrish07')


def getpdf(u):
    try:
        pdfFileObj = open(f'static/images/{u}.pdf', 'rb')
        
        pdfReader = PyPDF2.PdfFileReader(pdfFileObj)
        
        print(pdfReader.numPages)
        
        pageObj = pdfReader.getPage(0)
        
        s = pageObj.extractText()

        ind  = s.find('Monday')

        ind2 = s.find('Sl.')

        L = s[ind:ind2].split(' ')

        help1 = ['\nTuesday','\nWednesday','\nThursday','\nFriday']

        skip = ['\nBREAK','\nLUNCH','\nBREAK','\n']

        hast = {}
        initial = 'Monday'
        hast['Monday'] = []
        t3 = 1
        inds  = s.find('Code')

        L2 = s[inds:].split('\n')
        subh = {}
        for i in L2[1:]:
            try:
                subh[i[-2]] = i[2:8]
            except:
                pass
        

        for i in L[1:]:
            if i in help1:
                initial = i[1:]
                hast[initial] = []
                t3 = 1
            else:
                
                if i in skip:
                    t3 = 1
                    continue
                if t3:
                    t3 = 0
                    continue
                else:
                    hast[initial].append(i)


        
        

        pdfFileObj.close()

        return hast,subh
    except:
        return {},{}



@app.route('/')
def log():
    return render_template('home.html')

@app.route('/nlog', methods = ['POST'])
def nlog():
    n = request.form['nt']
    passi = request.form['passt']
    con = sqlite3.connect('users.db')
    cursor = con.cursor()
    cursor.execute('create table if not exists Users(username varchar, password varchar, nickname varchar, email varchar)')

    cursor.execute("select * from Users where username = '%s'" %n)
    Users = None
    for i in cursor:
        Users = i
        break
    if Users:
        print(Users)
        passit = Users[1]
        hash_func = hashlib.sha1()
        string = passi + "h7"
        encoded_string=string.encode()
        hash_func.update(encoded_string)
        passi=hash_func.hexdigest()
        print(passit)
        con.commit()
        con.close()
        if passi == passit:
            session['cuser'] = n
            return jsonify({'info' : 1})
        else:
            return jsonify({'info' : "passwords dont match"})

    else:
        return jsonify({'info' : "User doesnt exist"})

@app.route('/reg')
def reg():
    return render_template('register.html')

@app.route('/regf', methods = ['POST'])
def regf():
    dn = request.form['dnt'] 
    n = request.form['nt'] 
    e = request.form['et']
    passi = request.form['passt']
    cpass = request.form['cpasst']
    con = sqlite3.connect('users.db')
    cursor = con.cursor()
    cursor.execute('create table if not exists Users(username varchar, password varchar, nickname varchar, email varchar)')
    cursor.execute("select * from Users where username = '%s'" %n)
    U = None 
    for i in cursor:
        U = i
    if U:
        return jsonify({'info' : "User name taken"}) 
    
    if '.' in n:
        return jsonify({'info' : " '.' is not allowed in username"}) 


    capitalalphabets="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    smallalphabets="abcdefghijklmnopqrstuvwxyz"
    specialchar="$@_"
    digits="0123456789"

    Ca = 0
    Sm = 0
    Sc = 0
    Di = 0
    for i in passi:
        if i in capitalalphabets:
            Ca+=1 
        if i in smallalphabets:
            Sm+=1 
        if i in specialchar:
            Sc+=1 
        if i in digits:
            Di+=1 
    
    if not Ca:
        return jsonify({'info' : 'The password should contain a uppercase letter'})
    
    if not Sm:
        return jsonify({'info' : 'The password should contain a lowercase letter'})

    if not Sc:
        return jsonify({'info' : 'The password should contain a one of the special character ($,@,_)'})

    if not Di:
        return jsonify({'info' : 'The password should contain a digit'})
    
    if len(passi) < 8:
        return jsonify({'info' : "The password should atleast have 8 characters"})

    if passi == cpass:
        hash_func = hashlib.sha1()
        string = passi + "h7"
        encoded_string=string.encode()
        hash_func.update(encoded_string)
        passi=hash_func.hexdigest()
        cursor.execute("insert into Users values (?, ?, ?, ?)", (n,passi,dn,e))
        con.commit()
        con.close()
        return jsonify({'info' : "registered successfully"})
    else:
        return jsonify({'info' : "passwords dont match"})


@app.route('/dash')
def dash():
    d = session['cuser']
    con = sqlite3.connect('users.db')
    cursor = con.cursor()
    if d:
        cursor.execute("select * from Users where username = '%s'" %d)
        U = None 
        for i in cursor:
            U = i 
        if U:
            L = []
            L.append(['Username : ',U[0]])
            L.append(['Nick Name', U[2]])
            L.append(['Email',U[3]])

            con = sqlite3.connect('users.db')
            cursor = con.cursor()
            cursor.execute('create table if not exists Todo(realuser varchar,todo varchar)')            
            cursor.execute("select * from Todo where realuser = '%s'" %d)
            cred = []
            for i in cursor:
                t1 = i[1]
                t1 = i[1].split('_')
                t1 = " ".join(t1)
                cred.append(list(i[1:]) + [t1])
            
            
            WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
            Time = ['8:30', '9:20', '10:30','11:20','1:30','2:30','3:20','4:10']

            now = time.localtime()
            weekday_index = now.tm_wday
            w1 = WEEKDAYS[weekday_index]
            w1 = "Tuesday" #***************************************************************************************
            hast,subh = getpdf(d)
            d1 = hast.get(w1,[])
            tt = []
            for i in range(len(d1)):
                if d1[i] != '':
                    tt.append([subh.get(d1[i],d1[i]),Time[i]])
            return render_template('dashboard.html',data = L, posts = cred,tt = tt)
        else:
            return redirect('/')
    else:
        return redirect('/')

@app.route('/logout', methods = ['POST'])
def logout():
    d = session['cuser']
    session['cuser'] = None 
    f = request.form['ft']
    s = request.form['st']
    bg = request.form['bg']
    print(f,s,bg)
    con = sqlite3.connect('users.db')
    cursor = con.cursor()
    cursor.execute('create table if not exists PreLayout(username varchar,style varchar,font varchar, bg varchar)')
    cursor.execute('insert into PreLayout values (?,?,?,?)',(d,s,f,bg))
    con.commit()
    con.close()

    return jsonify({'info' : 1})

@app.route('/getpre', methods = ['POST'])
def getpre():
    d = session['cuser']
    con = sqlite3.connect('users.db')
    cursor = con.cursor()
    cursor.execute('create table if not exists PreLayout(username varchar,style varchar,font varchar, bg varchar)')
    cursor.execute('select * from PreLayout where username = "%s"' %d)
    U = None 
    for i in cursor:
        U = i 
    if U:
        return jsonify({'data' : [i[1],i[2],i[3]]})
    else:
        return jsonify({'data' : 0})

    





@app.route('/delpass', methods = ['POST'])
def delpass():
    # try:
        s = request.form['st']
        print(s)
        d = session['cuser']
        con = sqlite3.connect('users.db')
        cursor = con.cursor()
        cursor.execute('create table if not exists Todo(realuser varchar,todo varchar)')            

        cursor.execute('delete from Todo where todo = ? and realuser = ?',(s,d))
        con.commit()
        con.close()
        return jsonify({'info' : 1})
    
   


@app.route('/addtodo',methods = ['POST'])
def addtodo():
    s = request.form['t']
    print(s)
    d = session['cuser']
    con = sqlite3.connect('users.db')
    cursor = con.cursor()
    cursor.execute('create table if not exists Todo(realuser varchar,todo varchar)')            
    U = None 
    cursor.execute('select * from Todo where realuser = ? and todo = ?',(d,s))
    for i in cursor:
        U = i
    if not U:
        cursor.execute("insert into Todo values (?, ?)", (d,s))
        con.commit()
        con.close()
        return jsonify({'info' : 1})
    else:
        return jsonify({'info': 'todo already exists'})
    
@app.route('/storett',methods = ['POST'])
def storett():
    try:
        if 'file' not in request.files:
            return jsonify({'data' : 'nofile'})
        file = request.files['file']
        u = session['cuser']
        file.save(f"static/images/{u}.pdf")
        return jsonify({'data':1})
    except:
        return jsonify({'error':'Unexpected error (check the file, only pdf allowed)'})

@app.route('/savelayout',methods = ['POST'])
def savel():
    s = request.form['st']
    f = request.form['ft']
    b = request.form['bg']
    n = request.form['nt']
    d = session['cuser']
    con = sqlite3.connect('users.db')
    cursor = con.cursor()
    cursor.execute('create table if not exists Layout(username varchar,name varchar, style varchar,font varchar, bg varchar)')
    U = None 
    cursor.execute('select * from Layout where name = "%s"' %n)
    for i in cursor:
        U = i 
    if not U:
        cursor.execute('insert into Layout values(?,?,?,?,?)',(d,n,s,f,b))
        con.commit()
        con.close()
        return jsonify({'info' : 'Layout saved successfully, others can also access it'})
    else:
        return jsonify({'info' : 'A layout already has this name'})

@app.route('/getl',methods = ['POST'])
def getl():
    con = sqlite3.connect('users.db')
    cursor = con.cursor()
    cursor.execute('create table if not exists Layout(username varchar,name varchar, style varchar,font varchar, bg varchar)')
    cursor.execute('select * from Layout')
    L = []
    for i in cursor:
        L.append([i[1],i[0]])
    
    return jsonify({'info':L})

@app.route('/getlu',methods = ['POST'])
def getlu():
    con = sqlite3.connect('users.db')
    d = session['cuser']
    cursor = con.cursor()
    cursor.execute('create table if not exists Layout(username varchar,name varchar, style varchar,font varchar, bg varchar)')
    cursor.execute('select * from Layout where username = "%s"' %d)
    L = []
    for i in cursor:
        L.append(i[1])
    
    return jsonify({'info':L})


@app.route('/revl',methods = ['POST'])
def revl():
    n = request.form['nt']
    con = sqlite3.connect('users.db')
    cursor = con.cursor()
    cursor.execute('select * from Layout where name = "%s"' %n )
    u = None 
    for i in cursor:
        u = i 
    
    if u:
        return jsonify({'data' : [i[2],i[3],i[4]]})
    else:
        return jsonify({'data' : 0})


if __name__ == "__main__":
    app.run(debug=True)