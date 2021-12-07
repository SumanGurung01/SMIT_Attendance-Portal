function adddiv(dict,key,i)
{
  var newdiv = document.createElement("div");
  newdiv.innerHTML = "<b><p>"+key[i]+"</p></b><p>Total Classes:"+dict[key[i]][0]+" | Present:"+dict[key[i]][1]+" | Percentage:"+dict[key[i]][2]+"</p>"
  newdiv.classList.add("subject");
  document.body.appendChild(newdiv);
}

document.addEventListener("DOMContentLoaded", function() {
  attendance();
});

function attendance()
{
  let x = document.querySelector(".jsonobj").textContent;
  if(x!="{}")
  {
    x = JSON.parse(x);
    var key = Object.keys(x);
    var row = (Object.keys(x).length)-7;
    var col = 4;

    document.getElementById("name").innerHTML = "NAME : "+x["name"];
    document.getElementById("course").innerHTML = "COURSE : "+x["course"];
    document.getElementById("section").innerHTML = "SECTION : "+x["section"];
    document.getElementById("sem").innerHTML = "CURRENT SEMESTER : "+x["sem"]+"TH";
    document.getElementById("TG").innerHTML = "TEACHER GUARDIAN : "+x["TG"];
    document.getElementById("tgphno").innerHTML = "TG's PHONE NUMBER : "+x["tgphno"];

    var field = ["SUBJECTS","TOTAL CLASSES","PRESENT","PERCENTAGE"];

    for(var i=0 ; i<row ; i++)
    {
      adddiv(x,key,i);
    }
  }
  else
  {
    document.getElementById("message").innerHTML = "Invalid Username or Password";
  }

}
