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

$('.add').on('click', function () {
    document.querySelector('.shows').style.display = 'block';
})

// $('.showp').on('click', function () {
//     document.querySelector('.pass21').style.display = 'block';
// })

$('.closeshow').on('click', function () {
    document.querySelector('.shows').style.display = 'none';
})

$('.closepass').on('click', function () {
    document.querySelector('.pass21').style.display = 'none';
    $('#resp').text("");
    document.querySelector('#resp').classList = [];
})

$('.showp').on('click', function (e) {
    document.querySelector('.pass21').style.display = 'block';
    var s = this.classList[1];
    console.log(s);
    let u = this;
    $.ajax({
        url: '/givepass',
        data: {
            st: s
        },
        type: 'POST'
    }).done(function (data) {
        if (data['info'] == 1) {
            console.log('ssd');
            document.querySelector('#resp').classList.add(s);
        }
    });
})

$(document).on('click', '.showpl', function (ev) {
    document.querySelector('.pass21').style.display = 'block';
    var s = this.classList[1];
    console.log(s);
    let u = this;
    $.ajax({
        url: '/givepass',
        data: {
            st: s
        },
        type: 'POST'
    }).done(function (data) {
        if (data['info'] == 1) {
            console.log('ssd');
            document.querySelector('#resp').classList.add(s);
        }
    });

})

$('.enter').on('submit', function (ev) {
    var web = $('#q3').val();
    web = web.split('.').join('_');
    var user = $('#q1').val();
    user = user.split('.').join('_');
    user = user.split('@').join('_');
    var pass = $('#q2').val();
    $.ajax({
        url: '/addp',
        data: {
            webt: web,
            usert: user,
            passt: pass,
        },
        type: 'POST'
    }).done(function (data) {
        if (data['info'] == 1) {
            $('#res').text("Successfully sent");
            web2 = web.split('_').join('.');
            user2 = user.split('_').join('./@');
            $('.post').append(' <div class="passeg '+web+'-'+user + '"><hr><h2>' + web2 + '</h2><p> Username : ' + user2 + '</p><button class="showpl '+web+'-'+user + '">Show pass</button><button class="delpl '+web+'-'+user + '">Delete</button></div>')
            document.querySelector('#q1').value = "";
            document.querySelector('#q2').value = "";
            document.querySelector('#q3').value = "";

        }
        else{
            $('#res').text(data['info']);
        }

    })
    ev.preventDefault();
});


$('.enterp').on('submit', function (ev) {
    var pass = $('#pq').val();
    var dat = document.querySelector('#resp').classList[0];
    console.log(dat);
    
    $.ajax({
        url: '/check2',
        data: {
            passt: pass,
            dt : dat
        },
        type: 'POST'
    }).done(function (data) {
        if (data && data['info']) {
            $('#resp').text(data['info']);
            document.querySelector('#pq').value = "";
        }
        else{
            $('#res').text("error");
        }

    })
    ev.preventDefault();
});

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

    if(teri){
        if(e.key == 'a' && ttoogle){
            document.querySelector('.post1').style.width = '1%';
            ttoogle = 0;
            document.querySelector('#t1').style.display = 'none';
        }
        else{
            document.querySelector('.post1').style.width = '30%';
            ttoogle = 1;
            document.querySelector('#t1').style.display = 'block';
    
        }
    }
    
  });

  var totoogle = 1

  $(document).keypress(function(e){
    if(teri){
        if(e.key == 'd' && totoogle){
            document.querySelector('.post2').style.width = '1%';
            totoogle = 0;
            document.querySelector('#t2').style.display = 'none';
  
        }
        else{
            document.querySelector('.post2').style.width = '30%';
            totoogle = 1;
            document.querySelector('#t2').style.display = 'block';
  
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

    $('.ter').terminal({
        hello: function (what) {
            this.echo('Hello, ' + what +
                '. Wellcome to this terminal.');
        },
        Hi: function(name){
            this.echo('Hi ' + name);
        },
        style: function(color){
            for( i of document.querySelectorAll('.sd') ){
                i.style.backgroundColor = color;
            }
            
        },
        back: function(url){
            // document.querySelector('body').style.backgroundColor = 'red';
            console.log(url);
            document.querySelector('body').setAttribute("style", "background-image: url('"+ url + "');");
            console.log(document.querySelector('body').style.backgroundImage);
        }
        
    }, {
        greetings: 'My First Web Terminal'
    });

    $('.searchi').on('submit',function(e){

        e.preventDefault();
        s = $('#search').val();

        window.open(
            "https://www.google.com/search?q=" + s, "_blank");
        }
    )