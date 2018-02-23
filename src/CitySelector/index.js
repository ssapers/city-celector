require('./style.less');

$(function(){
    $('#destroyCitySelector').click(function(){
        $('#citySelector').empty();
        $('#regionText').empty();
        $('#localityText').empty();
        $('.info').removeClass('info__enabled');
    });
});


$(function(){
    $('#createCitySelector').click(function(){
       $('#citySelector').html('<button id="choiceRegions">Выбрать регион</button>');
       $('.info').toggleClass('info__enabled');
    });
});

$(function(){
    $('body').on('click','#choiceRegions',function(){
        $.getJSON('http://localhost:3000/regions', function(regions) {

            let output="<ul>";
            for (let i in regions) {
                output+='<li class="btnRegions'+i+'">' + regions[i].title + '</li>';
            }
            output+="</ul>" + '<ul id="btnTown"></ul>' + '<div id="saveBtn"></div>';
            $("#citySelector").html(output);

        });
    });
});

$(function(){

    for(let i = 0 ; i<3 ; i++){
    $('body').on('click','.btnRegions'+i+'',function(){
        $.getJSON('http://localhost:3000/localities', function(localities) {
            let output="";
            let region ='';
            region='<p>'+ localities[i].id +'<p>';
            $("#regionText").html(region);
            for(let k = 0 ; k < localities[i].list.length; k++) {
                    output += '<li class="btnLocation' + i + ' ' + k +'">' + localities[i].list[k] + "</li>";
            }
            output+="";
            document.getElementById("btnTown").innerHTML=output;
            $('#localityText').empty();
            $('#saveBtn').html('<button id="ajax" disabled>Сохранить</button>');

        });
    });
    }
});

$(function (){
    for (let j = 0; j < 3; j++) {
    for(let i = 0 ; i < 7 ; i++) {
        $('body').on('click', '.btnLocation' + j + '.' + i +'', function () {
            $.getJSON('http://localhost:3000/localities', function (localities) {
                    let locality = '';
                        locality = '<p>' + localities[j].list[i] + '<p>';
                        $("#localityText").html(locality);
                        $("#ajax").removeAttr('disabled');
            });

        });
    }
    }
});

$(function (){
    $('body').on('click','#ajax',function(){
            let $regionId = $('#regionText').text();
            let $locality = $('#localityText').text();
            $.ajax({
                type: "POST",
                url: 'http://localhost:3000/selectedRegions',
                dataType: 'json',
                data: ({ "locality": $locality,  "region" : $regionId}),
                success:  location.href = "http://localhost:3000/selectedRegions",
            });
    });
});
