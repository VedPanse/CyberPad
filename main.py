from flask import Flask, render_template, request
import os
import time
import stat

app = Flask(__name__)



@app.route("/")
def say_hello():
    return render_template("writer.html")


@app.route("/", methods=['GET', 'POST'])
def get_info():
    content = request.form.get("content")
    questions = request.form.get("questions")

    loadContent = request.form.get("loadFile")

    if str(loadContent) == "None":
        title = content.split("||")[0]
        blog = content.split("||")[1]

        fs = open(f"notes/{title}.txt", "w")
        fs.write(blog)
        fs.close()

        fs = open(f"questions/{title}.txt", "w")
        fs.write(questions)
        fs.close()

        return render_template("dashboard.html")
    
    else:
        fs = open(f"notes/{loadContent}")
        content = fs.read()
        fs.close()

        return render_template("writer.html", data=content, title=loadContent)


@app.route("/editor")
def load():
    return render_template("editor.html")


@app.route("/editor", methods=["POST", "GET"])
def sync():
    # Updates the files with the new content
    content = request.form.get("content")
    questions = request.form.get("questions")

    title = content.split("||")[0]
    data = content.split("||")[1]

    if title[-4:] != ".txt":
        title += ".txt"

    fs = open(f"notes/{title}", "w")
    fs.write(data)
    fs.close()

    fs = open(f"questions/{title}", "w")
    fs.write(questions)
    fs.close()
    
    return render_template("dashboard.html")


@app.route("/files")
def dashboard():
    path = "notes"
    dir_list = os.listdir(path)

    for items in dir_list:
        if items[-4:] != ".txt":
            dir_list.remove(items)
        else:
            dir_list[dir_list.index(items)] = items[:-4]
    

    date_list = []
    for items in dir_list:
        if items[-4:] == ".txt":
            file_path = "notes/" + items
        else:
            file_path = "notes/" + items + ".txt"
        # date_list.append(time.ctime(os.path.getmtime(file_path)))
        fileStatsObj = os.stat (file_path)
        # Get last access time
        date_list.append(time.ctime ( fileStatsObj [ stat.ST_ATIME ] ))

    date_list.sort()
    return render_template("dashboard.html", dir=dir_list, date=date_list)


@app.route("/files", methods=["GET", "POST"])
def delete_file():
    file_name = request.form.get("remove_file_name")
    if str(file_name) != "None":
        if file_name[-4:] != ".txt":
            file_name += ".txt"

        try:
            os.remove(f"notes/{file_name}")
            os.remove(f"questions/{file_name}")
        except:
            pass

        return render_template("ugly.html")

    else:
        file_name = str(request.form.get('load'))
        if ".txt" in file_name:
            fs = open(f"notes/{file_name}")
        else:
            fs = open(f"notes/{file_name}.txt")
        data = fs.read()
        fs.close()

        if ".txt" in file_name:
            fs = open(f"questions/{file_name}")
        else:
            fs = open(f"questions/{file_name}.txt")
        questions = fs.read()
        fs.close()

        return render_template("editor.html", data=data, title=request.form.get('load'), questions=questions)


@app.route("/search")
def search():
    return render_template("search.html")


@app.route("/search", methods=["POST", "GET"])
def searchPoster():
    file_name = str(request.form.get('query')).lower()
    load_name = str(request.form.get("load"))
    remove_file_name = str(request.form.get("remove_file_name"))

    if str(remove_file_name) != "None":
        delete_file_search(remove_file_name)
        return render_template("dashboard.html")

    if str(load_name) != "None":
        fs = open(f"notes/{load_name}")
        content = fs.read()
        fs.close()

        return render_template("editor.html", data=content, title=load_name)

    dir_list = os.listdir("notes")
    file_list = []
    for items in dir_list:
        if file_name in items.lower():
            file_list.append(items)

    return render_template("search.html", file_list=file_list)



def delete_file_search(file_name):

    if file_name[-4:] != ".txt":
        file_name += ".txt"

    try:
        os.remove(f"notes/{file_name}")
        os.remove(f"questions/{file_name}")
    except:
        pass

    return render_template("ugly.html")




if __name__ == "__main__":
    app.run(debug=True)
