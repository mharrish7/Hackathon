$('.logout').on('click', function (ev) {
    $.ajax({
        url: '/logout',
        data: {
            s: 1
        },
        type: 'POST'
    }).done(function (data) {
        console.log('ss');
        if (data['info'] == 1) {
            console.log('1');
            window.location.href = "/"
        }
    });

    ev.preventDefault();
})

function checkclass(){

}

// $('.showp').on('click', function () {
//     document.querySelector('.pass21').style.display = 'block';
// })

// $('.closeshow').on('click', function () {
//     document.querySelector('.shows').style.display = 'none';
// })

// $('.closepass').on('click', function () {
//     document.querySelector('.pass21').style.display = 'none';
//     $('#resp').text("");
//     document.querySelector('#resp').classList = [];
// })

// $('.showp').on('click', function (e) {
//     document.querySelector('.pass21').style.display = 'block';
//     var s = this.classList[1];
//     console.log(s);
//     let u = this;
//     $.ajax({
//         url: '/givepass',
//         data: {
//             st: s
//         },
//         type: 'POST'
//     }).done(function (data) {
//         if (data['info'] == 1) {
//             console.log('ssd');
//             document.querySelector('#resp').classList.add(s);
//         }
//     });
// })

// $(document).on('click', '.showpl', function (ev) {
//     document.querySelector('.pass21').style.display = 'block';
//     var s = this.classList[1];
//     console.log(s);
//     let u = this;
//     $.ajax({
//         url: '/givepass',
//         data: {
//             st: s
//         },
//         type: 'POST'
//     }).done(function (data) {
//         if (data['info'] == 1) {
//             console.log('ssd');
//             document.querySelector('#resp').classList.add(s);
//         }
//     });

// })

// $('.enter').on('submit', function (ev) {
//     var web = $('#q3').val();
//     web = web.split('.').join('_');
//     var user = $('#q1').val();
//     user = user.split('.').join('_');
//     user = user.split('@').join('_');
//     var pass = $('#q2').val();
//     $.ajax({
//         url: '/addp',
//         data: {
//             webt: web,
//             usert: user,
//             passt: pass,
//         },
//         type: 'POST'
//     }).done(function (data) {
//         if (data['info'] == 1) {
//             $('#res').text("Successfully sent");
//             web2 = web.split('_').join('.');
//             user2 = user.split('_').join('./@');
//             $('.post').append(' <div class="passeg '+web+'-'+user + '"><hr><h2>' + web2 + '</h2><p> Username : ' + user2 + '</p><button class="showpl '+web+'-'+user + '">Show pass</button><button class="delpl '+web+'-'+user + '">Delete</button></div>')
//             document.querySelector('#q1').value = "";
//             document.querySelector('#q2').value = "";
//             document.querySelector('#q3').value = "";

//         }
//         else{
//             $('#res').text(data['info']);
//         }

//     })
//     ev.preventDefault();
// });


// $('.enterp').on('submit', function (ev) {
//     var pass = $('#pq').val();
//     var dat = document.querySelector('#resp').classList[0];
//     console.log(dat);
    
//     $.ajax({
//         url: '/check2',
//         data: {
//             passt: pass,
//             dt : dat
//         },
//         type: 'POST'
//     }).done(function (data) {
//         if (data && data['info']) {
//             $('#resp').text(data['info']);
//             document.querySelector('#pq').value = "";
//         }
//         else{
//             $('#res').text("error");
//         }

//     })
//     ev.preventDefault();
// });

$('.delp').on('click', function (e) {
    var s = this.classList[1];
    $.ajax({
        url: '/delpass',
        data: {
            st: s
        },
        type: 'POST'
    }).done(function (data) {
        if (data['info'] == 1) {
            console.log('ssd');
            document.querySelector('.' + s).remove();
        }
        else{
            console.log(data['info']);
        }
    });
})

$(document).on('click', '.delpl', function (ev) {
    var s = this.classList[1];
    $.ajax({
        url: '/delpass',
        data: {
            st: s
        },
        type: 'POST'
    }).done(function (data) {
        if (data['info'] == 1) {
            console.log('ssd');
            document.querySelector('.' + s).remove();
        }
        else{
            console.log(data['info']);
        }
    });

})


var ttoogle = 1

$(document).keypress(function(e){

    if(teri && e.key == 'a'){
        if(ttoogle){
            document.querySelector('.post1').style.width = '1%';
            ttoogle = 0;
            document.querySelector('#t1').style.display = 'none';
            document.querySelector('.t4').style.display = 'none';

        }
        else{
            document.querySelector('.post1').style.width = '30%';
            ttoogle = 1;
            document.querySelector('#t1').style.display = 'block';
            document.querySelector('.t4').style.display = 'block';

        }
    }
    
  });

  var totoogle = 1;

  $(document).keypress(function(e){
    if(teri && e.key == 'd' ){
        if( totoogle){
            document.querySelector('.post2').style.width = '1%';
            totoogle = 0;
            document.querySelector('#t2').style.display = 'none';
            document.querySelector('.t3').style.display = 'none';

  
        }
        else{
            document.querySelector('.post2').style.width = '30%';
            totoogle = 1;
            document.querySelector('#t2').style.display = 'block';
            document.querySelector('.t3').style.display = 'block';

  
        }
    }
});

    $(document).keypress(function(e){
        if(teri){
            if(e.key == 'w'){
                document.querySelector('.shows').style.display = 'block';
            }
            if(e.key == 's'){
                document.querySelector('.shows').style.display = 'none';
    
            }
        }
        
    });

    var teri = 1
    $('.ter').on('mouseenter', function(){
        teri = 0;
        console.log('enter');
    })

    $('.ter').on('mouseleave',function(){
        teri = 1;
        console.log('leave');

    })

    $('.post1').on('mouseenter', function(){
        teri = 0;
        console.log('enter');
    })

    $('.post1').on('mouseleave',function(){
        teri = 1;
        console.log('leave');

    })

    $('.post2').on('mouseenter', function(){
        teri = 0;
        console.log('enter');
    })

    $('.post2').on('mouseleave',function(){
        teri = 1;
        console.log('leave');

    })

    $('.search').on('mouseenter', function(){
        teri = 0;
        console.log('enter');
    })

    $('.search').on('mouseleave',function(){
        teri = 1;
        console.log('leave');

    })

var fl = "white";
var sl = 'rgba(4, 4, 4, .7)';
var bg = "";

    $('.ter').terminal({
        hello: function (what) {
            this.echo('Hello, ' + what +
                '. Wellcome to this terminal.');
        },
        Hi: function(name){
            this.echo('Hi ' + name);
        },
        style: function(color){
            if(color == 'default'){
                color = 'rgba(4, 4, 4, .7)';
            }
            for( i of document.querySelectorAll('.sd9x7') ){
                i.style.backgroundColor = color;
                sl = color;
            }
            
        },
        back: function(url){
            // document.querySelector('body').style.backgroundColor = 'red';
            console.log(url);
            document.querySelector('body').setAttribute("style", "background-image: url('"+ url + "');");
            console.log(document.querySelector('body').style.backgroundImage);
            bg = url;
        },
        list: function(){
            this.echo('style <color> - changes colour of components \nback <image url> -changes background \nfont <color> - changes font color \nsave <name> - saves the current layout \nshowl - shows all layouts \nset <name>  - sets the selected layout \nshowlurs - show layouts created by you');
        },
        font: function(color){
            document.querySelector('body').style.color = color;
            fl = color;
        },
        save: function(name){
            
            $.ajax({
                url: '/savelayout',
                data: {
                    st : sl,
                    nt : name,
                    ft : fl,
                    bg : bg
                },
                type: 'POST'
            }).done(function (data) {
                if (data['info'] == 1) {
                    alert(data['info']);
                }
                else{
                    alert(data['info']);
                }
        
            })
        },
        showl: function(){
            u = this;
            $.ajax({
                url: '/getl',
                data: {
                    st : 's'
                },
                type: 'POST'
            }).done(function (data) {
                console.log(data['info']);
                for(i of data['info']){
                    u.echo(i[0] + ' - ' + i[1]);
                }
                
        
            })
        },
        showlurs: function(){
            u = this;
            $.ajax({
                url: '/getlu',
                data: {
                    st : 's'
                },
                type: 'POST'
            }).done(function (data) {
                console.log(data['info']);
                for(i of data['info']){
                    u.echo(i);
                }
                
        
            })
        },
        set: function(name){
            $.ajax({
                url: '/revl',
                data: {
                    nt:name
                },
                type: 'POST'
            }).done(function (data) {
                if(data['data'] == 0){
                    console.log('Some error');
                }
                else{
                    i = data['data'];
                    fl = i[1];
                    sl = i[0];
                    bg = i[2];
                    
                    console.log(fl,sl,bg);
                    if(bg != ""){
                        document.querySelector('body').setAttribute("style", "background-image: url('"+ bg + "');");
                    }
                    if(fl != ""){
                        document.querySelector('body').style.color = fl;
                    }
                    
                    if(sl != ""){
                        for( i of document.querySelectorAll('.sd9x7') ){
                            i.style.backgroundColor = sl;
                        }
                    }
                    
                }
                
            })
        }
    }, {
        greetings: 'Type list to get all the commands'
    });

    $('.searchi').on('submit',function(e){

        e.preventDefault();
        s = $('#search').val();

        window.open(
            "https://www.google.com/search?q=" + s, "_blank");
        }
    )

    $('.addtodo').on('submit', function (ev) {
        console.log('ss');
        var todo = $('#todoa').val();
        todo = todo.split(' ').join('_');
        $.ajax({
            url: '/addtodo',
            data: {
                t : todo
            },
            type: 'POST'
        }).done(function (data) {
            if (data['info'] == 1) {
                todo2 = todo.split('_').join(' ');
                $('.post2').append(' <div class="todolist '+ todo + '"><hr><p display = "inline">' + todo2 + '</p><button class="delpl '+ todo + '">Delete</button></div>')
                document.querySelector('#search').value = "";
                $('#todoa').val("");
            }
            else{
                alert(data['info']);
            }
    
        })
        ev.preventDefault();
    });

    $("#form").on("submit",function(e){
        formdata = new FormData($("#form")[0]);
        console.log(formdata);
        $.ajax({
            data :formdata,
            type : 'POST',
            url : '/storett',
            contentType: false,
            cache: false,
            processData: false
        })
        .done(function(data) {
          if(data.error){
            $('#res1').text(data['error']);
          }
          else{
            $('#res1').text("successfully upload");
          }
        });
        e.preventDefault();
    });