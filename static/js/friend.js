function follow_user(id){
    setTimeout(()=>{
        window.location.reload();
    }, 2000)
    $.ajax({ 
        url : "/findfriend/follow/" + id,
        method : 'put',
        data: {},
    })
}

function unfollow_user(id){
    setTimeout(()=>{
        window.location.reload();
    }, 2000)
    $.ajax({
        url: `/findfriend/unfollow/${id}`,
        method: 'put',
        data: {}
    })
    
}