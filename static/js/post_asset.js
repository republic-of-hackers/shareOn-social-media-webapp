function like_post(id, from){
    $.ajax({ 
        url : "/post/like/" + id,
        method : 'put',
        data: {
            path: from
        }
    })
    window.location.reload();

}

function unlike_post(id, from){
    $.ajax({ 
        url : "/post/unlike/" + id,
        method : 'put',
        data: {
            path: from
        }
    })
    window.location.reload();
}

function show_reply_box(id, replays_ids) {
    document.getElementById('replylist-'+id).style.display = 'block';
    document.getElementById('btn_showreply-'+id).style.display = 'none';
    show_replys(replays_ids)
}

function hide_reply_box(id){
    document.getElementById('replylist-'+id).style.display = 'none';
    document.getElementById('btn_showreply-'+id).style.display = 'block';
}

function show_replys(rids){
    let rlids = rids.split(',')
    for(let id of rlids){
        $.ajax({ 
            url : "/replies/" + id,
            method : 'get',
            data: {},
            success: (data)=>{              
                $(`#reply-${id}`).html(data)
            }
        })
    }
    
}

function add_reply(id, from){
    let content_data = document.getElementById(`content-${id}`).value
    $.ajax({ 
        url : "/post/addreply/" + id,
        method : 'put',
        data: {
            path: from,
            content: content_data
        }
    })
    window.location.reload();
}


