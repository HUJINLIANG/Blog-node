/**
 * Created by lenovo on 2016/5/22.
 */
$(function(){

    $('#searchForm').on('submit',function(e){

        e.preventDefault();
        var container = $('#search-container');
        container.empty();

        $.ajax({

            url:'/results',
            type:'POST',
            data:$('#searchForm').serialize(),
            success:function(data){

                var results = data.data;
                results.forEach(function(value,index){

                    console.log(value)

                    var blogItem = '<div class="blog-item"><h4 class="title"><a href="/page/'+value._id+'">'+value.title+'</a></h4><span class="category"><a href="#"><img src="/images/category.svg">&nbsp;&nbsp;'+value.category.name+'</a></span><span class="time"><img src="/images/clock.svg">&nbsp;&nbsp;'+value.meta.create+'</span><span class="author"><a href="/user/'+value.author._id+'"><img src="/images/user.svg">&nbsp;&nbsp;'+value.author.name+'</a></span><div class="clearfix"></div><p>'+value.des+'</p></div>'

                    container.append(blogItem);
                    container.append($('<div>',{
                        class:'hr-line-dashed'
                    }))


                })

            }

        })


    })



})