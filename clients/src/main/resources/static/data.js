"use strict";
$(document).ready( function () {
    $('#example').dataTable( {
    "pagingType": "scrolling"
    } );
} );

function create(t,attr,parent_node,innerdata){
                var dom = document.createElement(t)
                for(key in attr){
                        dom.setAttribute(key,attr[key])
                }
                dom.innerHTML = innerdata;
                parent_node.appendChild(dom)
                return dom;
        }
    function getMethod(address){
        $.get(`/${address}`,  // url
          function (data, textStatus, jqXHR) {  // success callback
              console.log('status: ' + textStatus + ', data:' + data);
        });
    };
window.onload = function () {
       var d = getMethod('getData');
       // var d = require('./ok.json');

       //$.getJSON("./ok.json", function(json) {
           console.log(json);
           var tb= document.getElementById('inputTable')
           f = {"id":1,"administration":1,"filled":1,"subfilled":1,"appear":1,"date":1}
           json.forEach(function(val){
                tr_dom = create('tr',{},tb,'')
                Object.keys(f).forEach(function(tr){
                        if(tr in  val){
                                td_dom = create('td',{},tr_dom,val[tr])
                        }else
                                td_dom = create('td',{},tr_dom,'')
                })
            })
        };

$(document).ready(function () {
  $('#dtMaterialDesignExample').DataTable();
  $('#dtMaterialDesignExample_wrapper').find('label').each(function () {
    $(this).parent().append($(this).children());
  });
  $('#dtMaterialDesignExample_wrapper .dataTables_filter').find('input').each(function () {
    const $this = $(this);
    $this.attr("placeholder", "Search");
    $this.removeClass('form-control-sm');
  });
  $('#dtMaterialDesignExample_wrapper .dataTables_length').addClass('d-flex flex-row');
  $('#dtMaterialDesignExample_wrapper .dataTables_filter').addClass('md-form');
  $('#dtMaterialDesignExample_wrapper select').removeClass('custom-select custom-select-sm form-control form-control-sm');
  $('#dtMaterialDesignExample_wrapper select').addClass('mdb-select');
   $('#dtMaterialDesignExample_wrapper .mdb-select').materialSelect();

  $('#dtMaterialDesignExample_wrapper .dataTables_filter').find('label').remove();
});
