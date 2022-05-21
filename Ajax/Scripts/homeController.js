var homeController = {
    init: function () {
        homeController.loadData();
    },
    registerEvent: function () {
        $('.txtSalary').off('keypress').on('keypress', function (e) {
            if (e.which = 13) {
                var id = $(this).data('id')
                var value = $(this).val();
                homeController.updateSalary(id, value);
            }
        })
    },
    updateSalary: function (id, value) {
        var data = {
            Id: id,
            Salary: value
        };
        $.ajax({
            url: '/Home/Update',
            type: 'POST',
            dataType: 'json',
            data: {
                model: JSON.stringify(data)
            }, success: function (res) {
                if (res.status) {
                    alert('Update successed.');
                } else {
                    alert('Update failed.');
                }
            }
        })
    },
    loadData: function () {
        $.ajax({
            url: '/Home/LoadData',
            type: 'GET',
            dataType: 'json',
            success: function (res) {
                if (res.status) {
                    /*alert(res.status);*/
                    var data = res.data;
                    /*                    alert(data);*/
                    var html = '';
                    var template = $('#data-template').html();
                    $.each(data, function (i, item) {
                        html += Mustache.render(template, {
                            Id: item.Id,
                            Name: item.Name,
                            Salary: item.Salary,
                            Status: item.Status == true ? "<span class=\"label label-success\">Actived</span>" : "<span class=\"label label-danger\">Inactive</span>"
                        });
                    });
                    $('#tblData').html(html);
                    homeController.registerEvent();
                } else {
                    alert('Load failed.');
                }
            }
        })
    }
}
homeController.init();

//data.forEach((item) => {
//    let rendered = Mustache.render(template, item);
//        console.log(rendered);
//        $("#tblData").append(rendered);
//    });

//let data = [
//    { name: "John", comment: "That is great" },
//    { name: "Alex", comment: "It's helpful" },
//    { name: "David", comment: "Thanks a lot" }
//];

//let tmpl = $('#my-template').html();
//Mustache.parse(tmpl);

//$("#btn-add").click(() => {
//    data.forEach((item) => {
//        let rendered = Mustache.render(tmpl, item);
//        console.log(rendered);
//        $("#container").append(rendered);
//    });
//});

//$("#btn-rm").click(() => {
//    $("#container").empty();
//});