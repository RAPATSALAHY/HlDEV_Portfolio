$(function(){
//-------------------------------------------------------------------------------------------
$('tbody').on('click','.modif', function(){
    let id_modif = $(this).attr('id');
    $('#modif').val(id_modif);

    function getDataModif(){
        $.ajax({
            url:'{% url "introduction:ModifierIntroduction" %}',
            type:'POST',
            data : {id: id_modif},
            success: manipulerDonneesFormulaireIntro
        });
    }
    
    getDataModif();
    //charger le données des formulaire
    function manipulerDonneesFormulaireIntro(data){
        $("#id_intro").val(data.id);
        $("#titre").val(data.titreintroduction);
        $("#description").val(data.descriptionintroduction);
        $("#datepicker").val(data.date); 
        //console.log(data);
    }
     //charger le données des formulaire
});

$('#formModif').submit(function(e){
e.preventDefault(); //empêcher une action par defaut
let url = $(this).attr('action');
let method = $(this).attr('method');
//recuperer les valeurs sur le formulaire et serialiser
let id= $('#id_intro').val();
let titre = $('#titre').val();
let descriptionintroduction = $('#description').val();
let date = $('#datepicker').val();

function modifierIntro(){
    $.ajax({
        url:url,
        method:method,
        data: {
            id:id,
            titre: titre,
            descriptionintroduction:descriptionintroduction,
            date:date
        },
        success:RelistageApresModification
    });
}
modifierIntro();

function RelistageApresModification(data){
   $('#edit').modal('hide');
   if(data.status==1){
    function chercherDonneesServeur(){
        $.ajax({
            url:'{% url "introduction:ListerJsonIntroduction" %}',
            type: 'GET',
            success:lister_introduction
        });
 }
 chercherDonneesServeur();

 function lister_introduction(donnees){
        let objet = JSON.parse(donnees), data="";
        console.log(objet);
        $('tbody').empty();

        for(i=0; i< objet.length; i++){
           data = data+"<tr>";
           data = data+"<td>"+objet[i].pk+"</td>";
           data = data+"<td>"+objet[i].fields.titreintroduction+"</td>";
           data = data+"<td>"+objet[i].fields.descriptionintroduction+"</td>";
           data = data+"<td>"+objet[i].fields.date+"</td>";
           data = data+"<td>";
           data = data +"<p data-placement='top' data-toggle='tooltip' title='Edit'><button id="+objet[i].pk+" class='btn btn-primary btn-xs modif' data-title='Edit' data-toggle='modal' data-target='#edit'><span class='glyphicon glyphicon-pencil'></span></button></p>";
           data = data +"</td>";
           data = data+"<td>";
           data = data +"<p data-placement='top' data-toggle='tooltip' title='Delete'><button id="+objet[i].pk+" class='btn btn-danger btn-xs suppr' data-title='Delete' data-toggle='modal' data-target='#delete'><span class='glyphicon glyphicon-trash'></span></button></p>";
           data = data +"</td>";
           data = data + "</tr>";
        }
        $('tbody').html(data);
    }
    $("#message").html(
        "<div class='alert alert-success fade in'> <button type='button' class='close close-alert' data-dismiss='alert' aria-hidden='true'>x</button>Modification réussite</div>"
     );
   } else console.log("Modification échouée");
}
});
/* ---------------------------------------------------------------------------------------------------- */
});