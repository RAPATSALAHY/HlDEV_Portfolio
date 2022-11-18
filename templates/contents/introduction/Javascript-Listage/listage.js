    $(function(){
        let page = 1, pagelimit=4, totalenregistrement=0;
        //Chargement Liste avec Ajax
        chercherDonneesServeur();
         //console.log($('table').html());

        //Manipulation pagination next-----------------------------
               $("#next").on("click", function(){
                    if( (page * pagelimit) < totalenregistrement){
                        page = page+1;
                       //Chargement Liste avec Ajax
                       chercherDonneesServeur();
                    }
               });
        //Manipulation pagination previous-------------------------
           $("#previous").on("click", function(){
                if(page>1){
                    page--;
                    //Chargement Liste avec Ajax
                    chercherDonneesServeur();
                }
           });
//------------------------------------------Scripts pour le listage introduction-----------------------------------
     function chercherDonneesServeur(){
         //Ajax ---------------------------------------------------------------
            $.ajax({
                url:'{% url "introduction:ListerJsonIntroduction" %}',
                 type: 'GET',
                 dataType:'json',
                 data : {
                    page: page,
                    pagelimit: pagelimit
                 },
                 success:function(response){
                     let objet = JSON.parse(response),indexJsonDonneesBase=0,data="";
                     totalenregistrement= objet[1].TailleBdd;
                     
                     $('tbody').empty();

                     for(i=0; i< objet[indexJsonDonneesBase].Data.length; i++){
                        id = objet[indexJsonDonneesBase].Data[i].id;
                        data = data+"<tr>";
                        data = data+"<td>"+id+"</td>";
                        data = data+"<td>"+objet[indexJsonDonneesBase].Data[i].titreintroduction+"</td>";
                        data = data+"<td>"+objet[indexJsonDonneesBase].Data[i].descriptionintroduction+"</td>";
                        data = data+"<td>"+objet[indexJsonDonneesBase].Data[i].date+"</td>";
                        data = data+"<td>";
                        data = data +"<p data-placement='top' data-toggle='tooltip' title='Edit'><button id="+id+" class='btn btn-primary btn-xs modif' data-title='Edit' data-toggle='modal' data-target='#edit'><span class='glyphicon glyphicon-pencil'></span></button></p>";
                        data = data +"</td>";
                        data = data+"<td>";
                        data = data +"<p data-placement='top' data-toggle='tooltip' title='Delete'><button id="+id+" class='btn btn-danger btn-xs suppr' data-title='Delete' data-toggle='modal' data-target='#delete'><span class='glyphicon glyphicon-trash'></span></button></p>";
                        data = data +"</td>";
                        data = data + "</tr>";
                     }

                     $('tbody').html(data);
                      $("#info").empty();
                      var affichage="<p>"+"Page"+objet[1].PageCourante +"sur"+ objet[1].NombreTotalPage+"<p>";
                      $("#info").append(affichage);
                 },
                 error: function(){
                     console.log("erreur")
                 }
        });
     //Ajax ---------------------------------------------------------------
     }
//------------------------------------------Scripts pour le listage introduction-----------------------------------


//-------------------------------------------Scripts pour la suppression de data-------------------------------------
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
                console.log("Suppression réussite");
                chercherDonneesServeur();
                //notification @ bootstrap
                $("#message").html(
                   "<div class='alert alert-success fade in'> <button type='button' class='close close-alert' data-dismiss='alert' aria-hidden='true'>x</button>Suppression réussite</div>"
                );
            } else console.log("Suppression non réussite");
                

        }
});

//-------------------------------------------Scripts pour la suppression de data-------------------------------------



//------------------------------------------Scripts pour la modification de data-------------------------------------------------
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
        chercherDonneesServeur();
        $("#message").html(
            "<div class='alert alert-success fade in'> <button type='button' class='close close-alert' data-dismiss='alert' aria-hidden='true'>x</button>Modification réussite</div>"
         );
       } else console.log("Modification échouée");
    }
});
//------------------------------------------Scripts pour la modification de data-------------------------------------------------
});

