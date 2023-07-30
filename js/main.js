var siteName=document.getElementById('bookmarkName');
var siteUrl=document.getElementById('bookmarkUrl');
var alertName = document.getElementById('alertName');
var alertUrl = document.getElementById('alertUrl');

var sitesContainer=[];


// local storage
if(localStorage.getItem('sites')!=null){
    sitesContainer=JSON.parse(localStorage.getItem('sites'))
    displaySite();
}

//add data
function addSite(){
    if(validateSiteName() && validateSiteUrl () == true){

        var site={
            name:siteName.value , 
            url:siteUrl.value
        }
        sitesContainer.push(site);
        localStorage.setItem("sites", JSON.stringify(sitesContainer));
        displaySite();
        clearData();
        clearValidate();
        swal({
            title: 'Your site Added',
            text:'Good Job!',
            icon:'success',
            timer: 3000,
            button:false
        });

    }else{
        swal({
            title: 'Site Name or Url is not valid, Please follow the rules below :',
            text:`  Site name must contain at least 3 characters and first letter capital

                    Site URL must be a valid one`,
            icon: "error",
            timer: 4000,
            button: false,
            });

    }
    
}


// display data
function displaySite(){
    var cartona=``;
    for(var i=0 ; i< sitesContainer.length ; i++){
        cartona+= `<tr>
        <td>${i}</td>
        <td>${sitesContainer[i].name}</td>
        <td><a class="btn btn-visit" href="https://www.${sitesContainer[i].url}" target="_blank"><i class="fa-solid fa-eye pe-2"></i>Visit</a></td>
        <td><button onclick="deleteSite(${i});" class="btn btn-delete"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
    </tr>`
    }
    document.getElementById('tBody').innerHTML=cartona;
}

// clear data
function clearData(){
    siteName.value='';
    siteUrl.value= '';
}


// delete from data
function deleteSite(index){
    sitesContainer.splice(index,1);
    displaySite();
    localStorage.setItem('sites' , JSON.stringify(sitesContainer))
}

function validateSiteName(){
    var regex1 = /^[A-Z][a-zA-Z0-9]{3,8}$/;
    if(regex1.test(siteName.value) == true){
        siteName.classList.add('is-valid')
        siteName.classList.remove('is-invalid')
        alertName.classList.replace('d-block' , 'd-none')
    return true ;
    }
    else{
        siteName.classList.add('is-invalid')
        siteName.classList.remove('is-valid')
        alertName.classList.replace('d-none' , 'd-block')
    return false ;
    }
}

function validateSiteUrl(){
    var regex2 = /^(https:\\www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?\/[a-zA-Z0-9]{2,} | (https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?\/[a-zA-Z0-9]{2,} | (https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})? $/;
    if(regex2.test(siteUrl.value) == true){
        siteUrl.classList.add('is-valid')
        siteUrl.classList.remove('is-invalid')
        alertUrl.classList.replace('d-block' , 'd-none')
    return true ;
    }
    else{
        siteUrl.classList.add('is-invalid')
        siteUrl.classList.remove('is-valid')
        alertUrl.classList.replace('d-none' , 'd-block')
    return false ;
    }
}


siteName.addEventListener('keyup' , validateSiteName)
siteUrl.addEventListener('keyup' , validateSiteUrl)


function clearValidate(){
    siteName.classList.remove('is-valid')
    siteUrl.classList.remove('is-valid')
}

