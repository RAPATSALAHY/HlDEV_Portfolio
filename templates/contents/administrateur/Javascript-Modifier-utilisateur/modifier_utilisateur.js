$(function(){
    //Passer valeur tableau vers modal modifier
$('tbody').on('click', '.modif', function(){
    let id_modif= $(this).attr('id');
    $('.modal-body #modifier').val(id_modif);
    //Passer valeur tableau vers modal  modifier
    function getDataEdit(){
        $.ajax({
            url :"{% url 'utilisateur:ModifierListeUtilisateur' %}",
            type :"POST",
            data:{id : id_modif,},
            success: manipulerDonneesFormulaireIntro            
        });
    }
    getDataEdit();

    function manipulerDonneesFormulaireIntro(data){
        $("#email_administrateur").val(data.email);
        $("#select_role").val(data.role);
        $("#mdp").val(data.mdp);
    }
});

$('#validerForm').submit(function(e){
    e.preventDefault();
    let url = $(this).attr('action');
    let method= $(this).attr('method');
    let id = $("#modifier").val();
    let email= $("#email_administrateur").val();
    let role = $("#select_role").val();
    let mdp= $("#mdp").val();
    
    function modifier(){
        $.ajax({
            url:url,
            type:method,
            data:{
                'id': id,
                'email':email,
                'role':role,
                'mdp':mdp
            },
            success:modifierAdministrateur
        });
    }
    modifier();

    function modifierAdministrateur(data){
        $('#edit').modal('hide');
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
            
        } else console.log("erreur de modification");
    }

}); 
    
});