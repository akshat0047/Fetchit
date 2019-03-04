let obj, tags, stags = [], tagid = [];

document.getElementById("link-submit").addEventListener("click", function () {
    let link = document.getElementById("link").value;
    if (link.length != 0)
        document.getElementById("tag-collector").style.display = "block";


    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "https://" + link + "/wp-json/wp/v2/tags", true);
    xmlhttp.send();
    xmlhttp.onload = function () {
        console.log(this.status);
        if (this.status >= 200 && this.status < 400) {
            tags = JSON.parse(this.responseText);
            idalloc();
        }
    };

    var xmlhttp1 = new XMLHttpRequest();
    xmlhttp1.open("GET", "https://" + link + "/wp-json/wp/v2/posts", true);
    xmlhttp1.send();
    xmlhttp1.onload = function () {
        console.log(this.status);
        if (this.status >= 200 && this.status < 400) {
            obj = JSON.parse(this.responseText);
        }
    };

});
//Grouping tags with their id's in a nested array

function idalloc() {
    for (let i = 0; i < tags.length; i++) {
        tagid.push([tags[i].name, tags[i].id]);

        //Showing available tags
        document.getElementById("available-tags").innerHTML += "<span class='showtag'>" + tags[i].name + "</span>";
    }
}

// FRONT END 
document.getElementById("tag-submit").addEventListener("click", function () {
    let value = document.getElementById("search").value;
    if (value.length != 0) {
        stags.push(value);
        document.getElementById("stags").innerHTML += "<span class='tag'>" + value + "</span>";
        document.getElementById("search").value = "";
    }
});

//CLEARING RECORDS
document.getElementById("clear").addEventListener("click", function () {
    document.getElementById("stags").innerHTML = "";
    document.getElementById("list").innerHTML = "";
    stags = [];
});


//Grouping tags with their id's
document.getElementById("sposts").addEventListener("click", function () {
    let arr = []
    for (let i = 0; i < stags.length; i++) {
        for (let j = 0; j < tagid.length; j++) {
            if (stags[i] === tagid[j][0])
                arr.push(tagid[j][1]);
        }
    }
    createheads(arr);
});

// Showing posts with searched tags
function createheads(search) {
    document.getElementById("list").innerHTML = "";
    let tab = [];
    for (let i = 0; i < obj.length; i++) {
        for (let j = 0; j < obj[i].tags.length; j++) {
            for (let k = 0; k < search.length; k++) {
                if (obj[i].tags[j] === search[k]) {
                    tab.push("<li style='pointer:cursor' onclick= 'createposts(" + i + ")' id='tab' class='post-tab'>" + obj[i].title.rendered + "</li>");
                }
            }
        }
    }


    for (i = 0; i < tab.length; i++)
        document.getElementById("list").innerHTML += tab[i];
}

function createposts(id) {
    let post = "<div class='post'><h2 class='posthead'>" + obj[id].title.rendered + "</h2><p class='postcontent'>" + obj[id].content.rendered + "<p></div>";
    document.getElementById("posts").innerHTML = post;
}

