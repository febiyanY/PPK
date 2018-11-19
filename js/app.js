// var dataObject = [{
//         "nim": "125060400111044",
//         "nama": "Isyana Sarasvati",
//         "jurusan": "teknik informatika",
//         "fakultas": "filkom",
//         "alamat": "jl. suka nyanyi",
//         "noHp": "081234567890"
//     },

//     {
//         "nim": "135060401111005",
//         "nama": "Marion Jola",
//         "jurusan": "komunikasi",
//         "fakultas": "FISIP",
//         "alamat": "Kec. Wakanda",
//         "noHp": "08765432109"
//     }
// ];



var Application = {
    initApplication: function () {
        $(window).load('pageinit', '#page-one', function () {
            Application.initShowMhs();

        });
        $(document).on('click', '#detail-mhs', function () {
            var nim = $(this).data('nimmhs');
            Application.initShowDetailMhs(nim);

        });
    },

    initShowMhs: function () {

        $.ajax({
            url: "http://localhost/praktikumppk/servisppk/web_service.php",
            method: "GET",
            beforeSend: function () {
                $.mobile.loading('show', {
                    text: 'Please wait while retreiving data....',
                    textVisible: true
                });
            },
            success: function (dataObject) {
                // var appendList ='<li><a href="#page-two?id='+
                // dataObject.NIM+'" target="_self" id="detail-mhs" data-nimmhs="'+
                // dataObject.NIM+'"><h2>'+dataObject.Nama+'</h2><p>'+dataObject.NIM+
                // '</p><p><b>'+dataObject.Fakultas+'</b></p></a></li>';
                // $('#list-mhs').append(appendList);
                // $('#list-mhs').listView('refresh');
                var appendList = "";
                dataObject.forEach(function (person, i) {
                    appendList = '<li>';
                    for (var key in person) {

                        if (key == 'NIM') {
                            appendList += '<a href="#page-two?id=' + person[key] + '"target="_self" id="detail-mhs" data-nimmhs="' + person[key] + '">';
                        } else if (key == 'Nama') {
                            appendList += '<h2>' + person[key] + '</h2><p>' + person.NIM + '</p>';
                        } else if (key == 'Fakultas') {
                            appendList += '<p><b>' + person[key] + '</b></p>';
                        }

                    }
                    appendList += '</a></li>';

                    $('#list-mhs').append(appendList);
                });
            },
            complete: function () {
                $.mobile.loading('hide');
            }
        });

    },

    initShowDetailMhs: function (nim) {

        $.ajax({
            url: "http://localhost/praktikumppk/servisppk/web_service.php",
            method: "GET",
            beforeSend: function () {
                $.mobile.loading('show', {
                    text: 'Please wait while retreiving data....',
                    textVisible: true
                });
            },
            success: function (dataObject) {

                // var appendDetail = "";
                var index = "";
                dataObject.forEach(function (person, i) {

                    for (var key in person) {
                        if (person.NIM == nim) {
                            index = i;
                            break;
                        }
                    }


                });
                // appendDetail = '<tr><td>' + dataObject[index].NIM + '</td><td>' + dataObject[index].Nama + '</td><td>' + dataObject[index].Jurusan + '</td><td>' + dataObject[index].Fakultas + '</td><td>' + dataObject[index].Alamat + '</td><td>' + dataObject[index].NoHp + '</td></tr>';

                // $("#table-detailMhs tbody").html(appendDetail);
                // $('#table-detailMhs').table("refresh").trigger("create");

                $('#p-nim,#p-nama,#p-jurusan,#p-fakultas,#p-alamat,#p-nohp').empty();
                $('#p-nim').append('<b>NIM : </b>' + dataObject[index].NIM);
                $('#p-nama').append('<b>Nama : </b>' +  dataObject[index].Nama );
                $('#p-jurusan').append('<b>Jurusan : </b>' + dataObject[index].Jurusan);
                $('#p-fakultas').append('<b>Fakultas : </b>' + dataObject[index].Fakultas);
                $('#p-alamat').append('<b>Alamat : </b>' + dataObject[index].Alamat);
                $('#p-nohp').append('<b>NoHp : </b>' + dataObject[index].NoHp);
            },
            complete: function () {
                $.mobile.loading('hide');
            }
        });

    }

};