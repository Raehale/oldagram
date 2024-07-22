import {posts} from "./data.js"

let postsContainer = document.getElementById("posts");

posts.map(postVariable => Object.assign(postVariable, {liked: false}))

// creates the content for a post
function createPost (name, username, location, avatarSrc, postSrc, comment, likes, indexNumber) {
    let postArticle = document.createElement("article");
    postArticle.id = `post${indexNumber}`;
    postArticle.classList.add("post")
    
    postArticle.innerHTML = `
        <section class="post-header">
            <img src="${avatarSrc}" class="post-avatar" />
            <section class="post-info">
                <h2 class="post-name">${name}</h2>
                <h3 class="post-location">${location}</h3>
            </section>
        </section>
        <img src="${postSrc}" class="post-img" data-liked-img="${indexNumber}" alt="Image Posted By ${name}" />
        <section class="post-footer">
            <div class="interactions">
                <button><img src="./images/icon-heart.png" alt="black outline of a heart shape" id="liked" data-liked-heart="${indexNumber}" /></button>
                <button><img src="./images/icon-comment.png" alt="black outline of a comment bubble" id="comment" /></button>
                <button><img src="./images/icon-dm.png" alt="black outline of a paper airplane" id="send" /></button>
            </div>
            <strong class="total-likes">
                <span id="totalLikes${indexNumber}">${likes}</span> likes
            </strong>
            <div class="post-comment">
                <strong>${username}</strong> ${comment}
            </div>
        </section>`
    
    // adds posts to page    
    postsContainer.innerHTML += postArticle.outerHTML;
};

//increases likes object in posts array
function incrementLikes(index) {
    let likesEl = document.getElementById(`totalLikes${index}`);
    let currentLikes = posts[index].likes;
    if (posts[index].liked) {
        currentLikes -= 1;
        posts[index].likes = currentLikes;
        posts[index].liked = false;

        likesEl.innerHTML = currentLikes;
    } else {
        currentLikes += 1;
        posts[index].likes = currentLikes;
        posts[index].liked = true;

        likesEl.innerHTML = currentLikes;
    }
}

// creates posts for each object in posts array
for (let i = 0; i < posts.length; i++) {
    const name = posts[i].name;
    const username = posts[i].username;
    const location = posts[i].location;
    const avatarSrc = posts[i].avatar;
    const postSrc = posts[i].post;
    const comment = posts[i].comment;
    const totalLikes = posts[i].likes;
    
    createPost(name, username, location, avatarSrc, postSrc, comment, totalLikes, i);
}

//for likes on heart
postsContainer.addEventListener("click", event => {
    if (event.target.dataset.likedHeart) {
        incrementLikes(event.target.dataset.likedHeart);
    } else {
        return;
    }
});

//for likes on img
postsContainer.addEventListener("dblclick", event => {
    // console.log(event.target.dataset.likedImg)
    if (event.target.dataset.likedImg) {
        incrementLikes(event.target.dataset.likedImg);
    } else {
        return;
    }
});