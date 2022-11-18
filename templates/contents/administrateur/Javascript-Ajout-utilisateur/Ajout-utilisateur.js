$(function(){
    $('#FormAdmin').submit(function(e){
        e.preventDefault(); //empêcher une action par defaut
        url = $(this).attr('action');
        method = $(this).attr('method');
        email_utilisateur = $('#email_administrateur').val();
        role_utilisateur= $('#select_role').val();
        mdp= $("#mdp").val();

        console.log(url+" "+method+" "+email_utilisateur+" "+role_utilisateur+" "+mdp);

        $.ajax({
            url:url,
            method:method,
            data:{
                'email_utilisateur':email_utilisateur,
                'role_utilisateur':role_utilisateur,
                'motDePasse_utilisateur':mdp
            },
            success: ajouter
        });

        function ajouter(data){
            console.log(data);
            if(data.status==1){
                $('#email_administrateur').val('');
                $("#mdp").val('');
            }else console.log("Ajout rencontre erreur");
        }
    });
});