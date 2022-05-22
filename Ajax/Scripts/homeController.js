var homeconfig = {
    pageSize: 2,
    pageIndex: 1
}
var homeController = {
    init: function () {
        homeController.loadData();
        homeController.registerEvent();
    },
    registerEvent: function () {
        $('#frmSaveData').validate({
            rules: {
                txtName: {
                    required: true,
                    minlength: 5
                },
                txtSalary: {
                    required: true,
                    number: true,
                    min: 0
                }
            },
            messages: {
                txtName: {
                    required: "Must type name",
                    minlength: "Min length > 5"
                },
                txtSalary: {
                    required: "Must type salary",
                    number: "Must be number",
                    min: "Min number > 0"
                }
            }
        });
        $('.txtSalary').off('keypress').on('keypress', function (e) {
            if (e.which == 13) {
                var id = $(this).data('id')
                var value = $(this).val();
                homeController.updateSalary(id, value);
            }
        });
        $('#txtSearch').off('keypress').on('keypress', function (e) {
            if (e.which == 13) {
                homeController.loadData(true);
            }
        });
        $('#btnAddNew').off('click').on('click', function (){
            $('#modalAddUpdate').modal('show');
            homeController.resetForm();
        });
        $('#btnSave').off().on('click', function () {
            if ($('#frmSaveData').valid()) {
                homeController.saveData();
            }
        });
        $('#btnSearch').off().on('click', function () {
            homeController.loadData(true);
        });
        btnReset
        $('#btnReset').off().on('click', function () {
            $('#txtSearch').val('');
            $('#ddlStatusS').val('');
            homeController.loadData(true);
        });
        $('.btn-edit').off().on('click', function () {
            $('#modalAddUpdate').modal('show');
            var id = $(this).data('id');
            homeController.loadDetail(id);
        });
        $('.btn-delete').off().on('click', function () {
            var id = $(this).data('id');
            bootbox.confirm("Sure?", function (result) {
                if (result) {
                    homeController.deleteEmployee(id);
                }
            });
        });
    },
    deleteEmployee: function (id) {
        $.ajax({
            url: '/Home/Delete',
            data: {
                id: id
            },
            type: 'POST',
            dataType: 'json',
            success: function (res) {
                if (res.status == true) {
                    bootbox.alert('Delete success', function () {
                        homeController.loadData(true);
                    });            
                }
                else {
                    bootbox.alert(res.message);
                }
            },
            error: function (err) {
                console.log(err);
            }
        })
    },
    loadDetail: function (id) {
        $.ajax({
            url: '/Home/GetDetail',
            data: {
                id: id
            },
            type: 'GET',
            dataType: 'json',
            success: function (res) {
                if (res.status == true) {
                    var data = res.data;
                    $('#hidId').val(data.Id);
                    $('#txtName').val(data.Name);
                    $('#txtSalary').val(data.Salary);
                    $('#ckStatus').prop('checked', data.Status);
                }
                else {
                    bootbox.alert(res.message);
                }
            },
            error: function (err) {
                console.log(err);
            }
        })
    },
    resetForm: function () {
        $('#hidId').val('0');
        $('#txtName').val('');
        $('#txtSalary').val(0);
        $('#ckStatus').prop('checked', true);
    },
    saveData: function () {
        var name = $('#txtName').val();
        var salary = parseFloat($('#txtSalary').val());
        var status = $('#ckStatus').prop('checked');
        var id = parseInt($('#hidId').val());
        var employee = {
            Name: name,
            Salary: salary,
            Status: status,
            Id: id
        }
        $.ajax({
            url: '/Home/SaveData',
            data: {
                strEmployee: JSON.stringify(employee)
            },
            type: 'POST',
            dataType: 'json',
            success: function (res) {
                if (res.status == true) {
                    bootbox.alert('Save success');
                    $('#modalAddUpdate').modal('hide');
                    homeController.loadData(true);
                }
                else {
                    bootbox.alert(res.message);
                }
            },
            error: function (err) {
                console.log(err);
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
                    bootbox.alert('Update successed.');
                } else {
                    bootbox.alert('Update failed.');
                }
            }
        })
    },
    loadData: function (changePageSize) {
        var name = $('#txtSearch').val();
        var status = $('#ddlStatusS').val();
        $.ajax({
            url: '/Home/LoadData',
            type: 'GET',
            dataType: 'json',
            data: {
                name: name,
                status: status,
                page: homeconfig.pageIndex,
                pageSize: homeconfig.pageSize
            },
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
                    homeController.paging(res.total, function () {
                        homeController.loadData();
                    }, changePageSize);
                    homeController.registerEvent();
                } else {
                    bootbox.alert('Load failed.');
                }
            }
        })
    },
    paging: function (totalRow, callback, changePageSize) {
        var totalPage = Math.ceil(totalRow / homeconfig.pageSize)
        //Unbind pagination if it existed or click change pagesize
        if ($('#pagination a').length === 0 || changePageSize === true) {
            $('#pagination').empty();
            $('#pagination').removeData("twbs-pagination");
            $('#pagination').unbind("page");
        }
        $('#pagination').twbsPagination({
            totalPages: totalPage,
            first: "Đầu",
            next: "Tiếp",
            last: "Cuối",
            prev: "Trước",
            initiateStartPageClick: false,
            visiblePages: 5,
            onPageClick: function (event, page) {
                homeconfig.pageIndex = page
                setTimeout(callback, 200);
            }
        });
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