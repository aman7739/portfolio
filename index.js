let btns = document.querySelectorAll(".category");
let submit = document.getElementById("submit");

btns.forEach(function(btn){
    btn.addEventListener("click", function(){
         
        if(btn.attributes.id.value == "ui"){
            document.getElementById("webDesign").style.display="none";
            document.getElementById("androidDesign").style.display="none";
            document.getElementById("uiDesign").style.display="block";


        }
        if(btn.attributes.id.value == "web"){
            
            document.getElementById("uiDesign").style.display="none";
            document.getElementById("androidDesign").style.display="none";
            document.getElementById("webDesign").style.display="block";
            // document.getElementById("androidDesign").style.display="none";

        }
        if(btn.attributes.id.value == "android"){
            document.getElementById("webDesign").style.display="none";
            document.getElementById("uiDesign").style.display="none";
            document.getElementById("androidDesign").style.display="block";

        }
        if(btn.attributes.id.value == "all"){
            document.getElementById("webDesign").style.display="block";
            document.getElementById("uiDesign").style.display="block";
            document.getElementById("androidDesign").style.display="block";

        }
             
    })
})

document.getElementById('downloadResume').addEventListener('click', function() {
    const link = document.createElement('a'); 
    link.href = 'pic/Resume.pdf'; 
    link.download = 'pic/My_Resume.pdf'; 
    link.click(); 
  });


submit.addEventListener("click", function(){
    let email = document.getElementById("email");
    let name = document.getElementById("name");
    let msg = document.getElementById("msg");

    if(email.value == "" || name.value == "" || msg.value == "" ){
        alert("Please Fill Details")
    }else{
        alert("Succesfully Connected")
    }

})
