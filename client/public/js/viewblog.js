let baseUrl = "/api/v1";

const url = new URL(window.location.href);
const blogId =  url.searchParams.get("blogid");
async function loadBlog(){
     const response = await fetch(`${baseUrl}/posts/${blogId}`, {
        method: "get",
        headers: {
            'Content-Type': 'application/json'
        },
    })

    const blog = await response.json();

    document.getElementById("title").innerHTML = blog.title;
    document.getElementById("description").value = blog.desc;


}

function onEdit(){
    window.location.href = `/createblog.html?blogid=${blogId}`;
}