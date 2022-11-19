$(function(){
        //Passer valeur tableau vers modal
        $('tbody').on('click', '.suppr', function(){
            let id= $(this).attr('id');
            $('.modal-footer #suppr').val(id);
        });
        //Passer valeur tableau vers modal

    //Suppression données-------------------------------------------------
        $('.id_suppr').on('click', function(){
            id_suppr=$('#suppr').val();
            
            function supprimerIntro(){
                //Ajax 
                $.ajax({
                    url:'{% url "introduction:SupprimerIntroduction" %}',
                    type:'POST',
                    data : { id: id_suppr},
                    success: RelistageApresSuppresion
                });
                //Ajax
        }   
    //Appel Ajax qui supprime intro
    supprimerIntro();   
    //Suppression données-------------------------------------------------
        function RelistageApresSuppresion(data){
            //console.log(data);
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
                //notification @ bootstrap
                $("#message").html(
                   "<div class='alert alert-success fade in'> <button type='button' class='close close-alert' data-dismiss='alert' aria-hidden='true'>x</button>Suppression réussite</div>"
                );
            } else console.log("Suppression non réussite");
                

        }
});

});