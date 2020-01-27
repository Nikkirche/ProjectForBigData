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
 var tb= document.getElementById('inputTable')
        f = {"created_time":1,"permalink_url":1,"id":1,"shares":1}
        d['data'].forEach(function(val){
                tr_dom = create('tr',{},tb,'')
                Object.keys(f).forEach(function(tr){
                        if(tr in  val){
                                if('shares' == tr)
                                        td_dom = create('td',{},tr_dom,val[tr]['count'])
                                else
                                        td_dom = create('td',{},tr_dom,val[tr])
                        }else
                                td_dom = create('td',{},tr_dom,'')
                })
        })

     };