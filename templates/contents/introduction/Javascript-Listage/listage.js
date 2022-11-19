    $(function(){

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

            $('#example').DataTable({
                "responsive":true,
                "pageLength": 5,
                "lengthMenu": [ 5, 10]
            });
            
        }
});
