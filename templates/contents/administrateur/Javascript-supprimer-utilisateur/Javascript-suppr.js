$(function(){
    $('tbody').on('click','.suppr', function(){
        let id = $(this).attr("id");
        $('#suppr').val(id);
    });

    $('#supprimer').on('click', function(){
        let id = $('#suppr').val();
        function envoyerIdSupprimer(){
            $.ajax({
                url :"{% url 'utilisateur:SupprimerUtilisateur' %}",
                type : "POST",
                data : { id:id},
                success : supprimerUtilisateur
            });
        }
        
        envoyerIdSupprimer();

        function supprimerUtilisateur(data){
            if(data.status==1){
                //listage-----------------------------------------------------------
            function ListerAdministrateur(){
                $.ajax({
                    url : '{% url "utilisateur:ListerJsonAdministrateur" %}',
                    type: 'GET',
                    success: afficherListeAdministrateur
                });
            }
            ListerAdministrateur();
        
            function afficherListeAdministrateur(donnees){
                let objet= JSON.parse(donnees), data="";
                $('tbody').empty();
                for(i=0; i<objet.length;i++){
                    data= data+'<tr>';
                    data=data+'<td>'+objet[i].pk+'</td>';
                    data=data+'<td>'+objet[i].fields.email_utilisateur+'</td>';
                    data=data+'<td>'+objet[i].fields.role_utilisateur+'</td>';
                    data=data+'<td>';
                    data=data+'<div class="ajuster">'+objet[i].fields.motDePasse_utilisateur+'</div>';
                    data=data+'</td>';
                    data = data+'<td>';
                    data = data +'<p data-placement="top" data-toggle="tooltip" title="Edit"><button id="'+objet[i].pk+'" class="btn btn-primary btn-xs modif" data-title="Edit" data-toggle="modal" data-target="#edit"><span class="glyphicon glyphicon-pencil"></span></button></p>';
                    data = data +'</td>';
                    data = data+'<td>';
                    data = data +'<p data-placement="top" data-toggle="tooltip" title="Delete"><button id="'+objet[i].pk+'" class="btn btn-danger btn-xs suppr" data-title="Delete" data-toggle="modal" data-target="#delete"><span class="glyphicon glyphicon-trash"></span></button></p>';
                    data = data +'</td>';
        
                    data=data+'</tr>';
                }
                    $('tbody').html(data);
            }
            //listage-----------------------------------------------------------
            } else console.log("erreur de suppression");
        }
    });
});