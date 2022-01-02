function adddiv(dict,key,i)
{
  var newdiv = document.createElement("div");
    
  newdiv.innerHTML = `<div class='card'>

                          <div class='card-body'>
        
                              <div class='row'>
                                    <div class='col-9' id="sub">
                                        <b>`+key[i]+`</b>

                                        <div class='hstack gap-2'>
                                              <div class="mb-2 bg-primary text-white col-4" id="data">T : `+dict[key[i]][0]+`</div>
                                              <div class="mb-2 bg-success text-white col-4" id="data">P : `+dict[key[i]][1]+`</div>
                                              <div class="mb-2 bg-danger text-white col-4" id="data">A : `+(dict[key[i]][0] - dict[key[i]][1])+`</div>
                                        </div>
                                    </div>

                                    <div class='col-3' id="percentage"><b>
                                       `+dict[key[i]][2]+`%</b>
                                    </div>

                              </div>
                          </div>      
                      </div>`;

  newdiv.classList.add("col-12");
  document.getElementById("atd").appendChild(newdiv);
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

    document.getElementById("name").innerHTML = "<b>"+x["name"]+"</b>"
    document.getElementById("course").innerHTML = "<b>COURSE</b> : "+x["course"];
    document.getElementById("section").innerHTML = "<b>SECTION</b>: "+x["section"];
    document.getElementById("sem").innerHTML = "<b>CURRENT SEMESTER</b> : "+x["sem"]+"TH";
    document.getElementById("TG").innerHTML = "<b>TEACHER GUARDIAN</b> : "+x["TG"];
    document.getElementById("tgphno").innerHTML = "<b>TG's PHONE NUMBER</b> : "+x["tgphno"];

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
