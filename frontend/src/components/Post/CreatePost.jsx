import axios from "axios";
import React from "react";

function CreatePost() {
  // ---------- on recupere info local storage ---------- //
  let userConnect = JSON.parse(localStorage.getItem("auth"));
  const id = userConnect[0].userId;
  const post_author = userConnect[0].firstname + " " + userConnect[0].lastname;
  const validToken = userConnect[0].token;

  let messageBtn = "Postez votre message"

  const setDataAPI = (e) => {
    e.preventDefault();
    // ---------- on recupere les info et on les envoie ---------- //
    const post_titre = document.getElementById("post_titre").value;
    const post_contenue = document.getElementById("post_contenue").value;

    const post = {
      post_titre: post_titre,
      post_contenue: post_contenue,
      post_userId: id,
      post_author: post_author,
    };

    let config = {
      headers: {
        Authorization: "Bearer " + validToken,
      },
    };

    axios.post(
      `http://localhost:3000/api/post`,
      
      {
        post_titre: post_titre,
        post_contenue: post_contenue,
        post_userId: id,
        post_author: post_author,
      },config,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
      //window.location.href = "http://localhost:3001/post"
      );
      const messageBtn = document.getElementById("messageBtn")
      console.log(messageBtn);
      messageBtn.textContent = "Votre message à bien été créer"  
  };

  return (
    <div className="Bloc_1Contener">
      <form className="Bloc_6" onSubmit={setDataAPI}>
        <div>
          <label htmlFor="titre" className="Bloc_5">
            Titres
          </label>
          <div className="underline"></div>
          <input className="h2" type="text" name="post_titre" id="post_titre" placeholder="Le titre" maxLength={255} required />
        </div>
        <div>
          <label htmlFor="message" className="Bloc_5">
            Message
          </label>
          <div className="underline"></div>
          <textarea id="post_contenue" className="p" name="post_contenue"maxLength={1000} placeholder="le contenue de votre poste" required></textarea>
        </div>
        <button id="messageBtn" type="submit">{ messageBtn }</button>
      </form>
    </div>
  );
}

export default CreatePost;
