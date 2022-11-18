$(function(){
    $('#form').submit(function(e){
        e.preventDefault(); //empêcher une action par defaut
        url = $(this).attr('action');
        method = $(this).attr('method');
        
        titre = $('#titre').val();
        description = $('#description').val();
        datepicker = $('#datepicker').val();
        
        $.ajax({
            url : url,
            method : method,
            data: {
                'titre': titre,
                'description': description,
                'datepicker': datepicker,
            },
            success : ajouter
        });

        function ajouter(donnees){
            console.log(donnees);
            if(donnees.status==1){
                $('#titre').val("");
                $('#description').val("");
                $('#datepicker').val("");

                $("#message").html(
                    "<div class='alert alert-success fade in'> <button type='button' class='close close-alert' data-dismiss='alert' aria-hidden='true'>x</button>Ajout réussite</div>"
                 );
                
            } else console.log("Ajout rencontre erreur");
        }

    });
});