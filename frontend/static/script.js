const loadUsersBtn = document.getElementById("loadUsersBtn");

const usersList = document.getElementById("usersList");
const postsList = document.getElementById("postsList");
const commentsList = document.getElementById("commentsList");

const usersStatus = document.getElementById("usersStatus");
const postsStatus = document.getElementById("postsStatus");
const commentsStatus = document.getElementById("commentsStatus");

function clearSelection(container) {
  const cards = container.querySelectorAll(".card");
  cards.forEach(card => card.classList.remove("selected"));
}

function setStatus(element, message, type = "") {
  element.className = `status ${type}`;
  element.textContent = message;
}

async function fetchWithHandling(url) {
  const response = await fetch(url);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Erro ao carregar dados");
  }

  return data;
}

loadUsersBtn.addEventListener("click", loadUsers);

async function loadUsers() {
  usersList.innerHTML = "";
  postsList.innerHTML = "";
  commentsList.innerHTML = "";

  setStatus(usersStatus, "Carregando usuários...", "loading");
  setStatus(postsStatus, "", "");
  setStatus(commentsStatus, "", "");

  try {
    const users = await fetchWithHandling("/users");

    setStatus(usersStatus, `${users.length} usuários carregados com sucesso.`, "success");

    users.forEach(user => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h3>${user.name}</h3>
        <p><strong>Usuário:</strong> ${user.username}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Telefone:</strong> ${user.phone}</p>
        <p><strong>Website:</strong> ${user.website}</p>
      `;

      card.addEventListener("click", () => {
        clearSelection(usersList);
        card.classList.add("selected");
        loadPosts(user.id, user.name);
      });

      usersList.appendChild(card);
    });

  } catch (error) {
    setStatus(usersStatus, `Erro: ${error.message}`, "error");
  }
}

async function loadPosts(userId, userName) {
  postsList.innerHTML = "";
  commentsList.innerHTML = "";

  setStatus(postsStatus, `Carregando postagens de ${userName}...`, "loading");
  setStatus(commentsStatus, "", "");

  try {
    const posts = await fetchWithHandling(`/posts/${userId}`);

    setStatus(postsStatus, `${posts.length} postagens encontradas para ${userName}.`, "success");

    if (posts.length === 0) {
      postsList.innerHTML = "<p>Nenhuma postagem encontrada.</p>";
      return;
    }

    posts.forEach(post => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h4>${post.title}</h4>
        <p>${post.body}</p>
        <p class="meta">Post ID: ${post.id}</p>
      `;

      card.addEventListener("click", () => {
        clearSelection(postsList);
        card.classList.add("selected");
        loadComments(post.id);
      });

      postsList.appendChild(card);
    });

  } catch (error) {
    setStatus(postsStatus, `Erro: ${error.message}`, "error");
  }
}

async function loadComments(postId) {
  commentsList.innerHTML = "";

  setStatus(commentsStatus, `Carregando comentários do post ${postId}...`, "loading");

  try {
    const comments = await fetchWithHandling(`/comments/${postId}`);

    setStatus(commentsStatus, `${comments.length} comentários carregados.`, "success");

    if (comments.length === 0) {
      commentsList.innerHTML = "<p>Nenhum comentário encontrado.</p>";
      return;
    }

    comments.forEach(comment => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h4>${comment.name}</h4>
        <p>${comment.body}</p>
        <p class="meta"><strong>Email:</strong> ${comment.email}</p>
      `;

      commentsList.appendChild(card);
    });

  } catch (error) {
    setStatus(commentsStatus, `Erro: ${error.message}`, "error");
  }
}
